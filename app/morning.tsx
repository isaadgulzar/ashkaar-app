// app/morning.tsx

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SkeletonLoader from '../components/skeleton-loader';
import ZikrCard from '../components/zikr-card';
import { useAzkar } from '../hooks/use-azkar';

export default function MorningScreen() {
  const { azkar, loading, error, incrementCount, resetCount, resetAll } = useAzkar('morning');

  const completedCount = azkar.filter(z => (z.currentCount || 0) >= z.repetitions).length;

  if (loading) {
    return <SkeletonLoader count={5} type="morning" />;
  }

  if (error) {
    return (
      <LinearGradient
        colors={['#fef3c7', '#fde68a', '#fcd34d']}
        style={styles.container}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
            <Text style={styles.retryText}>دوبارہ کوشش کریں</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#FFD93D', '#FF9A56', '#A8D8EA']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.emoji}>🌅</Text>
          <Text style={styles.title}>صبح کے اذکار</Text>
          <Text style={styles.subtitle}>Morning Azkar</Text>
        </View>

        {/* Progress Overview - Commented out */}
        {/* <View style={styles.progressOverview}>
          <Text style={styles.progressText}>
            {completedCount} / {azkar.length}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${totalProgress}%` }]} />
          </View>
        </View> */}
      </View>

      {/* Help Text */}
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>ہر کارڈ پر ٹیپ کرکے شمار کریں</Text>
        <Text style={styles.helpTextEng}>Tap each card to count</Text>
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
              <TouchableOpacity style={styles.resetAllButtonGreen} onPress={resetAll}>
                <Text style={styles.resetAllTextWhite}>دوبارہ شروع کریں</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
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
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#7C4A2C',
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#7C4A2C',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#B5793A',
    opacity: 0.9,
  },
  progressOverview: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7C4A2C',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(124, 74, 44, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF9A56',
    borderRadius: 4,
  },
  helpContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C4A2C',
    marginBottom: 2,
  },
  helpTextEng: {
    fontSize: 12,
    color: '#B5793A',
    opacity: 0.8,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7C4A2C',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 40,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#7C4A2C',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C4A2C',
  },
  resetAllButton: {
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  resetAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C4A2C',
  },
  completionCard: {
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 36,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
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
    fontWeight: '700',
    color: '#7C4A2C',
    marginBottom: 8,
    textAlign: 'center',
  },
  completionSubtitle: {
    fontSize: 16,
    color: '#B5793A',
    textAlign: 'center',
    marginBottom: 24,
  },
  resetAllButtonGreen: {
    backgroundColor: '#FF9A56',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  resetAllTextWhite: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});