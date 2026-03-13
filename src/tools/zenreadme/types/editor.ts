export type ViewMode = 'split' | 'edit' | 'preview';

export interface EditorConfig {
  viewMode: ViewMode;
  syncScroll: boolean;
}

export interface MarkdownStats {
  words: number;
  characters: number;
  lines: number;
  readingTime: string;
  headings: number;
}

export interface InsertAction {
  before: string;
  after: string;
  placeholder: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  content: string;
}
