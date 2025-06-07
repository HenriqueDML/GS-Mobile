import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Denuncia({ navigation }) {
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUri, setImagemUri] = useState(null);

  const handleEscolherFoto = async () => {
    Alert.alert('Info', 'Funcionalidade de anexo de foto será implementada futuramente.');
  };

  const handleDenunciar = async () => {
    if (!logradouro || !bairro || !cidade || !estado || !descricao) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }

    try {
      const novaDenuncia = {
        id: Date.now(),
        endereco: `${logradouro}, ${numero}${complemento ? ' - ' + complemento : ''} - ${bairro}, ${cidade}/${estado}`,
        data: new Date().toLocaleDateString(),
        status: 'Pendente',
        descricao,
        imagemUri: imagemUri || null,
      };

      const dadosExistentes = await AsyncStorage.getItem('denuncias');
      const denuncias = dadosExistentes ? JSON.parse(dadosExistentes) : [];

      denuncias.push(novaDenuncia);
      await AsyncStorage.setItem('denuncias', JSON.stringify(denuncias));

      Alert.alert('Sucesso', 'Denúncia registrada localmente!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao registrar denúncia local:', error.message);
      Alert.alert('Erro', 'Não foi possível registrar a denúncia.');
    }
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Registrar Denúncia</Text>

          <TextInput
            style={styles.input}
            placeholder="Logradouro (Rua, Av.)"
            placeholderTextColor="#888"
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <TextInput
            style={styles.input}
            placeholder="Número"
            placeholderTextColor="#888"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Complemento (Opcional)"
            placeholderTextColor="#888"
            value={complemento}
            onChangeText={setComplemento}
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor="#888"
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            placeholderTextColor="#888"
            value={cidade}
            onChangeText={setCidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado (UF)"
            placeholderTextColor="#888"
            value={estado}
            onChangeText={setEstado}
            maxLength={2}
            autoCapitalize="characters"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva a denúncia..."
            placeholderTextColor="#888"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.attachButton} onPress={handleEscolherFoto}>
            <Text style={styles.attachButtonText}>
              {imagemUri ? 'Foto Anexada' : 'Anexar Foto'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleDenunciar}>
            <Text style={styles.buttonText}>Denunciar</Text>
          </TouchableOpacity>
        </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  attachButton: {
    backgroundColor: '#555',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  attachButtonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
