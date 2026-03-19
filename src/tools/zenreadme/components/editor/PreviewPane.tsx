import { RefObject } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PreviewPaneProps {
  previewRef: RefObject<HTMLDivElement | null>;
  markdown: string;
  onScroll: () => void;
  visible: boolean;
  fullWidth: boolean;
}

export function PreviewPane({
  previewRef,
  markdown,
  onScroll,
  visible,
  fullWidth,
}: PreviewPaneProps) {
  if (!visible) return null;

  return (
    <div
      ref={previewRef}
      onScroll={onScroll}
      className={`flex-1 overflow-y-auto bg-[#F4F0EA] transition-all duration-300 custom-scrollbar ${
        fullWidth ? 'w-full' : 'w-1/2'
      }`}
    >
      <div className="sticky top-0 px-6 py-3 border-b border-[#111]/5 bg-[#F4F0EA]/90 backdrop-blur-sm flex justify-between items-center z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111]/50">
          Live Preview
        </span>
      </div>
      <div className="p-8 md:p-12 max-w-4xl mx-auto">
        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-code:text-[#111] prose-code:bg-[#111]/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#111] prose-pre:text-[#F4F0EA] prose-pre:p-0 prose-img:rounded-xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, node, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = node?.position?.start?.line === node?.position?.end?.line && !match;
                if (!isInline) {
                  return (
                    <SyntaxHighlighter
                      {...props}
                      style={vscDarkPlus}
                      language={match ? match[1] : 'text'}
                      PreTag="div"
                      className="rounded-xl !m-0 !bg-[#111] !p-6 text-[13px]"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  );
                }
                return (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
