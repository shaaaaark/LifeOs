import { MoodEntry, MoodLevel, NoteEntry, NoteType, InboxItem, Language } from './types';

export const MOCK_MOODS: MoodEntry[] = [
  { id: '1', level: MoodLevel.GOOD, note: 'Productive morning', tags: ['work', 'focus'], timestamp: Date.now() - 86400000 * 4 },
  { id: '2', level: MoodLevel.NEUTRAL, note: 'Tired afternoon', tags: ['health'], timestamp: Date.now() - 86400000 * 3 },
  { id: '3', level: MoodLevel.GREAT, note: 'Finished the project!', tags: ['achievement'], timestamp: Date.now() - 86400000 * 2 },
  { id: '4', level: MoodLevel.BAD, note: 'Stuck in traffic', tags: ['commute'], timestamp: Date.now() - 86400000 * 1 },
  { id: '5', level: MoodLevel.GOOD, note: 'Nice lunch with team', tags: ['social'], timestamp: Date.now() },
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

export const TRANSLATIONS = {
  en: {
    // Sidebar
    home: 'Home',
    inbox: 'Inbox',
    notes: 'Notes',
    mood: 'Mood',
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

    // Inbox
    clearMind: 'Clear your mind.',
    emptyInboxTitle: 'Your mind is clear.',
    emptyInboxDesc: 'Type below to capture ideas.',
    captureIdea: 'Capture an idea...',
  },
  zh: {
    // Sidebar
    home: '首页',
    inbox: '收集箱',
    notes: '笔记',
    mood: '心情',
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

    // Inbox
    clearMind: '清空大脑，保持专注。',
    emptyInboxTitle: '当前没有待办。',
    emptyInboxDesc: '在下方输入以快速捕捉灵感。',
    captureIdea: '捕捉一个想法...',
  }
};