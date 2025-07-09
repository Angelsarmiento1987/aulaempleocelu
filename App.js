
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { Routes } from './src/Routes/Routes';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// Deshabilitar escalado de fuente global
if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;

export default function App() {

  
  return (


    <>
  <SafeAreaProvider>
    <StatusBar barStyle="dark-content"  backgroundColor="#044347" />
      <Routes/>
    </SafeAreaProvider>
    </>
   
   
   
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
