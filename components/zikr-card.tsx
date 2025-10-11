// components/dhikr-card.tsx
// Interactive dhikr card with progress tracking and details modal

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Zikr } from '../types/azkar';

const { width } = Dimensions.get('window');

interface ZikrCardProps {
  zikr: Zikr;
  onIncrement: () => void;
  onReset: () => void;
}

export default function ZikrCard({ zikr, onIncrement, onReset }: ZikrCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const currentCount = zikr.currentCount || 0;
  const progress = (currentCount / zikr.repetitions) * 100;
  const isCompleted = currentCount >= zikr.repetitions;

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
                  ? ['#10b981', '#059669']
                  : ['rgba(16, 185, 129, 0.3)', 'rgba(5, 150, 105, 0.3)']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.progressBar, { width: `${progress}%` }]}
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Arabic Text */}
            <Text style={styles.arabicText} numberOfLines={2}>
              {zikr.arabic}
            </Text>

            {/* Transliteration */}
            <Text style={styles.transliteration} numberOfLines={1}>
              {zikr.transliteration}
            </Text>

            {/* Counter */}
            <View style={styles.counterContainer}>
              <View style={styles.counterBadge}>
                <Text style={[styles.counterText, isCompleted && styles.completedText]}>
                  {currentCount} / {zikr.repetitions}
                </Text>
              </View>
              {isCompleted && (
                <Text style={styles.completedBadge}>✓ مکمل</Text>
              )}
            </View>
          </View>

          {/* Tap indicator */}
          {!isCompleted && (
            <View style={styles.tapIndicator}>
              <Text style={styles.tapText}>TAP</Text>
            </View>
          )}
        </BlurView>
      </TouchableOpacity>

      {/* Details Modal */}
      <Modal
        visible={showDetails}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDetails(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowDetails(false)}>
          <BlurView intensity={95} tint="dark" style={styles.modalBlur}>
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>تفصیل</Text>
                  <TouchableOpacity onPress={() => setShowDetails(false)}>
                    <Text style={styles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Arabic */}
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>عربی</Text>
                  <Text style={styles.modalArabic}>{zikr.arabic}</Text>
                </View>

                {/* Transliteration */}
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>تلفظ</Text>
                  <Text style={styles.modalTransliteration}>{zikr.transliteration}</Text>
                </View>

                {/* Urdu Translation */}
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>اردو ترجمہ</Text>
                  <Text style={styles.modalUrdu}>{zikr.urduTranslation}</Text>
                </View>

                {/* Fazilat */}
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>فضیلت</Text>
                  <Text style={styles.modalFazilat}>{zikr.fazilat}</Text>
                </View>

                {/* Repetitions */}
                <View style={styles.statsContainer}>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>تعداد</Text>
                    <Text style={styles.statValue}>{zikr.repetitions}×</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statLabel}>مکمل</Text>
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
                      <Text style={styles.resetButtonText}>🔄 دوبارہ شروع کریں</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </Pressable>
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
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  progressBar: {
    height: '100%',
    borderRadius: 24,
  },
  content: {
    padding: 24,
  },
  arabicText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: 36,
  },
  transliteration: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  counterText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  completedText: {
    color: '#059669',
  },
  completedBadge: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  tapIndicator: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tapText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    letterSpacing: 1.2,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBlur: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 28,
    padding: 28,
    maxHeight: '80%',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  closeButton: {
    fontSize: 28,
    color: '#9ca3af',
    fontWeight: '300',
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalArabic: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'right',
    lineHeight: 34,
  },
  modalTransliteration: {
    fontSize: 16,
    color: '#374151',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  modalUrdu: {
    fontSize: 18,
    color: '#1f2937',
    textAlign: 'right',
    lineHeight: 28,
  },
  modalFazilat: {
    fontSize: 15,
    color: '#059669',
    textAlign: 'right',
    lineHeight: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 12,
    borderRadius: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
  },
  actionButtons: {
    gap: 12,
  },
  incrementButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
});