// components/skeleton-loader.tsx
// Animated skeleton loading components

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

interface SkeletonCardProps {
  type?: 'morning' | 'evening' | 'after_prayer';
}

export function SkeletonCard({ type = 'morning' }: SkeletonCardProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const gradientColors = type === 'morning'
    ? ['#FFD93D', '#FF9A56', '#A8D8EA']
    : type === 'evening'
    ? ['#355C7D', '#6C5B7B', '#F67280']
    : ['#E3F2FD', '#90CAF9', '#42A5F5'];

  return (
    <View style={styles.cardWrapper}>
      <BlurView intensity={40} tint="light" style={styles.card}>
        <LinearGradient
          colors={gradientColors.map(color => `${color}20`)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.content}>
            {/* Arabic text skeleton */}
            <Animated.View
              style={[
                styles.textSkeleton,
                styles.arabicSkeleton,
                { opacity: shimmerOpacity }
              ]}
            />

            {/* Transliteration skeleton */}
            <Animated.View
              style={[
                styles.textSkeleton,
                styles.transliterationSkeleton,
                { opacity: shimmerOpacity }
              ]}
            />

            {/* Counter skeleton */}
            <View style={styles.counterRow}>
              <Animated.View
                style={[
                  styles.counterSkeleton,
                  { opacity: shimmerOpacity }
                ]}
              />
            </View>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
}

interface SkeletonLoaderProps {
  count?: number;
  type?: 'morning' | 'evening' | 'after_prayer';
}

export default function SkeletonLoader({ count = 3, type = 'morning' }: SkeletonLoaderProps) {
  const gradientColors = type === 'morning'
    ? ['#FFD93D', '#FF9A56', '#A8D8EA']
    : type === 'evening'
    ? ['#355C7D', '#6C5B7B', '#F67280']
    : ['#E3F2FD', '#90CAF9', '#42A5F5'];

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
    >
      {/* Header skeleton */}
      <View style={styles.header}>
        <View style={styles.backButtonSkeleton} />
        <View style={styles.headerContent}>
          <View style={styles.emojiSkeleton} />
          <View style={styles.titleSkeleton} />
          <View style={styles.subtitleSkeleton} />
        </View>
      </View>

      {/* Help text skeleton */}
      <View style={styles.helpSkeleton} />

      {/* Cards skeleton */}
      <View style={styles.listContent}>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} type={type} />
        ))}
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
  },
  backButtonSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 12,
  },
  emojiSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 8,
  },
  titleSkeleton: {
    width: 180,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 8,
  },
  subtitleSkeleton: {
    width: 120,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  helpSkeleton: {
    marginHorizontal: 20,
    marginBottom: 16,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    height: 160,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardGradient: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textSkeleton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 6,
  },
  arabicSkeleton: {
    height: 28,
    width: '80%',
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  transliterationSkeleton: {
    height: 16,
    width: '60%',
    marginBottom: 12,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  counterSkeleton: {
    width: 80,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});