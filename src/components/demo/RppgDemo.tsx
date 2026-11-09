"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Content } from "@/content/types";
import { analyse, type RppgSample } from "@/lib/demo/rppg";
import DemoFrame, { Reading } from "./DemoFrame";
import { useFaceCamera, type Frame } from "./useFaceCamera";

type Demos = Content["demos"];
const BUFFER_MS = 10_000;

export default function RppgDemo({ copy, common, termsPath }: { copy: Demos["nexus"]; common: Demos["common"]; termsPath: string }) {
  const samples = useRef<RppgSample[]>([]);
  const faceSeen = useRef(false);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [result, setResult] = useState<{ chrom: number; pos: number } | null>(null);
  const [fill, setFill] = useState(0);
  const [faceFound, setFaceFound] = useState(true);

  const onFrame = useCallback(({ landmarks, video, t }: Frame) => {
    faceSeen.current = landmarks !== null;
    if (!landmarks) {
      samples.current = []; // a gap would corrupt the pulse signal, so start again
      return;
    }
    // Forehead band of the face box: 30-70% of its width, 8-25% of its height (same as NEXUS).
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const p of landmarks) {
      if (p.x < x0) x0 = p.x;
      if (p.x > x1) x1 = p.x;
      if (p.y < y0) y0 = p.y;
      if (p.y > y1) y1 = p.y;
    }
    const w = x1 - x0, h = y1 - y0;
    const sx = Math.max(0, x0 + 0.3 * w), sy = Math.max(0, y0 + 0.08 * h);
    const sw = Math.min(video.videoWidth - sx, 0.4 * w), sh = Math.min(video.videoHeight - sy, 0.17 * h);
    if (sw < 2 || sh < 2) return;

    const c = (canvas.current ??= Object.assign(document.createElement("canvas"), { width: 32, height: 16 }));
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, c.width, c.height);
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    const px = data.length / 4;
    samples.current.push({ t, rgb: [r / px, g / px, b / px] });
    while (samples.current.length && t - samples.current[0].t > BUFFER_MS) samples.current.shift();
  }, []);
  const { videoRef, status, start, stop } = useFaceCamera(onFrame);
  const running = status === "running";

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const s = samples.current;
      const span = s.length > 1 ? s[s.length - 1].t - s[0].t : 0;
      setFill(Math.min(1, span / BUFFER_MS));
      setFaceFound(faceSeen.current);
      // Wait for most of the 10 s window: shorter windows give unstable estimates.
      const r = span >= BUFFER_MS * 0.8 ? analyse(s) : null;
      setResult(r ? { chrom: r.chrom, pos: r.pos } : null);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const begin = () => {
    samples.current = [];
    setResult(null);
    setFill(0);
    void start();
  };
  const percent = Math.round(fill * 100);

  return (
    <DemoFrame common={common} termsPath={termsPath} status={status} videoRef={videoRef} faceFound={faceFound} onStart={begin} onStop={stop}>
      <p className="type-label text-muted">{copy.labels.buffer}</p>
      <div
        role="progressbar"
        aria-label={copy.labels.buffer}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-3 h-2 overflow-hidden rounded-full bg-chip"
      >
        <div className="h-full rounded-full bg-accent-fill transition-[width] duration-500" style={{ width: `${percent}%` }} />
      </div>
      <p aria-live="polite" className="mt-3 min-h-6 text-[0.9375rem] text-muted">
        {result ? copy.labels.ready : copy.labels.waiting}
      </p>
      <dl className="mt-2 grid gap-x-8 sm:grid-cols-2">
        <Reading label={copy.labels.chrom} value={result ? String(Math.round(result.chrom)) : "–"} unit={copy.labels.unit} />
        <Reading label={copy.labels.pos} value={result ? String(Math.round(result.pos)) : "–"} unit={copy.labels.unit} />
      </dl>
      <p className="mt-5 rounded-[14px] border-l-[3px] border-accent-fill bg-chip px-4 py-3 text-[0.9375rem] font-medium">{copy.reminder}</p>
    </DemoFrame>
  );
}
