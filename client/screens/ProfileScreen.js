import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/styles.js';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* User Avatar */}
      <WelcomeImage
        source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual profile picture
        // style={styles.avatar}
      />

      {/* Username & Level */}
      <Text style={styles.username}>Wanderer_123</Text>
      <Text style={styles.level}>Level 5 | 2,340 XP</Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>15,200</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>10.5 km</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>
      </View>

      {/* Achievements Section */}
      <Text style={styles.sectionTitle}>🏆 Achievements</Text>
      <View style={styles.achievementContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.badge} />
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.badge} />
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.badge} />
      </View>

      {/* Profile Actions */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121212', // Dark theme
    paddingTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFD700', // Gold color for premium touch
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  level: {
    fontSize: 16,
    color: '#aaa',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    width: 120,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  achievementContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  badge: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#FFD700',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF4500',
  },
});

export default ProfileScreen;
