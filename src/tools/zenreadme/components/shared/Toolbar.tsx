import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Image,
  Code,
  FileCode,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Minus,
  Table,
} from 'lucide-react';

const GROUPS = [
  {
    items: [
      { id: 'bold', Icon: Bold, label: 'Bold (⌘B)' },
      { id: 'italic', Icon: Italic, label: 'Italic (⌘I)' },
      { id: 'strikethrough', Icon: Strikethrough, label: 'Strikethrough' },
    ],
  },
  {
    items: [
      { id: 'h1', Icon: Heading1, label: 'Heading 1' },
      { id: 'h2', Icon: Heading2, label: 'Heading 2' },
      { id: 'h3', Icon: Heading3, label: 'Heading 3' },
    ],
  },
  {
    items: [
      { id: 'link', Icon: Link, label: 'Link (⌘K)' },
      { id: 'image', Icon: Image, label: 'Image' },
      { id: 'code', Icon: Code, label: 'Inline Code' },
      { id: 'codeblock', Icon: FileCode, label: 'Code Block' },
    ],
  },
  {
    items: [
      { id: 'ul', Icon: List, label: 'Bullet List' },
      { id: 'ol', Icon: ListOrdered, label: 'Numbered List' },
      { id: 'task', Icon: CheckSquare, label: 'Task List' },
      { id: 'quote', Icon: Quote, label: 'Blockquote' },
    ],
  },
  {
    items: [
      { id: 'table', Icon: Table, label: 'Table' },
      { id: 'hr', Icon: Minus, label: 'Horizontal Rule' },
    ],
  },
];

interface ToolbarProps {
  onAction: (actionId: string) => void;
}

export function Toolbar({ onAction }: ToolbarProps) {
  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b border-[#111]/5 bg-white overflow-x-auto">
      {GROUPS.map((group, gi) => (
        <div key={gi} className="flex items-center gap-0.5">
          {gi > 0 && (
            <div className="w-px h-5 bg-[#111]/10 mx-1.5 shrink-0" />
          )}
          {group.items.map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => onAction(id)}
              title={label}
              className="p-1.5 rounded-md hover:bg-[#111]/5 text-[#111]/60 hover:text-[#111] transition-colors shrink-0"
            >
              <Icon size={15} strokeWidth={1.8} />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
