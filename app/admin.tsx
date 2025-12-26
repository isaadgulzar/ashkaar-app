// app/admin.tsx
// Temporary screen to seed Firebase
// Access via: yourapp://admin or navigate manually

import { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { seedFirestore } from '../scripts/seed-firebase';
import { db } from '../config/firebase';

export default function AdminScreen() {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    // Check if Firebase is initialized
    try {
      if (db) {
        console.log('✅ Firebase initialized successfully');
        setFirebaseReady(true);
      } else {
        console.error('❌ Firebase db is undefined');
      }
    } catch (error) {
      console.error('❌ Firebase initialization error:', error);
    }
  }, []);

  const handleSeed = async () => {
    console.log('🔘 Seed button clicked');
    console.log('📊 Current state:', { loading, seeded, firebaseReady });

    if (!firebaseReady) {
      console.warn('⚠️ Firebase not ready, button should be disabled');
      Alert.alert('Error', 'Firebase is not initialized. Please check your configuration.');
      return;
    }

    // For web, use window.confirm since Alert doesn't work the same way
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('This will add all azkar to Firestore. Continue?');
      console.log('💬 User confirmation:', confirmed);

      if (!confirmed) {
        console.log('❌ User cancelled seed');
        return;
      }

      console.log('✅ User confirmed seed (web)');
      try {
        setLoading(true);
        console.log('🚀 Starting seed process...');
        await seedFirestore();
        console.log('✅ Seed completed successfully');
        setSeeded(true);
        window.alert('Database seeded successfully! ✅');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Seed error:', error);
        window.alert(`Failed to seed database: ${errorMessage}`);
      } finally {
        setLoading(false);
        console.log('🏁 Seed process finished');
      }
    } else {
      // For native platforms, use Alert
      Alert.alert(
        'Seed Database',
        'This will add all azkar to Firestore. Continue?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => console.log('❌ User cancelled seed') },
          {
            text: 'Yes, Seed',
            onPress: async () => {
              console.log('✅ User confirmed seed');
              try {
                setLoading(true);
                console.log('🚀 Starting seed process...');
                await seedFirestore();
                console.log('✅ Seed completed successfully');
                setSeeded(true);
                Alert.alert('Success!', 'Database seeded successfully! ✅');
              } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error('❌ Seed error:', error);
                Alert.alert('Error', `Failed to seed database: ${errorMessage}`);
              } finally {
                setLoading(false);
                console.log('🏁 Seed process finished');
              }
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔧 Admin Panel</Text>
      <Text style={styles.subtitle}>Firebase Database Setup</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seed Azkar Data</Text>
        <Text style={styles.cardDescription}>
          This will populate your Firestore with 12 morning and evening azkar including:
        </Text>
        <Text style={styles.list}>
          • Ayatul Kursi{'\n'}
          • Morning/Evening Protection{'\n'}
          • Tasbeehat (33-33-34){'\n'}
          • Qul Huwallahu Ahad (3x){'\n'}
          • Mu'awwidhatayn (3x each){'\n'}
          • And more...
        </Text>

        {!firebaseReady && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ Firebase not initialized. Check your .env configuration.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, (loading || !firebaseReady) && styles.buttonDisabled]}
          onPress={handleSeed}
          disabled={loading || seeded || !firebaseReady}
        >
          <Text style={styles.buttonText}>
            {loading ? '⏳ Seeding...' : seeded ? '✅ Seeded!' : '🌱 Seed Database'}
          </Text>
        </TouchableOpacity>

        {seeded && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              ✅ Database seeded successfully!{'\n'}
              You can now navigate to Morning or Evening Azkar screens.
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.note}>
        💡 Run this only once. Check Firestore Console to verify data.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  cardDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
    lineHeight: 22,
  },
  list: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
    marginBottom: 24,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  successBox: {
    marginTop: 20,
    backgroundColor: '#d1fae5',
    padding: 16,
    borderRadius: 8,
  },
  successText: {
    color: '#065f46',
    fontSize: 14,
    lineHeight: 20,
  },
  warningBox: {
    marginBottom: 16,
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
  },
  warningText: {
    color: '#92400e',
    fontSize: 14,
    lineHeight: 20,
  },
  note: {
    marginTop: 24,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 13,
  },
});