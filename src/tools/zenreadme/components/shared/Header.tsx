import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Eye,
  Edit3,
  Columns,
  Link as LinkIcon,
  Unlink,
  LayoutTemplate,
  Copy,
  Check,
  ListTree,
  Maximize,
  Minimize,
} from 'lucide-react';
import { ViewMode } from '../../types/editor';

interface HeaderProps {
  viewMode: ViewMode;
  syncScroll: boolean;
  fullscreen: boolean;
  copied: boolean;
  onViewModeChange: (mode: ViewMode) => void;
  onSyncScrollToggle: () => void;
  onDownload: () => void;
  onCopy: () => void;
  onInsertTOC: () => void;
  onOpenTemplates: () => void;
  onToggleFullscreen: () => void;
}

export function Header({
  viewMode,
  syncScroll,
  fullscreen,
  copied,
  onViewModeChange,
  onSyncScrollToggle,
  onDownload,
  onCopy,
  onInsertTOC,
  onOpenTemplates,
  onToggleFullscreen,
}: HeaderProps) {
  const modes: { key: ViewMode; label: string; Icon: typeof Edit3 }[] = [
    { key: 'edit', label: 'Edit', Icon: Edit3 },
    { key: 'split', label: 'Split', Icon: Columns },
    { key: 'preview', label: 'Preview', Icon: Eye },
  ];

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-[#111]/10 bg-white/50 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {!fullscreen && (
          <Link
            to="/"
            className="w-9 h-9 rounded-full border border-[#111]/20 flex items-center justify-center hover:bg-[#111] hover:text-[#F4F0EA] transition-colors shrink-0"
          >
            <ArrowLeft size={18} />
          </Link>
        )}
        <h1 className="text-[14px] font-bold uppercase tracking-[0.15em]">ZENREADME</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* View Mode Toggle */}
        <div className="flex bg-white border border-[#111]/20 rounded-full p-0.5">
          {modes.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => onViewModeChange(key)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                viewMode === key
                  ? 'bg-[#111] text-[#F4F0EA]'
                  : 'hover:bg-[#111]/5'
              }`}
            >
              <Icon size={13} className="md:hidden" />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Sync Scroll */}
        {viewMode === 'split' && (
          <button
            onClick={onSyncScrollToggle}
            className={`p-2 rounded-full text-[10px] font-bold transition-colors border ${
              syncScroll
                ? 'bg-[#111]/5 border-[#111]/20 text-[#111]'
                : 'bg-transparent border-[#111]/10 text-[#111]/40 hover:bg-[#111]/5'
            }`}
            title={syncScroll ? 'Disable Sync Scroll' : 'Enable Sync Scroll'}
          >
            {syncScroll ? <LinkIcon size={14} /> : <Unlink size={14} />}
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-6 bg-[#111]/10 hidden md:block" />

        {/* Templates */}
        <button
          onClick={onOpenTemplates}
          className="p-2 rounded-full border border-[#111]/10 hover:bg-[#111]/5 text-[#111]/60 hover:text-[#111] transition-colors"
          title="Templates"
        >
          <LayoutTemplate size={15} />
        </button>

        {/* Insert TOC */}
        <button
          onClick={onInsertTOC}
          className="p-2 rounded-full border border-[#111]/10 hover:bg-[#111]/5 text-[#111]/60 hover:text-[#111] transition-colors"
          title="Insert Table of Contents"
        >
          <ListTree size={15} />
        </button>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-full border border-[#111]/10 hover:bg-[#111]/5 text-[#111]/60 hover:text-[#111] transition-colors"
          title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {fullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#111]/10 hidden md:block" />

        {/* Copy */}
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#111]/10 hover:bg-[#111]/5 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors"
          title="Copy to Clipboard"
        >
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>

        {/* Download */}
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
