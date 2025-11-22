// app/_layout.tsx
// Root layout

import { Stack } from 'expo-router';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { DisplaySettingsProvider } from '../contexts/DisplaySettingsContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <DisplaySettingsProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="admin" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </DisplaySettingsProvider>
    </LanguageProvider>
  );
}