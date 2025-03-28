import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';

export default function RenderMap() {
  const [location, setLocation] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isChoosingSource, setIsChoosingSource] = useState(false);
  const [isChoosingDestination, setIsChoosingDestination] = useState(false);

  const defaultLocation = {
    latitude: 23.1455,
    longitude: -75.7937,
    latitudeDelta: 0.01, // Zoom in to a small area
    longitudeDelta: 0.01,
  };

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

  function handleMapPress(e) {
    const coordinates = e.nativeEvent.coordinate;
  }

  return (
    <>
      <View>
        <Text className="pt-14 pb-6 border-b-6 border-b-black text-center text-xl text-white bg-purple-500 font-semibold">
          Your journey
        </Text>
      </View>

      <View style={styles.container}>
        {location ? (
          <View>
            <MapView
              style={styles.map}
              region={location}
              showsUserLocation={true}
              showUserLocation={true}
              onPress={handleMapPress}
            />
            <Marker
              coordinate={location}
              title={'testing'}
              // description={marker.description}
            />
          </View>
        ) : (
          <ActivityIndicator size="large" color="blue" className="mt-10" />
        )}
      </View>
      <View>
        <View className="flex-row w-full gap-1 py-1 px-3">
          <Pressable
            className="flex-1 items-center bg-blue-500 p-4 rounded-lg"
            onPress={() => setIsChoosingSource(true)}
          >
            <Text className="text-white text-lg">
              {isChoosingSource ? 'Remove Source' : 'Choose Source'}
            </Text>
          </Pressable>
          <Pressable
            className="flex-1 items-center bg-blue-500 p-4 rounded-lg"
            onPress={() => setIsChoosingDestination(true)}
          >
            <Text className="text-white text-lg">
              {isChoosingDestination
                ? 'Remove Destination'
                : 'Choose Destination'}
            </Text>
          </Pressable>
        </View>
        <View className="flex-row w-full gap-1 py-1 px-3">
          <Pressable className="flex-1 items-center bg-slate-500 p-4 rounded-lg">
            <Text className="text-white text-lg">5 kilometers</Text>
          </Pressable>
        </View>
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
