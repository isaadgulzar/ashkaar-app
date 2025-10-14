import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { I18nManager } from "react-native";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isRTL?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "system", name: "System Default", nativeName: "System Default" },
  { code: "en", name: "English", nativeName: "English", isRTL: false },
  { code: "ur", name: "Urdu", nativeName: "اردو", isRTL: true },
  { code: "ar", name: "Arabic", nativeName: "العربية", isRTL: true },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", isRTL: false },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    isRTL: false,
  },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", isRTL: false },
];

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (languageCode: string) => Promise<void>;
  getSystemLanguage: () => string;
  getDisplayLanguage: () => string;
  isRTL: () => boolean;
  getCurrentLanguageInfo: () => Language | undefined;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>("system");

  const getSystemLanguage = (): string => {
    const locales = Localization.getLocales();
    const systemLanguage = locales[0]?.languageCode || "en";

    // Map system language to supported languages
    const supportedCodes = SUPPORTED_LANGUAGES.map((lang) => lang.code);
    return supportedCodes.includes(systemLanguage) ? systemLanguage : "en";
  };

  const getDisplayLanguage = (): string => {
    return currentLanguage === "system" ? getSystemLanguage() : currentLanguage;
  };

  const getCurrentLanguageInfo = (): Language | undefined => {
    const displayLang = getDisplayLanguage();
    return SUPPORTED_LANGUAGES.find((lang) => lang.code === displayLang);
  };

  const isRTL = (): boolean => {
    const langInfo = getCurrentLanguageInfo();
    return langInfo?.isRTL === true;
  };

  const setLanguage = async (languageCode: string): Promise<void> => {
    try {
      await AsyncStorage.setItem("selectedLanguage", languageCode);
      setCurrentLanguage(languageCode);

      // Update RTL layout direction
      const newLangInfo = SUPPORTED_LANGUAGES.find(
        (lang) => lang.code === languageCode
      );
      const shouldBeRTL =
        languageCode === "system"
          ? SUPPORTED_LANGUAGES.find(
              (lang) => lang.code === getSystemLanguage()
            )?.isRTL === true
          : newLangInfo?.isRTL === true;

      I18nManager.allowRTL(true);
      I18nManager.forceRTL(shouldBeRTL);
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("selectedLanguage");
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);

        // Set initial RTL state
        const langInfo = SUPPORTED_LANGUAGES.find(
          (lang) => lang.code === savedLanguage
        );
        const shouldBeRTL =
          savedLanguage === "system"
            ? SUPPORTED_LANGUAGES.find(
                (lang) => lang.code === getSystemLanguage()
              )?.isRTL === true
            : langInfo?.isRTL === true;

        I18nManager.allowRTL(true);
        I18nManager.forceRTL(shouldBeRTL);
      }
    } catch (error) {
      console.error("Error loading language preference:", error);
    }
  };

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    getSystemLanguage,
    getDisplayLanguage,
    isRTL,
    getCurrentLanguageInfo,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
