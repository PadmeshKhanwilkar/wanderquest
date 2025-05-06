import React, { useState, useContext } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, StyledButton, ButtonText } from '../components/styles';
import PedometerTracker from '../components/PedometerTracker';
import { FitnessItems } from '../Context';
import FitnessCards from '../components/FitnessCards';

const WorkoutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [distance, setDistance] = useState('');
  const [showIcon, setShowIcon] = useState(false);
  const { calories, minutes, workout } = useContext(FitnessItems);

  const openModal = (workoutType) => {
    setSelectedWorkout(workoutType);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Workout Tracker</Text> */}

      {/* <View style={styles.buttonRow}>
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
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 1 }}>
        <View
          style={{
            backgroundColor: '#000000d7',
            paddingTop: 40,
            paddingHorizontal: 20,
            height: 160,
            width: '100%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 50,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
              SIX PACK IN 30 DAYS
            </Text>

            {/* Dark Mode  */}
            <TouchableOpacity onPress={() => setShowIcon(!showIcon)}>
              {showIcon ? (
                <Ionicons name="sunny" size={24} color="white" />
              ) : (
                <Ionicons name="moon" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>

          {/* Cards Row  */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}
          >
            {/* First Card  */}
            <View style={styles.shadowCards}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}
              >
                {calories.toFixed(2)}
              </Text>
              <Text style={{ color: 'black' }}>KCAL</Text>
            </View>

            {/* Second Card  */}
            <View style={styles.shadowCards}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}
              >
                {workout}
              </Text>
              <Text style={{ color: 'black' }}>WORKOUTS</Text>
            </View>

            {/* Third Card  */}
            <View style={styles.shadowCards}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}
              >
                {minutes}
              </Text>
              <Text style={{ color: 'black' }}>MINUTES</Text>
            </View>
          </View>
        </View>
        {/* Fitness Cards  */}
        <FitnessCards />
      </ScrollView>

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
    paddingTop: '15%',
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
  shadowCards: {
    backgroundColor: '#ffffff',
    width: '32%',
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
