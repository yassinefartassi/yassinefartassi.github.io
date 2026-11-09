// Fatigue scoring for the browser demo. TypeScript port of the fusion engine in the
// public repository (driver-fatigue-detection/modules/fatigue_fusion.py): same weights,
// same normalisation curves, same thresholds. Differences from the Raspberry Pi version:
//   - face landmarks come from MediaPipe (478 points) instead of dlib (68 points);
//   - there is no heart-rate sensor, so the heart-rate term stays at 0;
//   - blinks and yawns are timed in seconds rather than counted in frames.
// Pure functions and one small class, no DOM: tested in tests/demo.test.mjs.

export interface Point { x: number; y: number }

const d = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

// MediaPipe Face Mesh indices equivalent to dlib's six eye points and eight inner-lip points.
const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];
const INNER_MOUTH = [78, 81, 13, 311, 308, 402, 14, 178];

/** Eye aspect ratio: (|p2-p6| + |p3-p5|) / (2 |p1-p4|). */
export function eyeAspectRatio(p: Point[]): number {
  const h = d(p[0], p[3]);
  return h === 0 ? 0 : (d(p[1], p[5]) + d(p[2], p[4])) / (2 * h);
}

/** Mouth aspect ratio: (|p2-p8| + |p3-p7| + |p4-p6|) / (2 |p1-p5|). */
export function mouthAspectRatio(p: Point[]): number {
  const h = d(p[0], p[4]);
  return h === 0 ? 0 : (d(p[1], p[7]) + d(p[2], p[6]) + d(p[3], p[5])) / (2 * h);
}

/** EAR (mean of both eyes) and MAR from MediaPipe landmarks given in pixels. */
export function measureFace(landmarks: Point[]): { ear: number; mar: number } {
  const pick = (idx: number[]) => idx.map((i) => landmarks[i]);
  return {
    ear: (eyeAspectRatio(pick(LEFT_EYE)) + eyeAspectRatio(pick(RIGHT_EYE))) / 2,
    mar: mouthAspectRatio(pick(INNER_MOUTH)),
  };
}

export const EAR_THRESHOLD = 0.21;
export const MAR_THRESHOLD = 0.6;
export const MICROSLEEP_SEC = 2.0;
const BLINK_MIN_SEC = 0.08; // about 3 frames at 30 fps, as in the repository
const YAWN_MIN_SEC = 0.5; // 15 frames at 30 fps
export const WEIGHTS = { blink: 0.35, heartRate: 0.2, yawn: 0.2, perclos: 0.15, ear: 0.1 } as const;
export const THRESHOLDS = { low: 0.2, moderate: 0.4, high: 0.6, critical: 0.8 } as const;

export function normaliseBlinkRate(perMinute: number): number {
  if (perMinute <= 0) return 0.3;
  if (perMinute >= 12 && perMinute <= 20) return 0;
  if (perMinute < 12) return perMinute <= 5 ? 1 : 1 - (perMinute - 5) / 7;
  return perMinute >= 30 ? 1 : (perMinute - 20) / 10;
}

export function normaliseYawns(count: number): number {
  if (count <= 1) return 0;
  if (count <= 3) return (0.5 * (count - 1)) / 2;
  if (count <= 5) return 0.5 + (0.3 * (count - 3)) / 2;
  return Math.min(1, 0.8 + 0.04 * (count - 5));
}

export function normalisePerclos(p: number): number {
  if (p < 0.08) return 0;
  if (p < 0.15) return ((p - 0.08) / 0.07) * 0.4;
  if (p < 0.3) return 0.4 + ((p - 0.15) / 0.15) * 0.3;
  return Math.min(1, 0.7 + ((p - 0.3) / 0.2) * 0.3);
}

