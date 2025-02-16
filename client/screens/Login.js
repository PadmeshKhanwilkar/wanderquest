import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// force install if dependency conflicts between react and react-dom
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from './../components/styles.js';
import { View } from 'react-native';

// colors
const { brand, darkLight, primary } = Colors;

// Keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper.js';

// API client
import axios from 'axios';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require('./../assets/img/nature_11038476.png')}
          />

          <PageTitle>WANDERQUEST</PageTitle>

          <SubTitle>Account Login</SubTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate('Welcome');
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="johndoe@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MsgBox>...</MsgBox>

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>

                <Line />

                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText google={true}>Sign In with Google</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Sign Up</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'eye-off' : 'eye'}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
