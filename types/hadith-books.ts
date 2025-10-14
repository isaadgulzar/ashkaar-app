export interface HadithBook {
  id: string;
  arabicName: string;
  englishName: string;
  baseUrl?: string; // For linking
  author: string;
}

export const HADITH_BOOKS: Record<string, HadithBook> = {
  bukhari: {
    id: "bukhari",
    arabicName: "صحيح البخاري",
    englishName: "Sahih Bukhari",
    baseUrl: "https://sunnah.com/bukhari",
    author: "Imam Bukhari",
  },
  muslim: {
    id: "muslim",
    arabicName: "صحيح مسلم",
    englishName: "Sahih Muslim",
    baseUrl: "https://sunnah.com/muslim",
    author: "Imam Muslim",
  },
  tirmidhi: {
    id: "tirmidhi",
    arabicName: "جامع الترمذي",
    englishName: "Tirmizi",
    baseUrl: "https://sunnah.com/tirmidhi",
    author: "Imam Tirmidhi",
  },
  abu_dawud: {
    id: "abu_dawud",
    arabicName: "سنن أبي داود",
    englishName: "Abu Dawood",
    baseUrl: "https://sunnah.com/abudawud",
    author: "Abu Dawud",
  },
  nasai: {
    id: "nasai",
    arabicName: "سنن النسائي",
    englishName: "Nasai",
    baseUrl: "https://sunnah.com/nasai",
    author: "Imam Nasai",
  },
  ibn_majah: {
    id: "ibn_majah",
    arabicName: "سنن ابن ماجه",
    englishName: "Ibn-e-Maja",
    baseUrl: "https://sunnah.com/ibnmajah",
    author: "Ibn Majah",
  },
  silsila: {
    id: "silsila",
    arabicName: "السلسلة الصحيحة",
    englishName: "Al Silsila Sahiha",
    author: "Al-Albani",
  },
  ahmad: {
    id: "ahmad",
    arabicName: "مسند أحمد",
    englishName: "Musnad Ahmed",
    author: "Imam Ahmad",
  },
  mishkat: {
    id: "mishkat",
    arabicName: "مشكاة المصابيح",
    englishName: "Mishkat-ul-Masabih",
    author: "Al-Tabrizi",
  },
  mustadrak: {
    id: "mustadrak",
    arabicName: "المستدرك على الصحيحين",
    englishName: "Mustadrak Haakim",
    author: "Al-Hakim",
  },
  muwatta: {
    id: "muwatta",
    arabicName: "موطأ الإمام مالك",
    englishName: "Muwatta Imam Malik",
    author: "Imam Malik",
  },
  darmi: {
    id: "darmi",
    arabicName: "سنن الدارمي",
    englishName: "Sunan Darmi",
    author: "Al-Darimi",
  },
  majma: {
    id: "majma",
    arabicName: "مجمع الزوائد",
    englishName: "Majma Uz Zawaid",
    author: "Al-Haythami",
  },
  ibn_khuzaymah: {
    id: "ibn_khuzaymah",
    arabicName: "صحيح ابن خزيمة",
    englishName: "Sahih Ibn-e-Khuzaymah",
    author: "Ibn Khuzaymah",
  },
  ibn_hibban: {
    id: "ibn_hibban",
    arabicName: "صحيح ابن حبان",
    englishName: "Sahih Ibn-e-Hibban",
    author: "Ibn Hibban",
  },
  musanaf: {
    id: "musanaf",
    arabicName: "المصنف لابن أبي شيبة",
    englishName: "Musanaf Ibn-e-Abi Shaiba",
    author: "Ibn Abi Shaybah",
  },
  nasai_kubra: {
    id: "nasai_kubra",
    arabicName: "السنن الكبرى للنسائي",
    englishName: "Sunan Al-Kubra An-Nasai",
    author: "Imam Nasai",
  },
};
