import { useState, useMemo, useCallback } from 'react';
import { Header } from './components/shared/Header';
import { EditorPane } from './components/editor/EditorPane';
import { PreviewPane } from './components/editor/PreviewPane';
import { StatusBar } from './components/shared/StatusBar';
import { TemplateDrawer } from './components/shared/TemplateDrawer';
import { useSyncScroll } from './hooks/useSyncScroll';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { DEFAULT_MARKDOWN } from './data/defaultContent';
import { computeStats, generateTOC, applyInsert, TOOLBAR_ACTIONS } from './core/markdown';
import { ViewMode } from './types/editor';

export function ZenReadme() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [syncScroll, setSyncScroll] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);

  const { editorRef, previewRef, handleEditorScroll, handlePreviewScroll } =
    useSyncScroll(syncScroll && viewMode === 'split');

  const stats = useMemo(() => computeStats(markdown), [markdown]);

  const handleToolbarAction = useCallback(
    (actionId: string) => {
      const action = TOOLBAR_ACTIONS[actionId];
      if (!action || !editorRef.current) return;
      const newValue = applyInsert(editorRef.current, action);
      setMarkdown(newValue);
    },
    [editorRef],
  );

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdown]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = markdown;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [markdown]);

  const handleInsertTOC = useCallback(() => {
    const toc = generateTOC(markdown);
    if (!toc) return;
    // Insert after the first heading
    const firstHeadingEnd = markdown.indexOf('\n');
    if (firstHeadingEnd === -1) {
      setMarkdown(markdown + '\n\n' + toc);
    } else {
      setMarkdown(
        markdown.substring(0, firstHeadingEnd + 1) +
          '\n' +
          toc +
          '\n' +
          markdown.substring(firstHeadingEnd + 1),
      );
    }
  }, [markdown]);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setFullscreen(false);
    }
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts(editorRef, {
    'mod+b': () => handleToolbarAction('bold'),
    'mod+i': () => handleToolbarAction('italic'),
    'mod+k': () => handleToolbarAction('link'),
    'mod+e': () => handleToolbarAction('code'),
    'mod+s': (e?: Event) => {
      e?.preventDefault?.();
      handleDownload();
    },
  } as any);

  return (
    <div className="h-screen bg-[#F4F0EA] text-[#111] font-sans flex flex-col selection:bg-[#111] selection:text-[#F4F0EA]">
      <Header
        viewMode={viewMode}
        syncScroll={syncScroll}
        fullscreen={fullscreen}
        copied={copied}
        onViewModeChange={setViewMode}
        onSyncScrollToggle={() => setSyncScroll((v) => !v)}
        onDownload={handleDownload}
        onCopy={handleCopy}
        onInsertTOC={handleInsertTOC}
        onOpenTemplates={() => setTemplateOpen(true)}
        onToggleFullscreen={handleToggleFullscreen}
      />

      <main className="flex-1 flex overflow-hidden relative">
        <EditorPane
          editorRef={editorRef}
          markdown={markdown}
          onChange={setMarkdown}
          onScroll={handleEditorScroll}
          onToolbarAction={handleToolbarAction}
          visible={viewMode !== 'preview'}
          fullWidth={viewMode === 'edit'}
        />
        <PreviewPane
          previewRef={previewRef}
          markdown={markdown}
          onScroll={handlePreviewScroll}
          visible={viewMode !== 'edit'}
          fullWidth={viewMode === 'preview'}
        />
      </main>

      <StatusBar stats={stats} />

      <TemplateDrawer
        open={templateOpen}
        onClose={() => setTemplateOpen(false)}
        onSelect={setMarkdown}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(17,17,17,0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(17,17,17,0.3); }
      `}</style>
    </div>
  );
}

export default ZenReadme;
