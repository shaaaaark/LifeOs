
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MoodTracker } from './components/MoodTracker';
import { Inbox } from './components/Inbox';
import { SubscriptionManager } from './components/SubscriptionManager';
import { SocialCRM } from './components/SocialCRM';
import { ViewMode, MoodEntry, NoteEntry, InboxItem, NoteType, Language, SubscriptionItem, Contact } from './types';
import { MOCK_MOODS, MOCK_NOTES, MOCK_INBOX, MOCK_SUBSCRIPTIONS, MOCK_CONTACTS, TRANSLATIONS } from './constants';

function App() {
  // --- Global State ---
  const [workMode, setWorkMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Default to Light Mode (Dopamine/Morandi)
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.DASHBOARD);
  
  // --- Mock Database State ---
  const [moods, setMoods] = useState<MoodEntry[]>(MOCK_MOODS);
  const [notes, setNotes] = useState<NoteEntry[]>(MOCK_NOTES);
  const [inboxItems, setInboxItems] = useState<InboxItem[]>(MOCK_INBOX);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(MOCK_SUBSCRIPTIONS);
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);

  const t = TRANSLATIONS[language];

  // --- Handlers ---
  const toggleWorkMode = () => {
    setWorkMode((prev) => {
      const nextMode = !prev;
      if (nextMode && (currentView === ViewMode.MOOD)) {
        setCurrentView(ViewMode.DASHBOARD);
      }
      return nextMode;
    });
  };

  const toggleTheme = () => {
      setDarkMode(prev => !prev);
  };

  const toggleLanguage = () => {
      setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleAddMood = (entry: MoodEntry) => {
    setMoods((prev) => [...prev, entry]);
  };

  const handleAddInboxItem = (content: string, type: 'text' | 'image') => {
    const newItem: InboxItem = {
        id: Date.now().toString(),
        content,
        type,
        timestamp: Date.now(),
        processed: false
    };
    setInboxItems(prev => [...prev, newItem]);
  };

  // --- Render Content Logic ---
  const renderContent = () => {
    switch (currentView) {
      case ViewMode.DASHBOARD:
        return <Dashboard moods={moods} notes={notes} workMode={workMode} darkMode={darkMode} language={language} />;
      case ViewMode.MOOD:
        return workMode ? (
           <div className="h-full flex flex-col items-center justify-center text-stone-400 dark:text-zinc-600">
             <span className="text-6xl mb-4 opacity-30 grayscale">🔒</span>
             <p className="font-medium">{t.hiddenMood}</p>
           </div>
        ) : (
           <MoodTracker moods={moods} contacts={contacts} onAddMood={handleAddMood} language={language} workMode={workMode} />
        );
      case ViewMode.INBOX:
        return <Inbox items={inboxItems} onAddItem={handleAddInboxItem} language={language} />;
      case ViewMode.SUBSCRIPTIONS:
        return <SubscriptionManager subscriptions={subscriptions} workMode={workMode} language={language} />;
      case ViewMode.SOCIAL:
        return <SocialCRM contacts={contacts} moods={moods} workMode={workMode} language={language} />;
      case ViewMode.NOTES:
        return (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 tracking-tight text-stone-800 dark:text-white">{t.notes}</h2>
            <p className="text-stone-500 dark:text-zinc-400 mb-8 font-medium">Your second brain.</p>
            
            <div className="grid gap-4">
              {notes.filter(n => workMode ? n.type === NoteType.WORK : true).map(n => (
                 <div key={n.id} className="glass p-6 rounded-[2rem] hover:bg-white/60 dark:hover:bg-white/5 transition-all cursor-pointer shadow-sm hover:shadow-lg border border-transparent hover:border-stone-200 dark:hover:border-white/10">
                    <div className="flex justify-between mb-3">
                        <h4 className="font-bold text-lg text-stone-800 dark:text-zinc-100">{n.title}</h4>
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-stone-500 dark:text-zinc-400 border border-stone-200 dark:border-zinc-800 px-2 py-1 rounded-lg bg-stone-100 dark:bg-zinc-900">{n.type}</span>
                    </div>
                    <p className="text-stone-600 dark:text-zinc-400 leading-relaxed font-medium">{n.content}</p>
                 </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="p-10">Settings View</div>;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} h-screen w-full`}>
        <div className="flex h-screen overflow-hidden bg-[var(--bg-main)] font-sans text-[var(--text-main)] selection:bg-pink-200 selection:text-pink-900 dark:selection:bg-blue-900 dark:selection:text-white transition-colors duration-500">
        
        {/* Background Ambient Mesh - Dynamic based on Theme/Mode */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Blob 1: Top Left */}
            <div className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[100px] transition-all duration-1000 opacity-40 ${
                workMode 
                    ? 'bg-blue-200 dark:bg-blue-900/40' 
                    : 'bg-rose-200 dark:bg-purple-900/30'
            }`} />
            
            {/* Blob 2: Bottom Right */}
            <div className={`absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-all duration-1000 opacity-40 ${
                workMode 
                    ? 'bg-indigo-200 dark:bg-indigo-900/40' 
                    : 'bg-orange-100 dark:bg-emerald-900/30'
            }`} />

            {/* Blob 3: Middle - subtle mover */}
            <div className={`absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full blur-[80px] transition-all duration-1000 opacity-30 animate-pulse-slow ${
                workMode
                    ? 'bg-sky-100 dark:bg-sky-900/20'
                    : 'bg-yellow-100 dark:bg-pink-900/20'
            }`} />
        </div>

        <Sidebar 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
            workMode={workMode}
            toggleWorkMode={toggleWorkMode}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            language={language}
            toggleLanguage={toggleLanguage}
        />
        
        <main className="flex-1 relative overflow-y-auto z-10">
            <div className="container mx-auto max-w-7xl px-4 lg:px-12 py-8 lg:py-12 min-h-screen">
            {renderContent()}
            </div>
        </main>
        </div>
    </div>
  );
}

export default App;