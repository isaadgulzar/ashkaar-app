export interface AppTranslations {
  translation: string;
  benefits: string;
  references: string;
  repetitions: string;
  completed: string;
  transliteration: string;
  arabic: string;
  tapToIncrement: string;
  reset: string;
  details: string;
  settings: string;
  language: string;
  about: string;
  version: string;
  helpText: string;
}

export const APP_TRANSLATIONS: Record<string, AppTranslations> = {
  en: {
    translation: "Translation",
    benefits: "Benefits",
    references: "References",
    repetitions: "Repetitions",
    completed: "Completed",
    transliteration: "Transliteration",
    arabic: "Arabic",
    tapToIncrement: "Tap to Increment",
    reset: "Reset",
    details: "Details",
    settings: "Settings",
    language: "Language",
    about: "About",
    version: "Version",
    helpText: "Tap each card to count",
  },
  ur: {
    translation: "اردو ترجمہ",
    benefits: "فضیلت",
    references: "حوالہ جات",
    repetitions: "تعداد",
    completed: "مکمل",
    transliteration: "تلفظ",
    arabic: "عربی",
    tapToIncrement: "اضافہ کریں",
    reset: "دوبارہ شروع کریں",
    details: "تفصیل",
    settings: "ترتیبات",
    language: "زبان",
    about: "بارے میں",
    version: "ورژن",
    helpText: "ہر کارڈ پر ٹیپ کرکے شمار کریں",
  },
  hi: {
    translation: "अनुवाद",
    benefits: "लाभ",
    references: "संदर्भ",
    repetitions: "दोहराव",
    completed: "पूर्ण",
    transliteration: "लिप्यंतरण",
    arabic: "अरबी",
    tapToIncrement: "बढ़ाने के लिए टैप करें",
    reset: "रीसेट करें",
    details: "विवरण",
    settings: "सेटिंग्स",
    language: "भाषा",
    about: "के बारे में",
    version: "संस्करण",
    helpText: "गिनती के लिए प्रत्येक कार्ड पर टैप करें",
  },
  id: {
    translation: "Terjemahan",
    benefits: "Manfaat",
    references: "Referensi",
    repetitions: "Pengulangan",
    completed: "Selesai",
    transliteration: "Transliterasi",
    arabic: "Arab",
    tapToIncrement: "Ketuk untuk Menambah",
    reset: "Reset",
    details: "Detail",
    settings: "Pengaturan",
    language: "Bahasa",
    about: "Tentang",
    version: "Versi",
    helpText: "Ketuk setiap kartu untuk menghitung",
  },
  bn: {
    translation: "অনুবাদ",
    benefits: "উপকারিতা",
    references: "রেফারেন্স",
    repetitions: "পুনরাবৃত্তি",
    completed: "সম্পন্ন",
    transliteration: "প্রতিবর্ণীকরণ",
    arabic: "আরবি",
    tapToIncrement: "বৃদ্ধি করতে ট্যাপ করুন",
    reset: "রিসেট",
    details: "বিস্তারিত",
    settings: "সেটিংস",
    language: "ভাষা",
    about: "সম্পর্কে",
    version: "সংস্করণ",
    helpText: "গণনা করতে প্রতিটি কার্ডে ট্যাপ করুন",
  },
};

export function getAppTranslation(
  key: keyof AppTranslations,
  languageCode: string
): string {
  return (
    APP_TRANSLATIONS[languageCode]?.[key] ||
    APP_TRANSLATIONS["en"][key] ||
    APP_TRANSLATIONS["ur"][key] ||
    key
  );
}

// Hook for easy usage
export function useAppTranslations(currentLanguage: string) {
  return {
    t: (key: keyof AppTranslations) => getAppTranslation(key, currentLanguage),
    currentLanguage,
  };
}
