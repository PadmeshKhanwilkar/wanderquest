import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RenderMap from './../screens/RenderMap';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ChatScreen from '../screens/chatScreen';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Map') iconName = 'map-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          else if (route.name === 'Settings') iconName = 'settings-outline';
          else if (route.name === 'Workout') iconName = 'fitness-outline';
          else if (route.name === 'Leaderboard') iconName = 'trophy-outline';
          else if (route.name === 'ChatScreen')
            iconName = 'chatbubble-ellipses-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Map" component={RenderMap} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
