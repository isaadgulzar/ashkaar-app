import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface DisplaySettings {
  showArabic: boolean;
  showTranslation: boolean;
  showTransliteration: boolean;
  showReferences: boolean;
  showBenefits: boolean;
}

const defaultSettings: DisplaySettings = {
  showArabic: true, // Always shown, disabled in UI
  showTranslation: true,
  showTransliteration: false,
  showReferences: false,
  showBenefits: true,
};

interface DisplaySettingsContextType {
  settings: DisplaySettings;
  updateSetting: (key: keyof DisplaySettings, value: boolean) => Promise<void>;
}

const DisplaySettingsContext = createContext<
  DisplaySettingsContextType | undefined
>(undefined);

interface DisplaySettingsProviderProps {
  children: ReactNode;
}

export function DisplaySettingsProvider({
  children,
}: DisplaySettingsProviderProps) {
  const [settings, setSettings] = useState<DisplaySettings>(defaultSettings);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("displaySettings");
      if (savedSettings) {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      }
    } catch (error) {
      console.error("Error loading display settings:", error);
    }
  };

  const updateSetting = async (key: keyof DisplaySettings, value: boolean) => {
    try {
      const newSettings = { ...settings, [key]: value };
      // Always keep Arabic as true
      if (key === "showArabic") {
        newSettings.showArabic = true;
      }
      setSettings(newSettings);
      await AsyncStorage.setItem(
        "displaySettings",
        JSON.stringify(newSettings)
      );
    } catch (error) {
      console.error("Error saving display settings:", error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const value: DisplaySettingsContextType = {
    settings,
    updateSetting,
  };

  return (
    <DisplaySettingsContext.Provider value={value}>
      {children}
    </DisplaySettingsContext.Provider>
  );
}

export function useDisplaySettings(): DisplaySettingsContextType {
  const context = useContext(DisplaySettingsContext);
  if (!context) {
    throw new Error(
      "useDisplaySettings must be used within a DisplaySettingsProvider"
    );
  }
  return context;
}
