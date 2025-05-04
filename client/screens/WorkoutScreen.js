import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, StyledButton, ButtonText } from '../components/styles';
import PedometerTracker from '../components/PedometerTracker';

const WorkoutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [distance, setDistance] = useState('');

  const openModal = (workoutType) => {
    setSelectedWorkout(workoutType);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>

      <View style={styles.buttonRow}>
        <WorkoutButton
          icon="walk"
          label="Walking"
          onPress={() => openModal('Walking')}
        />
        <WorkoutButton
          icon="bicycle"
          label="Cycling"
          onPress={() => openModal('Cycling')}
        />
        <WorkoutButton
          icon="footsteps"
          label="Running"
          onPress={() => openModal('Running')}
        />
      </View>

      {(selectedWorkout === 'Walking' || selectedWorkout === 'Running') && (
        <PedometerTracker
          distance={distance}
          setDistance={setDistance}
          selectedWorkout={selectedWorkout}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Enter Distance for {selectedWorkout}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter distance in km"
              keyboardType="numeric"
              value={distance}
              onChangeText={setDistance}
            />

            <View style={styles.modalButtonRow}>
              <StyledButton onPress={() => setModalVisible(false)}>
                <ButtonText>Cancel</ButtonText>
              </StyledButton>
              <StyledButton
                onPress={() => {
                  console.log(`${selectedWorkout} for ${distance} km`);
                  setModalVisible(false);
                }}
              >
                <ButtonText>Start</ButtonText>
              </StyledButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Workout Button Component
const WorkoutButton = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={buttonStyles.button}>
    <Ionicons name={icon} size={30} color={Colors.primary} />
    <Text style={buttonStyles.text}>{label}</Text>
  </TouchableOpacity>
);

// Main Container Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '25%',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.brand,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.brand,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.darkLight,
    borderRadius: 5,
    marginBottom: 15,
    color: Colors.tertiary,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
  },
});

// Workout Button Styles
const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: Colors.brand,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  text: {
    color: Colors.primary,
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default WorkoutScreen;
