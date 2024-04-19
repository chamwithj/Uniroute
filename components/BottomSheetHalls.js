import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';

const BottomSheetHalls = (props) => {
    const { height } = Dimensions.get('screen');
    const closeHeight = height;
  
    const data = [
      { id: '1', title: 'Exam Hall 1', image: require('../assets/FoET.png') },
      { id: '2', title: 'Exam Hall 2 & 3', image: require('../assets/FoNS.jpg') },
      { id: '3', title: 'Exam Hall 4', image: require('../assets/FoHS.png') },
    ];
  
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
            <View style={styles.cardContainer}>
              <Image style={styles.cardImage} source={item.image} />
              <Text>{item.title}</Text>
              
            </View>
          )}
        />
      </View>
    );
  };
  
  export default BottomSheetHalls;

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