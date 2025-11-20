import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { Sparkles, Clock, Battery, Activity, ArrowRight, ArrowUpRight, Zap, Plus, FileText } from 'lucide-react';
import { MoodEntry, NoteEntry, NoteType, AIInsight, Language } from '../types';
import { generateDailyInsight } from '../services/geminiService';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  moods: MoodEntry[];
  notes: NoteEntry[];
  workMode: boolean;
  darkMode: boolean;
  language: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({ moods, notes, workMode, darkMode, language }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const t = TRANSLATIONS[language];

  const visibleNotes = useMemo(() => {
    return workMode ? notes.filter(n => n.type === NoteType.WORK) : notes;
  }, [notes, workMode]);

  const chartData = useMemo(() => {
    if (workMode) return [];
    return moods.map(m => ({
      time: new Date(m.timestamp).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'short' }),
      level: m.level,
      fullDate: new Date(m.timestamp).toLocaleString()
    })).slice(-7); 
  }, [moods, workMode, language]);

  const handleGenerateInsight = async () => {
    setIsLoadingInsight(true);
    const result = await generateDailyInsight(moods, notes, language);
    setInsight(result);
    setIsLoadingInsight(false);
  };

  const chartColor = darkMode ? "#10b981" : "#f43f5e"; // Emerald (Dark) vs Rose (Light)

  return (
    <div className="flex flex-col gap-10 pb-20 animate-fade-in w-full max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
        <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-800 dark:text-white mb-2">
                {workMode ? t.focusTime : t.helloCreator}
            </h1>
            <p className="text-lg text-stone-500 dark:text-zinc-400 font-medium">
                {new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
        </div>
        
        <button 
          onClick={handleGenerateInsight}
          disabled={isLoadingInsight}
          className={`group relative overflow-hidden px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
              isLoadingInsight ? 'opacity-70 cursor-wait' : 'hover:-translate-y-1'
          } ${workMode ? 'bg-blue-600 text-white' : 'bg-stone-900 text-white dark:bg-white dark:text-black'}`}
        >
            <div className="flex items-center font-bold text-sm tracking-wide">
                {isLoadingInsight ? <Activity className="animate-spin mr-2" size={18} /> : <Sparkles className="mr-2" size={18} />}
                {isLoadingInsight ? t.analyzing : t.generateInsight}
            </div>
        </button>
      </div>

      {/* Insight Banner */}
      {insight && (
        <div className="glass border-l-8 border-violet-500 p-8 rounded-[2rem] animate-slide-up relative overflow-hidden shadow-xl shrink-0">
           <div className="absolute -right-10 -top-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
           <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-violet-100 dark:bg-violet-900/30 p-1.5 rounded-lg">
                        <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <h3 className="text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-widest">{t.dailySummary}</h3>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-white mb-6 leading-tight">"{insight.summary}"</p>
                <div className="flex flex-wrap gap-3">
                    <span className="px-5 py-2 rounded-full bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-zinc-300 text-sm font-medium">
                        Mood: <span className="text-stone-900 dark:text-white font-bold">{insight.sentiment}</span>
                    </span>
                    <span className="px-5 py-2 rounded-full bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-zinc-300 text-sm font-medium flex items-center">
                        <Zap size={14} className="mr-2 text-amber-500" /> {insight.suggestion}
                    </span>
                </div>
           </div>
        </div>
      )}

      {/* Main Grid: Chart & Stats */}
      <div className={`grid gap-6 ${workMode ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
        
        {/* 1. Main Chart (Hidden in Work Mode) */}
        {!workMode && (
          <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] min-h-[400px] flex flex-col justify-between shadow-lg border-t border-white/40 dark:border-white/5 relative z-0">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-stone-800 dark:text-white">{t.emotionalFlow}</h3>
                    <p className="text-sm font-medium text-stone-400 dark:text-zinc-500">{t.past7Days}</p>
                </div>
                <div className="bg-rose-100 dark:bg-emerald-900/20 text-rose-500 dark:text-emerald-400 p-3 rounded-2xl">
                    <Activity size={24} />
                </div>
            </div>
            <div className="flex-1 w-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke={darkMode ? "#52525b" : "#a8a29e"} 
                    tick={{fontSize: 12, fill: darkMode ? '#71717a' : '#78716c', fontWeight: 600}} 
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis hide domain={[0, 6]} />
                  <Tooltip 
                    contentStyle={{ 
                        backgroundColor: darkMode ? '#18181b' : '#ffffff', 
                        border: 'none', 
                        borderRadius: '16px', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        color: darkMode ? '#fff' : '#000', 
                        padding: '12px 20px',
                        fontWeight: 'bold'
                    }}
                    itemStyle={{ color: chartColor }}
                    cursor={{ stroke: chartColor, strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="level" 
                    stroke={chartColor} 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorLevel)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 2. Stats Cards */}
        {workMode ? (
            <>
                <StatsCardActiveNotes count={visibleNotes.length} label={t.activeNotes} />
                <StatsCardEnergy label={t.energyBank} />
            </>
        ) : (
            <div className="flex flex-col gap-6 h-full">
                <StatsCardActiveNotes count={visibleNotes.length} label={t.activeNotes} />
                <StatsCardEnergy label={t.energyBank} />
            </div>
        )}
      </div>

      {/* Recent Notes Section */}
      <div className="flex flex-col gap-6 pt-2 border-t border-stone-200/50 dark:border-white/5">
          <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-stone-800 dark:text-white">{t.recentActivity}</h2>
              <button className="text-sm font-semibold text-stone-500 hover:text-stone-800 dark:text-zinc-400 dark:hover:text-white flex items-center transition-colors px-4 py-2 rounded-full hover:bg-stone-200 dark:hover:bg-zinc-800">
                  {t.viewAll} <ArrowRight size={16} className="ml-2" />
              </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
            {/* Create New Card */}
            <div className="border-2 border-dashed border-stone-300 dark:border-zinc-800 rounded-[2rem] p-6 flex flex-col items-center justify-center text-stone-400 dark:text-zinc-600 hover:text-stone-600 dark:hover:text-zinc-400 hover:border-stone-400 dark:hover:border-zinc-600 transition-all cursor-pointer min-h-[180px] group bg-stone-50/50 dark:bg-transparent">
                <div className="w-14 h-14 rounded-full bg-stone-200 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Plus size={24} strokeWidth={3} />
                </div>
                <span className="text-sm font-bold">{t.newNote}</span>
            </div>

            {/* Note Cards */}
            {visibleNotes.slice(0, 3).map((note) => (
                <div key={note.id} className="glass p-6 rounded-[2rem] hover:bg-white/80 dark:hover:bg-white/10 transition-all hover:-translate-y-1 cursor-pointer group border border-transparent hover:border-stone-200 dark:hover:border-white/10 shadow-sm hover:shadow-xl flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            note.type === NoteType.WORK 
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' 
                                : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                        }`}>
                            {note.type}
                        </span>
                        <span className="text-xs font-medium text-stone-400 dark:text-zinc-500">
                            {new Date(note.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                    <h4 className="font-bold text-stone-800 dark:text-zinc-100 mb-2 line-clamp-1 text-lg group-hover:text-blue-500 transition-colors">{note.title}</h4>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 line-clamp-3 leading-relaxed font-medium flex-1">{note.content}</p>
                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-white/5 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-2 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-400 dark:text-zinc-400">
                             <ArrowUpRight size={16} />
                        </div>
                    </div>
                </div>
            ))}
          </div>
      </div>
    </div>
  );
};

