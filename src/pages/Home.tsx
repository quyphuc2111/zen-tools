import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Monitor, ImageIcon, FileText, LayoutTemplate, Keyboard } from 'lucide-react';

const TOOLS = [
  {
    id: 'zentyping',
    name: 'ZENTYPE',
    description: 'Game code typing test kiểu arcade: gõ nhanh, giữ combo, leo rank.',
    icon: Keyboard,
    path: '/zentyping',
    active: true,
  },
  {
    id: 'zenshot',
    name: 'ZENSHOT',
    description: 'Tạo ảnh code snippet tuyệt đẹp với cú pháp highlight và khung cửa sổ tùy chỉnh.',
    icon: Monitor,
    path: '/zenshot',
    active: true,
  },
  {
    id: 'zenmock',
    name: 'ZENMOCK',
    description: 'Tạo mockup thiết bị ấn tượng cho ảnh chụp màn hình ứng dụng của bạn.',
    icon: ImageIcon,
    path: '/zenmock',
    comingSoon: true,
  },
  {
    id: 'zenreadme',
    name: 'ZENREADME',
    description: 'Trình tạo file README.md chuyên nghiệp và tương tác cho dự án mã nguồn mở.',
    icon: FileText,
    path: '/zenreadme',
    active: true,
  }
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#F4F0EA] text-[#111] font-sans p-6 md:p-10 selection:bg-[#111] selection:text-[#F4F0EA] overflow-x-hidden">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#111] text-[#F4F0EA] flex items-center justify-center shrink-0">
            <LayoutTemplate size={24} />
          </div>
          <p className="text-[16px] font-bold uppercase tracking-[0.2em] leading-tight">
            ZEN TOOLS
          </p>
        </div>
        
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111]/60 border border-[#111]/20 px-6 py-2 rounded-full">
          Tối giản hóa công việc lập trình
        </div>
      </header>

      {/* Huge Title */}
      <div className="mb-20 flex flex-wrap items-center justify-center gap-y-4 gap-x-6 text-[13vw] md:text-[9vw] leading-[0.85] font-medium tracking-tighter uppercase max-w-[1600px] mx-auto">
        <span>Developer</span>
        <span className="border-[3px] border-[#111] rounded-[100px] px-8 py-2 md:py-4 flex items-center justify-center pb-4 md:pb-6 bg-[#111] text-[#F4F0EA]">
          Tools
        </span>
        <span>Collection</span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1600px] mx-auto">

        {/* Left Column: List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              to={tool.comingSoon ? '#' : tool.path}
              className={`flex items-center justify-between px-8 py-6 rounded-[2rem] border border-[#111] transition-all duration-300 ${
                tool.active
                  ? 'bg-[#111] text-[#F4F0EA] hover:scale-[1.02]'
                  : 'bg-transparent hover:bg-[#E8E4D9]'
              } ${tool.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col gap-2">
                <span className="text-[16px] font-bold uppercase tracking-[0.15em]">
                  {tool.name} {tool.comingSoon ? '(SẮP RA MẮT)' : ''}
                </span>
                <span className={`text-[12px] max-w-[280px] leading-relaxed ${tool.active ? 'text-[#F4F0EA]/70' : 'text-[#111]/60'}`}>
                  {tool.description}
                </span>
              </div>
              <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={1.5} />
            </Link>
          ))}
        </div>

        {/* Center Column: Floating Tags */}
        <div className="lg:col-span-3 relative min-h-[400px] lg:min-h-full flex items-center justify-center py-12 lg:py-0">
          <div className="absolute top-[10%] left-[10%] rotate-[-12deg] bg-white px-6 py-2.5 rounded-full border border-[#111]/10 text-[13px] font-bold uppercase tracking-[0.15em] shadow-sm hover:scale-105 transition-transform cursor-default">
            Code Snippet
          </div>
          <div className="absolute top-[30%] right-[5%] rotate-[8deg] bg-white px-6 py-2.5 rounded-full border border-[#111]/10 text-[13px] font-bold uppercase tracking-[0.15em] shadow-sm hover:scale-105 transition-transform cursor-default">
            Đẹp Mắt
          </div>
          <div className="absolute top-[45%] left-[15%] rotate-[-5deg] bg-[#111] text-[#F4F0EA] px-8 py-3.5 rounded-full text-[14px] font-bold uppercase tracking-[0.15em] shadow-xl z-10 hover:scale-105 transition-transform cursor-default">
            Tối Giản
          </div>
          <div className="absolute top-[65%] right-[10%] rotate-[12deg] bg-white px-6 py-2.5 rounded-full border border-[#111]/10 text-[13px] font-bold uppercase tracking-[0.15em] shadow-sm hover:scale-105 transition-transform cursor-default">
            Nhanh Chóng
          </div>
          <div className="absolute bottom-[10%] left-[20%] rotate-[-8deg] bg-white px-6 py-2.5 rounded-full border border-[#111]/10 text-[13px] font-bold uppercase tracking-[0.15em] shadow-sm hover:scale-105 transition-transform cursor-default">
            Tùy Chỉnh
          </div>
        </div>

        {/* Right Column: Big Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Dark Card - ZenType */}
          <Link to="/zentyping" className="bg-[#111] rounded-[2.5rem] p-8 text-[#F4F0EA] relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-shadow h-[280px]">
            <div className="absolute inset-0 opacity-40 flex items-center justify-center pointer-events-none">
              <div className="w-[120%] h-full flex items-center justify-center gap-3 rotate-[-10deg] scale-125">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-3 bg-[#F4F0EA] rounded-full" style={{ height: `${Math.max(20, Math.sin(i) * 100)}%` }}></div>
                ))}
              </div>
            </div>
            <div className="relative z-10 bg-white/10 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md">
              <Keyboard className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold uppercase tracking-tighter mb-2">ZenType</h3>
              <p className="text-[11px] opacity-80 uppercase tracking-[0.2em]">Code Typing Game</p>
            </div>
          </Link>

          {/* Light Card - ZenShot */}
          <Link to="/zenshot" className="bg-white border border-[#111]/10 rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between group h-[280px]">
            <div className="absolute top-6 right-6 bg-[#F4F0EA] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
              Active
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
              <div className="w-40 h-40 rounded-full border-[1px] border-[#111] flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-[1px] border-[#111] flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-[1px] border-[#111] flex items-center justify-center">
                    <Plus className="w-6 h-6 text-[#111]" strokeWidth={1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 bg-[#F4F0EA] w-12 h-12 rounded-full flex items-center justify-center">
              <Monitor className="w-6 h-6 text-[#111]" strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold uppercase tracking-tighter mb-2 text-[#111]">ZenShot</h3>
              <p className="text-[11px] text-[#111]/60 uppercase tracking-[0.2em]">Code Image Tool</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};
