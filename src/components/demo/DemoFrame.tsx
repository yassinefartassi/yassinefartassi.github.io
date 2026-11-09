"use client";

import { useId, useState, type ReactNode, type RefObject } from "react";
import type { Content } from "@/content/types";
import GlassCard from "../GlassCard";
import type { CameraStatus } from "./useFaceCamera";

type Common = Content["demos"]["common"];

/**
 * Shared shell of both demos: consent gate, camera preview, status messages, stop button.
 * The camera is requested only after the visitor ticks the box and presses start.
 */
export default function DemoFrame({
  common,
  termsPath,
  status,
  videoRef,
  faceFound,
  onStart,
  onStop,
  children,
}: {
  common: Common;
  termsPath: string;
  status: CameraStatus;
  videoRef: RefObject<HTMLVideoElement | null>;
  faceFound: boolean;
  onStart: () => void;
  onStop: () => void;
  children: ReactNode;
}) {
  const [agreed, setAgreed] = useState(false);
  const boxId = useId();
  const running = status === "running";
  const error = status === "denied" || status === "nocamera" || status === "model" || status === "unsupported" ? common.errors[status] : null;

  return (
    <GlassCard className="rounded-[28px]">
      <div className="p-6 sm:p-8">
        {!running ? (
          <div>
            <div className="flex items-start gap-3">
              <input
                id={boxId}
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent-fill)]"
              />
              <label htmlFor={boxId} className="font-medium">
                {common.consent}{" "}
                <a href={termsPath} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-accent">
                  {common.termsLink}
                  <span className="sr-only"> {common.newTab}</span>
                </a>
              </label>
            </div>
            <button
              type="button"
              onClick={onStart}
              disabled={!agreed || status === "loading"}
              className="pressable mt-6 inline-flex min-h-12 items-center rounded-full bg-accent-fill px-6 font-medium text-on-accent hover:bg-accent-fill-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? common.loading : common.start}
            </button>
            <p className="mt-5 text-[0.9375rem] text-muted">{common.privacy}</p>
          </div>
        ) : null}

        <p role="alert" className={error ? "mt-5 rounded-[14px] border-l-[3px] border-accent-fill bg-chip px-4 py-3 font-medium" : "sr-only"}>
          {error ?? ""}
        </p>

        {/* The video element stays mounted so the hook can attach the stream to it. */}
        <div className={running ? "grid gap-8 md:grid-cols-[minmax(0,320px)_1fr]" : "hidden"}>
          <div>
            <video
              ref={videoRef}
              muted
              playsInline
              aria-label={common.videoLabel}
              className="aspect-[4/3] w-full -scale-x-100 rounded-[18px] bg-chip object-cover"
            />
            <p aria-live="polite" className="mt-3 min-h-6 text-[0.9375rem] font-medium text-accent">
              {running && !faceFound ? common.noFace : ""}
            </p>
            <button type="button" onClick={onStop} className="glass pressable mt-2 inline-flex min-h-11 items-center rounded-full px-5 font-medium">
              <span className="relative z-[2]">{common.stop}</span>
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </GlassCard>
  );
}

/** One labelled reading. */
export function Reading({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="border-b border-hairline py-3">
      <dt className="text-[0.875rem] text-muted">{label}</dt>
      <dd className="mt-0.5 text-[1.375rem] font-bold tracking-[-0.02em] tabular-nums">
        {value}
        {unit ? <span className="ml-1.5 text-[0.875rem] font-medium text-muted">{unit}</span> : null}
      </dd>
    </div>
  );
}
