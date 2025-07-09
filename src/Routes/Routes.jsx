

/// src/Routes/Routes.jsx

import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home } from '../Views/Home';
import { InfoApp } from '../Views/InfoApp';
import { IntroApp } from '../Views/Intro';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Solo las rutas que querés mostrar en la Tab Bar
const TabScreens = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'InfoApp') {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#044347',
        borderTopColor: 'transparent',
        height: Platform.OS === 'android' ? 65 : 80,
        paddingBottom: Platform.OS === 'android' ? 10 : 20,
        paddingTop: 5,
      },
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="InfoApp" component={InfoApp} />
  </Tab.Navigator>
);

// Rutas generales
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IntroApp" component={IntroApp} />
        <Stack.Screen name="menuTab" component={TabScreens} />
        {/* <Stack.Screen name="DatosLibro" component={DatosLibro} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Routes };
