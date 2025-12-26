// app/splash.tsx
// Beautiful opening screen with the Quranic verse

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to home after 4 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FFD93D', '#FF9A56', '#355C7D', '#6C5B7B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* App Name */}
        <View style={styles.logoContainer}>
          <Text style={styles.appNameArabic}>اَشْکَار</Text>
          <Text style={styles.appNameEnglish}>ASHKAAR</Text>
        </View>

        {/* Quranic Verse */}
        <View style={styles.verseContainer}>
          <Text style={styles.verseArabic}>
            فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ
          </Text>
          <Text style={styles.verseArabic}>
            وَسَبِّحْ بِحَمْدِ رَبِّكَ بِالْعَشِيِّ وَالْإِبْكَارِ
          </Text>
          
          <Text style={styles.verseTranslation}>
            "So be patient. Indeed, the promise of Allah is truth.
          </Text>
          <Text style={styles.verseTranslation}>
            And exalt [Allah] with praise of your Lord
          </Text>
          <Text style={styles.verseTranslation}>
            in the evening and the morning."
          </Text>
          
          <Text style={styles.verseReference}>
            — Surah Ghafir 40:55
          </Text>
        </View>

        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <View style={styles.divider} />
          <Text style={styles.tagline}>
            Your Daily Companion for Remembrance
          </Text>
          <View style={styles.divider} />
        </View>
      </Animated.View>

      {/* Loading indicator */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingDot} />
        <View style={[styles.loadingDot, { marginLeft: 8 }]} />
        <View style={[styles.loadingDot, { marginLeft: 8 }]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 500,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appNameArabic: {
    fontSize: 64,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  appNameEnglish: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: 6,
  },
  verseContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 40,
  },
  verseArabic: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  verseTranslation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  verseReference: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '600',
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});