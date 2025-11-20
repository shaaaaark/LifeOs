export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  MOOD = 'MOOD',
  INBOX = 'INBOX',
  NOTES = 'NOTES',
  SETTINGS = 'SETTINGS'
}

export enum MoodLevel {
  TERRIBLE = 1,
  BAD = 2,
  NEUTRAL = 3,
  GOOD = 4,
  GREAT = 5
}

export enum NoteType {
  WORK = 'WORK',
  PRIVATE = 'PRIVATE'
}

export type Language = 'en' | 'zh';

export interface MoodEntry {
  id: string;
  level: MoodLevel;
  note: string;
  tags: string[];
  timestamp: number;
}

export interface NoteEntry {
  id: string;
  title: string;
  content: string;
  type: NoteType; // Used for Work Mode filtering
  timestamp: number;
  isPinned?: boolean;
}

export interface InboxItem {
  id: string;
  content: string; // Could be text or image URL
  type: 'text' | 'image' | 'link';
  timestamp: number;
  processed: boolean;
}

export interface UserSettings {
  workMode: boolean;
  userName: string;
  theme: 'dark' | 'light';
  language: Language;
}

export interface AIInsight {
  summary: string;
  sentiment: string;
  suggestion: string;
}