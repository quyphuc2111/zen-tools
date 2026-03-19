import {
  Smartphone,
  Tablet,
  Laptop,
  Globe,
  Square,
  Upload,
  RotateCcw,
} from 'lucide-react';
import { DEVICES, BACKGROUNDS } from '../../core/devices';
import { MockupConfig, DeviceId } from '../../types/mockup';

interface SidebarProps {
  config: MockupConfig;
  hasImage: boolean;
  onConfigChange: (patch: Partial<MockupConfig>) => void;
  onUploadClick: () => void;
  onReset: () => void;
}

const CATEGORY_ICONS: Record<string, typeof Smartphone> = {
  Phone: Smartphone,
  Tablet: Tablet,
  Laptop: Laptop,
  Web: Globe,
  Other: Square,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111]/40 mb-2">
      {children}
    </p>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[11px] text-[#111]/60">{label}</span>
        <span className="text-[11px] font-mono text-[#111]/40">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[#111]/10 rounded-full appearance-none cursor-pointer accent-[#111]"
      />
    </div>
  );
}

export function Sidebar({
  config,
  hasImage,
  onConfigChange,
  onUploadClick,
  onReset,
}: SidebarProps) {
  return (
    <aside className="w-[280px] shrink-0 border-r border-[#111]/10 bg-white overflow-y-auto custom-scrollbar">
      <div className="p-5 space-y-6">
        {/* Upload */}
        <div>
          <SectionLabel>Screenshot</SectionLabel>
          <button
            onClick={onUploadClick}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[#111]/15 hover:border-[#111]/30 hover:bg-[#F4F0EA]/50 transition-colors text-[12px] font-bold uppercase tracking-[0.1em] text-[#111]/50 hover:text-[#111]"
          >
            <Upload size={16} />
            {hasImage ? 'Change Image' : 'Upload Image'}
          </button>
        </div>

        {/* Device */}
        <div>
          <SectionLabel>Device</SectionLabel>
          <div className="grid grid-cols-2 gap-1.5">
            {DEVICES.map((d) => {
              const Icon = CATEGORY_ICONS[d.category] || Square;
              return (
                <button
                  key={d.id}
                  onClick={() => onConfigChange({ device: d.id as DeviceId })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold transition-colors ${
                    config.device === d.id
                      ? 'bg-[#111] text-[#F4F0EA]'
                      : 'bg-[#F4F0EA]/50 text-[#111]/60 hover:bg-[#F4F0EA]'
                  }`}
                >
                  <Icon size={13} />
                  <span className="truncate">{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background */}
        <div>
          <SectionLabel>Background</SectionLabel>
          <div className="grid grid-cols-5 gap-2">
            {BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                onClick={() =>
                  onConfigChange({
                    background: bg.value,
                    backgroundType: bg.type,
                  })
                }
                title={bg.label}
                className={`w-full aspect-square rounded-lg border-2 transition-transform hover:scale-110 ${
                  config.background === bg.value
                    ? 'border-[#111] scale-110'
                    : 'border-transparent'
                }`}
                style={{
                  background: bg.type === 'solid' ? bg.value : bg.value,
                }}
              />
            ))}
          </div>
        </div>

        {/* Adjustments */}
        <div className="space-y-4">
          <SectionLabel>Adjustments</SectionLabel>
          <Slider
            label="Padding"
            value={config.padding}
            min={0}
            max={200}
            step={8}
            onChange={(v) => onConfigChange({ padding: v })}
          />
          <Slider
            label="Shadow"
            value={config.shadow}
            min={0}
            max={10}
            step={1}
            onChange={(v) => onConfigChange({ shadow: v })}
          />
          <Slider
            label="Scale"
            value={config.scale}
            min={0.5}
            max={1.5}
            step={0.05}
            onChange={(v) => onConfigChange({ scale: v })}
          />
        </div>

        {/* 3D Rotation */}
        <div className="space-y-4">
          <SectionLabel>3D Perspective</SectionLabel>
          <Slider
            label="Rotate X"
            value={config.rotateX}
            min={-30}
            max={30}
            step={1}
            onChange={(v) => onConfigChange({ rotateX: v })}
          />
          <Slider
            label="Rotate Y"
            value={config.rotateY}
            min={-30}
            max={30}
            step={1}
            onChange={(v) => onConfigChange({ rotateY: v })}
          />
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#111]/10 hover:bg-[#F4F0EA]/50 transition-colors text-[11px] font-bold uppercase tracking-[0.1em] text-[#111]/40 hover:text-[#111]"
        >
          <RotateCcw size={14} />
          Reset All
        </button>
      </div>
    </aside>
  );
}
