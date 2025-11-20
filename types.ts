
export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  MOOD = 'MOOD',
  INBOX = 'INBOX',
  NOTES = 'NOTES',
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
  SOCIAL = 'SOCIAL',
  FLOW = 'FLOW',
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
  contactIds?: string[]; // Who were you with?
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

// New Feature: Subscription Sentinel
export interface SubscriptionItem {
  id: string;
  name: string;
  price: number;
  currency: 'CNY' | 'USD';
  cycle: 'monthly' | 'yearly';
  nextBillingDate: number;
  category: 'entertainment' | 'productivity' | 'utility' | 'life';
  isPrivate: boolean; // Hidden in Work Mode if true
  icon?: string; // URL or emoji
}

// New Feature: Social Energy CRM
export type ContactType = 'family' | 'friend' | 'colleague' | 'partner' | 'network';

export interface Contact {
  id: string;
  name: string;
  role: string; // e.g. "Mom", "Project Manager"
  avatar: string; // Emoji or URL
  type: ContactType;
  lastContactDate: number;
  frequencyTargetDays: number; // e.g. 7 means contact once a week
  isPrivate: boolean; // Hidden in Work Mode
}

// New Feature: Flow / Read-it-Later
export type FlowStatus = 'inbox' | 'reading' | 'archived';
export type FlowCategory = 'tech' | 'news' | 'entertainment' | 'social' | 'other';

export interface FlowItem {
    id: string;
    title: string;
    url: string;
    domain: string;
    status: FlowStatus;
    category: FlowCategory;
    timestamp: number;
    isPrivate: boolean; // Hidden in Work Mode (e.g. Bilibili, Entertainment)
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