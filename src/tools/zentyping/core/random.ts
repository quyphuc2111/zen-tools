export function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

export function nextSeed(seed: number): number {
  return (seed * 1664525 + 1013904223) >>> 0;
}

export function seededIndex(seed: number, length: number): { seed: number; index: number } {
  const next = nextSeed(seed);
  const index = length <= 1 ? 0 : next % length;
  return { seed: next, index };
}

export function todayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
