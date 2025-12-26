import { BlurView } from "expo-blur";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DisplaySettings,
  useDisplaySettings,
} from "../contexts/DisplaySettingsContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAppTranslations } from "../utils/translations";

interface DisplaySettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DisplaySettingsModal({
  visible,
  onClose,
}: DisplaySettingsModalProps) {
  const { settings, updateSetting } = useDisplaySettings();
  const { getDisplayLanguage } = useLanguage();
  const { t } = useAppTranslations(getDisplayLanguage());

  const settingOptions = [
    {
      key: "showArabic" as keyof DisplaySettings,
      label: t("arabic"),
      description: "Arabic text (always required)",
      disabled: true, // Always must be shown
    },
    {
      key: "showTranslation" as keyof DisplaySettings,
      label: t("translation"),
      description: "Translation in selected language",
      disabled: false,
    },
    {
      key: "showBenefits" as keyof DisplaySettings,
      label: t("benefits"),
      description: "Benefits and virtues",
      disabled: false,
    },
    {
      key: "showTransliteration" as keyof DisplaySettings,
      label: t("transliteration"),
      description: "Pronunciation guide",
      disabled: false,
    },
    {
      key: "showReferences" as keyof DisplaySettings,
      label: t("references"),
      description: "Hadith book references",
      disabled: false,
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <BlurView intensity={95} tint="dark" style={styles.modalBlur}>
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Display Settings</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>
              Choose what to show on zikr cards. Hidden content will appear in
              details.
            </Text>

            <View style={styles.optionsList}>
              {settingOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionItem,
                    option.disabled && styles.disabledOption,
                  ]}
                  onPress={() =>
                    !option.disabled &&
                    updateSetting(option.key, !settings[option.key])
                  }
                  disabled={option.disabled}
                  activeOpacity={option.disabled ? 1 : 0.7}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.optionText}>
                      <Text
                        style={[
                          styles.optionLabel,
                          option.disabled && styles.disabledText,
                        ]}
                      >
                        {option.label}
                      </Text>
                      <Text
                        style={[
                          styles.optionDescription,
                          option.disabled && styles.disabledText,
                        ]}
                      >
                        {option.description}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.checkbox,
                        settings[option.key] && styles.checkedBox,
                        option.disabled && styles.disabledCheckbox,
                      ]}
                    >
                      {settings[option.key] && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </BlurView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBlur: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 28,
    padding: 28,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(107, 114, 128, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#6b7280",
    fontWeight: "300",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    lineHeight: 20,
  },
  optionsList: {
    gap: 12,
  },
  optionItem: {
    borderRadius: 16,
    overflow: "hidden",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 16,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: "#6b7280",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#d1d5db",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  disabledOption: {
    opacity: 0.6,
  },
  disabledCheckbox: {
    borderColor: "#e5e7eb",
    backgroundColor: "#f3f4f6",
  },
  disabledText: {
    color: "#9ca3af",
  },
});
