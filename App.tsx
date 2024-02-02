import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CameraPage from './src/pages/Camera';
import LocationPage from './src/pages/Location';
import Home from './src/pages/Home';

const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Camera" component={CameraPage}/>
        <Stack.Screen name="Location" component={LocationPage}/>
      </Stack.Navigator>
    </NavigationContainer>
      

  );
}

