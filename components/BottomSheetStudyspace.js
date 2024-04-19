import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const BottomSheetStudyspace = (props) => {
    const navigation = useNavigation(); // Access the navigation object using useNavigation hook

    const { height } = Dimensions.get('screen');
    const closeHeight = height;
  
    const data = [
      { id: '1', title: 'Block 19', image: require('../assets/FoET.png'), location: { latitude: 6.8830243900324035, longitude: 79.88555175591488 } },
      { id: '2', title: 'Block 20', image: require('../assets/FoNS.jpg'), location: { latitude: 6.8834411925224455, longitude: 79.88514103151813 } },
      { id: '3', title: 'Exam Hall 4', image: require('../assets/FoHS.png'), location: { latitude: 6.883267055215138, longitude: 79.88512349136185 } },
    ];

    const handlePress = (location) => {
        // Navigate to the Map component and pass the location data
        navigation.navigate('Map', { location });
    };
  
    return (
      <View style={[styles.container, { top: 300 }]}>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
  
        {/* Scrollable list of cards */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item.location)}>
              <View style={styles.cardContainer}>
                <Image style={styles.cardImage} source={item.image} />
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  export default BottomSheetStudyspace;

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#ff8566',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    lineContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    line: {
      width: 50,
      height: 4,
      backgroundColor: 'black',
      borderRadius: 20,
    },
    cardContainer: {
      padding: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#ccc',
    },
    cardImage: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      marginBottom: 10,
      borderRadius: 5,
    },
  });