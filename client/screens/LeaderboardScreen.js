import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Colors } from '../components/styles'; // adjust path if needed

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const LeaderboardScreen = () => {
<<<<<<< HEAD
  // const url = 'http://192.168.1.4:3000/user/leaderboard'; // padmesh wifi
  const url = 'http://192.168.1.6:3000/user/leaderboard'; // 
=======
  const url = 'http://192.168.1.6:3000/user/leaderboard';
>>>>>>> 7b013c0e33e09735e430b11f278dea59e087b0be
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(url);
        setLeaderboard(response.data.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.mainCardContainer}>
          {topThree.map((user, index) => (
            <View
              key={index}
              style={[styles.mainCard, index !== 1 && { marginTop: 20 }]}
            >
              <Image
                style={styles.mainCardImage}
                source={require('../assets/img/cartoonAvatar.png')}
                resizeMode="cover"
              />
              <Text style={styles.mainCardTitle}>{user.name}</Text>
              <View style={styles.mainCardRankContainer}>
                <Text style={styles.mainCardRankContainerText}>
                  {index + 1}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <FlatList
        data={rest}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.cardDataContainer}>
              <Text style={styles.cardIndex}>{index + 4}</Text>
              <Image
                style={styles.cardImage}
                source={require('../assets/img/cartoonAvatar.png')}
                resizeMode="cover"
              />
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
            <View style={styles.cardRankContainer}>
              <Text style={styles.cardRankTitle}>{item.score}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
  },
  topContainer: {
    backgroundColor: brand,
    paddingTop: 30,
    padding: 20,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    gap: 20,
    paddingBottom: 50,
  },
  headerTitle: {
    textAlign: 'center',
    color: primary,
    fontSize: 21,
    fontWeight: 'bold',
  },
  mainCardContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  mainCard: {
    backgroundColor: secondary,
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    gap: 15,
    height: 175,
  },
  mainCardImage: {
    width: 70,
    height: 90,
    borderRadius: 20,
  },
  mainCardTitle: {
    color: tertiary,
    fontSize: 17,
    fontWeight: '600',
  },
  mainCardRankContainer: {
    backgroundColor: green,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -15,
  },
  mainCardRankContainerText: {
    color: primary,
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: secondary,
    backgroundColor: primary,
  },
  cardDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardIndex: {
    color: tertiary,
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 15,
  },
  cardTitle: {
    color: tertiary,
    fontSize: 17,
  },
  cardRankContainer: {},
  cardRankTitle: {
    color: brand,
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
