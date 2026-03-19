import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Copy, Check } from 'lucide-react';

interface HeaderProps {
  copied: boolean;
  onDownload: () => void;
  onCopy: () => void;
}

export function Header({ copied, onDownload, onCopy }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-[#111]/10 bg-white/50 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="w-9 h-9 rounded-full border border-[#111]/20 flex items-center justify-center hover:bg-[#111] hover:text-[#F4F0EA] transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-[14px] font-bold uppercase tracking-[0.15em]">ZENMOCK</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#111]/10 hover:bg-[#111]/5 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors"
          title="Copy to Clipboard"
        >
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 bg-[#111] text-[#F4F0EA] px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] hover:scale-105 transition-transform"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Download</span>
        </button>
      </div>
    </header>
  );
}
