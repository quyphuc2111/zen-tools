import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Download, Monitor, Moon, Sun, Type, Layout, Palette, Loader2, Type as TypeIcon, Image as ImageIcon, AlignLeft, Copy, Check, ArrowLeft } from 'lucide-react';

export interface SidebarProps {
  language: string; setLanguage: (lang: string) => void;
  background: string; setBackground: (bg: string) => void;
  paddingX: number; setPaddingX: (pad: number) => void;
  paddingY: number; setPaddingY: (pad: number) => void;
  darkMode: boolean; setDarkMode: (dark: boolean) => void;
  windowStyle: string; setWindowStyle: (style: string) => void;
  fontFamily: string; setFontFamily: (font: string) => void;
  fontSize: number; setFontSize: (size: number) => void;
  lineHeight: number; setLineHeight: (height: number) => void;
  title: string; setTitle: (title: string) => void;
  watermark: string; setWatermark: (wm: string) => void;
  onOpenExportModal: () => void;
  onCopyQuick: () => void;
  isCopying: boolean;
  copied: boolean;
}

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'css', 'jsx', 'tsx', 'sql', 'rust', 'go', 'java', 'c', 'cpp', 'csharp', 'ruby', 'swift', 'kotlin', 'bash', 'json', 'markdown', 'yaml'
];

const BACKGROUNDS = [
  "bg-gradient-to-br from-purple-500 to-indigo-500",
  "bg-gradient-to-br from-pink-500 to-orange-400",
  "bg-gradient-to-br from-green-400 to-cyan-500",
  "bg-gradient-to-br from-blue-400 to-emerald-400",
  "bg-gradient-to-br from-gray-800 to-gray-900",
  "bg-gradient-to-br from-rose-400 to-red-500",
  "bg-[#1e1e1e]",
  "bg-white"
];

const FONTS = ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Inconsolata', 'Consolas'];
const WINDOW_STYLES = [{ id: 'macOS', label: 'macOS' }, { id: 'windows', label: 'Windows' }, { id: 'none', label: 'None' }];

export const Sidebar: React.FC<SidebarProps> = ({
  language, setLanguage,
  background, setBackground,
  paddingX, setPaddingX,
  paddingY, setPaddingY,
  darkMode, setDarkMode,
  windowStyle, setWindowStyle,
  fontFamily, setFontFamily,
  fontSize, setFontSize,
  lineHeight, setLineHeight,
  title, setTitle,
  watermark, setWatermark,
  onOpenExportModal, onCopyQuick, isCopying, copied
}) => {
  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tools
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Monitor className="w-6 h-6 text-indigo-600" />
          ZenShot
        </h1>
        <p className="text-sm text-gray-500 mt-1">Create beautiful code snippets</p>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Canvas Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Canvas</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Palette className="w-4 h-4" /> Background
            </label>
            <div className="grid grid-cols-4 gap-2">
              {BACKGROUNDS.map((bg, i) => (
                <button
                  key={i}
                  onClick={() => setBackground(bg)}
                  className={cn(
                    "w-full aspect-square rounded-md border-2 transition-all",
                    bg,
                    background === bg ? "border-indigo-600 scale-110 shadow-md" : "border-transparent hover:scale-105"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Layout className="w-4 h-4" /> Padding X
              </label>
              <span className="text-xs text-gray-500">{paddingX}px</span>
            </div>
            <input type="range" min="16" max="128" step="8" value={paddingX} onChange={(e) => setPaddingX(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Layout className="w-4 h-4" /> Padding Y
              </label>
              <span className="text-xs text-gray-500">{paddingY}px</span>
            </div>
            <input type="range" min="16" max="128" step="8" value={paddingY} onChange={(e) => setPaddingY(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          </div>
        </div>

        {/* Editor Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Editor</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Type className="w-4 h-4" /> Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <TypeIcon className="w-4 h-4" /> Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              {FONTS.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <TypeIcon className="w-4 h-4" /> Font Size
              </label>
              <span className="text-xs text-gray-500">{fontSize}px</span>
            </div>
            <input type="range" min="12" max="32" step="1" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <AlignLeft className="w-4 h-4" /> Line Height
              </label>
              <span className="text-xs text-gray-500">{lineHeight}</span>
            </div>
            <input type="range" min="1" max="2.5" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              Theme
            </label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setDarkMode(false)}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  !darkMode ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDarkMode(true)}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  darkMode ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Window Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Window</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Monitor className="w-4 h-4" /> Style
            </label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {WINDOW_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setWindowStyle(style.id)}
                  className={cn(
                    "flex-1 py-1.5 text-xs font-medium rounded-md transition-colors",
                    windowStyle === style.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {windowStyle !== 'none' && (
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <TypeIcon className="w-4 h-4" /> Window Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. main.tsx"
                className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          )}
        </div>

        {/* Annotations Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Annotations</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <ImageIcon className="w-4 h-4" /> Watermark
            </label>
            <input
              type="text"
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
              placeholder="e.g. @myusername"
              className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0 z-10 space-y-3 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <button
          onClick={onOpenExportModal}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Download className="w-4 h-4" />
          Export...
        </button>
        <button
          onClick={onCopyQuick}
          disabled={isCopying || copied}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isCopying ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  );
};
