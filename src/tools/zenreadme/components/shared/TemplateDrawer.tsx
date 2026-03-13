import { X } from 'lucide-react';
import { TEMPLATES } from '../../data/templates';

interface TemplateDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
}

export function TemplateDrawer({ open, onClose, onSelect }: TemplateDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] max-w-[90vw] bg-white border-l border-[#111]/10 z-40 flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#111]/10">
          <h2 className="text-[14px] font-bold uppercase tracking-[0.15em]">
            Templates
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#111]/20 flex items-center justify-center hover:bg-[#111] hover:text-[#F4F0EA] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => {
                onSelect(tpl.content);
                onClose();
              }}
              className="w-full text-left p-4 rounded-2xl border border-[#111]/10 hover:border-[#111]/30 hover:bg-[#F4F0EA]/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{tpl.icon}</span>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.1em] group-hover:text-[#111]">
                    {tpl.name}
                  </p>
                  <p className="text-[11px] text-[#111]/50 mt-1 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-[#111]/10">
          <p className="text-[10px] text-[#111]/30 uppercase tracking-[0.15em] text-center">
            Click a template to replace editor content
          </p>
        </div>
      </div>
    </>
  );
}
