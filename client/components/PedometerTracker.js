import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { Colors } from '../components/styles';

const PedometerTracker = ({ distance, setDistance, selectedWorkout }) => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    let subscription;

    const requestPermissionAndSubscribe = async () => {
      if (Platform.OS === 'ios') {
        const { status } = await Pedometer.requestPermissionsAsync();
        if (status !== 'granted') {
          setIsPedometerAvailable('Permission denied');
          return;
        }
      } else if (Platform.OS === 'android') {
        const { status } = await Pedometer.requestPermissionsAsync();
        if (status !== 'granted') {
          setIsPedometerAvailable('Permission denied');
          return;
        }
      }

      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (isAvailable) {
        if (Platform.OS === 'ios') {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 1);

          try {
            const result = await Pedometer.getStepCountAsync(start, end);
            setPastStepCount(result.steps);
          } catch (err) {
            console.error('Error fetching past step count:', err);
            setPastStepCount(0);
          }
        }

        // Watch step count for both platforms
        subscription = Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result.steps);
        });
      }
    };

    requestPermissionAndSubscribe();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live Step Tracking</Text>
      <Text style={styles.label}>
        Pedometer available: {isPedometerAvailable}
      </Text>
      {Platform.OS === 'ios' && (
        <Text style={styles.label}>Past 24 hrs: {pastStepCount} steps</Text>
      )}
      <Text style={styles.label}>
        Current session: {currentStepCount} steps
      </Text>
      <Text style={styles.label}>
        {selectedWorkout} goal: {distance} km
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: Colors.tertiary,
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brand,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.darkLight,
    marginBottom: 5,
  },
});

export default PedometerTracker;
