import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MenuPrincipal({ navigation }) {
  const handleDenunciaPress = () => {
    navigation.navigate('Denuncia');
  };

  const handleAcompanharPress = () => {
    navigation.navigate('AcompanharDenuncia');
  };

  const handleOrgaosPress = () => {
    navigation.navigate('OrgaosPublicos');
  };

  const handleSobreNosPress = () => {
    navigation.navigate('SobreNos');
  };

  const handlePerfilPress = () => {
    navigation.navigate('Perfil');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.perfilContainer}>
        <TouchableOpacity onPress={handlePerfilPress}>
          <Text style={styles.perfilTexto}>Perfil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Menu Principal</Text>

        <TouchableOpacity style={styles.button} onPress={handleDenunciaPress}>
          <Text style={styles.buttonText}>Denúncia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAcompanharPress}>
          <Text style={styles.buttonText}>Acompanhar Denúncia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleOrgaosPress}>
          <Text style={styles.buttonText}>Órgãos Públicos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSobreNosPress}>
          <Text style={styles.buttonText}>Sobre Nós</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  perfilContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
  perfilTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
