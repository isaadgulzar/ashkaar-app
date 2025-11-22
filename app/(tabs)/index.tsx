// app/(tabs)/index.tsx
// Home Screen - Main navigation with Morning and Evening Azkar cards

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import AppLogo from '../../components/app-logo';

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#FFD93D", "#FF9A56", "#A8D8EA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Logo */}
        {/* <AppLogo size={100} /> */}

        <Text style={styles.appTitle}>عَشْکَار</Text>
        <Text style={styles.appSubtitle}>ASHKAAR</Text>

        {/* Quranic Tagline */}
        <View style={styles.taglineBox}>
          <Text style={styles.taglineArabic}>
            وَسَبِّحْ بِحَمْدِ رَبِّكَ بِالْعَشِيِّ وَالْإِبْكَارِ
          </Text>
          <Text style={styles.taglineTranslation}>
            "Exalt [Allah] with praise in the evening and morning"
          </Text>
          <Text style={styles.taglineReference}>— Surah Ghafir 40:55</Text>
        </View>
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {/* Morning Card */}
        <Link href="/(tabs)/morning" asChild>
          <TouchableOpacity style={styles.cardWrapper} activeOpacity={0.85}>
            <BlurView intensity={50} tint="light" style={styles.card}>
              <LinearGradient
                colors={[
                  "rgba(255, 217, 61, 0.5)",
                  "rgba(255, 154, 86, 0.4)",
                  "rgba(168, 216, 234, 0.3)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <View style={styles.emojiSection}>
                    <Text style={styles.cardEmoji}>🌅</Text>
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardTitleUrdu}>صبح کے اذکار</Text>
                    <Text style={styles.cardTitleEng}>Morning Azkar</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>فجر کے بعد</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </Link>

        {/* Evening Card */}
        <Link href="/(tabs)/evening" asChild>
          <TouchableOpacity style={styles.cardWrapper} activeOpacity={0.85}>
            <BlurView intensity={50} tint="light" style={styles.card}>
              <LinearGradient
                colors={[
                  "rgba(53, 92, 125, 0.5)",
                  "rgba(108, 91, 123, 0.4)",
                  "rgba(246, 114, 128, 0.3)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardContent}>
                  <View style={styles.emojiSection}>
                    <Text style={styles.cardEmoji}>🌙</Text>
                  </View>
                  <View style={styles.textSection}>
                    <Text style={styles.cardTitleUrdu}>شام کے اذکار</Text>
                    <Text style={styles.cardTitleEng}>Evening Azkar</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>عصر کے بعد</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ہر ذکر کو ٹیپ کریں اور شمار کریں</Text>
        <Text style={styles.footerTextEng}>
          Tap each dhikr to count as you recite
        </Text>
      </View>

      {/* Admin Link (Hidden - for development) */}
      <Link href="/admin" asChild>
        <TouchableOpacity style={styles.adminLink}>
          <Text style={styles.adminText}>⚙️</Text>
        </TouchableOpacity>
      </Link>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 56,
    fontWeight: "700",
    color: "#7C4A2C",
    marginBottom: 4,
    marginTop: 16,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appSubtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#B5793A",
    marginBottom: 24,
    letterSpacing: 4,
  },
  taglineBox: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    maxWidth: width - 48,
  },
  taglineArabic: {
    fontSize: 18,
    color: "#7C4A2C",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "600",
    lineHeight: 28,
  },
  taglineTranslation: {
    fontSize: 13,
    color: "#B5793A",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 4,
    lineHeight: 20,
  },
  taglineReference: {
    fontSize: 11,
    color: "#B5793A",
    textAlign: "center",
    fontWeight: "600",
    opacity: 0.8,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    maxHeight: 180,
    minHeight: 160,
  },
  card: {
    flex: 1,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
  cardGradient: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  emojiSection: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 8,
  },
  cardEmoji: {
    fontSize: 60,
    lineHeight: 70,
  },
  cardTitleUrdu: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
    lineHeight: 32,
  },
  cardTitleEng: {
    fontSize: 13,
    color: "#4b5563",
    marginBottom: 10,
    fontWeight: "500",
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  footerText: {
    fontSize: 16,
    color: "#7C4A2C",
    textAlign: "center",
    marginBottom: 4,
  },
  footerTextEng: {
    fontSize: 13,
    color: "#B5793A",
    textAlign: "center",
    opacity: 0.8,
  },
  adminLink: {
    position: "absolute",
    top: 60,
    right: 20,
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
  adminText: {
    fontSize: 20,
  },
});
