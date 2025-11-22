
import React, { useState } from 'react';
import { Flashcard, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Brain, RotateCw, Check, X, GraduationCap, Sparkles } from 'lucide-react';

interface KnowledgeBaseProps {
  flashcards: Flashcard[];
  onUpdateCard: (id: string, mastery: 'new' | 'learning' | 'mastered') => void;
  language: Language;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ flashcards, onUpdateCard, language }) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const t = TRANSLATIONS[language];

  // Cards due for review (mock logic: all cards for demo)
  const dueCards = flashcards;

  const handleStartSession = () => {
      setIsSessionActive(true);
      setCurrentCardIndex(0);
      setIsFlipped(false);
  };

  const handleNextCard = (result: 'forgot' | 'remembered') => {
      const card = dueCards[currentCardIndex];
      const newMastery = result === 'remembered' ? 'mastered' : 'learning';
      onUpdateCard(card.id, newMastery);

      setIsFlipped(false);
      if (currentCardIndex < dueCards.length - 1) {
          setTimeout(() => setCurrentCardIndex(prev => prev + 1), 300);
      } else {
          // End session
          setIsSessionActive(false);
      }
  };

  if (isSessionActive && dueCards.length > 0) {
      const card = dueCards[currentCardIndex];
      return (
          <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
               <div className="mb-8 flex items-center gap-2 text-stone-400 dark:text-zinc-500 font-bold uppercase tracking-widest">
                   <Brain size={16} />
                   <span>{t.dailyReview} • {currentCardIndex + 1} / {dueCards.length}</span>
               </div>

               {/* Card Container (3D Flip Effect placeholder via simple state) */}
               <div 
                  className="w-full max-w-2xl aspect-[16/9] perspective-1000 cursor-pointer group"
                  onClick={() => setIsFlipped(!isFlipped)}
               >
                   <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                       
                       {/* Front */}
                       <div className="absolute inset-0 glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center shadow-2xl backface-hidden border border-white/50 dark:border-white/10" style={{ backfaceVisibility: 'hidden' }}>
                            <span className="bg-stone-100 dark:bg-zinc-800 text-stone-400 dark:text-zinc-500 px-3 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">Question</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-center text-stone-800 dark:text-white leading-relaxed">
                                {card.question}
                            </h3>
                            <p className="mt-8 text-stone-400 dark:text-zinc-500 text-sm font-bold animate-pulse">{t.flipCard}</p>
                       </div>

                       {/* Back */}
                       <div className="absolute inset-0 glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center shadow-2xl backface-hidden border border-white/50 dark:border-white/10 bg-stone-50 dark:bg-zinc-900" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-500 px-3 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">Answer</span>
                            <p className="text-xl md:text-2xl font-medium text-center text-stone-700 dark:text-zinc-200 leading-relaxed">
                                {card.answer}
                            </p>
                       </div>
                   </div>
               </div>

               {/* Controls */}
               <div className={`mt-10 flex gap-6 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                   <button 
                      onClick={(e) => { e.stopPropagation(); handleNextCard('forgot'); }}
                      className="flex items-center gap-2 px-8 py-4 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold hover:scale-105 transition-transform"
                   >
                       <X size={20} /> {t.forgot}
                   </button>
                   <button 
                      onClick={(e) => { e.stopPropagation(); handleNextCard('remembered'); }}
                      className="flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold hover:scale-105 transition-transform"
                   >
                       <Check size={20} /> {t.remembered}
                   </button>
               </div>
          </div>
      );
  }

  return (
    <div className="animate-fade-in w-full pb-20">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 dark:text-white tracking-tight mb-2">
                {t.knowTitle}
             </h2>
             <p className="text-stone-500 dark:text-zinc-400 font-medium text-lg">{t.knowDesc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Review Action */}
          <div className="glass p-8 rounded-[2.5rem] lg:col-span-2 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl">
                          <RotateCw size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-stone-800 dark:text-white">{t.dailyReview}</h3>
                  </div>
                  <p className="text-stone-500 dark:text-zinc-400 font-medium max-w-md">
                      You have <span className="text-violet-500 font-bold">{dueCards.length} cards</span> due for review today. 
                      Reviewing now will boost your retention by 40%.
                  </p>
              </div>
              <button 
                onClick={handleStartSession}
                className="relative z-10 px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-black rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                  <Brain size={18} />
                  {t.startSession}
              </button>
          </div>

          {/* Right: Stats */}
          <div className="glass p-8 rounded-[2.5rem] flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                   <GraduationCap size={20} className="text-emerald-500" />
                   <span className="text-sm font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-wider">{t.masteryProgress}</span>
               </div>
               <div className="space-y-4">
                   <div>
                       <div className="flex justify-between mb-2 text-sm font-bold">
                           <span className="text-stone-600 dark:text-zinc-300">{t.mastered}</span>
                           <span className="text-emerald-500">{flashcards.filter(f => f.mastery === 'mastered').length}</span>
                       </div>
                       <div className="h-2 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 w-1/3" />
                       </div>
                   </div>
                   <div>
                       <div className="flex justify-between mb-2 text-sm font-bold">
                           <span className="text-stone-600 dark:text-zinc-300">{t.learning}</span>
                           <span className="text-amber-500">{flashcards.filter(f => f.mastery === 'learning').length}</span>
                       </div>
                       <div className="h-2 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                           <div className="h-full bg-amber-500 w-1/2" />
                       </div>
                   </div>
               </div>
          </div>
      </div>

      {/* Library */}
      <div className="mt-10">
          <h3 className="text-lg font-bold text-stone-800 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles size={18} className="text-stone-400" /> {t.vectorized}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flashcards.map(card => (
                  <div key={card.id} className="glass p-6 rounded-[2rem] hover:bg-white/50 dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-stone-200 dark:hover:border-white/10">
                      <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-2">
                              {card.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-stone-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400 rounded-md">
                                      {tag}
                                  </span>
                              ))}
                          </div>
                          {card.mastery === 'mastered' && <Check size={16} className="text-emerald-500" />}
                      </div>
                      <h4 className="font-bold text-stone-800 dark:text-zinc-200 mb-2 line-clamp-2">{card.question}</h4>
                      <p className="text-sm text-stone-400 dark:text-zinc-500 line-clamp-1">{card.answer}</p>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};