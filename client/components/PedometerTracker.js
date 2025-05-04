import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import AccurateStepCounter from 'react-native-accurate-step-counter';
import { Colors } from '../components/styles';

const PedometerTracker = ({ distance, setDistance, selectedWorkout }) => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const config = {
      default_threshold: 15.0,
      default_delay: 150000000,
      cheatInterval: 3000,
      onStepCountChange: (stepCount) => {
        setCurrentStepCount(stepCount);
      },
      onCheat: () => {
        console.log('Cheating detected!');
      },
    };

    const requestPermissionAndStart = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          AccurateStepCounter.start(config);
          setIsTracking(true);
        } else {
          console.warn('Permission denied for activity recognition');
        }
      }
    };

    requestPermissionAndStart();

    return () => {
      if (isTracking) {
        AccurateStepCounter.stop();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live Step Tracking</Text>
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
