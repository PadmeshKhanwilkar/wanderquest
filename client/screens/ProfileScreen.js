import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from './../components/styles';
import { Avatar } from './../components/styles';
import { UserContext } from '../UserContext';

const { primary, secondary, tertiary, brand, green, red, darkLight } = Colors;

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Avatar
        resizeMode="cover"
        source={require('./../assets/img/cartoonAvatar.png')}
      />

      <Text style={styles.username}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.level}>Level 5 | 2,340 XP</Text>

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

      <Text style={styles.sectionTitle}>🏆 Achievements</Text>
      <View style={styles.achievementContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.badge}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.badge}
        />
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.badge}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: primary,
    paddingTop: 60,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: tertiary,
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: darkLight,
    marginTop: 2,
  },
  level: {
    fontSize: 16,
    color: brand,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: secondary,
    padding: 15,
    borderRadius: 10,
    width: 120,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: green,
  },
  statLabel: {
    fontSize: 14,
    color: darkLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: brand,
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
    backgroundColor: brand,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primary,
  },
  logoutButton: {
    backgroundColor: red,
  },
});

export default ProfileScreen;
