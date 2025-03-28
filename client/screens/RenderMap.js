import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

export default function RenderMap() {
  const [location, setLocation] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isChoosingSource, setIsChoosingSource] = useState(false);
  const [isChoosingDestination, setIsChoosingDestination] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }

    getCurrentLocation();
  }, []);

  // Separate useEffect for distance calculation
  useEffect(() => {
    if (source && destination) {
      const dist =
        getDistance(
          { latitude: source.latitude, longitude: source.longitude },
          { latitude: destination.latitude, longitude: destination.longitude }
        ) / 1000; // Convert meters to kilometers

      setDistance(dist.toFixed(2)); // Round to 2 decimal places
    } else {
      setDistance(null);
    }
  }, [source, destination]);

  function handleMapPress(e) {
    const coordinates = e.nativeEvent.coordinate;
    if (isChoosingSource) {
      setSource(coordinates);
      setIsChoosingSource(false);
    } else if (isChoosingDestination) {
      setDestination(coordinates);
      setIsChoosingDestination(false);
    }
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
          <MapView
            style={styles.map}
            region={location}
            showsUserLocation={true}
            onPress={handleMapPress}
          >
            <Marker coordinate={location} title="Your Location" />
            {source && (
              <Marker
                coordinate={source}
                title="Source"
                pinColor="green"
                draggable={true}
                onDragEnd={(e) => setSource(e.nativeEvent.coordinate)}
              />
            )}
            {destination && (
              <Marker
                coordinate={destination}
                title="Destination"
                pinColor="blue"
                draggable={true}
                onDragEnd={(e) => setDestination(e.nativeEvent.coordinate)}
              />
            )}
            {source && destination && (
              <Polyline
                coordinates={[source, destination]}
                strokeColor="#000"
                strokeWidth={2}
              />
            )}
          </MapView>
        ) : (
          <ActivityIndicator
            size="large"
            color="blue"
            style={{ marginTop: 10 }}
          />
        )}
      </View>

      <View>
        <View className="flex-row w-full gap-1 py-1 px-3">
          <Pressable
            className="flex-1 items-center bg-blue-500 p-4 rounded-lg"
            onPress={() => setIsChoosingSource(!isChoosingSource)}
          >
            <Text className="text-white text-lg">
              {isChoosingSource ? 'Cancel' : 'Choose Source'}
            </Text>
          </Pressable>
          <Pressable
            className="flex-1 items-center bg-blue-500 p-4 rounded-lg"
            onPress={() => setIsChoosingDestination(!isChoosingDestination)}
          >
            <Text className="text-white text-lg">
              {isChoosingDestination ? 'Cancel' : 'Choose Destination'}
            </Text>
          </Pressable>
        </View>
        <View className="flex-row w-full gap-1 py-1 px-3">
          <Pressable className="flex-1 items-center bg-slate-500 p-4 rounded-lg">
            <Text className="text-white text-lg">
              {distance ? `${distance} km` : 'Distance'}
            </Text>
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
