import { forwardRef, DragEvent, useState } from 'react';
import { DeviceFrameComponent } from './DeviceFrame';
import { MockupConfig } from '../../types/mockup';
import { getDevice } from '../../core/devices';

interface MockupCanvasProps {
  config: MockupConfig;
  imageUrl: string | null;
  onImageDrop: (file: File) => void;
}

export const MockupCanvas = forwardRef<HTMLDivElement, MockupCanvasProps>(
  ({ config, imageUrl, onImageDrop }, ref) => {
    const [dragOver, setDragOver] = useState(false);
    const device = getDevice(config.device);

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageDrop(file);
      }
    };

    const bgStyle = config.backgroundType === 'solid'
      ? { backgroundColor: config.background }
      : { background: config.background };

    return (
      <div
        ref={ref}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative flex items-center justify-center transition-all duration-300"
        style={{
          ...bgStyle,
          padding: config.padding,
          minWidth: 300,
          minHeight: 300,
        }}
      >
        {dragOver && (
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-30 flex items-center justify-center rounded-xl border-2 border-dashed border-white/50">
            <p className="text-white text-[14px] font-bold uppercase tracking-[0.15em] drop-shadow-lg">
              Drop your screenshot
            </p>
          </div>
        )}

        <DeviceFrameComponent
          device={device}
          imageUrl={imageUrl}
          shadow={config.shadow}
          rotateX={config.rotateX}
          rotateY={config.rotateY}
          scale={config.scale}
        />
      </div>
    );
  },
);

MockupCanvas.displayName = 'MockupCanvas';
