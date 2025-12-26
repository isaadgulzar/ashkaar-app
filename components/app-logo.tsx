// components/app-logo.tsx
// Dual gradient circle logo with Arabic calligraphy

import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

interface AppLogoProps {
  size?: number;
}

export default function AppLogo({ size = 120 }: AppLogoProps) {
  const containerSize = size;
  const borderRadius = size / 2;
  const innerCircleMargin = size * 0.15;
  const fontSize = size * 0.3;

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      {/* Sunrise half (left) */}
      <LinearGradient
        colors={['#FFD93D', '#FF9A56']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.half, 
          styles.leftHalf, 
          { 
            borderTopLeftRadius: borderRadius, 
            borderBottomLeftRadius: borderRadius 
          }
        ]}
      />
      
      {/* Sunset half (right) */}
      <LinearGradient
        colors={['#6C5B7B', '#F67280']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.half, 
          styles.rightHalf, 
          { 
            borderTopRightRadius: borderRadius, 
            borderBottomRightRadius: borderRadius 
          }
        ]}
      />
      
      {/* Center circle with text */}
      <View 
        style={[
          styles.centerContainer, 
          { 
            margin: innerCircleMargin,
            borderRadius: borderRadius
          }
        ]}
      >
        <Text style={[styles.arabicText, { fontSize: fontSize }]}>
          عَشْکَار
        </Text>
      </View>
      
      {/* Outer border */}
      <View 
        style={[
          styles.border, 
          { 
            width: containerSize, 
            height: containerSize, 
            borderRadius: borderRadius 
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
  },
  half: {
    width: '50%',
    height: '100%',
  },
  leftHalf: {
    // Left half with sunrise colors
  },
  rightHalf: {
    // Right half with sunset colors
  },
  centerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  arabicText: {
    fontWeight: '700',
    color: '#7C4A2C',
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
});