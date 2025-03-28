import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Pedometer } from 'expo-sensors';
import { Colors } from '../components/styles';

const PedometerTracker = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    let pedometerSubscription;

    const startTracking = async () => {
      // 🚀 Request Motion & Fitness Permission
      const pedometerAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(pedometerAvailable);

      if (pedometerAvailable) {
        pedometerSubscription = Pedometer.watchStepCount((result) => {
          console.log('Steps Counted:', result.steps);
          setSteps(result.steps);
          setDistance((result.steps * 0.762).toFixed(2)); // 1 step ≈ 0.762 meters
        });
        setSubscription(pedometerSubscription);
      }

      // 🚀 Request Location Permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }
    };

    startTracking();

    return () => {
      if (pedometerSubscription) {
        pedometerSubscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step Tracker</Text>
      <Text style={styles.info}>
        Pedometer Available: {isPedometerAvailable ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.info}>Steps Taken: {steps}</Text>
      <Text style={styles.info}>Distance Covered: {distance} meters</Text>
    </View>
  );
};

// 📌 **Styles**
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.brand,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: Colors.tertiary,
    marginBottom: 5,
  },
});

export default PedometerTracker;
