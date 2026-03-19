import { DeviceFrame as DeviceFrameType } from '../../types/mockup';

interface DeviceFrameProps {
  device: DeviceFrameType;
  imageUrl: string | null;
  shadow: number;
  rotateX: number;
  rotateY: number;
  scale: number;
}

function DynamicIsland() {
  return (
    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-20 w-[120px] h-[34px] bg-black rounded-full" />
  );
}

function HomeBar() {
  return (
    <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-20 w-[134px] h-[5px] bg-black/30 rounded-full" />
  );
}

function MacNotch() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[200px] h-[24px] bg-[#1a1a1a] rounded-b-xl flex items-center justify-center">
      <div className="w-[8px] h-[8px] rounded-full bg-[#333]" />
    </div>
  );
}

function BrowserBar() {
  return (
    <div className="flex items-center gap-2 px-4 h-[40px] bg-[#e8e8e8] border-b border-black/5">
      <div className="flex gap-[6px]">
        <div className="w-[12px] h-[12px] rounded-full bg-[#ff5f57]" />
        <div className="w-[12px] h-[12px] rounded-full bg-[#febc2e]" />
        <div className="w-[12px] h-[12px] rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 mx-4">
        <div className="h-[24px] bg-white rounded-md border border-black/10 flex items-center px-3">
          <span className="text-[10px] text-black/30 font-mono">https://example.com</span>
        </div>
      </div>
    </div>
  );
}

function UploadPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-black/20">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.15em]">
        Drop image here
      </p>
    </div>
  );
}

export function DeviceFrameComponent({
  device,
  imageUrl,
  shadow,
  rotateX,
  rotateY,
  scale,
}: DeviceFrameProps) {
  const isBrowser = device.id === 'browser';
  const isNone = device.id === 'none';
  const isMacbook = device.id === 'macbook';

  // Calculate display size (scale down large devices to fit viewport)
  const maxW = 500;
  const totalW = device.screenW + device.bezelSide * 2;
  const totalH = device.screenH + device.bezelTop + device.bezelBottom;
  const ratio = Math.min(1, maxW / totalW);
  const displayW = totalW * ratio;
  const displayH = totalH * ratio;

  const shadowValue = shadow > 0
    ? `0 ${shadow * 2}px ${shadow * 4}px rgba(0,0,0,${Math.min(0.4, shadow * 0.04)}), 0 ${shadow}px ${shadow * 2}px rgba(0,0,0,${Math.min(0.2, shadow * 0.02)})`
    : 'none';

  const transform = [
    `perspective(1200px)`,
    `rotateX(${rotateX}deg)`,
    `rotateY(${rotateY}deg)`,
    `scale(${scale})`,
  ].join(' ');

  if (isNone) {
    return (
      <div
        style={{
          width: imageUrl ? undefined : 400,
          height: imageUrl ? undefined : 300,
          maxWidth: maxW,
          borderRadius: device.borderRadius * ratio,
          boxShadow: shadowValue,
          transform,
          overflow: 'hidden',
        }}
        className="relative bg-white"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Screenshot" className="block w-full h-auto" style={{ borderRadius: device.borderRadius * ratio }} />
        ) : (
          <div style={{ width: 400, height: 300 }} className="relative">
            <UploadPlaceholder />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        width: displayW,
        height: displayH,
        borderRadius: device.borderRadius * ratio,
        boxShadow: shadowValue,
        transform,
        background: isBrowser ? '#e8e8e8' : isMacbook ? '#1a1a1a' : '#111',
      }}
      className="relative overflow-hidden flex flex-col"
    >
      {/* Browser bar */}
      {isBrowser && <BrowserBar />}

      {/* Mac notch */}
      {isMacbook && device.hasNotch && <MacNotch />}

      {/* Dynamic Island */}
      {device.hasDynamicIsland && (
        <div style={{ position: 'absolute', top: device.bezelTop * ratio * 0.2, left: 0, right: 0, zIndex: 20 }}>
          <DynamicIsland />
        </div>
      )}

      {/* Screen area */}
      <div
        className="relative flex-1 overflow-hidden bg-white"
        style={{
          margin: isBrowser
            ? 0
            : `${device.bezelTop * ratio}px ${device.bezelSide * ratio}px ${device.bezelBottom * ratio}px`,
          borderRadius: device.screenRadius * ratio,
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Screenshot"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <UploadPlaceholder />
        )}
      </div>

      {/* Home bar */}
      {device.hasHomeBar && (
        <div style={{ position: 'absolute', bottom: device.bezelBottom * ratio * 0.3, left: 0, right: 0, zIndex: 20 }}>
          <HomeBar />
        </div>
      )}
    </div>
  );
}
