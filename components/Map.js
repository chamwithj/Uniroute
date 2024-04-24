import React, { useState, useEffect, useContext } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewStyle from '../.expo/Utils/MapVeiwStyle.json';
import * as Location from 'expo-location';
import { SearchBar } from 'react-native-elements';
import { UserLocationContext } from '../.expo/Context/UserLocationContext';

const Map = () => {
  const { location, setLocation } = useContext(UserLocationContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log(currentLocation);
    })();
  }, []);

  useEffect(() => {
    if (location && searchQuery) {
      getDirections();
    }
  }, [location, searchQuery]);

  //Directions implementation
  const getDirections = async () => {
    const apiKey = '';
    const origin = `${location.coords.latitude},${location.coords.longitude}`;
    const destination = encodeURIComponent(searchQuery);
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.status === 'OK') {
        setDirections(data.routes[0].overview_polyline.points);
      } else {
        console.log('Directions API error:', data.status);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });
    }
  }, []);

  const [mapRegion, setMapRegion] = useState({
    latitude: 6.885458,
    longitude: 79.883282,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const facultiesData = [
      // Faculty data here
      {
        id: 1,
        name: 'Faculty of Engineering',
        latitude: 6.884437103365703,
        longitude: 79.88349172147429,
      },
      {
        id: 2,
        name: 'Faculty of Natural Science',
        latitude: 6.884524001640612,
        longitude: 79.88383362606008,
      },
      {
        id: 3,
        name: 'Student Registration office',
        latitude: 6.883212922850658,
        longitude: 79.88657439333122,
      },
      {
        id: 4,
        name: 'Career Guidance Unit',
        latitude: 6.882980395286188,
        longitude: 79.88624977480866,
      },
      {
        id: 5,
        name: 'Financial information Office',
        latitude: 6.88341163259872,
        longitude: 79.88652944606429,
      },
      {
        id: 6,
        name: 'Mechanical Engineering Workshop',
        latitude: 6.8836452735065485,
        longitude: 79.88577005883937,
      },
      {
        id: 7,
        name: 'industrial Automation Lab & machanical engineering lab',
        latitude: 6.8834429453063475,
        longitude: 79.88558324473826,
      },
      {
        id: 8,
        name: 'lecture Halls',
        latitude: 6.883279155747774,
        longitude: 79.8857118310676,
      },
      {
        id: 9,
        name: 'Faculty of health sciences',
        latitude: 6.8829202637199645,
        longitude: 79.88530181048955,
      },
      {
        id: 10,
        name: 'Auditorium',
        latitude: 6.88364286483469,
        longitude: 79.88518050263168,
      },
      {
        id: 11,
        name: 'Block 19 Lecture Halls',
        latitude: 6.88306478403091,
        longitude: 79.88555898314824,
      },
      {
        id: 12,
        name: 'Block 9 Lecture Halls',
        latitude: 6.88328879042593,
        longitude: 79.88517079800305,
      },
      {
        id: 13,
        name: 'Block 10 Lecture Halls',
        latitude: 6.88306478403091,
        longitude: 79.88497913158763,
      },
      {
        id: 14,
        name: 'Department of Civil Engineering',
        latitude: 6.883550815979799,
        longitude: 79.88485799253637,
      },
      {
        id: 15,
        name: 'Main canteen',
        latitude: 6.8827396132693845,
        longitude: 79.88503493320225,
      },
      {
        id: 16,
        name: 'Computer Science Lab',
        latitude: 6.883740572280381,
        longitude: 79.88486684198423,
      },
      {
        id: 17,
        name: 'Textile & apparel Technology Labs',
        latitude: 6.882734795923085,
        longitude: 79.88472438508612,
      },
      {
        id: 18,
        name: 'Zoology Biodiversity Museum',
        latitude: 6.883175582906174,
        longitude: 79.88468071425729,
      },
      {
        id: 19,
        name: 'Zoology Biodiversity Museum',
        latitude: 6.883175582906174,
        longitude: 79.88468071425729,
      },
      {
        id: 20,
        name: 'Faculty of Education',
        latitude: 6.882719015038304,
        longitude: 79.88411586828462,
      },
      {
        id: 21,
        name: 'Student Vehicle Park',
        latitude: 6.882854645663635,
        longitude: 79.88377433038936,
      },
      {
        id: 22,
        name: 'Printing press OUSL',
        latitude: 6.883156731925797,
        longitude: 79.88401030201689,
      },
      {
        id: 23,
        name: 'Course material Distribute Center',
        latitude: 6.883468505882797,
        longitude: 79.88377078194351,
      },
      {
        id: 24,
        name: 'Medical center and Staff Daycare',
        latitude: 6.883134713984825,
        longitude: 79.88362174722184,
      },
      {
        id: 25,
        name: 'AutoMobile Laboratory',
        latitude: 6.883769711041952,
        longitude: 79.88375126548614,
      },
      {
        id: 26,
        name: 'Faculty Of natural Sciences',
        latitude: 6.884415763677393,
        longitude: 79.8836814648495,
      },
      {
        id: 27,
        name: 'Examination Hall 2 & 3',
        latitude: 6.885128231107019,
        longitude: 79.88367976023919,
      },
      {
        id: 28,
        name: 'Examination Hall 3',
        latitude: 6.885123154148796,
        longitude: 79.88336781602922,
      },
      {
        id: 29,
        name: 'Student Toilet',
        latitude: 6.885333001838447,
        longitude: 79.88373004631828,
      },
      {
        id: 30,
        name: 'Open University Media House',
        latitude: 6.88571377361148,
        longitude: 79.88321525312699,
      },
      {
        id: 31,
        name: 'Open University Main Library',
        latitude: 6.88639154661843,
        longitude: 79.88291950273171,
      },
      {
        id: 32,
        name: 'Faculty of Humanities and Social Sciences',
        latitude: 6.886845087066968,
        longitude: 79.88256068164374,
      },
      {
        id: 33,
        name: 'Open University Research Unit',
        latitude: 6.887296934769129,
        longitude: 79.88238510646957,
      },
      {
        id: 34,
        name: 'Open University Administrative Building',
        latitude: 6.887401858142196,
        longitude: 79.88206208227517,
      },
      {
        id: 35,
        name: 'Open University Play Ground',
        latitude: 6.887835089895929,
        longitude: 79.88130097245376,
      },
    ];

    setFaculties(facultiesData);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = faculties.filter((faculty) =>
      faculty.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredFaculties(filtered);

    // If only one result is found, navigate to that location
    if (filtered.length === 1) {
      const { latitude, longitude } = filtered[0];
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });
    }
  };

  const decodePolyline = (encoded) => {
    const len = encoded.length;
    let index = 0;
    const array = [];
    let lat = 0;
    let lng = 0;
  
    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
  
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;
  
      array.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
  
    return array;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for premises..."
        onChangeText={handleSearch}
        value={searchQuery}
        containerStyle={styles.searchBarContainer}
      />
      <MapView
        style={styles.map}
        region={mapRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        customMapStyle={MapViewStyle}
      >
        {/* Example markers for faculties */}
        {filteredFaculties.map((faculty) => (
          <Marker
            key={faculty.id}
            coordinate={{
              latitude: faculty.latitude,
              longitude: faculty.longitude,
            }}
            title={faculty.name}
          />
        ))}

        {directions && (
          <Polyline
            coordinates={decodePolyline(directions)}
            strokeColor="blue"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    marginTop: 30, // Adjust this value to lower or raise the search bar
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRadius: 15,
    borderCurve: 20,
    borderTopColor: 'transparent',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
