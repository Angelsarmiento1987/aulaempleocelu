
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../Database/Supabase';
import ubicacionData from '../Data/Ubicacion.json';
import asignaturaData from '../Data/Asignatura.json';
import 'expo-dev-client';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
  AdEventType
} from 'react-native-google-mobile-ads';



// 🔸 ID de prueba o real
const adUnitId = 'ca-app-pub-3911732855535272/9172587866';

// 🔸 Crear interstitial fuera del componente
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['education', 'trabajo', 'docentes'],
});

const zonas = [
  { key: 'Ciudad Autónoma de Buenos Aires', label: 'CABA' },
  { key: 'Buenos Aires', label: 'AMBA' }
];

const Home = () => {
  const [avisos, setAvisos] = useState([]);
  const [asignatura, setAsignatura] = useState('');
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [ubicacion, setUbicacion] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageUri, setModalImageUri] = useState(null);

  const [openAsignatura, setOpenAsignatura] = useState(false);
  const [openUbicacion, setOpenUbicacion] = useState(false);

  const [asignaturasList, setAsignaturasList] = useState(
    asignaturaData.map((asig) => ({ label: asig, value: asig }))
  );
  const [ubicacionesList, setUbicacionesList] = useState([]);

  // 🔸 Interstitial logic
  useEffect(() => {
    let adTimer;
    let adInterval;

    const showAd = () => {
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        interstitial.show();
      });
      interstitial.load();
    };

    // Mostrar primer anuncio tras 40 segundos
    adTimer = setTimeout(() => {
      showAd();
    }, 40000);

    // Mostrar cada 4 minutos
    adInterval = setInterval(() => {
      showAd();
    }, 240000);

    return () => {
      clearTimeout(adTimer);
      clearInterval(adInterval);
    };
  }, []);

  useEffect(() => {
    fetchAvisos();
  }, [asignatura, ubicacion, zonaSeleccionada]);

  useEffect(() => {
    if (zonaSeleccionada) {
      const ubicaciones = ubicacionData[zonaSeleccionada] || [];
      setUbicacionesList(
        ubicaciones.map((loc) => ({ label: loc, value: loc }))
      );
    } else {
      setUbicacionesList([]);
    }
    setUbicacion('');
  }, [zonaSeleccionada]);

  const fetchAvisos = async () => {
    let query = supabase
      .from('avisos')
      .select('*')
      .order('created_at', { ascending: false });

    if (asignatura) {
      query = query.ilike('asignatura', `%${asignatura}%`);
    }
    if (ubicacion) {
      query = query.ilike('ubicacion', `%${ubicacion}%`);
    }
    if (zonaSeleccionada) {
      const zonaFiltro = zonaSeleccionada === 'Buenos Aires' ? 'AMBA' : 'CABA';
      query = query.eq('zona', zonaFiltro);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching avisos:', error.message);
    } else {
      setAvisos(data);
    }
  };

  const openModal = (uri) => {
    setModalImageUri(uri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalImageUri(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => openModal(item.image_url)}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
      </TouchableOpacity>
      <Text allowFontScaling={false} style={styles.info}>
        {item.asignatura} - {item.ubicacion}
      </Text>
      <Text allowFontScaling={false} style={styles.date}>
        Publicado: {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contImg}>
        <Image source={require('../Img/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <Text allowFontScaling={false}  style={styles.label}>Zona</Text>
      <View style={styles.zonasContainer}>
        {zonas.map((zona) => (
          <TouchableOpacity
            key={zona.key}
            style={[
              styles.zonaButton,
              zonaSeleccionada === zona.key && styles.zonaButtonSelected
            ]}
            onPress={() => setZonaSeleccionada(zona.key)}
          >
            <Text
            allowFontScaling={false}
              style={[
                styles.zonaButtonText,
                zonaSeleccionada === zona.key && styles.zonaButtonTextSelected
              ]}
            >
              {zona.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {zonaSeleccionada && (
        <>
          <Text allowFontScaling={false} style={styles.label}>Ubicación</Text>
          <DropDownPicker
            open={openUbicacion}
            value={ubicacion}
            items={[{ label: 'Todas', value: '' }, ...ubicacionesList]}
            setOpen={setOpenUbicacion}
            setValue={setUbicacion}
            setItems={setUbicacionesList}
            placeholder="Seleccionar ubicación"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2000}
            zIndexInverse={2000}
       
          />

          <Text allowFontScaling={false} style={styles.label}>Asignatura</Text>
          <DropDownPicker
            open={openAsignatura}
            value={asignatura}
            items={[{ label: 'Todas', value: '' }, ...asignaturasList]}
            setOpen={setOpenAsignatura}
            setValue={setAsignatura}
            setItems={setAsignaturasList}
            placeholder="Seleccionar asignatura"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={1000}
            zIndexInverse={3000}
            
          />
        </>
      )}

      {avisos.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Image
            source={require('../Img/nofound.png')}
            style={styles.noResultsImage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <FlatList
          data={avisos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <Image
            source={{ uri: modalImageUri }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#FAF5E5',
    paddingTop: 45
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10,
  },
  dropdown: {
    borderColor: '#044347',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
  },
  dropdownContainer: {
    borderColor: '#999'
  },
  zonasContainer: {
    flexDirection: 'row',
    marginBottom: 12
  },
  zonaButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#044347',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  zonaButtonSelected: {
    backgroundColor: '#044347',
  },
  zonaButtonText: {
    color: '#044347',
    fontWeight: 'bold',
  },
  zonaButtonTextSelected: {
    color: 'white',
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#044347',
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 100,
  },
  info: {
    padding: 8,
    fontWeight: 'bold',
    fontSize: 16,

  },
  date: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    color: '#555',
    fontSize: 14
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  
  },
  noResultsImage: {
    width: 250,
    height: 250,
    marginBottom: 20
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalImage: {
    width: '90%',
    height: '80%'
  },
  logo: {
    width: 300,
    height: 60
  },
  contImg: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export { Home };
