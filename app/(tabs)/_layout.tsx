import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
const items = useSelector((state) => state);

  console.log(items.lang.currentLocal.language);

  return (
    <View style={[items.lang.currentLocal.language == 'ar' ? { direction: 'rtl',flex:1 }:{flex:1}]}>

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="homeNavigatin"
        options={{
          title: items.lang.currentLocal.language == 'ar'?'الرئيسية':'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoriteNavigation"
        options={{
          title: items.lang.currentLocal.language == 'ar'?'المفضلة':'Favorite',

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'heart-outline' : 'heart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="catigouriesNavigation"
        options={{
          title: items.lang.currentLocal.language == 'ar'?'التصنيفات':'Categories',

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list-outline' : 'list-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="settingsNavigation"
        options={{
          title: 'Settings',
          title: items.lang.currentLocal.language == 'ar'?'الاعدادات':'Settings',

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings-outline' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
    </View>
  );
}
