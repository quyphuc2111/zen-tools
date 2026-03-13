export type HitType = 'correct' | 'wrong' | 'neutral';

export class KeySoundPlayer {
  private ctx: AudioContext | null = null;

  private async ensureContext() {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      this.ctx = new window.AudioContext();
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    return this.ctx;
  }

  async play(type: HitType) {
    const ctx = await this.ensureContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;
    const frequency = type === 'correct' ? 620 : type === 'wrong' ? 180 : 420;
    const duration = type === 'wrong' ? 0.06 : 0.04;

    oscillator.type = type === 'wrong' ? 'sawtooth' : 'triangle';
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.01);
  }
}
