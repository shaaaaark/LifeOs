
import React, { useMemo } from 'react';
import { SubscriptionItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { CreditCard, Calendar, Shield, Plus, TrendingUp } from 'lucide-react';

interface SubscriptionManagerProps {
  subscriptions: SubscriptionItem[];
  workMode: boolean;
  language: Language;
}

export const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ subscriptions, workMode, language }) => {
  const t = TRANSLATIONS[language];

  // Filter subs based on Work Mode
  const visibleSubs = useMemo(() => {
    return subscriptions.filter(sub => !workMode || !sub.isPrivate);
  }, [subscriptions, workMode]);

  const totalMonthlyCost = useMemo(() => {
    return visibleSubs.reduce((acc, sub) => acc + sub.price, 0);
  }, [visibleSubs]);

  return (
    <div className="animate-fade-in w-full pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 dark:text-white tracking-tight mb-2">
                {t.subsTitle}
             </h2>
             <p className="text-stone-500 dark:text-zinc-400 font-medium text-lg">{t.subsDesc}</p>
        </div>
        <button className="group flex items-center gap-2 bg-stone-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all">
            <Plus size={18} />
            {t.addSub}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Cost */}
          <div className="glass p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[180px] bg-gradient-to-br from-white to-stone-50 dark:from-zinc-900 dark:to-zinc-950">
              <div className="flex justify-between items-start">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                      <TrendingUp size={24} />
                  </div>
              </div>
              <div>
                  <h3 className="text-4xl font-black text-stone-800 dark:text-white tracking-tighter mb-1">
                    ${totalMonthlyCost.toFixed(2)}
                  </h3>
                  <p className="text-sm font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-wider">{t.monthlyCost}</p>
              </div>
          </div>

          {/* Next Billing */}
          <div className="glass p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[180px]">
              <div className="flex justify-between items-start">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl">
                      <Calendar size={24} />
                  </div>
                  <span className="text-xs font-bold bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 px-3 py-1 rounded-full">3 Days</span>
              </div>
              <div>
                  <h3 className="text-xl font-bold text-stone-800 dark:text-white mb-1">Netflix</h3>
                  <p className="text-sm font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-wider">{t.nextBilling}</p>
              </div>
          </div>

          {/* Active Count */}
          <div className="glass p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[180px]">
              <div className="flex justify-between items-start">
                   <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl">
                      <Shield size={24} />
                  </div>
              </div>
              <div>
                  <h3 className="text-4xl font-black text-stone-800 dark:text-white tracking-tighter mb-1">
                    {visibleSubs.length}
                  </h3>
                  <p className="text-sm font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-wider">{t.activeSubs}</p>
              </div>
          </div>
      </div>

      {/* List */}
      <div className="grid gap-4">
          {visibleSubs.map((sub, idx) => (
              <div 
                key={sub.id} 
                className="glass p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between hover:bg-white/80 dark:hover:bg-white/5 transition-all shadow-sm hover:shadow-md group animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                  <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-[1.2rem] bg-stone-100 dark:bg-zinc-800 text-3xl flex items-center justify-center shadow-inner">
                          {sub.icon}
                      </div>
                      <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-xl text-stone-800 dark:text-white">{sub.name}</h4>
                            {sub.isPrivate && (
                                <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] px-2 py-0.5 rounded-md font-black tracking-wider">
                                    {t.private}
                                </span>
                            )}
                          </div>
                          <p className="text-stone-500 dark:text-zinc-400 font-medium text-sm flex items-center gap-2">
                             <span className="capitalize">{sub.category}</span> • <span className="capitalize">{sub.cycle}</span>
                          </p>
                      </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                          <span className="block text-sm font-bold text-stone-400 dark:text-zinc-500 mb-1">Next Bill</span>
                          <span className="block text-stone-800 dark:text-zinc-300 font-medium text-sm bg-stone-100 dark:bg-zinc-800 px-3 py-1 rounded-lg">
                              {new Date(sub.nextBillingDate).toLocaleDateString()}
                          </span>
                      </div>
                      <div className="text-right min-w-[80px]">
                          <span className="block text-2xl font-bold text-stone-800 dark:text-white">
                              {sub.currency === 'USD' ? '$' : '¥'}{sub.price}
                          </span>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};
