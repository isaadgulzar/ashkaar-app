// app/admin.tsx
// Temporary screen to seed Firebase
// Access via: yourapp://admin or navigate manually

import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { seedFirestore } from '../scripts/seed-firebase';

export default function AdminScreen() {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);

  const handleSeed = async () => {
    Alert.alert(
      'Seed Database',
      'This will add all azkar to Firestore. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Seed',
          onPress: async () => {
            try {
              setLoading(true);
              await seedFirestore();
              setSeeded(true);
              Alert.alert('Success!', 'Database seeded successfully! ✅');
            } catch (error) {
              Alert.alert('Error', 'Failed to seed database. Check console.');
              console.error(error);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
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

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSeed}
          disabled={loading || seeded}
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
  note: {
    marginTop: 24,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 13,
  },
});