// Remote photoplethysmography (rPPG): heart rate from tiny colour changes of the skin.
// TypeScript port of this project's own Dart implementation in NEXUS
// (nexus_pfe_mobile/lib/services/rppg_algorithms.dart), which re-implements the
// published equations directly:
//   - CHROM: de Haan & Jeanne, IEEE Trans. Biomed. Eng., 2013.
//   - POS:   Wang et al., IEEE Trans. Biomed. Eng., 2016.
// No third-party rPPG code is used. Pure functions, no DOM: tested in tests/demo.test.mjs.

export type Rgb = [number, number, number];

export const MIN_BPM = 42;
export const MAX_BPM = 180;

const mean = (x: number[]) => x.reduce((a, b) => a + b, 0) / x.length;
const std = (x: number[]) => {
  const m = mean(x);
  return Math.sqrt(mean(x.map((v) => (v - m) * (v - m))));
};

function normalised(samples: Rgb[]) {
  const m = [0, 1, 2].map((c) => mean(samples.map((s) => s[c]))) as Rgb;
  return samples.map((s) => [s[0] / (m[0] + 1e-8), s[1] / (m[1] + 1e-8), s[2] / (m[2] + 1e-8)] as Rgb);
}

/** Removes the least-squares linear trend. */
export function linearDetrend(x: number[]): number[] {
  const n = x.length;
  if (n < 2) return [...x];
  let sumT = 0, sumY = 0, sumTT = 0, sumTY = 0;
  for (let i = 0; i < n; i++) {
    sumT += i; sumY += x[i]; sumTT += i * i; sumTY += i * x[i];
  }
  const denom = n * sumTT - sumT * sumT;
  const slope = denom !== 0 ? (n * sumTY - sumT * sumY) / denom : 0;
  const intercept = (sumY - slope * sumT) / n;
  return x.map((v, i) => v - (intercept + slope * i));
}

export function chromSignal(samples: Rgb[]): number[] {
  const n = normalised(samples);
  const xs = n.map(([r, g]) => 3 * r - 2 * g);
  const ys = n.map(([r, g, b]) => 1.5 * r + g - 1.5 * b);
  const alpha = std(xs) / (std(ys) + 1e-8);
  return linearDetrend(xs.map((x, i) => x - alpha * ys[i]));
}

export function posSignal(samples: Rgb[]): number[] {
  const n = normalised(samples);
  const s1 = n.map(([, g, b]) => g - b);
  const s2 = n.map(([r, g, b]) => g + b - 2 * r);
  const alpha = std(s1) / (std(s2) + 1e-8);
  return linearDetrend(s1.map((x, i) => x + alpha * s2[i]));
}

/** Zero-phase band-pass (one RBJ biquad, run forward then backward), 0.7 to 4 Hz. */
export function bandpassFilter(signal: number[], fps: number, lowHz = 0.7, highHz = 4.0): number[] {
  const once = (x: number[]) => {
    const f0 = Math.sqrt(lowHz * highHz);
    const q = f0 / (highHz - lowHz);
    const w0 = (2 * Math.PI * f0) / fps;
    const alpha = Math.sin(w0) / (2 * q);
    const a0 = 1 + alpha;
    const b0 = alpha / a0, b2 = -alpha / a0, a1 = (-2 * Math.cos(w0)) / a0, a2 = (1 - alpha) / a0;
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    return x.map((xi) => {
      const yi = b0 * xi + b2 * x2 - a1 * y1 - a2 * y2;
      x2 = x1; x1 = xi; y2 = y1; y1 = yi;
      return yi;
    });
  };
  return once(once(signal).reverse()).reverse();
}

/** Magnitude spectrum of a real signal whose length is a power of two (radix-2 FFT). */
function magnitudes(input: number[]): number[] {
  const n = input.length;
  const re = Float64Array.from(input);
  const im = new Float64Array(n);
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) [re[i], re[j]] = [re[j], re[i]];
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    for (let i = 0; i < n; i += len) {
      for (let k = 0; k < len / 2; k++) {
        const wr = Math.cos(ang * k), wi = Math.sin(ang * k);
        const a = i + k, b = i + k + len / 2;
        const tr = re[b] * wr - im[b] * wi, ti = re[b] * wi + im[b] * wr;
        re[b] = re[a] - tr; im[b] = im[a] - ti;
        re[a] += tr; im[a] += ti;
      }
    }
  }
  return Array.from({ length: n / 2 }, (_, i) => Math.hypot(re[i], im[i]));
}

/** Heart rate from the strongest spectral peak inside the plausible range. 0 if too little data. */
export function estimateBpm(filtered: number[], fps: number, minBpm = MIN_BPM, maxBpm = MAX_BPM): number {
  const n = filtered.length;
  if (n < fps * 2) return 0;
  let size = 1;
  while (size < n) size <<= 1;
  size *= 4; // zero-padding: finer frequency steps, about 1.3 BPM at 30 fps over 10 s
  const padded = new Array<number>(size).fill(0);
  for (let i = 0; i < n; i++) padded[i] = filtered[i] * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1)));
  const spectrum = magnitudes(padded);
  const resolution = fps / size;
  const margin = 6; // stay clear of the filter edges
  let best = 0, bestPower = -1;
  for (let i = 0; i < spectrum.length; i++) {
    const bpm = i * resolution * 60;
    if (bpm >= minBpm + margin && bpm <= maxBpm - margin && spectrum[i] > bestPower) {
      bestPower = spectrum[i];
      best = bpm;
    }
  }
  return best;
}

export interface RppgSample { t: number; rgb: Rgb }

/** CHROM and POS heart-rate estimates from timestamped mean-RGB samples (t in ms). */
export function analyse(samples: RppgSample[]): { chrom: number; pos: number; fps: number } | null {
  if (samples.length < 20) return null;
  const seconds = (samples[samples.length - 1].t - samples[0].t) / 1000;
  const fps = seconds > 0 ? samples.length / seconds : 0;
  if (seconds < 2 || fps < 5) return null;
  const rgb = samples.map((s) => s.rgb);
  return {
    chrom: estimateBpm(bandpassFilter(chromSignal(rgb), fps), fps),
    pos: estimateBpm(bandpassFilter(posSignal(rgb), fps), fps),
    fps,
  };
}
