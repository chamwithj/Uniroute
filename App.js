import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { UserLocationContext, UserLocationProvider } from './.expo/Context/UserLocationContext';
import Dashboard from './components/Dashboard';
import { StyleSheet } from 'react-native';
import Map from './components/Map';
import DirectionScreen from './components/DirectionScreen';
import CategoryScreen from './components/CategoryScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserLocationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
          <Stack.Screen name="DirectionScreen" component={DirectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserLocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 30,
  },
});



