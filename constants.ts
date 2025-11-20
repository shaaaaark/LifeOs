
import { MoodEntry, MoodLevel, NoteEntry, NoteType, InboxItem, Language, SubscriptionItem, Contact, FlowItem } from './types';

export const MOCK_MOODS: MoodEntry[] = [
  { id: '1', level: MoodLevel.GOOD, note: 'Productive morning', tags: ['work', 'focus'], timestamp: Date.now() - 86400000 * 4, contactIds: ['c3'] },
  { id: '2', level: MoodLevel.NEUTRAL, note: 'Tired afternoon', tags: ['health'], timestamp: Date.now() - 86400000 * 3 },
  { id: '3', level: MoodLevel.GREAT, note: 'Finished the project!', tags: ['achievement'], timestamp: Date.now() - 86400000 * 2, contactIds: ['c3'] },
  { id: '4', level: MoodLevel.BAD, note: 'Stuck in traffic', tags: ['commute'], timestamp: Date.now() - 86400000 * 1 },
  { id: '5', level: MoodLevel.GOOD, note: 'Nice lunch with team', tags: ['social'], timestamp: Date.now(), contactIds: ['c4'] },
];

export const MOCK_NOTES: NoteEntry[] = [
  { id: '1', title: 'Q4 Strategy', content: 'Focus on retention and user growth.', type: NoteType.WORK, timestamp: Date.now() - 100000, isPinned: true },
  { id: '2', title: 'Gift Ideas', content: 'Books for Mom, Gadgets for Dad.', type: NoteType.PRIVATE, timestamp: Date.now() - 200000 },
  { id: '3', title: 'Meeting Minutes', content: 'Discussed API integrations.', type: NoteType.WORK, timestamp: Date.now() - 300000 },
  { id: '4', title: 'Journal', content: 'Feeling a bit anxious about the deadline.', type: NoteType.PRIVATE, timestamp: Date.now() - 400000 },
];

export const MOCK_INBOX: InboxItem[] = [
  { id: '1', content: 'Check out the new React docs', type: 'text', timestamp: Date.now(), processed: false },
  { id: '2', content: 'https://picsum.photos/seed/ui-design/400/300', type: 'image', timestamp: Date.now() - 50000, processed: false },
];

export const MOCK_SUBSCRIPTIONS: SubscriptionItem[] = [
  { id: '1', name: 'Netflix', price: 15.99, currency: 'USD', cycle: 'monthly', nextBillingDate: Date.now() + 86400000 * 5, category: 'entertainment', isPrivate: true, icon: '🍿' },
  { id: '2', name: 'Spotify', price: 9.99, currency: 'USD', cycle: 'monthly', nextBillingDate: Date.now() + 86400000 * 12, category: 'entertainment', isPrivate: true, icon: '🎵' },
  { id: '3', name: 'GitHub Copilot', price: 10, currency: 'USD', cycle: 'monthly', nextBillingDate: Date.now() + 86400000 * 2, category: 'productivity', isPrivate: false, icon: '💻' },
  { id: '4', name: 'Gym Membership', price: 300, currency: 'CNY', cycle: 'monthly', nextBillingDate: Date.now() + 86400000 * 20, category: 'life', isPrivate: true, icon: '💪' },
  { id: '5', name: 'Adobe Cloud', price: 52.99, currency: 'USD', cycle: 'monthly', nextBillingDate: Date.now() + 86400000 * 15, category: 'productivity', isPrivate: false, icon: '🎨' },
];

export const MOCK_CONTACTS: Contact[] = [
  { id: 'c1', name: 'Mom', role: 'Family', avatar: '👩‍🦳', type: 'family', lastContactDate: Date.now() - 86400000 * 8, frequencyTargetDays: 7, isPrivate: true },
  { id: 'c2', name: 'Alice', role: 'Best Friend', avatar: '💃', type: 'friend', lastContactDate: Date.now() - 86400000 * 2, frequencyTargetDays: 14, isPrivate: true },
  { id: 'c3', name: 'David', role: 'Product Manager', avatar: '👨‍💼', type: 'colleague', lastContactDate: Date.now() - 86400000 * 1, frequencyTargetDays: 3, isPrivate: false },
  { id: 'c4', name: 'Team Alpha', role: 'Work Group', avatar: '🚀', type: 'colleague', lastContactDate: Date.now(), frequencyTargetDays: 1, isPrivate: false },
  { id: 'c5', name: 'Sarah', role: 'Partner', avatar: '❤️', type: 'partner', lastContactDate: Date.now() - 86400000 * 0.5, frequencyTargetDays: 1, isPrivate: true },
];

export const MOCK_FLOW_ITEMS: FlowItem[] = [
    { id: 'f1', title: 'Advanced React Patterns', url: 'https://react.dev', domain: 'react.dev', status: 'inbox', category: 'tech', timestamp: Date.now() - 3600000, isPrivate: false },
    { id: 'f2', title: 'Top 10 Movies of 2024', url: 'https://imdb.com', domain: 'imdb.com', status: 'inbox', category: 'entertainment', timestamp: Date.now() - 7200000, isPrivate: true },
    { id: 'f3', title: 'Understanding Cloudflare Workers', url: 'https://cloudflare.com', domain: 'cloudflare.com', status: 'reading', category: 'tech', timestamp: Date.now() - 86400000, isPrivate: false },
    { id: 'f4', title: 'Weekend Brunch Recipes', url: 'https://cooking.com', domain: 'cooking.com', status: 'archived', category: 'other', timestamp: Date.now() - 172800000, isPrivate: true },
    { id: 'f5', title: 'Competitor Analysis Q3', url: 'https://internal.confluence.com', domain: 'internal', status: 'reading', category: 'tech', timestamp: Date.now() - 20000, isPrivate: false },
];

