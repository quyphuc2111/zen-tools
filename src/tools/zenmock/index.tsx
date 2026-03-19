import { useState, useRef, useCallback } from 'react';
import { toPng, toJpeg, toBlob, toCanvas } from 'html-to-image';
import { Header } from './components/shared/Header';
import { Sidebar } from './components/sidebar/Sidebar';
import { MockupCanvas } from './components/canvas/MockupCanvas';
import { MockupConfig } from './types/mockup';

const DEFAULT_CONFIG: MockupConfig = {
  device: 'iphone-15',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundType: 'gradient',
  padding: 64,
  shadow: 5,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
};

export function ZenMock() {
  const [config, setConfig] = useState<MockupConfig>(DEFAULT_CONFIG);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfigChange = useCallback((patch: Partial<MockupConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleImageFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        handleImageFile(file);
      }
    },
    [handleImageFile],
  );

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setImageUrl(null);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const options = { cacheBust: true, pixelRatio: 2, style: { transform: 'scale(1)' } };
      const dataUrl = await toPng(canvasRef.current, options);
      const link = document.createElement('a');
      link.download = 'zenmock.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!canvasRef.current) return;
    try {
      const blob = await toBlob(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        style: { transform: 'scale(1)' },
      });
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Copy failed', err);
    }
  }, []);

  return (
    <div className="h-screen bg-[#F4F0EA] text-[#111] font-sans flex flex-col selection:bg-[#111] selection:text-[#F4F0EA]">
      <Header copied={copied} onDownload={handleDownload} onCopy={handleCopy} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          config={config}
          hasImage={!!imageUrl}
          onConfigChange={handleConfigChange}
          onUploadClick={handleUploadClick}
          onReset={handleReset}
        />

        <main className="flex-1 flex items-center justify-center overflow-auto p-8 bg-[#eae6e0]">
          <MockupCanvas
            ref={canvasRef}
            config={config}
            imageUrl={imageUrl}
            onImageDrop={handleImageFile}
          />
        </main>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(17,17,17,0.12); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(17,17,17,0.25); }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #111;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

export default ZenMock;
