import React from 'react';
import { StatusBar } from 'react-native';
import { Pressable, Text, StyleSheet, View } from 'react-native';

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/styles.js';

const Welcome = ({ navigation, route }) => {
  const { name, email } = route.params;

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require('./../assets/img/GymBarbellCloseUp.jpeg')}
        />
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome!</PageTitle>
          <SubTitle welcome={true}>{name || 'Dishita Parihar'}</SubTitle>
          <SubTitle welcome={true}>
            {email || 'dishitaparihar2008@gmail.com'}
          </SubTitle>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require('./../assets/img/cartoonAvatar.png')}
            />
            <Line />

            <Pressable
              style={styles.getStartedButton}
              onPress={() => {
                navigation.navigate('BottomTabs');
              }}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
            </Pressable>

            <StyledButton onPress={() => navigation.navigate('Login')}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

const styles = StyleSheet.create({
  getStartedButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#22c55e', // Tailwind's green-500
    marginTop: 16,
    marginBottom: 16,
  },
  getStartedText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Welcome;
