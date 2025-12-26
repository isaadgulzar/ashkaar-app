export interface HadithReference {
  bookId: string; // References HADITH_BOOKS key
  number: number;
  volume?: number; // Optional volume/book number
}

export interface Zikr {
  id: string;
  arabic: string;
  translations: {
    [languageCode: string]: string; // en, ur, hi, id, bn, etc.
  };
  transliteration?: {
    [languageCode: string]: string; // en, ur (optional for different scripts)
  };
  benefits: {
    [languageCode: string]: string;
  };
  repetitions: number;
  category: ("morning" | "evening" | "after_prayer")[]; // Array of categories
  order: number;
  references: HadithReference[];
  currentCount?: number; // For tracking user progress
}

export interface ZikrProgress {
  zikrId: string;
  count: number;
  completed: boolean;
  lastUpdated: Date;
}
