import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Pedometer } from 'expo-sensors';
import { Colors } from '../components/styles';

const PedometerTracker = ({ setDistance, distance }) => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    let pedometerSubscription;

    const startTracking = async () => {
      const pedometerAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(pedometerAvailable);

      if (pedometerAvailable) {
        pedometerSubscription = Pedometer.watchStepCount((result) => {
          console.log('Steps Counted:', result.steps);
          setSteps(result.steps);
          setDistance((result.steps * 0.762).toFixed(2)); // Update distance
        });
      }

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
  }, [setDistance]); // ✅ Dependency Fix

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step Tracker</Text>
      <Text style={styles.info}>
        Pedometer Available: {isPedometerAvailable ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.info}>Steps Taken: {steps}</Text>
      <Text style={styles.info}>Distance Covered: {distance || 0} meters</Text>
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
