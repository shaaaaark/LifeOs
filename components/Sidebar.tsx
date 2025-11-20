
import React from 'react';
import { 
  LayoutDashboard, 
  Smile, 
  Inbox, 
  FileText, 
  Settings, 
  Briefcase, 
  Coffee,
  Sparkles,
  Sun,
  Moon,
  CreditCard,
  HeartHandshake,
  Layers
} from 'lucide-react';
import { ViewMode, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SidebarProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  workMode: boolean;
  toggleWorkMode: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  workMode, 
  toggleWorkMode,
  darkMode,
  toggleTheme,
  language,
  toggleLanguage
}) => {
  
  const t = TRANSLATIONS[language];

  const menuItems = [
    { id: ViewMode.DASHBOARD, icon: LayoutDashboard, label: t.home, private: false },
    { id: ViewMode.INBOX, icon: Inbox, label: t.inbox, private: false },
    { id: ViewMode.FLOW, icon: Layers, label: t.flow, private: false },
    { id: ViewMode.NOTES, icon: FileText, label: t.notes, private: false },
    { id: ViewMode.SUBSCRIPTIONS, icon: CreditCard, label: t.subs, private: false },
    { id: ViewMode.SOCIAL, icon: HeartHandshake, label: t.social, private: false },
    { id: ViewMode.MOOD, icon: Smile, label: t.mood, private: true },
    { id: ViewMode.SETTINGS, icon: Settings, label: t.settings, private: false },
  ];

  const activeColorClass = workMode 
    ? 'bg-blue-600 text-white shadow-blue-500/30' 
    : 'bg-stone-900 text-white shadow-stone-500/20 dark:bg-white dark:text-black dark:shadow-white/20';

  return (
    <aside className="h-screen w-20 lg:w-72 flex flex-col glass-heavy z-50 transition-all duration-500 relative overflow-hidden border-r border-white/20 dark:border-white/5">
      {/* Ambient Glow for Sidebar */}
      <div className={`absolute top-0 left-0 w-full h-64 opacity-30 pointer-events-none transition-all duration-700 blur-3xl ${
          workMode 
            ? 'bg-blue-400/30 dark:bg-blue-900/20' 
            : 'bg-rose-300/30 dark:bg-emerald-900/20'
      }`} />

      {/* Header */}
      <div className="h-28 flex items-center px-4 lg:px-8 relative z-10">
        <div className={`w-12 h-12 rounded-[18px] mr-0 lg:mr-4 flex items-center justify-center shadow-xl transition-all duration-500 ${
          workMode 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
            : 'bg-gradient-to-br from-rose-400 to-orange-400 text-white dark:from-emerald-500 dark:to-teal-500'
        }`}>
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="hidden lg:block">
           <h1 className="text-2xl font-bold tracking-tight dark:text-white text-stone-800">LifeOS</h1>
           <p className="text-xs font-semibold tracking-wider uppercase opacity-50 dark:text-zinc-400 text-stone-500">
             {workMode ? t.deepWork : t.personal}
           </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 lg:px-6 space-y-2 py-4 overflow-y-auto relative z-10 custom-scrollbar">
        {menuItems.map((item) => {
          if (workMode && item.private) return null;

          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-center lg:justify-start px-4 py-4 rounded-[20px] transition-all duration-300 group relative ${
                isActive 
                  ? `${activeColorClass} shadow-lg scale-[1.02]`
                  : 'text-stone-500 dark:text-zinc-400 hover:bg-stone-200/50 dark:hover:bg-white/5 hover:scale-[1.02]'
              }`}
            >
              <item.icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className={`lg:mr-4 transition-transform duration-300 ${isActive ? '' : 'group-hover:-rotate-6'}`} 
              />
              <span className={`hidden lg:block text-[15px] font-semibold tracking-wide`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 lg:p-6 relative z-10 space-y-4">
        
        {/* Toggles Container */}
        <div className="flex flex-col lg:flex-row gap-2">
            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center p-2 bg-stone-200/50 dark:bg-zinc-800/50 rounded-full backdrop-blur-sm transition-all"
                title="Toggle Theme"
            >
                {darkMode ? <Moon size={18} className="text-indigo-400" fill="currentColor"/> : <Sun size={18} className="text-orange-500" fill="currentColor"/>}
            </button>
            
            {/* Language Toggle */}
            <button
                onClick={toggleLanguage}
                className="flex-1 flex items-center justify-center p-2 bg-stone-200/50 dark:bg-zinc-800/50 rounded-full backdrop-blur-sm transition-all text-stone-600 dark:text-zinc-400 font-bold text-xs"
                title="Switch Language"
            >
                {language === 'en' ? 'EN' : '中文'}
            </button>
        </div>


        {/* Mode Switcher */}
        <div className="glass p-2 rounded-[24px]">
          <button
            onClick={toggleWorkMode}
            className={`w-full flex items-center justify-center lg:justify-between px-4 py-3.5 rounded-[18px] transition-all duration-500 relative overflow-hidden group shadow-sm hover:shadow-md ${
                workMode 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200' 
                    : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
            }`}
          >
            <div className="flex items-center">
                {workMode ? (
                    <Briefcase size={20} className="mr-3" />
                ) : (
                    <Coffee size={20} className="mr-3" />
                )}
                <span className="hidden lg:block text-sm font-bold">
                    {workMode ? t.workMode : t.lifeMode}
                </span>
            </div>
            <div className={`w-2 h-2 rounded-full ${workMode ? 'bg-blue-500' : 'bg-emerald-500 animate-pulse'}`} />
          </button>
        </div>
      </div>
    </aside>
  );
};