// components/dhikr-card.tsx
// Interactive dhikr card with progress tracking and details modal

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDisplaySettings } from "../contexts/DisplaySettingsContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Zikr } from "../types/azkar";
import { HADITH_BOOKS } from "../types/hadith-books";
import { useAppTranslations } from "../utils/translations";

interface ZikrCardProps {
  zikr: Zikr;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export default function ZikrCard({
  zikr,
  onIncrement,
  onDecrement,
  onReset,
}: ZikrCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { getDisplayLanguage } = useLanguage();
  const { settings } = useDisplaySettings();
  const currentLanguage = getDisplayLanguage();
  const { t } = useAppTranslations(currentLanguage);

  // Check if current language is RTL
  const isRTLLanguage = currentLanguage === "ur" || currentLanguage === "ar";

  const currentCount = zikr.currentCount || 0;
  const progress = (currentCount / zikr.repetitions) * 100;
  const isCompleted = currentCount >= zikr.repetitions;

  // Get text in current language with fallbacks
  const getTranslation = (text: { [key: string]: string } | string) => {
    if (typeof text === "string") return text;
    if (!text || Object.keys(text).length === 0) return "";
    return (
      text[currentLanguage] ||
      text["en"] ||
      text["ur"] ||
      Object.values(text)[0] ||
      ""
    );
  };

  const getTransliteration = () => {
    if (!zikr.transliteration) return "";
    return (
      zikr.transliteration[currentLanguage] ||
      zikr.transliteration["en"] ||
      Object.values(zikr.transliteration)[0] ||
      ""
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={isCompleted ? undefined : onIncrement}
        onLongPress={() => setShowDetails(true)}
        activeOpacity={isCompleted ? 1 : 0.7}
      >
        <BlurView intensity={40} tint="light" style={styles.card}>
          {/* Progress Background */}
          <View style={styles.progressContainer}>
            <LinearGradient
              colors={
                isCompleted
                  ? ["#10b981", "#059669"]
                  : ["rgba(16, 185, 129, 0.3)", "rgba(5, 150, 105, 0.3)"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.progressBar, { width: `${progress}%` }]}
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Arabic Text - Always shown */}
            {settings.showArabic && (
              <Text style={[styles.arabicText, { textAlign: "right" }]}>
                {zikr.arabic}
              </Text>
            )}

            {/* Transliteration */}
            {settings.showTransliteration && getTransliteration() && (
              <Text style={styles.transliteration}>{getTransliteration()}</Text>
            )}

            {/* Translation */}
            {settings.showTranslation && (
              <Text
                style={[
                  styles.translationText,
                  { textAlign: isRTLLanguage ? "right" : "left" },
                ]}
              >
                {getTranslation(zikr.translations)}
              </Text>
            )}

            {/* Benefits */}
            {settings.showBenefits && (
              <Text
                style={[
                  styles.benefitsText,
                  { textAlign: isRTLLanguage ? "right" : "left" },
                ]}
              >
                {getTranslation(zikr.benefits)}
              </Text>
            )}

            {/* Counter */}
            <View style={styles.counterContainer}>
              <View style={styles.counterGroup}>
                {currentCount > 0 && (
                  <TouchableOpacity
                    style={styles.undoButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      onDecrement();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.undoIcon}>↺</Text>
                  </TouchableOpacity>
                )}
                <View style={styles.counterBadge}>
                  <Text
                    style={[
                      styles.counterText,
                      isCompleted && styles.completedText,
                    ]}
                  >
                    {currentCount} / {zikr.repetitions}
                  </Text>
                </View>
              </View>

              <View style={styles.rightSection}>
                {settings.showReferences &&
                  zikr.references &&
                  zikr.references.length > 0 && (
                    <View style={styles.referencesContainer}>
                      {/* First Column: Reference + More text */}
                      <View style={styles.referenceColumn}>
                        {/* First reference */}
                        {(() => {
                          const book = HADITH_BOOKS[zikr.references[0].bookId];
                          if (!book) return null;
                          return (
                            <Text style={styles.referencePreviewText}>
                              {currentLanguage === "ur" ||
                              currentLanguage === "ar"
                                ? book.arabicName.split(" ")[0]
                                : book.englishName.split(" ")[0]}
                              : {zikr.references[0].number}
                            </Text>
                          );
                        })()}

                        {/* More references text */}
                        {zikr.references.length > 1 && (
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              setShowDetails(true);
                            }}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.moreReferencesText}>
                              +{zikr.references.length - 1} more
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* Second Column: Info icon */}
                      <TouchableOpacity
                        style={styles.detailsIndicatorInline}
                        onPress={(e) => {
                          e.stopPropagation();
                          setShowDetails(true);
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.detailsIcon}>ⓘ</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                {/* Info icon when references are hidden or no references exist */}
                {(!settings.showReferences ||
                  !zikr.references ||
                  zikr.references.length === 0) && (
                  <TouchableOpacity
                    style={styles.detailsIndicatorInline}
                    onPress={(e) => {
                      e.stopPropagation();
                      setShowDetails(true);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.detailsIcon}>ⓘ</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          {/* Tap indicator - Commented out to prevent text overlap */}
          {/* {!isCompleted && (
            <View style={styles.tapIndicator}>
              <Text style={styles.tapText}>TAP</Text>
            </View>
          )} */}
        </BlurView>
      </TouchableOpacity>

      {/* Details Modal */}
      <Modal
        visible={showDetails}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDetails(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDetails(false)}
        >
          <BlurView intensity={95} tint="dark" style={styles.modalBlur}>
            <View style={styles.modalContent}>
              <ScrollView
                style={styles.modalScroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <Pressable onPress={(e) => e.stopPropagation()}>
                  <View style={{ padding: 28, paddingBottom: 40 }}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>{t("details")}</Text>
                      <TouchableOpacity onPress={() => setShowDetails(false)}>
                        <Text style={styles.closeButton}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Arabic - Only show if not displayed on card */}
                    {!settings.showArabic && (
                      <View style={styles.section}>
                        <Text style={styles.sectionLabel}>{t("arabic")}</Text>
                        <Text style={styles.modalArabic}>{zikr.arabic}</Text>
                      </View>
                    )}

                    {/* Transliteration - Only show if not displayed on card */}
                    {!settings.showTransliteration && getTransliteration() && (
                      <View style={styles.section}>
                        <Text style={styles.sectionLabel}>
                          {t("transliteration")}
                        </Text>
                        <Text style={styles.modalTransliteration}>
                          {getTransliteration()}
                        </Text>
                      </View>
                    )}

                    {/* Translation - Only show if not displayed on card */}
                    {!settings.showTranslation && (
                      <View style={styles.section}>
                        <Text style={styles.sectionLabel}>
                          {t("translation")}
                        </Text>
                        <Text
                          style={[
                            styles.modalUrdu,
                            { textAlign: isRTLLanguage ? "right" : "left" },
                          ]}
                        >
                          {getTranslation(zikr.translations)}
                        </Text>
                      </View>
                    )}

                    {/* Benefits */}
                    <View style={styles.section}>
                      <Text style={styles.sectionLabel}>{t("benefits")}</Text>
                      <Text
                        style={[
                          styles.modalBenefits,
                          { textAlign: isRTLLanguage ? "right" : "left" },
                        ]}
                      >
                        {getTranslation(zikr.benefits)}
                      </Text>
                    </View>

                    {/* References */}
                    {zikr.references && zikr.references.length > 0 && (
                      <View style={styles.section}>
                        <Text style={styles.sectionLabel}>
                          {t("references")}
                        </Text>
                        <View style={styles.modalReferencesContainer}>
                          {zikr.references.map((ref, index) => {
                            const book = HADITH_BOOKS[ref.bookId];
                            if (!book) return null;
                            return (
                              <View key={index} style={styles.referenceItem}>
                                <Text style={styles.referenceText}>
                                  {currentLanguage === "ur" ||
                                  currentLanguage === "ar"
                                    ? book.arabicName
                                    : book.englishName}
                                  : {ref.number}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    )}

                    {/* Repetitions */}
                    <View style={styles.statsContainer}>
                      <View style={styles.statBox}>
                        <Text style={styles.statLabel}>{t("repetitions")}</Text>
                        <Text style={styles.statValue}>
                          {zikr.repetitions}×
                        </Text>
                      </View>
                      <View style={styles.statBox}>
                        <Text style={styles.statLabel}>{t("completed")}</Text>
                        <Text style={styles.statValue}>
                          {currentCount}/{zikr.repetitions}
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                      {!isCompleted && (
                        <TouchableOpacity
                          style={styles.incrementButton}
                          onPress={() => {
                            onIncrement();
                            if (currentCount + 1 >= zikr.repetitions) {
                              setTimeout(() => setShowDetails(false), 500);
                            }
                          }}
                        >
                          <Text style={styles.buttonText}>👆 اضافہ کریں</Text>
                        </TouchableOpacity>
                      )}

                      {currentCount > 0 && (
                        <TouchableOpacity
                          style={styles.resetButton}
                          onPress={() => {
                            onReset();
                            setShowDetails(false);
                          }}
                        >
                          <Text style={styles.resetButtonText}>
                            🔄 دوبارہ شروع کریں
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </Pressable>
              </ScrollView>
            </View>
          </BlurView>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  progressContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  progressBar: {
    height: "100%",
    borderRadius: 24,
  },
  content: {
    padding: 24,
  },
  arabicText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "right",
    marginBottom: 8,
    lineHeight: 26,
  },
  transliteration: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
    fontStyle: "italic",
  },
  translationText: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 18,
  },
  benefitsText: {
    fontSize: 11,
    color: "#059669",
    marginBottom: 12,
    lineHeight: 16,
    fontStyle: "italic",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  counterBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    justifyContent: "center",
  },
  counterText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },
  completedText: {
    color: "#059669",
  },
  undoButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  undoIcon: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  referencesContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  referenceColumn: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  referencePreviewText: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 2,
  },
  moreReferencesText: {
    fontSize: 9,
    color: "#9ca3af",
    fontWeight: "500",
    marginTop: 1,
  },
  detailsIndicatorInline: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsIcon: {
    fontSize: 10,
    color: "#059669",
    fontWeight: "600",
  },
  tapIndicator: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tapText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
    letterSpacing: 1.2,
  },

  // Modal Styles
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
    maxHeight: "85%",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  modalScroll: {
    maxHeight: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },
  closeButton: {
    fontSize: 28,
    color: "#9ca3af",
    fontWeight: "300",
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  modalArabic: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "right",
    lineHeight: 28,
  },
  modalTransliteration: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
    lineHeight: 18,
  },
  modalUrdu: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  modalBenefits: {
    fontSize: 14,
    color: "#059669",
    lineHeight: 20,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 12,
    borderRadius: 12,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#059669",
  },
  actionButtons: {
    gap: 12,
  },
  incrementButton: {
    backgroundColor: "#10b981",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },
  referenceItem: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    padding: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#3b82f6",
    marginBottom: 4,
  },
  modalReferencesContainer: {
    gap: 4,
  },
  referenceText: {
    fontSize: 13,
    color: "#1e40af",
    fontWeight: "500",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
