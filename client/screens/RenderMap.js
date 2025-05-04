import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';

export default function RenderMap() {
  const [location, setLocation] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isChoosingSource, setIsChoosingSource] = useState(false);
  const [isChoosingDestination, setIsChoosingDestination] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    async function requestLocationPermission() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      } else {
        // Assume iOS permissions are handled via Info.plist
        return true;
      }
    }

    async function getCurrentLocation() {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.log({ code: 1, message: 'Location permission not granted.' });
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (source && destination) {
      const dist =
        getDistance(
          { latitude: source.latitude, longitude: source.longitude },
          { latitude: destination.latitude, longitude: destination.longitude }
        ) / 1000;
      setDistance(dist.toFixed(2));
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Your journey</Text>
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

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, isChoosingSource && styles.buttonActive]}
          onPress={() => {
            if (isChoosingSource) {
              setSource(null);
            }
            setIsChoosingSource(!isChoosingSource);
          }}
        >
          <Text style={styles.buttonText}>
            {isChoosingSource ? 'Cancel' : 'Choose Source'}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, isChoosingDestination && styles.buttonActive]}
          onPress={() => {
            if (isChoosingDestination) {
              setDestination(null);
            }
            setIsChoosingDestination(!isChoosingDestination);
          }}
        >
          <Text style={styles.buttonText}>
            {isChoosingDestination ? 'Cancel' : 'Choose Destination'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            {distance ? `${distance} km` : 'Distance'}
          </Text>
        </Pressable>
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
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#6d28d9',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#9333ea',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