export const TRANSLATIONS = {
  en: {
    // Sidebar
    home: 'Home',
    inbox: 'Inbox',
    notes: 'Notes',
    mood: 'Mood',
    subs: 'Subs',
    social: 'Social',
    flow: 'Flow',
    settings: 'Settings',
    workMode: 'Work Mode',
    lifeMode: 'Life Mode',
    deepWork: 'Deep Work',
    personal: 'Personal',
    
    // Dashboard
    helloCreator: 'Hello, Creator.',
    focusTime: 'Focus Time.',
    analyzing: 'ANALYZING...',
    generateInsight: 'GENERATE INSIGHT',
    dailySummary: 'Daily AI Summary',
    emotionalFlow: 'Emotional Flow',
    past7Days: 'Past 7 Days',
    activeNotes: 'Active Notes',
    energyBank: 'Energy Bank',
    recentActivity: 'Recent Activity',
    viewAll: 'View All',
    newNote: 'New Note',
    
    // Mood
    howAreYou: 'How are you feeling?',
    reflect: 'Take a moment to reflect on your day.',
    rough: 'Rough',
    bad: 'Bad',
    okay: 'Okay',
    good: 'Good',
    amazing: 'Amazing',
    addNotePlaceholder: 'Add a quick note about why you feel this way...',
    saveEntry: 'Save Entry',
    recentHistory: 'Recent History',
    hiddenMood: 'Mood tracking is hidden in Work Mode.',
    whoWith: 'Who are you with?',

    // Inbox
    clearMind: 'Clear your mind.',
    emptyInboxTitle: 'Your mind is clear.',
    emptyInboxDesc: 'Type below to capture ideas.',
    captureIdea: 'Capture an idea...',

    // Subscriptions
    subsTitle: 'Subscription Sentinel',
    subsDesc: 'Manage your recurring digital life costs.',
    monthlyCost: 'Monthly Cost',
    nextBilling: 'Upcoming Billing',
    activeSubs: 'Active Subs',
    addSub: 'Add Sub',
    private: 'PRIVATE',

    // Social CRM
    socialTitle: 'Social Energy CRM',
    socialDesc: 'Track your relationships and energy impact.',
    maintenance: 'Maintenance Status',
    energyImpact: 'Energy Impact',
    overdue: 'Overdue',
    healthy: 'Healthy',
    daysAgo: 'days ago',
    recharging: 'Recharging',
    draining: 'Draining',
    neutral: 'Neutral',

    // Flow
    flowTitle: 'Flow Center',
    flowDesc: 'Your reading buffer. Catch now, read later.',
    inboxStatus: 'Unread',
    readingStatus: 'Reading',
    archivedStatus: 'Archived',
    readNow: 'Read Now',
    archive: 'Archive',
    moveToInbox: 'Move to Inbox',
  },
  zh: {
    // Sidebar
    home: '首页',
    inbox: '收集箱',
    notes: '笔记',
    mood: '心情',
    subs: '订阅',
    social: '人脉',
    flow: '流转',
    settings: '设置',
    workMode: '办公模式',
    lifeMode: '生活模式',
    deepWork: '深度工作',
    personal: '个人生活',

    // Dashboard
    helloCreator: '你好，创作者。',
    focusTime: '专注时刻。',
    analyzing: '分析中...',
    generateInsight: '生成日报',
    dailySummary: 'AI 每日总结',
    emotionalFlow: '情绪心流',
    past7Days: '过去 7 天',
    activeNotes: '活跃笔记',
    energyBank: '能量银行',
    recentActivity: '最近活动',
    viewAll: '查看全部',
    newNote: '新建笔记',

    // Mood
    howAreYou: '今天感觉如何？',
    reflect: '花点时间记录当下的感受。',
    rough: '糟糕',
    bad: '不好',
    okay: '一般',
    good: '不错',
    amazing: '超棒',
    addNotePlaceholder: '简单记录一下为什么会有这种感觉...',
    saveEntry: '保存记录',
    recentHistory: '最近记录',
    hiddenMood: '办公模式下心情模块已隐藏。',
    whoWith: '你和谁在一起？',

    // Inbox
    clearMind: '清空大脑，保持专注。',
    emptyInboxTitle: '当前没有待办。',
    emptyInboxDesc: '在下方输入以快速捕捉灵感。',
    captureIdea: '捕捉一个想法...',

    // Subscriptions
    subsTitle: '订阅哨兵',
    subsDesc: '管理你的数字生活经常性支出。',
    monthlyCost: '月度支出',
    nextBilling: '即将扣费',
    activeSubs: '活跃订阅',
    addSub: '添加订阅',
    private: '私密',

    // Social CRM
    socialTitle: '社交能量 CRM',
    socialDesc: '追踪你的人际关系维护与能量影响。',
    maintenance: '维护状态',
    energyImpact: '能量影响',
    overdue: '待联系',
    healthy: '健康',
    daysAgo: '天前',
    recharging: '充电',
    draining: '耗能',
    neutral: '中性',

    // Flow
    flowTitle: '稍后读流转',
    flowDesc: '你的阅读缓冲区。随时捕获，深度阅读。',
    inboxStatus: '未读',
    readingStatus: '在读',
    archivedStatus: '已归档',
    readNow: '开始阅读',
    archive: '归档',
    moveToInbox: '放回未读',
  }
};