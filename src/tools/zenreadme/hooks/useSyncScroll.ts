import { useRef, useCallback } from 'react';

export function useSyncScroll(enabled: boolean) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isSyncingLeft = useRef(false);
  const isSyncingRight = useRef(false);

  const handleEditorScroll = useCallback(() => {
    if (!enabled) return;
    if (isSyncingLeft.current) {
      isSyncingLeft.current = false;
      return;
    }
    if (editorRef.current && previewRef.current) {
      isSyncingRight.current = true;
      const editor = editorRef.current;
      const preview = previewRef.current;
      const pct = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      preview.scrollTop = pct * (preview.scrollHeight - preview.clientHeight);
    }
  }, [enabled]);

  const handlePreviewScroll = useCallback(() => {
    if (!enabled) return;
    if (isSyncingRight.current) {
      isSyncingRight.current = false;
      return;
    }
    if (editorRef.current && previewRef.current) {
      isSyncingLeft.current = true;
      const preview = previewRef.current;
      const editor = editorRef.current;
      const pct = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
      editor.scrollTop = pct * (editor.scrollHeight - editor.clientHeight);
    }
  }, [enabled]);

  return { editorRef, previewRef, handleEditorScroll, handlePreviewScroll };
}
