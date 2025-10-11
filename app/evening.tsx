// app/evening.tsx

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ZikrCard from '../components/zikr-card';
import { useAzkar } from '../hooks/use-azkar';

export default function EveningScreen() {
  const { azkar, loading, error, incrementCount, resetCount, resetAll } = useAzkar('evening');

  const completedCount = azkar.filter(z => (z.currentCount || 0) >= z.repetitions).length;
  const totalProgress = azkar.length > 0 ? (completedCount / azkar.length) * 100 : 0;

  if (loading) {
    return (
      <LinearGradient
        colors={['#355C7D', '#6C5B7B', '#F67280']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <ActivityIndicator size="large" color="#F67280" />
        <Text style={styles.loadingText}>لوڈ ہو رہا ہے...</Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#4c1d95']}
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
      colors={['#355C7D', '#6C5B7B', '#F67280']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.emoji}>🌙</Text>
          <Text style={styles.title}>شام کے اذکار</Text>
          <Text style={styles.subtitle}>Evening Azkar</Text>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressOverview}>
          <Text style={styles.progressText}>
            {completedCount} / {azkar.length}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${totalProgress}%` }]} />
          </View>
        </View>
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
              <TouchableOpacity style={styles.resetAllButtonPurple} onPress={resetAll}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#e9d5ff',
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
    color: '#e9d5ff',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#c4b5fd',
    opacity: 0.8,
  },
  progressOverview: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e9d5ff',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(233, 213, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F67280',
    borderRadius: 4,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#c4b5fd',
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
    color: '#c4b5fd',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e9d5ff',
  },
  resetAllButton: {
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  resetAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e9d5ff',
  },
  completionCard: {
    marginTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    padding: 36,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  completionEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e9d5ff',
    marginBottom: 8,
    textAlign: 'center',
  },
  completionSubtitle: {
    fontSize: 16,
    color: '#c4b5fd',
    textAlign: 'center',
    marginBottom: 24,
  },
  resetAllButtonPurple: {
    backgroundColor: '#F67280',
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