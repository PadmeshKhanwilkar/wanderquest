import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, StyledButton, ButtonText } from '../components/styles';
import PedometerTracker from '../components/PedometerTracker';

const WorkoutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [distance, setDistance] = useState('');

  // Function to open the modal with a selected workout type
  const openModal = (workoutType) => {
    setSelectedWorkout(workoutType);
    setModalVisible(true);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
      }}
    >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.brand, marginBottom: 20 }}>
        Workout Tracker
      </Text>
      <PedometerTracker />
      {/* Workout Buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '90%',
        }}
      >
        <WorkoutButton
          icon="bicycle"
          label="Cycling"
          onPress={() => openModal('Cycling')}
        />
        <WorkoutButton
          icon="walk"
          label="Walking"
          onPress={() => openModal('Walking')}
        />
        <WorkoutButton
          icon="footsteps"
          label="Running"
          onPress={() => openModal('Running')}
        />
      </View>

      {/* Modal for Distance Input */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>
              Enter Distance for {selectedWorkout}
            </Text>

            <TextInput
              style={modalStyles.input}
              placeholder="Enter distance in km"
              keyboardType="numeric"
              value={distance}
              onChangeText={setDistance}
            />

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              className="gap-3"
            >
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

// ✅ **Reusable Workout Button Component**
const WorkoutButton = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={buttonStyles.button}>
    <Ionicons name={icon} size={30} color={Colors.primary} />
    <Text style={buttonStyles.text}>{label}</Text>
  </TouchableOpacity>
);

// ✅ **Workout Button Styles**
const buttonStyles = {
  button: {
    backgroundColor: Colors.brand,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: Colors.primary,
    marginTop: 5,
    fontWeight: 'bold',
  },
};

// ✅ **Modal Styles**
const modalStyles = {
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
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.darkLight,
    borderRadius: 5,
    marginBottom: 15,
  },
};

export default WorkoutScreen;
