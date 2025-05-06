import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';

const Signup = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [dob, setDob] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => setShow(true);

  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://192.168.209.195:3000/user/signup';

    axios
      .post(url, credentials)
      .then((response) => {
        const { message, status, data } = response.data;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          navigation.navigate('Welcome', { ...data });
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
      });
  };

  const handleMessage = (msg, type = 'FAILED') => {
    setMessage(msg);
    setMessageType(type);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.title}>WANDERQUEST</Text>
      <Text style={styles.subtitle}>Account Signup</Text>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Formik
        initialValues={{
          name: '',
          email: '',
          dateOfBirth: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          values = { ...values, dateOfBirth: dob };
          if (
            !values.name ||
            !values.email ||
            !values.dateOfBirth ||
            !values.password ||
            !values.confirmPassword
          ) {
            handleMessage('Please fill all the fields');
            setSubmitting(false);
          } else if (values.password !== values.confirmPassword) {
            handleMessage('Passwords do not match');
            setSubmitting(false);
          } else {
            handleSignup(values, setSubmitting);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <View style={styles.formArea}>
            <MyTextInput
              label="Full Name"
              icon="person"
              placeholder="John Doe"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />

            <MyTextInput
              label="Email Address"
              icon="mail"
              placeholder="johndoe@gmail.com"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />

            <MyTextInput
              label="Date of Birth"
              icon="calendar"
              placeholder="YYYY-MM-DD"
              value={dob ? dob.toDateString() : ''}
              isDate={true}
              editable={false}
              showDatePicker={showDatePicker}
            />

            <MyTextInput
              label="Password"
              icon="lock"
              placeholder="* * * * * *"
              secureTextEntry={hidePassword}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              isPassword={true}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
            />

            <MyTextInput
              label="Confirm Password"
              icon="lock"
              placeholder="* * * * * *"
              secureTextEntry={hidePassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              isPassword={true}
              hidePassword={hidePassword}
              setHidePassword={setHidePassword}
            />

            {message !== '' && (
              <Text
                style={[
                  styles.msgBox,
                  messageType === 'FAILED' && styles.msgError,
                ]}
              >
                {message}
              </Text>
            )}

            {!isSubmitting ? (
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} disabled>
                <ActivityIndicator size="small" color="#fff" />
              </TouchableOpacity>
            )}

            <View style={styles.extraView}>
              <Text style={styles.l1}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Octicons
          name={icon}
          size={20}
          color="#6e6e6e"
          style={{ marginRight: 8 }}
        />
        {isDate ? (
          <TouchableOpacity style={{ flex: 1 }} onPress={showDatePicker}>
            <TextInput style={styles.input} {...props} editable={false} />
          </TouchableOpacity>
        ) : (
          <TextInput style={styles.input} {...props} />
        )}
        {isPassword && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? 'eye-off' : 'eye'}
              size={20}
              color="#6e6e6e"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#6d28d9',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  formArea: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 6,
    color: '#333',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  msgBox: {
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
  },
  msgError: {
    color: 'red',
  },
  extraView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },

  l1: {
    color: 'black',
  },
});

export default Signup;
