import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { Routes } from './src/Routes/Routes';


export default function App() {
  return (


    <>

      <StatusBar
       backgroundColor="#044347" // fondo de la barra en Android
        barStyle="light-content" // color del texto: "dark-content" o "light-content"
      
      />
      <Routes/>
    
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
