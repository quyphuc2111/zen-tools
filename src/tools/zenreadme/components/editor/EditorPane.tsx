import { RefObject } from 'react';
import { Toolbar } from '../shared/Toolbar';

interface EditorPaneProps {
  editorRef: RefObject<HTMLTextAreaElement | null>;
  markdown: string;
  onChange: (value: string) => void;
  onScroll: () => void;
  onToolbarAction: (actionId: string) => void;
  visible: boolean;
  fullWidth: boolean;
}

export function EditorPane({
  editorRef,
  markdown,
  onChange,
  onScroll,
  onToolbarAction,
  visible,
  fullWidth,
}: EditorPaneProps) {
  if (!visible) return null;

  return (
    <div
      className={`flex flex-col border-r border-[#111]/10 bg-white transition-all duration-300 ${
        fullWidth ? 'w-full' : 'w-1/2'
      }`}
    >
      <Toolbar onAction={onToolbarAction} />
      <textarea
        ref={editorRef}
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        onScroll={onScroll}
        className="flex-1 w-full p-6 bg-transparent resize-none outline-none font-mono text-[14px] leading-relaxed text-[#111] custom-scrollbar"
        placeholder="Type your markdown here..."
        spellCheck={false}
      />
    </div>
  );
}
