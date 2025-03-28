import React from 'react';

import { Colors } from '../components/styles';
const { primary, tertiary } = Colors;

// React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import BottomTabs from './BottomTabs';
import WorkoutScreen from './../screens/WorkoutScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
// import RenderMap from './../screens/RenderMap';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        {/* <Stack.Screen name="RenderMap" component={RenderMap} /> */}
        
        <Stack.Screen
          options={{ headerTintColor: primary }}
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
