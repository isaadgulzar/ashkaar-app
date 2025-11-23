import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7C4A2C",
        tabBarInactiveTintColor: "#B5793A",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          paddingBottom: 10,
          paddingTop: 10,
          height: 75,
          paddingHorizontal: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="person.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="morning"
        options={{
          href: null, // Hide from tab bar (don't show as a tab button, but show the tab bar itself)
        }}
      />
      <Tabs.Screen
        name="evening"
        options={{
          href: null, // Hide from tab bar (don't show as a tab button, but show the tab bar itself)
        }}
      />
      <Tabs.Screen
        name="after-prayer"
        options={{
          href: null, // Hide from tab bar (don't show as a tab button, but show the tab bar itself)
        }}
      />
    </Tabs>
  );
}
