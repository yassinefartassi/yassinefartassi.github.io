// Run with: npm test   (Node 24 strips the TypeScript types on import)
import assert from "node:assert/strict";
import { test } from "node:test";
import { analyse, estimateBpm, bandpassFilter, posSignal, chromSignal } from "../src/lib/demo/rppg.ts";
import { FatigueEngine, eyeAspectRatio, mouthAspectRatio, normaliseBlinkRate, normaliseEar, normalisePerclos, normaliseYawns } from "../src/lib/demo/fatigue.ts";

/** Synthetic skin trace: a pulse at `bpm` on all channels (strongest in green), drift and noise. */
function trace(bpm, fps = 30, seconds = 10, noise = 0.15) {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5) * 2;
  return Array.from({ length: fps * seconds }, (_, i) => {
    const t = i / fps;
    const pulse = Math.sin(2 * Math.PI * (bpm / 60) * t);
    const light = 1 + 0.02 * Math.sin(2 * Math.PI * 0.1 * t); // slow lighting drift, same on all channels
    return { t: t * 1000, rgb: [(150 + 0.3 * pulse) * light + noise * rnd(), (110 + 0.8 * pulse) * light + noise * rnd(), (90 + 0.4 * pulse) * light + noise * rnd()] };
  });
}

for (const bpm of [54, 72, 96, 132]) {
  test(`rPPG recovers ${bpm} BPM within 3 BPM (CHROM and POS)`, () => {
    const r = analyse(trace(bpm));
    assert.ok(Math.abs(r.pos - bpm) <= 3, `POS gave ${r.pos}`);
    assert.ok(Math.abs(r.chrom - bpm) <= 3, `CHROM gave ${r.chrom}`);
  });
}

test("rPPG returns null until there is enough data", () => {
  assert.equal(analyse(trace(72, 30, 1)), null);
});

test("rPPG pieces keep the signal length", () => {
  const rgb = trace(72).map((s) => s.rgb);
  assert.equal(posSignal(rgb).length, rgb.length);
  assert.equal(bandpassFilter(chromSignal(rgb), 30).length, rgb.length);
  assert.equal(estimateBpm([1, 2, 3], 30), 0);
});

test("EAR and MAR follow the published formulas", () => {
  const eye = [{ x: 0, y: 0 }, { x: 1, y: -1 }, { x: 2, y: -1 }, { x: 3, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }];
  assert.ok(Math.abs(eyeAspectRatio(eye) - 4 / 6) < 1e-9);
  const mouth = [{ x: 0, y: 0 }, { x: 1, y: -1 }, { x: 2, y: -1 }, { x: 3, y: -1 }, { x: 4, y: 0 }, { x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }];
  assert.ok(Math.abs(mouthAspectRatio(mouth) - 6 / 8) < 1e-9);
});

test("normalisation curves match the repository's reference points", () => {
  assert.equal(normaliseBlinkRate(15), 0);
  assert.equal(normaliseBlinkRate(5), 1);
  assert.equal(normaliseBlinkRate(30), 1);
  assert.equal(normaliseBlinkRate(0), 0.3);
  assert.equal(normaliseYawns(1), 0);
  assert.equal(normaliseYawns(3), 0.5);
  assert.equal(normaliseYawns(5), 0.8);
  assert.equal(normalisePerclos(0.05), 0);
  assert.ok(Math.abs(normalisePerclos(0.15) - 0.4) < 1e-9);
  assert.equal(normaliseEar(0.3), 0);
  assert.ok(Math.abs(normaliseEar(0.21) - 0.3) < 1e-9);
});

function run(engine, seconds, face, from = 0, fps = 30) {
  let s;
  for (let i = 0; i <= seconds * fps; i++) s = engine.update(from + i / fps, typeof face === "function" ? face(i / fps) : face);
  return s;
}

test("open eyes and a normal blink rate read as alert", () => {
  const e = new FatigueEngine();
  // one 0.2 s blink every 4 s = 15 per minute
  const s = run(e, 60, (t) => ({ ear: t % 4 < 0.2 ? 0.1 : 0.32, mar: 0.1 }));
  assert.equal(s.level, "alert");
  assert.ok(Math.abs(s.blinksPerMinute - 15) <= 1.5, `blink rate ${s.blinksPerMinute}`);
  assert.equal(s.microsleep, false);
});

test("eyes closed for 2 s triggers the micro-sleep alert, and it clears on reopening", () => {
  const e = new FatigueEngine();
  run(e, 5, { ear: 0.32, mar: 0.1 });
  assert.equal(run(e, 1.5, { ear: 0.1, mar: 0.1 }, 5.1).microsleep, false);
  const s = run(e, 1, { ear: 0.1, mar: 0.1 }, 6.7);
  assert.equal(s.level, "microsleep");
  assert.ok(s.score >= 0.8);
  assert.equal(run(e, 0.5, { ear: 0.32, mar: 0.1 }, 7.8).microsleep, false);
});

test("a long mouth opening counts as one yawn, a short one as none", () => {
  const e = new FatigueEngine();
  run(e, 0.2, { ear: 0.32, mar: 0.8 });
  assert.equal(run(e, 1, { ear: 0.32, mar: 0.1 }, 0.3).yawns, 0);
  assert.equal(run(e, 2, { ear: 0.32, mar: 0.8 }, 1.4).yawns, 1);
});

test("losing the face resets the closed-eye timer", () => {
  const e = new FatigueEngine();
  run(e, 1.5, { ear: 0.1, mar: 0.1 });
  run(e, 1, null, 1.6);
  assert.equal(run(e, 1, { ear: 0.1, mar: 0.1 }, 2.7).microsleep, false);
});
