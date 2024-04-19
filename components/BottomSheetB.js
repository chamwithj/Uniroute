import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';

const BottomSheetB = ({faculties, userLocation, mapRef}) => {
  const { height } = Dimensions.get('screen');
  const closeHeight = height;

  const data = [
    { id: '1', title: 'Faculty of Engineering Technology', image: require('../assets/FoET.png') },
    { id: '2', title: 'Faculty of Natural Science', image: require('../assets/FoNS.jpg') },
    { id: '3', title: 'Faculty of Humanities & Social Sciences', image: require('../assets/FoHS.png') },
    { id: '4', title: 'Faculty of Education', image: require('../assets/FoEd.png') },
    { id: '5', title: 'Faculty of Health Sciences', image: require('../assets/FoET.png') },
    { id: '6', title: 'Faculty of Management Studies', image: require('../assets/FoET.png') },
  ];

  return (
    <View style={[styles.container, { top: 300 }]}>
      {faculties &&
        faculties.map((faculty, idx) => (
          <TouchableOpacity key={idx} onPress={() => handleFacultySelection(faculty)}>
            <Text>{faculty.name}</Text>
          </TouchableOpacity>
        ))}
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

export default BottomSheetB;

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
