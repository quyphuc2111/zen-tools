export type Mode = 'wheel' | 'race' | 'draw' | 'slot' | 'elimination';

export interface ModeOption {
  id: Mode;
  label: string;
  color: string;
}
