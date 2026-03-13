import React, { useState, useRef } from 'react';
import { toPng, toJpeg, toSvg, toBlob, toCanvas } from 'html-to-image';
import { Sidebar } from './Sidebar';
import { CodeCanvas } from './CodeCanvas';
import { ExportModal, ExportFormat, ExportScale } from './ExportModal';

const DEFAULT_CODE = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the first 10 numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`;

export function ZenShot() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState('javascript');
  const [background, setBackground] = useState('bg-gradient-to-br from-purple-500 to-indigo-500');
  const [paddingX, setPaddingX] = useState(32);
  const [paddingY, setPaddingY] = useState(32);
  const [darkMode, setDarkMode] = useState(true);
  const [windowStyle, setWindowStyle] = useState('macOS');
  const [fontFamily, setFontFamily] = useState('JetBrains Mono');
  const [fontSize, setFontSize] = useState(15);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [title, setTitle] = useState('');
  const [watermark, setWatermark] = useState('');
  
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (format: ExportFormat, scale: ExportScale) => {
    if (!canvasRef.current) return;
    try {
      const options = {
        cacheBust: true,
        pixelRatio: scale,
        style: { transform: 'scale(1)' }
      };

      let dataUrl = '';
      const extension = format.toLowerCase();

      if (format === 'PNG') dataUrl = await toPng(canvasRef.current, options);
      else if (format === 'JPEG') dataUrl = await toJpeg(canvasRef.current, { ...options, quality: 0.95 });
      else if (format === 'SVG') dataUrl = await toSvg(canvasRef.current, options);
      else if (format === 'WEBP') {
        const canvas = await toCanvas(canvasRef.current, options);
        dataUrl = canvas.toDataURL('image/webp', 0.95);
      }

      const link = document.createElement('a');
      link.download = `zenshot.${extension}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    }
  };

  const handleCopy = async (scale: ExportScale) => {
    if (!canvasRef.current) return;
    try {
      const blob = await toBlob(canvasRef.current, {
        cacheBust: true,
        pixelRatio: scale,
        style: { transform: 'scale(1)' }
      });
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
      }
    } catch (err) {
      console.error('Failed to copy image', err);
      alert('Failed to copy to clipboard. Your browser might not support this feature.');
    }
  };

  const handleQuickCopy = async () => {
    setIsCopying(true);
    await handleCopy(2); // Default 2x scale for quick copy
    setIsCopying(false);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar
        language={language} setLanguage={setLanguage}
        background={background} setBackground={setBackground}
        paddingX={paddingX} setPaddingX={setPaddingX}
        paddingY={paddingY} setPaddingY={setPaddingY}
        darkMode={darkMode} setDarkMode={setDarkMode}
        windowStyle={windowStyle} setWindowStyle={setWindowStyle}
        fontFamily={fontFamily} setFontFamily={setFontFamily}
        fontSize={fontSize} setFontSize={setFontSize}
        lineHeight={lineHeight} setLineHeight={setLineHeight}
        title={title} setTitle={setTitle}
        watermark={watermark} setWatermark={setWatermark}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onCopyQuick={handleQuickCopy}
        isCopying={isCopying}
        copied={copied}
      />
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-auto">
        <CodeCanvas
          ref={canvasRef}
          code={code} onChange={setCode}
          language={language}
          background={background}
          paddingX={paddingX} paddingY={paddingY}
          darkMode={darkMode}
          windowStyle={windowStyle}
          fontFamily={fontFamily}
          fontSize={fontSize}
          lineHeight={lineHeight}
          title={title}
          watermark={watermark}
        />
      </main>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onDownload={handleDownload}
        onCopy={handleCopy}
      />
    </div>
  );
}
