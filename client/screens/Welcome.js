import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

// force install if dependency conflicts between react and react-dom
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

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

import { Pressable, Text } from 'react-native';

const Welcome = ({ navigation, route }) => {
  const { name, email } = route.params;
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require('./../assets/img/Gym Barbell Close-Up.jpeg')}
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
              source={require('./../assets/img/—Pngtree—cartoon color simple male avatar_5230557.png')}
            />
            <Line />

            <Pressable
              className="p-5 rounded-xl bg-green-500"
              onPress={() => {
                // navigation.navigate('RenderMap');
                navigation.navigate('BottomTabs');
              }}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Get Started
              </Text>
            </Pressable>

            <StyledButton
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
