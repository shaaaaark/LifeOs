
import React, { useMemo } from 'react';
import { Contact, MoodEntry, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Users, Battery, BatteryCharging, BatteryWarning, Clock, CheckCircle } from 'lucide-react';

interface SocialCRMProps {
  contacts: Contact[];
  moods: MoodEntry[];
  workMode: boolean;
  language: Language;
}

export const SocialCRM: React.FC<SocialCRMProps> = ({ contacts, moods, workMode, language }) => {
  const t = TRANSLATIONS[language];

  // Filter contacts based on Work Mode
  const visibleContacts = useMemo(() => {
    return contacts.filter(c => !workMode || !c.isPrivate);
  }, [contacts, workMode]);

  // Calculate Energy Score per contact based on mood history
  const getContactStats = (contactId: string) => {
    const relatedMoods = moods.filter(m => m.contactIds?.includes(contactId));
    if (relatedMoods.length === 0) return { energyScore: 0, moodCount: 0 };
    
    const avgMood = relatedMoods.reduce((acc, m) => acc + m.level, 0) / relatedMoods.length;
    return { energyScore: avgMood, moodCount: relatedMoods.length };
  };

  const getDaysSinceContact = (lastContact: number) => {
    const diffTime = Math.abs(Date.now() - lastContact);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  return (
    <div className="animate-fade-in w-full pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 dark:text-white tracking-tight mb-2">
                {t.socialTitle}
             </h2>
             <p className="text-stone-500 dark:text-zinc-400 font-medium text-lg">{t.socialDesc}</p>
        </div>
        <div className="flex items-center gap-2">
             <div className="glass px-4 py-2 rounded-full flex items-center text-sm font-bold text-stone-500 dark:text-zinc-400">
                <Users size={18} className="mr-2" />
                {visibleContacts.length} People
             </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleContacts.map((contact, idx) => {
          const { energyScore, moodCount } = getContactStats(contact.id);
          const daysSince = getDaysSinceContact(contact.lastContactDate);
          const isOverdue = daysSince > contact.frequencyTargetDays;

          // Determine Energy Impact Status
          let impactColor = 'text-stone-400 dark:text-zinc-500';
          let ImpactIcon = Battery;
          let impactLabel = t.neutral;

          if (moodCount > 0) {
              if (energyScore >= 3.5) {
                  impactColor = 'text-emerald-500';
                  ImpactIcon = BatteryCharging;
                  impactLabel = t.recharging;
              } else if (energyScore <= 2.5) {
                  impactColor = 'text-rose-500';
                  ImpactIcon = BatteryWarning;
                  impactLabel = t.draining;
              }
          }

          return (
            <div 
              key={contact.id} 
              className="glass p-6 rounded-[2rem] hover:bg-white/80 dark:hover:bg-white/5 transition-all shadow-sm hover:shadow-xl group animate-slide-up flex flex-col h-full"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
               {/* Top: Avatar & Name */}
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-zinc-800 text-3xl flex items-center justify-center shadow-inner relative">
                          {contact.avatar}
                          {/* Type Badge */}
                          <div className="absolute -bottom-2 -right-2 bg-stone-900 dark:bg-white text-white dark:text-black text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider">
                              {contact.type}
                          </div>
                      </div>
                      <div>
                          <h3 className="font-bold text-lg text-stone-800 dark:text-white leading-tight">{contact.name}</h3>
                          <p className="text-stone-400 dark:text-zinc-500 text-sm font-medium">{contact.role}</p>
                      </div>
                  </div>
                  {contact.isPrivate && (
                       <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] px-2 py-0.5 rounded-md font-black tracking-wider">
                           PRIVATE
                       </span>
                  )}
               </div>

               {/* Middle: Stats */}
               <div className="space-y-4 flex-1">
                   {/* Maintenance Status */}
                   <div className="p-4 rounded-2xl bg-stone-50 dark:bg-black/20 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-full ${isOverdue ? 'bg-rose-100 text-rose-500' : 'bg-blue-100 text-blue-500'} dark:bg-white/10`}>
                               <Clock size={18} />
                           </div>
                           <div>
                               <p className="text-xs font-bold text-stone-400 dark:text-zinc-500 uppercase">{t.maintenance}</p>
                               <p className={`text-sm font-bold ${isOverdue ? 'text-rose-500' : 'text-stone-700 dark:text-stone-300'}`}>
                                   {daysSince} {t.daysAgo}
                               </p>
                           </div>
                       </div>
                       {isOverdue ? (
                           <span className="text-xs font-bold text-rose-500 border border-rose-200 dark:border-rose-800 px-2 py-1 rounded-lg bg-rose-50 dark:bg-rose-900/20">{t.overdue}</span>
                       ) : (
                           <CheckCircle size={18} className="text-blue-500" />
                       )}
                   </div>

                   {/* Energy Impact */}
                   <div className="p-4 rounded-2xl bg-stone-50 dark:bg-black/20 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-full bg-stone-200 dark:bg-zinc-700 ${impactColor}`}>
                               <ImpactIcon size={18} />
                           </div>
                           <div>
                               <p className="text-xs font-bold text-stone-400 dark:text-zinc-500 uppercase">{t.energyImpact}</p>
                               <p className={`text-sm font-bold ${impactColor}`}>
                                   {impactLabel}
                               </p>
                           </div>
                       </div>
                       <span className="text-xl font-black text-stone-800 dark:text-white opacity-30">
                           {energyScore > 0 ? energyScore.toFixed(1) : '-'}
                       </span>
                   </div>
               </div>

               {/* Action */}
               <button className="mt-6 w-full py-3 rounded-xl font-bold text-sm transition-colors bg-stone-200 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 hover:bg-stone-800 hover:text-white dark:hover:bg-white dark:hover:text-black">
                   Contact Now
               </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
