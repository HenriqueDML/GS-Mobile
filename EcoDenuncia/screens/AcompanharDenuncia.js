import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function AcompanharDenuncia() {
  const [denuncias, setDenuncias] = useState([]);
  const [denunciasFiltradas, setDenunciasFiltradas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('nenhum');
  const [denunciaSelecionadaId, setDenunciaSelecionadaId] = useState(null);

  useEffect(() => {
    carregarDenuncias();
  }, []);

  useEffect(() => {
    aplicarFiltro();
  }, [filtro, tipoFiltro, denuncias]);

  const carregarDenuncias = async () => {
    try {
      const dados = await AsyncStorage.getItem('denuncias');
      const lista = dados ? JSON.parse(dados) : [];
      setDenuncias(lista.reverse());
    } catch (error) {
      console.error('Erro ao carregar denúncias:', error.message);
    }
  };

  const salvarDenuncias = async (listaAtualizada) => {
    setDenuncias(listaAtualizada);
    await AsyncStorage.setItem('denuncias', JSON.stringify(listaAtualizada));
  };

  const aplicarFiltro = () => {
    let resultado = [...denuncias];

    if (tipoFiltro !== 'nenhum' && filtro.trim() !== '') {
      const valor = filtro.toLowerCase();
      resultado = resultado.filter((denuncia) => {
        switch (tipoFiltro) {
          case 'logradouro':
            return denuncia.endereco.toLowerCase().includes(valor);
          case 'data':
            return denuncia.data.includes(valor);
          case 'status':
            return denuncia.status.toLowerCase().includes(valor);
          default:
            return true;
        }
      });
    }

    resultado.sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0));
    setDenunciasFiltradas(resultado);
  };

  const alternarFavorito = async (id) => {
    const listaAtualizada = denuncias.map((denuncia) =>
      denuncia.id === id ? { ...denuncia, favorito: !denuncia.favorito } : denuncia
    );
    await salvarDenuncias(listaAtualizada);
  };

  const finalizarDenuncia = () => {
    const denuncia = denuncias.find((d) => d.id === denunciaSelecionadaId);
    if (!denuncia) return;

    Alert.alert(
      'Confirmar Finalização',
      `Deseja realmente finalizar a denúncia de "${denuncia.endereco}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'destructive',
          onPress: async () => {
            const atualizadas = denuncias.filter((d) => d.id !== denunciaSelecionadaId);
            await salvarDenuncias(atualizadas);
            setDenunciaSelecionadaId(null);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Minhas Denúncias</Text>

        <View style={styles.filtroContainer}>
          <Picker
            selectedValue={tipoFiltro}
            style={styles.picker}
            dropdownIconColor="white"
            onValueChange={(itemValue) => setTipoFiltro(itemValue)}
          >
            <Picker.Item label="Sem filtro" value="nenhum" />
            <Picker.Item label="Filtrar por logradouro" value="logradouro" />
            <Picker.Item label="Filtrar por data" value="data" />
            <Picker.Item label="Filtrar por status" value="status" />
          </Picker>

          {tipoFiltro !== 'nenhum' && (
            <TextInput
              style={styles.input}
              placeholder={`Digite o ${tipoFiltro}...`}
              placeholderTextColor="#888"
              value={filtro}
              onChangeText={setFiltro}
            />
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.finalizarButton,
            { backgroundColor: denunciaSelecionadaId ? '#d9534f' : '#555' },
          ]}
          disabled={!denunciaSelecionadaId}
          onPress={finalizarDenuncia}
        >
          <Text style={styles.finalizarButtonText}>Finalizar Denúncia</Text>
        </TouchableOpacity>

        {denunciasFiltradas.length === 0 && (
          <Text style={styles.emptyText}>Nenhuma denúncia encontrada.</Text>
        )}

        {denunciasFiltradas.map((denuncia) => (
          <TouchableOpacity
            key={denuncia.id}
            style={[styles.card, denunciaSelecionadaId === denuncia.id && styles.cardSelecionado]}
            onPress={() => setDenunciaSelecionadaId(denuncia.id)}
          >
            <Text style={styles.endereco}>{denuncia.endereco}</Text>
            <Text style={styles.data}>{denuncia.data}</Text>
            <Text style={styles.status}>Status: {denuncia.status}</Text>
            <Text style={styles.descricao}>{denuncia.descricao}</Text>

            <TouchableOpacity
              style={styles.favButton}
              onPress={() => alternarFavorito(denuncia.id)}
            >
              <Text style={styles.favButtonText}>
                {denuncia.favorito ? '⭐ Remover dos favoritos' : '☆ Favoritar'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  scrollContent: { padding: 20, paddingBottom: 80 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  filtroContainer: { marginBottom: 20 },
  picker: {
    color: 'white',
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
  },
  finalizarButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardSelecionado: {
    borderColor: '#00bfff',
    borderWidth: 2,
  },
  endereco: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  data: { color: '#aaa', fontSize: 14, marginBottom: 5 },
  status: { color: '#00bfff', marginBottom: 5 },
  descricao: { color: '#ccc', fontSize: 14 },
  favButton: { marginTop: 10, alignItems: 'center' },
  favButtonText: { color: '#ffd700', fontWeight: 'bold' },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 20 },
});
