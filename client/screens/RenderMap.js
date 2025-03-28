import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function RenderMap() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    }

    getCurrentLocation();
  }, []);

  return (
    <>
      <View>
        <Text className="pt-14 pb-6 border-b-6 border-b-black text-center text-xl text-white bg-purple-500 font-semibold">
          Your journey
        </Text>
      </View>

      <View style={styles.container}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005, // Zoom in to a small area
              longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
          />
        ) : (
          <ActivityIndicator size="large" color="blue" className="mt-10" />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
