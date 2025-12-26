// app/(tabs)/after-prayer.tsx

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DisplaySettingsModal from "../../components/DisplaySettingsModal";
import SkeletonLoader from "../../components/skeleton-loader";
import ZikrCard from "../../components/zikr-card";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAzkar } from "../../hooks/use-azkar";
import { useRTL } from "../../hooks/useRTL";
import { useAppTranslations } from "../../utils/translations";

export default function AfterPrayerScreen() {
  const {
    azkar,
    loading,
    error,
    incrementCount,
    decrementCount,
    resetCount,
    resetAll,
  } = useAzkar("after_prayer");
  const [showDisplaySettings, setShowDisplaySettings] = useState(false);
  const { flexDirection } = useRTL();
  const { getDisplayLanguage } = useLanguage();
  const { t } = useAppTranslations(getDisplayLanguage());

  const completedCount = azkar.filter(
    (z) => (z.currentCount || 0) >= z.repetitions
  ).length;

  if (loading) {
    return <SkeletonLoader count={5} type="after_prayer" />;
  }

  if (error) {
    return (
      <LinearGradient
        colors={["#e0f2fe", "#bae6fd", "#7dd3fc"]}
        style={styles.container}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => window.location.reload()}
          >
            <Text style={styles.retryText}>دوبارہ کوشش کریں</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#E3F2FD", "#90CAF9", "#42A5F5"]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <Text style={styles.appName}>عَشْکَار</Text>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowDisplaySettings(true)}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.emoji}>🕌</Text>
          <Text style={styles.title}>نماز کے بعد اذکار</Text>
          <Text style={styles.subtitle}>After Prayer Azkar</Text>
        </View>
      </View>

      {/* Help Text */}
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>{t("helpText")}</Text>
      </View>

      {/* Azkar List */}
      <FlatList
        data={azkar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ZikrCard
            zikr={item}
            onIncrement={() => incrementCount(item.id)}
            onDecrement={() => decrementCount(item.id)}
            onReset={() => resetCount(item.id)}
          />
        )}
        ListFooterComponent={
          azkar.length > 0 && completedCount < azkar.length ? (
            <TouchableOpacity style={styles.resetAllButton} onPress={resetAll}>
              <Text style={styles.resetAllText}>🔄 سب کو دوبارہ شروع کریں</Text>
            </TouchableOpacity>
          ) : completedCount === azkar.length ? (
            <View style={styles.completionCard}>
              <Text style={styles.completionEmoji}>✨</Text>
              <Text style={styles.completionTitle}>بہت خوب! مکمل ہو گیا</Text>
              <Text style={styles.completionSubtitle}>
                اللہ تعالیٰ آپ کی عبادت قبول فرمائے
              </Text>
              <TouchableOpacity
                style={styles.resetAllButtonGreen}
                onPress={resetAll}
              >
                <Text style={styles.resetAllTextWhite}>دوبارہ شروع کریں</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />

      {/* Display Settings Modal */}
      <DisplaySettingsModal
        visible={showDisplaySettings}
        onClose={() => setShowDisplaySettings(false)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  backIcon: {
    fontSize: 24,
    color: "#1565C0",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    height: 44,
  },
  appName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1565C0",
    textAlign: "center",
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  settingsIcon: {
    fontSize: 20,
  },
  headerContent: {
    alignItems: "center",
    marginBottom: 12,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1565C0",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#1976D2",
    opacity: 0.9,
  },
  helpContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  helpText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1565C0",
    textAlign: "center",
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  errorContainer: {
    alignItems: "center",
    padding: 40,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1565C0",
  },
  resetAllButton: {
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  resetAllText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1565C0",
  },
  completionCard: {
    marginTop: 12,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 36,
    borderRadius: 24,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  completionEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1565C0",
    marginBottom: 8,
    textAlign: "center",
  },
  completionSubtitle: {
    fontSize: 16,
    color: "#1976D2",
    textAlign: "center",
    marginBottom: 24,
  },
  resetAllButtonGreen: {
    backgroundColor: "#42A5F5",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  resetAllTextWhite: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
