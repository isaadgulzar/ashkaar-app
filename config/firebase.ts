import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const required = ['apiKey', 'projectId', 'appId'];
  const missing = required.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

  if (missing.length > 0) {
    console.error('❌ Missing Firebase configuration:', missing);
    console.error('💡 Please check your .env file and ensure these variables are set:');
    missing.forEach(key => {
      console.error(`   - FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`);
    });
    throw new Error(`Missing Firebase configuration: ${missing.join(', ')}`);
  }
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;

try {
  validateFirebaseConfig();
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw error;
}

export { db };
export default app;
