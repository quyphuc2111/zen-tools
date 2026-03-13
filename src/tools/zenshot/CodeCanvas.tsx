import React, { forwardRef } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import { Minus, Square, X } from 'lucide-react';

// Import languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';

// Import a base theme
import 'prismjs/themes/prism-tomorrow.css';

import { cn } from '../../lib/utils';

export interface CodeCanvasProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  background: string;
  paddingX: number;
  paddingY: number;
  darkMode: boolean;
  windowStyle: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  title: string;
  watermark: string;
}

export const CodeCanvas = forwardRef<HTMLDivElement, CodeCanvasProps>(
  ({ code, onChange, language, background, paddingX, paddingY, darkMode, windowStyle, fontFamily, fontSize, lineHeight, title, watermark }, ref) => {
    const highlight = (code: string) => {
      const grammar = Prism.languages[language] || Prism.languages.javascript;
      return Prism.highlight(code, grammar, language);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center transition-all duration-300 ease-in-out",
          background
        )}
        style={{ padding: `${paddingY}px ${paddingX}px` }}
      >
        <div
          className={cn(
            "relative w-full min-w-[400px] max-w-3xl rounded-xl shadow-2xl overflow-hidden border transition-colors duration-300 z-10",
            darkMode 
              ? "bg-[#1d1f21] border-white/10 shadow-black/50" 
              : "bg-white border-black/10 shadow-black/20"
          )}
        >
          {/* Window Controls */}
          {windowStyle !== 'none' && (
            <div className="flex items-center px-4 py-3 relative h-10">
              {windowStyle === 'macOS' && (
                <div className="flex items-center space-x-2 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
              )}
              {windowStyle === 'windows' && title && (
                <div className="text-xs font-medium text-gray-400 font-sans absolute left-4 truncate max-w-[60%]">
                  {title}
                </div>
              )}
              {windowStyle === 'macOS' && title && (
                <div className="w-full text-center text-xs font-medium text-gray-400 font-sans px-16 truncate">
                  {title}
                </div>
              )}
              {windowStyle === 'windows' && (
                <div className="flex items-center space-x-3 absolute right-4 text-gray-400">
                  <Minus className="w-3.5 h-3.5" />
                  <Square className="w-3 h-3" />
                  <X className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          )}

          {/* Editor */}
          <div className={cn("px-4 pb-4", windowStyle === 'none' && "pt-4")}>
            <Editor
              value={code}
              onValueChange={onChange}
              highlight={highlight}
              padding={10}
              className={cn(
                "font-mono outline-none min-h-[100px]",
                darkMode ? "text-gray-100" : "text-gray-800"
              )}
              style={{
                fontFamily: `"${fontFamily}", monospace`,
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
              }}
              textareaClassName="focus:outline-none"
            />
          </div>
        </div>

        {/* Watermark */}
        {watermark && (
          <div className="absolute bottom-4 right-6 text-white/90 font-sans text-sm font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] z-20">
            {watermark}
          </div>
        )}
      </div>
    );
  }
);

CodeCanvas.displayName = 'CodeCanvas';
