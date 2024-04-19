import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground } from 'react-native';


const data = [
  { id: '1', title: 'Search', image: require('../assets/search.png'), screen: 'Map' },
  { id: '2', title: 'Directions', image: require('../assets/directions.png'), screen: 'DirectionScreen' },
  { id: '3', title: 'Categories', image: require('../assets/app.png'), screen: 'CategoryScreen' },
];

const Dashboard = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.screen)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../assets/background2.png')}style={styles.backgroundImage}>
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ff6600',
    borderColor:'#000',
    borderWidth:7,
    borderRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16, 
    padding: 70, 
    flexDirection: 'row', 
  },
  cardText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
});

export default Dashboard;