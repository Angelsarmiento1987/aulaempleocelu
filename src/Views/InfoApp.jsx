import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Image } from 'react-native';
import 'expo-dev-client';
import {
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
  adUnitId
} from 'react-native-google-mobile-ads';

const InfoApp = () => {

  const adUnitId = 'ca-app-pub-3911732855535272/8102214620'; // linea para que se active la publicidad con BANNERS
  // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  return (
    <>
      <View style={styles.contImg}>
        <Image source={require('../Img/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text allowFontScaling={false} style={styles.title}>ℹ️ Información sobre Aula Empleo</Text>

        <Text allowFontScaling={false} style={styles.paragraph}>
          <Text allowFontScaling={false} style={styles.bold}>Aula Empleo</Text> es una aplicación pensada para facilitar la búsqueda de oportunidades
          laborales en <Text allowFontScaling={false} style={styles.bold}>instituciones educativas privadas</Text>. Reunimos en un solo lugar
          publicaciones que circulan libremente en internet, foros públicos y sitios de búsqueda de empleo, con el objetivo
          de hacer más ágil y accesible el proceso para quienes buscan trabajo en el ámbito educativo.
        </Text>

        <Text allowFontScaling={false} style={styles.warning}>🛑 Importante:</Text>
        <Text allowFontScaling={false} style={styles.paragraph}>
          Los avisos que se muestran en esta app <Text allowFontScaling={false} style={styles.bold}>no son creados ni garantizados por Aula Empleo</Text>,
          sino que son recopilaciones de fuentes de acceso público. Si sos responsable de una institución y deseás que se retire
          o modifique un aviso, no dudes en escribirnos.
        </Text>

        <Text allowFontScaling={false} style={styles.subtitle}>📱 Modo de uso:</Text>
        <Text allowFontScaling={false} style={styles.paragraph}>
          1️⃣ Seleccioná si querés buscar en <Text allowFontScaling={false} style={styles.bold}>AMBA</Text> o <Text allowFontScaling={false} style={styles.bold}>CABA</Text>.{'\n'}
          2️⃣ Elegí la <Text allowFontScaling={false} style={styles.bold}>ubicación</Text> específica donde te interesa trabajar (por ejemplo, un barrio o partido).{'\n'}
          3️⃣ Seleccioná la <Text allowFontScaling={false} style={styles.bold}>asignatura</Text> o área en la que estás buscando empleo.{'\n'}
          ✅ La app filtrará los resultados para mostrarte solo los avisos que coincidan con tu búsqueda.
        </Text>

        <Text allowFontScaling={false} style={styles.contact}>📩 Contacto:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:angelsar.desarrolladorweb@gmail.com')}>
          <Text allowFontScaling={false} style={styles.email}>angelsar.desarrolladorweb@gmail.com</Text>
        </TouchableOpacity>

        <Text allowFontScaling={false} style={styles.subtitle}>💛 ¿Querés colaborar?</Text>
        <Text allowFontScaling={false} style={styles.paragraph}>
          Si esta app te ayudó a encontrar oportunidades o te resulta útil, podés colaborar con un pequeño aporte para apoyar su desarrollo y mantenimiento.
        </Text>
        <Text allowFontScaling={false} style={styles.paragraph}>
          Alias de Mercado Pago: <Text allowFontScaling={false} style={styles.bold}>websinvueltas</Text>
        </Text>

        <Text allowFontScaling={false} style={styles.subtitle}>👨‍💻 Sobre el desarrollador</Text>
        <Text allowFontScaling={false} style={styles.paragraph}>
          Esta aplicación fue desarrollada por <Text allowFontScaling={false} style={styles.bold}>Angel Sarmiento</Text>, quien además de ser programador web recibido en la <Text allowFontScaling={false} style={styles.bold}>Universidad Tecnológica Nacional (UTN)</Text>, es también docente. Conoce de cerca el mundo educativo y pensó esta herramienta como un puente para conectar escuelas con profesionales de la educación.
        </Text>

        <Text allowFontScaling={false} style={styles.thanks}>
          Gracias por usar Aula Empleo y ser parte de esta comunidad educativa.
        </Text>
      </ScrollView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5E5',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  warning: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#b00020',
  },
  contact: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  email: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
  thanks: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 16,
    marginBottom: 32,
  },
  logo: {
    width: 300,
    height: 60
  },
  contImg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF5E5',
    paddingTop: 20
  }
});

export { InfoApp };
