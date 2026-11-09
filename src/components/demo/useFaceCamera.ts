"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Point } from "@/lib/demo/fatigue";

// The face tracker (MediaPipe Face Landmarker, Apache 2.0) is not bundled or re-hosted:
// its runtime comes from jsDelivr and its model from Google's servers, at a pinned version.
// The camera frames themselves never leave the page.
const WASM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.2/wasm";
const MODEL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export type CameraStatus = "idle" | "loading" | "running" | "denied" | "nocamera" | "model" | "unsupported";

export interface Frame {
  /** Face landmarks in video pixels, or null when no face is found. */
  landmarks: Point[] | null;
  video: HTMLVideoElement;
  /** Milliseconds, monotonic. */
  t: number;
}

/** Camera + face landmarks, all in the browser. `onFrame` runs once per new video frame. */
export function useFaceCamera(onFrame: (f: Frame) => void) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<CameraStatus>("idle");
  const callback = useRef(onFrame);
  const cleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    callback.current = onFrame;
  }, [onFrame]);

  const stop = useCallback(() => {
    cleanup.current?.();
    cleanup.current = null;
    setStatus("idle");
  }, []);

  const start = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    setStatus("loading");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
    } catch (e) {
      const name = e instanceof DOMException ? e.name : "";
      setStatus(name === "NotAllowedError" || name === "SecurityError" ? "denied" : "nocamera");
      return;
    }
    const release = () => stream.getTracks().forEach((t) => t.stop());

    let landmarker: import("@mediapipe/tasks-vision").FaceLandmarker;
    try {
      const { FaceLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
      const fileset = await FilesetResolver.forVisionTasks(WASM);
      const create = (delegate: "GPU" | "CPU") =>
        FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL, delegate },
          runningMode: "VIDEO",
          numFaces: 1,
        });
      landmarker = await create("GPU").catch(() => create("CPU"));
    } catch {
      release();
      setStatus("model");
      return;
    }

    video.srcObject = stream;
    try {
      await video.play();
    } catch {
      release();
      landmarker.close();
      setStatus("nocamera");
      return;
    }

    let raf = 0;
    let lastTime = -1;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (video.readyState < 2 || video.currentTime === lastTime) return;
      lastTime = video.currentTime;
      const t = performance.now();
      const face = landmarker.detectForVideo(video, t).faceLandmarks[0];
      const w = video.videoWidth, h = video.videoHeight;
      callback.current({ landmarks: face ? face.map((p) => ({ x: p.x * w, y: p.y * h })) : null, video, t });
    };
    raf = requestAnimationFrame(loop);

    cleanup.current = () => {
      cancelAnimationFrame(raf);
      release();
      video.srcObject = null;
      landmarker.close();
    };
    setStatus("running");
  }, []);

  useEffect(() => () => cleanup.current?.(), []);

  return { videoRef, status, start, stop };
}