// Sub-components
const StatsCardActiveNotes = ({ count, label }: { count: number, label: string }) => (
    <div className="glass p-8 rounded-[2.5rem] relative group transition-all hover:-translate-y-1 hover:shadow-xl flex-1 flex flex-col justify-between min-h-[160px]">
        <div className="absolute top-8 right-8 bg-blue-50 dark:bg-blue-500/10 text-blue-500 p-3 rounded-full">
            <FileText size={20} />
        </div>
        <div className="p-4 bg-blue-100 dark:bg-blue-500/20 w-fit rounded-2xl mb-2 text-blue-600 dark:text-blue-400">
            <Clock size={28} />
        </div>
        <div>
            <span className="text-5xl font-bold text-stone-800 dark:text-white block tracking-tighter">{count}</span>
            <span className="text-sm font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-wider">{label}</span>
        </div>
    </div>
);

const StatsCardEnergy = ({ label }: { label: string }) => (
    <div className="glass p-8 rounded-[2.5rem] relative group transition-all hover:-translate-y-1 hover:shadow-xl flex-1 flex flex-col justify-between min-h-[160px]">
        <div className="flex flex-col h-full justify-between gap-6">
            <div className="flex justify-between items-start">
                <div className="p-4 bg-amber-100 dark:bg-orange-500/20 w-fit rounded-2xl text-amber-600 dark:text-orange-400">
                    <Battery size={28} />
                </div>
                <span className="text-3xl font-bold text-stone-800 dark:text-white">85%</span>
            </div>
            <div>
                <h4 className="text-sm font-bold text-stone-400 dark:text-zinc-500 mb-3 uppercase tracking-wider">{label}</h4>
                <div className="w-full bg-stone-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
            </div>
        </div>
    </div>
);