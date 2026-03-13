import React, { useState } from 'react';
import { X, Download, Copy, Loader2, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ExportFormat = 'PNG' | 'SVG' | 'JPEG' | 'WEBP';
export type ExportScale = 1 | 2 | 3 | 4;

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (format: ExportFormat, scale: ExportScale) => Promise<void>;
  onCopy: (scale: ExportScale) => Promise<void>;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onDownload, onCopy }) => {
  const [format, setFormat] = useState<ExportFormat>('PNG');
  const [scale, setScale] = useState<ExportScale>(2);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownload(format, scale);
    setIsDownloading(false);
    onClose();
  };

  const handleCopy = async () => {
    setIsCopying(true);
    await onCopy(scale);
    setIsCopying(false);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#1c1c1e] rounded-2xl shadow-2xl border border-white/10 overflow-hidden text-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Export Image</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Format */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-400">Format</label>
            <div className="flex bg-[#2c2c2e] rounded-lg p-1">
              {['PNG', 'SVG', 'JPEG', 'WEBP'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f as ExportFormat)}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                    format === f ? "bg-[#4a4a6a] text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Scale */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-400">Scale</label>
            <div className="flex bg-[#2c2c2e] rounded-lg p-1">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setScale(s as ExportScale)}
                  className={cn(
                    "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                    scale === s ? "bg-[#4a4a6a] text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
                  )}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 space-y-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading || isCopying}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white py-3.5 px-4 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1c1c1e] disabled:opacity-50"
            >
              {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              Download Image
            </button>
            
            <button
              onClick={handleCopy}
              disabled={isDownloading || isCopying || copied}
              className="w-full flex items-center justify-center gap-2 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white py-3.5 px-4 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#1c1c1e] disabled:opacity-50"
            >
              {isCopying ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              {copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
