// app/(tabs)/explore.tsx
// Profile Screen with user settings navigation

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRTL } from "../../hooks/useRTL";

export default function ProfileScreen() {
  const { flexDirection } = useRTL();

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.placeholder} />

          <Text style={styles.appName}>عَشْکَار</Text>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push("/settings")}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.emoji}>👤</Text>
          <Text style={styles.title}>پروفائل</Text>
          <Text style={styles.subtitle}>Profile</Text>
        </View>
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.profileEmoji}>🕌</Text>
          <Text style={styles.profileTitle}>اسلامی اذکار</Text>
          <Text style={styles.profileSubtitle}>Islamic Remembrance App</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Morning Azkar</Text>
              <Text style={styles.statValue}>صبح کے اذکار</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Evening Azkar</Text>
              <Text style={styles.statValue}>شام کے اذکار</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.settingsCard}
          onPress={() => router.push("/settings")}
        >
          <View style={styles.settingsContent}>
            <Text style={styles.settingsEmoji}>⚙️</Text>
            <View style={styles.settingsTextContainer}>
              <Text style={styles.settingsTitle}>ایپ سیٹنگز</Text>
              <Text style={styles.settingsSubtitle}>App Settings</Text>
              <Text style={styles.settingsDescription}>
                زبان، ڈسپلے اور دیگر ترجیحات
              </Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    height: 44,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  appName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#e9d5ff",
    textAlign: "center",
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
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
    color: "#e9d5ff",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#c4b5fd",
    opacity: 0.8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileCard: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  profileEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e9d5ff",
    marginBottom: 4,
    textAlign: "center",
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#c4b5fd",
    marginBottom: 24,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#c4b5fd",
    marginBottom: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e9d5ff",
    textAlign: "center",
  },
  settingsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  settingsContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  settingsEmoji: {
    fontSize: 32,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e9d5ff",
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 12,
    color: "#c4b5fd",
    marginBottom: 4,
  },
  settingsDescription: {
    fontSize: 11,
    color: "#c4b5fd",
    opacity: 0.8,
  },
  arrow: {
    fontSize: 24,
    color: "#e9d5ff",
    fontWeight: "300",
  },
});
