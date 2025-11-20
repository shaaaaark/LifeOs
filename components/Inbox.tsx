import React, { useState, useRef, useEffect } from 'react';
import { Inbox as InboxIcon, Send, Image as ImageIcon, Paperclip, Check, Plus } from 'lucide-react';
import { InboxItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface InboxProps {
  items: InboxItem[];
  onAddItem: (content: string, type: 'text' | 'image') => void;
  language: Language;
}

export const Inbox: React.FC<InboxProps> = ({ items, onAddItem, language }) => {
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  
  const t = TRANSLATIONS[language];

  // Auto scroll to bottom on new item
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAddItem(input, 'text');
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-4rem)] flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>
             <h2 className="text-3xl font-extrabold text-stone-800 dark:text-white tracking-tight">{t.inbox}</h2>
             <p className="text-stone-500 dark:text-zinc-400 font-medium">{t.clearMind}</p>
        </div>
        <div className="bg-stone-200 dark:bg-zinc-800 p-3 rounded-2xl">
            <InboxIcon className="text-stone-500 dark:text-zinc-400" size={24} />
        </div>
      </div>

      {/* Stream Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-40 custom-scrollbar px-2">
        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400 dark:text-zinc-600 animate-fade-in">
                <div className="w-24 h-24 rounded-full bg-stone-100 dark:bg-zinc-900 flex items-center justify-center mb-6 border border-stone-200 dark:border-zinc-800">
                     <InboxIcon size={40} className="opacity-50" />
                </div>
                <p className="font-bold text-lg">{t.emptyInboxTitle}</p>
                <p className="text-sm mt-2 opacity-60 font-medium">{t.emptyInboxDesc}</p>
            </div>
        ) : (
            items.map((item, idx) => (
            <div key={item.id} className="flex gap-4 animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-stone-200 to-stone-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center border border-white/50 dark:border-white/10 shrink-0 shadow-sm">
                        <span className="text-[10px] font-black text-stone-500 dark:text-zinc-400">ME</span>
                    </div>
                    {idx !== items.length - 1 && <div className="w-0.5 bg-stone-200 dark:bg-zinc-800 flex-1 my-2"></div>}
                </div>
                
                <div className="flex-1 pb-2 group">
                    <div className="glass p-6 rounded-[20px] rounded-tl-none border border-white/50 dark:border-white/5 relative hover:bg-white/60 dark:hover:bg-white/5 transition-colors shadow-sm">
                         {/* Content */}
                         {item.type === 'image' ? (
                            <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-white/10 shadow-sm">
                                <img src={item.content} alt="Capture" className="max-h-64 object-cover" />
                            </div>
                         ) : (
                            <p className="text-stone-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap text-lg font-medium">{item.content}</p>
                         )}
                         
                         {/* Meta & Actions */}
                         <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-200/50 dark:border-white/5">
                            <span className="text-[11px] text-stone-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                                {new Date(item.timestamp).toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 p-2 rounded-full">
                                <Check size={16} strokeWidth={3} />
                            </button>
                         </div>
                    </div>
                </div>
            </div>
            ))
        )}
        <div ref={endRef} />
      </div>

      {/* Floating Input */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-16 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)] to-transparent z-20">
        <div className="glass rounded-full p-2 border border-white/50 dark:border-white/10 shadow-2xl shadow-stone-500/10 dark:shadow-black/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <button type="button" className="p-3 rounded-full text-stone-400 dark:text-zinc-500 hover:text-stone-600 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/10 transition-colors shrink-0">
                    <Plus size={26} />
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.captureIdea}
                    className="flex-1 bg-transparent text-stone-800 dark:text-white placeholder-stone-400 dark:placeholder-zinc-600 px-2 py-3 focus:outline-none text-xl font-medium"
                    autoFocus
                />
                <button 
                    type="submit"
                    disabled={!input.trim()}
                    className={`p-3.5 rounded-full transition-all duration-300 shrink-0 ${
                        input.trim() 
                            ? 'bg-stone-900 dark:bg-blue-600 text-white hover:scale-105 shadow-lg' 
                            : 'bg-stone-100 dark:bg-zinc-800 text-stone-300 dark:text-zinc-600'
                    }`}
                >
                    <Send size={20} fill={input.trim() ? "currentColor" : "none"} />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};