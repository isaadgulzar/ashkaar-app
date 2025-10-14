export interface Zikr {
    id: string;
    arabic: string;
    transliteration: string;
    urduTranslation: string;
    repetitions: number;
    benefits: string;
    category: 'morning' | 'evening' | 'both';
    order: number;
    currentCount?: number; // For tracking user progress
  }
  
  export interface ZikrProgress {
    zikrId: string;
    count: number;
    completed: boolean;
    lastUpdated: Date;
  }