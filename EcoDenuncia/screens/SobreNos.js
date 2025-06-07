import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SobreNos({ navigation }) {
  return (
    <View style={styles.container}>
      <Header showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Sobre Nós</Text>
        <Text style={styles.objectiveText}>
          A solução proposta pelo EcoDenúncia é uma plataforma digital colaborativa que permite aos
          cidadãos denunciarem o descarte irregular de lixo em vias públicas, com envio de fotos
          como evidência. Ao identificar pontos críticos, o sistema envia alertas aos órgãos
          responsáveis. Se não houver ação, sensores IoT podem ser instalados para monitoramento
          contínuo. O objetivo é reduzir o acúmulo de lixo e, assim, mitigar enchentes urbanas.
        </Text>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  objectiveText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'justify',
    lineHeight: 24,
  },
});
