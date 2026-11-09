"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Content } from "@/content/types";
import { FatigueEngine, measureFace, type FatigueState } from "@/lib/demo/fatigue";
import DemoFrame, { Reading } from "./DemoFrame";
import { useFaceCamera, type Frame } from "./useFaceCamera";

type Demos = Content["demos"];
const ALARM_LEVELS = new Set(["high", "critical", "microsleep"]);

export default function FatigueDemo({ copy, common, termsPath, locale }: { copy: Demos["fatigue"]; common: Demos["common"]; termsPath: string; locale: string }) {
  const engine = useRef(new FatigueEngine());
  const latest = useRef<FatigueState | null>(null);
  const faceSeen = useRef(false);
  const [state, setState] = useState<FatigueState | null>(null);
  const [faceFound, setFaceFound] = useState(true);
  const [sound, setSound] = useState(false);
  const audio = useRef<AudioContext | null>(null);

  const onFrame = useCallback(({ landmarks, t }: Frame) => {
    faceSeen.current = landmarks !== null;
    latest.current = engine.current.update(t / 1000, landmarks ? measureFace(landmarks) : null);
  }, []);
  const { videoRef, status, start, stop } = useFaceCamera(onFrame);
  const running = status === "running";

  // Paint the readings 5 times a second; the engine itself sees every video frame.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setState(latest.current);
      setFaceFound(faceSeen.current);
    }, 200);
    return () => clearInterval(id);
  }, [running]);

  // Optional sound alert: one short beep every 0.7 s while the level is high or worse.
  const alarm = running && sound && state !== null && ALARM_LEVELS.has(state.level);
  useEffect(() => {
    if (!alarm) return;
    const beep = () => {
      const ctx = (audio.current ??= new AudioContext());
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.value = 0.15;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    };
    beep();
    const id = setInterval(beep, 700);
    return () => clearInterval(id);
  }, [alarm]);

  const begin = () => {
    engine.current = new FatigueEngine();
    latest.current = null;
    setState(null);
    void start();
  };

  const n = (v: number, digits: number) => v.toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const percent = state ? Math.round(state.score * 100) : 0;
  const urgent = state ? ALARM_LEVELS.has(state.level) : false;

  return (
    <DemoFrame common={common} termsPath={termsPath} status={status} videoRef={videoRef} faceFound={faceFound} onStart={begin} onStop={stop}>
      <p className="type-label text-muted">{copy.labels.score}</p>
      <p className="mt-1 text-[2.75rem] font-bold leading-none tracking-[-0.03em] tabular-nums">
        {percent}
        <span className="ml-1 text-[1.25rem] font-medium text-muted">%</span>
      </p>
      <div
        role="progressbar"
        aria-label={copy.labels.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-4 h-2 overflow-hidden rounded-full bg-chip"
      >
        <div className="h-full rounded-full bg-accent-fill transition-[width] duration-200" style={{ width: `${percent}%` }} />
      </div>
      <p
        aria-live="polite"
        className={`mt-4 inline-flex min-h-9 items-center rounded-full px-4 font-semibold ${urgent ? "bg-accent-fill text-on-accent" : "bg-chip"}`}
      >
        {copy.levels[state?.level ?? "alert"]}
      </p>

      <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
        <Reading label={copy.labels.ear} value={state ? n(state.ear, 2) : "–"} />
        <Reading label={copy.labels.mar} value={state ? n(state.mar, 2) : "–"} />
        <Reading label={copy.labels.blinks} value={state && state.blinksPerMinute > 0 ? n(state.blinksPerMinute, 0) : "–"} />
        <Reading label={copy.labels.yawns} value={state ? String(state.yawns) : "–"} />
        <Reading label={copy.labels.perclos} value={state ? n(state.perclos * 100, 0) : "–"} unit="%" />
      </dl>

      <label className="mt-5 flex min-h-11 items-center gap-3 font-medium">
        <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} className="h-5 w-5 accent-[var(--accent-fill)]" />
        {copy.labels.sound}
      </label>
    </DemoFrame>
  );
}
