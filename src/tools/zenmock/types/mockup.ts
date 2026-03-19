export type DeviceId =
  | 'iphone-15'
  | 'iphone-se'
  | 'ipad'
  | 'macbook'
  | 'pixel'
  | 'browser'
  | 'none';

export interface DeviceFrame {
  id: DeviceId;
  name: string;
  category: string;
  screenW: number;
  screenH: number;
  bezelTop: number;
  bezelBottom: number;
  bezelSide: number;
  borderRadius: number;
  screenRadius: number;
  hasNotch: boolean;
  hasDynamicIsland: boolean;
  hasHomeBar: boolean;
}

export type BackgroundType = 'gradient' | 'solid' | 'mesh';

export interface MockupConfig {
  device: DeviceId;
  background: string;
  backgroundType: BackgroundType;
  padding: number;
  shadow: number;
  rotateX: number;
  rotateY: number;
  scale: number;
}

export interface ExportConfig {
  format: 'PNG' | 'JPEG' | 'WEBP';
  scale: 1 | 2 | 3 | 4;
}
