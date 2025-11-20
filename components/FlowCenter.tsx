
import React, { useMemo } from 'react';
import { FlowItem, Language, FlowStatus } from '../types';
import { TRANSLATIONS } from '../constants';
import { ExternalLink, BookOpen, Archive, Inbox, Globe, Trash2 } from 'lucide-react';

interface FlowCenterProps {
  items: FlowItem[];
  onUpdateStatus: (id: string, status: FlowStatus) => void;
  workMode: boolean;
  language: Language;
}

export const FlowCenter: React.FC<FlowCenterProps> = ({ items, onUpdateStatus, workMode, language }) => {
  const t = TRANSLATIONS[language];

  const visibleItems = useMemo(() => {
    return items.filter(item => !workMode || !item.isPrivate);
  }, [items, workMode]);

  const columns = [
      { id: 'inbox', label: t.inboxStatus, icon: Inbox, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
      { id: 'reading', label: t.readingStatus, icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
      { id: 'archived', label: t.archivedStatus, icon: Archive, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  ] as const;

  return (
    <div className="animate-fade-in w-full h-[calc(100vh-4rem)] pb-10 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 shrink-0">
            <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 dark:text-white tracking-tight mb-2">
                    {t.flowTitle}
                </h2>
                <p className="text-stone-500 dark:text-zinc-400 font-medium text-lg">{t.flowDesc}</p>
            </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto">
            <div className="flex gap-6 min-w-full md:min-w-0 h-full">
                {columns.map(col => {
                    const colItems = visibleItems.filter(item => item.status === col.id);
                    const Icon = col.icon;

                    return (
                        <div key={col.id} className="flex-1 min-w-[300px] flex flex-col gap-4">
                            <div className="flex items-center justify-between px-4">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${col.bg} ${col.color}`}>
                                        <Icon size={18} />
                                    </div>
                                    <h3 className="font-bold text-stone-700 dark:text-zinc-300">{col.label}</h3>
                                    <span className="bg-stone-200 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400 text-xs font-bold px-2 py-0.5 rounded-md">
                                        {colItems.length}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 bg-stone-100/50 dark:bg-zinc-900/30 rounded-[1.5rem] p-3 overflow-y-auto custom-scrollbar">
                                {colItems.length === 0 ? (
                                    <div className="h-32 flex flex-col items-center justify-center text-stone-400 dark:text-zinc-600 opacity-60">
                                        <div className="border-2 border-dashed border-stone-300 dark:border-zinc-700 rounded-xl p-4 mb-2">
                                            <Icon size={24} />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider">Empty</span>
                                    </div>
                                ) : (
                                    colItems.map(item => (
                                        <div key={item.id} className="glass p-4 rounded-2xl mb-3 group hover:scale-[1.02] transition-transform shadow-sm border border-white/50 dark:border-white/5">
                                            {/* Domain Pill */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-stone-200 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400 px-2 py-1 rounded-md">
                                                    <Globe size={10} /> {item.domain}
                                                </span>
                                                {item.isPrivate && (
                                                     <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-900/30 text-rose-500 px-2 py-1 rounded-md">Private</span>
                                                )}
                                            </div>
                                            
                                            <h4 className="font-bold text-stone-800 dark:text-zinc-100 leading-snug mb-3">
                                                <a href={item.url} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-500 decoration-blue-500 underline-offset-4 decoration-2">
                                                    {item.title}
                                                </a>
                                            </h4>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                                                {col.id === 'inbox' && (
                                                    <button 
                                                        onClick={() => onUpdateStatus(item.id, 'reading')}
                                                        className="flex-1 flex items-center justify-center gap-1 text-xs font-bold py-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:brightness-110"
                                                    >
                                                        <BookOpen size={12} /> {t.readNow}
                                                    </button>
                                                )}
                                                {col.id === 'reading' && (
                                                    <button 
                                                        onClick={() => onUpdateStatus(item.id, 'archived')}
                                                        className="flex-1 flex items-center justify-center gap-1 text-xs font-bold py-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:brightness-110"
                                                    >
                                                        <Archive size={12} /> {t.archive}
                                                    </button>
                                                )}
                                                {col.id === 'archived' && (
                                                     <button 
                                                        onClick={() => onUpdateStatus(item.id, 'inbox')}
                                                        className="flex-1 flex items-center justify-center gap-1 text-xs font-bold py-2 rounded-lg bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400 hover:brightness-110"
                                                    >
                                                        <Inbox size={12} /> {t.moveToInbox}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};