export function normaliseEar(ear: number): number {
  if (ear >= 0.3) return 0;
  if (ear >= EAR_THRESHOLD) return (0.3 * (0.3 - ear)) / (0.3 - EAR_THRESHOLD);
  return Math.min(1, 0.3 + (0.7 * (EAR_THRESHOLD - ear)) / EAR_THRESHOLD);
}

export type FatigueLevel = "alert" | "low" | "moderate" | "high" | "critical" | "microsleep";

export interface FatigueState {
  score: number;
  level: FatigueLevel;
  ear: number;
  mar: number;
  blinksPerMinute: number;
  yawns: number;
  perclos: number;
  microsleep: boolean;
}

/** Feed one frame at a time with `update`; times are in seconds. */
export class FatigueEngine {
  private blinks: number[] = [];
  private yawnTimes: number[] = [];
  private ears: { t: number; closed: boolean }[] = [];
  private closedSince: number | null = null;
  private openSince: number | null = null;
  private yawnCounted = false;
  private microsleep = false;
  private start: number | null = null;

  update(t: number, face: { ear: number; mar: number } | null): FatigueState {
    if (this.start === null) this.start = t;
    if (!face) {
      this.closedSince = null;
      this.openSince = null;
      this.microsleep = false;
      return this.state(t, 0.25, 0);
    }
    const { ear, mar } = face;
    const closed = ear < EAR_THRESHOLD;
    this.ears.push({ t, closed });

    if (closed) {
      if (this.closedSince === null) this.closedSince = t;
      else if (t - this.closedSince >= MICROSLEEP_SEC) this.microsleep = true;
    } else {
      if (this.closedSince !== null) {
        const held = t - this.closedSince;
        if (held >= BLINK_MIN_SEC && held < MICROSLEEP_SEC) this.blinks.push(t);
      }
      this.closedSince = null;
      this.microsleep = false;
    }

    if (mar > MAR_THRESHOLD) {
      if (this.openSince === null) this.openSince = t;
      else if (!this.yawnCounted && t - this.openSince >= YAWN_MIN_SEC) {
        this.yawnTimes.push(t);
        this.yawnCounted = true;
      }
    } else {
      this.openSince = null;
      this.yawnCounted = false;
    }
    return this.state(t, ear, mar);
  }

  private state(t: number, ear: number, mar: number): FatigueState {
    this.blinks = this.blinks.filter((b) => t - b <= 60);
    this.yawnTimes = this.yawnTimes.filter((y) => t - y <= 300);
    this.ears = this.ears.filter((e) => t - e.t <= 60);

    // Scale the blink count to a full minute once 15 s have been observed; before that
    // the rate is unknown, so it is treated as normal instead of "no blinks".
    const observed = Math.min(60, t - (this.start ?? t));
    const blinksPerMinute = observed >= 15 ? (this.blinks.length * 60) / observed : 0;
    const fBlink = observed >= 15 ? normaliseBlinkRate(blinksPerMinute) : 0;
    const perclos = this.ears.length >= 30 ? this.ears.filter((e) => e.closed).length / this.ears.length : 0;

    let score =
      WEIGHTS.blink * fBlink +
      WEIGHTS.heartRate * 0 + // no heart-rate sensor in the browser
      WEIGHTS.yawn * normaliseYawns(this.yawnTimes.length) +
      WEIGHTS.perclos * normalisePerclos(perclos) +
      WEIGHTS.ear * normaliseEar(ear);
    if (this.microsleep) score = Math.max(score, THRESHOLDS.critical);
    score = Math.min(1, Math.max(0, score));

    const level: FatigueLevel = this.microsleep
      ? "microsleep"
      : score >= THRESHOLDS.critical
        ? "critical"
        : score >= THRESHOLDS.high
          ? "high"
          : score >= THRESHOLDS.moderate
            ? "moderate"
            : score > THRESHOLDS.low
              ? "low"
              : "alert";
    return { score, level, ear, mar, blinksPerMinute, yawns: this.yawnTimes.length, perclos, microsleep: this.microsleep };
  }
}
