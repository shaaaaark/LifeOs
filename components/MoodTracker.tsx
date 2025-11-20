import React, { useState } from 'react';
import { MoodEntry, MoodLevel, Language } from '../types';
import { Frown, Meh, Smile, AlertCircle, ThumbsUp, Heart, CloudRain, Sun, Zap } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface MoodTrackerProps {
  moods: MoodEntry[];
  onAddMood: (entry: MoodEntry) => void;
  language: Language;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ moods, onAddMood, language }) => {
  const [selectedLevel, setSelectedLevel] = useState<MoodLevel | null>(null);
  const [note, setNote] = useState('');
  
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLevel) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      level: selectedLevel,
      note,
      tags: [],
      timestamp: Date.now(),
    };
    onAddMood(newEntry);
    setSelectedLevel(null);
    setNote('');
  };

  const moodConfig = {
    [MoodLevel.TERRIBLE]: { 
        icon: CloudRain, 
        bg: 'bg-slate-100 dark:bg-slate-900', 
        active: 'bg-slate-500 text-white shadow-slate-500/40', 
        text: 'text-slate-500', 
        label: t.rough 
    },
    [MoodLevel.BAD]: { 
        icon: Frown, 
        bg: 'bg-orange-50 dark:bg-orange-900/20', 
        active: 'bg-orange-500 text-white shadow-orange-500/40', 
        text: 'text-orange-500', 
        label: t.bad
    },
    [MoodLevel.NEUTRAL]: { 
        icon: Meh, 
        bg: 'bg-yellow-50 dark:bg-yellow-900/20', 
        active: 'bg-yellow-500 text-white shadow-yellow-500/40', 
        text: 'text-yellow-500', 
        label: t.okay 
    },
    [MoodLevel.GOOD]: { 
        icon: Smile, 
        bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
        active: 'bg-emerald-500 text-white shadow-emerald-500/40', 
        text: 'text-emerald-500', 
        label: t.good
    },
    [MoodLevel.GREAT]: { 
        icon: Zap, 
        bg: 'bg-rose-50 dark:bg-rose-900/20', 
        active: 'bg-rose-500 text-white shadow-rose-500/40', 
        text: 'text-rose-500', 
        label: t.amazing
    },
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div className="text-center mb-12">
         <div className="inline-block p-3 rounded-full bg-stone-100 dark:bg-white/5 mb-4">
            <Heart className="text-rose-500 animate-pulse" fill="currentColor" size={32} />
         </div>
         <h2 className="text-4xl font-extrabold text-stone-800 dark:text-white tracking-tight mb-2">{t.howAreYou}</h2>
         <p className="text-stone-500 dark:text-zinc-400 font-medium text-lg">{t.reflect}</p>
      </div>

      {/* Selector */}
      <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-5 gap-3 md:gap-6">
              {(Object.values(MoodLevel).filter(v => typeof v === 'number') as MoodLevel[]).map((level) => {
                const config = moodConfig[level];
                const Icon = config.icon;
                const isSelected = selectedLevel === level;
                
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedLevel(level)}
                    className={`group relative flex flex-col items-center justify-center aspect-square rounded-[2rem] transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white dark:bg-zinc-800 scale-110 shadow-xl ring-4 ring-stone-100 dark:ring-zinc-700' 
                        : 'glass hover:bg-white/80 dark:hover:bg-zinc-800/80 hover:-translate-y-2'
                    }`}
                  >
                    <div className={`mb-3 p-4 rounded-2xl transition-colors duration-300 ${
                        isSelected ? config.active : `${config.bg} ${config.text} group-hover:scale-110`
                    }`}>
                        <Icon size={32} strokeWidth={2.5} />
                    </div>
                    <span className={`text-sm font-bold tracking-wide ${
                        isSelected ? 'text-stone-800 dark:text-white' : 'text-stone-400 dark:text-zinc-500'
                    }`}>{config.label}</span>
                  </button>
                );
              })}
        </div>

        {/* Note Input - Only show when selected */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedLevel ? 'opacity-100 max-h-96 translate-y-0' : 'opacity-0 max-h-0 translate-y-4'}`}>
            <div className="glass p-2 rounded-[2.5rem] shadow-2xl bg-white/80 dark:bg-black/40">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t.addNotePlaceholder}
                    className="w-full bg-transparent text-stone-800 dark:text-white p-6 rounded-[2rem] focus:outline-none resize-none min-h-[140px] text-xl placeholder-stone-400 dark:placeholder-zinc-600 font-medium"
                />
                <div className="flex justify-end p-3">
                    <button
                        type="submit"
                        className="bg-stone-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                        {t.saveEntry}
                    </button>
                </div>
            </div>
        </div>
      </form>

      {/* Recent Timeline */}
      <div className="pt-12">
        <h3 className="text-sm font-bold text-stone-400 dark:text-zinc-500 mb-8 uppercase tracking-widest text-center">{t.recentHistory}</h3>
        <div className="space-y-4 relative max-w-xl mx-auto">
           <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-stone-200 dark:bg-zinc-800"></div>
           
           {moods.slice().reverse().map((mood) => {
            const config = moodConfig[mood.level];
            const Icon = config.icon;
            return (
              <div key={mood.id} className="relative pl-20 animate-slide-up group">
                {/* Timeline Dot */}
                <div className={`absolute left-4 top-0 -translate-x-1/2 w-9 h-9 rounded-full border-[3px] border-stone-100 dark:border-black flex items-center justify-center ${config.active} z-10 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon size={14} strokeWidth={3} />
                </div>
                
                <div className="glass p-5 rounded-[20px] hover:bg-white/90 dark:hover:bg-zinc-800/50 transition-all shadow-sm hover:shadow-md">
                   <div className="flex justify-between items-center mb-1">
                       <span className={`text-sm font-extrabold ${config.text}`}>{config.label}</span>
                       <span className="text-xs font-bold text-stone-400 dark:text-zinc-600 bg-stone-100 dark:bg-zinc-900 px-2 py-1 rounded-lg">
                           {new Date(mood.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                   </div>
                   {mood.note && <p className="text-stone-600 dark:text-zinc-300 text-base font-medium">{mood.note}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};