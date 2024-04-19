import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Linking } from 'react-native'; // Import Text component
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from './BottomSheet';
import BottomSheetB from './BottomSheetB';
import BottomSheetCanteen from './BottomSheetCanteen';
import BottomSheetGates from './BottomSheetGates';
import BottomSheetHalls from './BottomSheetHalls';
import BottomSheetLibraries from './BottomSheetLibraries';
import BottomSheetStudyspace from './BottomSheetStudyspace';
import MapViewStyle from '../.expo/Utils/MapVeiwStyle.json';

const CategoryScreen = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 6.885458,
    longitude: 79.883282,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });
  const [faculties, setFaculties] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const facultiesData = [
          {
            id: 1,
            name: 'Faculty of Engineering',
            latitude: 6.884437103365703,
            longitude: 79.88349172147429,
          },
          {
            id: 2,
            name: 'CRC Building',
            latitude: 6.888888,
            longitude: 79.888888,
          },
        ];
        setFaculties(facultiesData);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    fetchFaculties();
  }, []);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    getUserLocation();
  }, []);

  const CRC_BUILDING_LOCATION = {
    latitude: 6.888888,
    longitude: 79.888888,
  };

  const handleCRCBuildingClick = async () => {
    if (!userLocation) {
      console.log('User location not available');
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${CRC_BUILDING_LOCATION.latitude},${CRC_BUILDING_LOCATION.longitude}`;
    Linking.openURL(url);
  };

  const menuItems = [
    { id: 1, title: 'Faculties', component: <BottomSheetB /> },
    { id: 2, title: 'CRC Building', onPress: handleCRCBuildingClick },
    { id: 3, title: 'Canteens', component: <BottomSheetCanteen /> },
    { id: 4, title: 'Gates', component: <BottomSheetGates /> },
    { id: 5, title: 'Exam Halls', component: <BottomSheetHalls /> },
    { id: 6, title: 'Library', component: <BottomSheetLibraries /> },
    { id: 7, title: 'Study Spaces', component: <BottomSheetStudyspace /> },
  ];

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={mapRegion}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
        >
          {faculties.map((faculty) => (
            <Marker
              key={faculty.id}
              coordinate={{
                latitude: faculty.latitude,
                longitude: faculty.longitude,
              }}
              title={faculty.name}
            />
          ))}
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Your Location"
              pinColor="blue"
            />
          )}
        </MapView>
        <BottomSheet menuItems={menuItems} faculties={faculties} userLocation={userLocation} mapRef={mapRef} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default CategoryScreen;