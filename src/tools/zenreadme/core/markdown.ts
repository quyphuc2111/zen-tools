import { InsertAction, MarkdownStats } from '../types/editor';

export function computeStats(text: string): MarkdownStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = text.length;
  const lines = text.split('\n').length;
  const headings = (text.match(/^#{1,6}\s/gm) || []).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  const readingTime = minutes <= 1 ? '< 1 min' : `${minutes} min`;
  return { words, characters, lines, readingTime, headings };
}

export function generateTOC(text: string): string {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const entries: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(text)) !== null) {
    const level = match[1].length;
    const title = match[2].replace(/[*_`~]/g, '');
    const anchor = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    const indent = '  '.repeat(level - 2);
    entries.push(`${indent}- [${title}](#${anchor})`);
  }
  return entries.length > 0
    ? '## Table of Contents\n\n' + entries.join('\n') + '\n'
    : '';
}

export function applyInsert(
  textarea: HTMLTextAreaElement,
  action: InsertAction,
): string {
  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.substring(selectionStart, selectionEnd);
  const text = selected || action.placeholder;
  const insertion = `${action.before}${text}${action.after}`;
  const newValue =
    value.substring(0, selectionStart) +
    insertion +
    value.substring(selectionEnd);

  // Schedule cursor repositioning
  requestAnimationFrame(() => {
    textarea.focus();
    const cursorPos = selectionStart + action.before.length + text.length;
    textarea.setSelectionRange(cursorPos, cursorPos);
  });

  return newValue;
}

export const TOOLBAR_ACTIONS: Record<string, InsertAction> = {
  bold: { before: '**', after: '**', placeholder: 'bold text' },
  italic: { before: '_', after: '_', placeholder: 'italic text' },
  strikethrough: { before: '~~', after: '~~', placeholder: 'strikethrough' },
  h1: { before: '# ', after: '', placeholder: 'Heading 1' },
  h2: { before: '## ', after: '', placeholder: 'Heading 2' },
  h3: { before: '### ', after: '', placeholder: 'Heading 3' },
  link: { before: '[', after: '](url)', placeholder: 'link text' },
  image: { before: '![', after: '](url)', placeholder: 'alt text' },
  code: { before: '`', after: '`', placeholder: 'code' },
  codeblock: { before: '```\n', after: '\n```', placeholder: 'code here' },
  quote: { before: '> ', after: '', placeholder: 'quote' },
  ul: { before: '- ', after: '', placeholder: 'list item' },
  ol: { before: '1. ', after: '', placeholder: 'list item' },
  task: { before: '- [ ] ', after: '', placeholder: 'task' },
  hr: { before: '\n---\n', after: '', placeholder: '' },
  table: {
    before: '',
    after: '',
    placeholder:
      '| Column 1 | Column 2 | Column 3 |\n| :--- | :---: | ---: |\n| Cell 1 | Cell 2 | Cell 3 |',
  },
};
