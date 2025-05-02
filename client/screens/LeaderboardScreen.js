import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const LeaderboardScreen = () => {
  const url = 'http://192.168.1.4:3000/user/leaderboard'; // padmesh wifi
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(url);

        console.log(response.data);
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
                source={require('../assets/img/—Pngtree—cartoon color simple male avatar_5230557.png')}
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
                source={require('../assets/img/—Pngtree—cartoon color simple male avatar_5230557.png')}
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
    backgroundColor: '#1f2937',
  },
  topContainer: {
    backgroundColor: '#6d28d9',
    paddingTop: 30,
    padding: 20,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    gap: 20,
    paddingBottom: 50,
  },
  headerTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
  },
  mainCardContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  mainCard: {
    backgroundColor: 'purple',
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
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  mainCardRankContainer: {
    backgroundColor: 'orange',
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -15,
  },
  mainCardRankContainerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardIndex: {
    color: 'white',
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 15,
  },
  cardTitle: {
    color: 'white',
    fontSize: 17,
  },
  cardRankContainer: {},
  cardRankTitle: {
    color: 'yellow',
  },
});

export default LeaderboardScreen;
