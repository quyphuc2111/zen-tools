import { useEffect, RefObject } from 'react';

interface ShortcutMap {
  [combo: string]: () => void;
}

export function useKeyboardShortcuts(
  editorRef: RefObject<HTMLTextAreaElement | null>,
  shortcuts: ShortcutMap,
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (!meta) return;

      const key = e.key.toLowerCase();
      const combo = `mod+${key}`;

      if (shortcuts[combo]) {
        e.preventDefault();
        shortcuts[combo]();
      }
    };

    const el = editorRef.current;
    if (el) {
      el.addEventListener('keydown', handler);
      return () => el.removeEventListener('keydown', handler);
    }
  }, [editorRef, shortcuts]);
}
