import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Button,
  Alert,
} from 'react-native';
import AccurateStepCounter from 'react-native-accurate-step-counter';
import { Colors } from '../components/styles';

const PedometerTracker = ({ distance, setDistance, selectedWorkout }) => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const isTrackingRef = useRef(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Unsupported',
        'Step tracking is only supported on Android devices with this feature.'
      );
      return;
    }

    const config = {
      default_threshold: 15.0,
      default_delay: 150000000,
      cheatInterval: 3000,
      onStepCountChange: (stepCount) => {
        setCurrentStepCount(stepCount);
        console.log('Steps: ', stepCount);
      },
      onCheat: () => {
        Alert.alert('Warning', 'Cheating detected!');
      },
    };

    const requestPermissionAndStart = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
      );
      console.log('Permission result: ', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        AccurateStepCounter.start(config);
        isTrackingRef.current = true;
      } else {
        console.warn('Permission denied for activity recognition');
      }
    };

    requestPermissionAndStart();

    return () => {
      if (isTrackingRef.current) {
        AccurateStepCounter.stop();
      }
    };
  }, []);

  const handleReset = () => {
    setCurrentStepCount(0);
  };

  const stepToKm = 0.0008;
  const distanceWalked = (currentStepCount * stepToKm).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live Step Tracking</Text>
      <Text style={styles.label}>
        Current session: {currentStepCount} steps
      </Text>
      <Text style={styles.label}>Distance walked: {distanceWalked} km</Text>
      <Text style={styles.label}>
        {selectedWorkout} goal: {distance} km
      </Text>
      <Button title="Reset Steps" onPress={handleReset} color={Colors.brand} />
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
