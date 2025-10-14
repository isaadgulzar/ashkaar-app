import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SUPPORTED_LANGUAGES, useLanguage } from "../contexts/LanguageContext";
import { useAppTranslations } from "../utils/translations";

export default function SettingsScreen() {
  const { currentLanguage, setLanguage, getDisplayLanguage } = useLanguage();
  const { t } = useAppTranslations(getDisplayLanguage());

  const handleLanguageSelect = (languageCode: string) => {
    Alert.alert(
      "Change Language",
      `Switch to ${
        SUPPORTED_LANGUAGES.find((lang) => lang.code === languageCode)?.name
      }?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Change",
          onPress: async () => {
            await setLanguage(languageCode);
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#f0f9ff", "#e0f2fe", "#bae6fd"]}
      style={styles.container}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t("settings")}</Text>

        {/* Language Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("language")} / زبان</Text>
          <Text style={styles.sectionDescription}>
            Choose your preferred language for translations and benefits
          </Text>

          <View style={styles.languageList}>
            {SUPPORTED_LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  currentLanguage === language.code && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <BlurView
                  intensity={40}
                  tint="light"
                  style={[
                    styles.languageCard,
                    currentLanguage === language.code && styles.selectedCard,
                  ]}
                >
                  <View style={styles.languageInfo}>
                    <Text
                      style={[
                        styles.languageName,
                        currentLanguage === language.code &&
                          styles.selectedText,
                      ]}
                    >
                      {language.name}
                    </Text>
                    <Text
                      style={[
                        styles.languageNative,
                        currentLanguage === language.code &&
                          styles.selectedNativeText,
                      ]}
                    >
                      {language.nativeName}
                    </Text>
                    {language.code === "system" && (
                      <Text style={styles.systemInfo}>
                        Current:{" "}
                        {
                          SUPPORTED_LANGUAGES.find(
                            (lang) => lang.code === getDisplayLanguage()
                          )?.name
                        }
                      </Text>
                    )}
                  </View>

                  {currentLanguage === language.code && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Language Info */}
        <View style={styles.section}>
          <BlurView intensity={30} tint="light" style={styles.infoCard}>
            <Text style={styles.infoTitle}>Current Language</Text>
            <Text style={styles.infoText}>
              {
                SUPPORTED_LANGUAGES.find(
                  (lang) => lang.code === getDisplayLanguage()
                )?.name
              }
            </Text>
            <Text style={styles.infoNative}>
              {
                SUPPORTED_LANGUAGES.find(
                  (lang) => lang.code === getDisplayLanguage()
                )?.nativeName
              }
            </Text>
          </BlurView>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("about")}</Text>
          <BlurView intensity={30} tint="light" style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Ashkar App provides authentic Islamic supplications (Azkar) with
              translations in multiple languages. All content is sourced from
              authentic Hadith collections.
            </Text>
            <Text style={styles.version}>{t("version")} 1.0.0</Text>
          </BlurView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  languageList: {
    gap: 12,
  },
  languageOption: {
    borderRadius: 16,
    overflow: "hidden",
  },
  languageCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 16,
  },
  selectedCard: {
    borderColor: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  systemInfo: {
    fontSize: 12,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  selectedText: {
    color: "#059669",
  },
  selectedNativeText: {
    color: "#10b981",
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedLanguage: {
    transform: [{ scale: 1.02 }],
  },
  infoCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.6)",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  infoNative: {
    fontSize: 20,
    color: "#10b981",
    fontWeight: "500",
  },
  aboutCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  aboutText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 12,
    textAlign: "center",
  },
  version: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    fontWeight: "500",
  },
});
