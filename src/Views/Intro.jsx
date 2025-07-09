

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const IntroApp = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('menuTab'); // Cambiá 'Home' por el nombre real de tu pantalla principal
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../Lottie/Animation - 1750203211267.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.title}>Aula Empleo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // centra verticalmente
    alignItems: 'center',     // centra horizontalmente
    backgroundColor: '#FAF5E5',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#044347',
  },
});

export { IntroApp };
