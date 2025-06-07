import React, { useEffect, useState } from 'react';
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
import api from '../services/api';
import { getUserIdFromToken } from '../utils/Auth';

export default function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [editandoCampo, setEditandoCampo] = useState(null);
  const [valoresEdicao, setValoresEdicao] = useState({});
  const [senhaConfirmacaoExclusao, setSenhaConfirmacaoExclusao] = useState('');
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await getUserIdFromToken();

        const response = await api.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(response.data);
        setValoresEdicao(response.data);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
      }
    };

    carregarDados();
  }, []);

  const handleSalvarCampo = async (campo) => {
    if (!valoresEdicao.senha || valoresEdicao.senha.length < 5) {
      Alert.alert('Erro', 'Informe sua senha (mínimo 5 caracteres) para salvar as alterações.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await getUserIdFromToken();

      const payload = {
        nome: campo === 'nome' ? valoresEdicao.nome : usuario.nome,
        email: campo === 'email' ? valoresEdicao.email : usuario.email,
        senha: valoresEdicao.senha,
        role: usuario.role,
      };

      const response = await api.put(`/users/${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsuario(response.data);
      setEditandoCampo(null);
      Alert.alert('Sucesso', 'Informação atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o campo.');
    }
  };

  const handleExcluirConta = async () => {
    setMostrarModalExclusao(true);
  };

  const confirmarExclusaoConta = async () => {
    if (!senhaConfirmacaoExclusao || senhaConfirmacaoExclusao.length < 5) {
      Alert.alert('Erro', 'Informe sua senha (mínimo 5 caracteres) para excluir a conta.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await getUserIdFromToken();

      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await AsyncStorage.removeItem('token');
      Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.');
      setMostrarModalExclusao(false);
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      Alert.alert('Erro', 'Não foi possível excluir sua conta.');
    }
  };

  if (!usuario) return null;

  const renderCampo = (label, campo, isSecure = false) => (
    <View style={[styles.campoContainer, { flexDirection: 'column', alignItems: 'flex-start' }]}>
      <Text style={styles.label}>{label}:</Text>
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
        {editandoCampo === campo ? (
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={valoresEdicao[campo]}
            onChangeText={(text) => setValoresEdicao({ ...valoresEdicao, [campo]: text })}
            secureTextEntry={isSecure}
          />
        ) : (
          <Text style={[styles.valor, { flex: 1 }]}>
            {campo === 'senha' ? '******' : usuario[campo]}
          </Text>
        )}
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() =>
            editandoCampo === campo ? handleSalvarCampo(campo) : setEditandoCampo(campo)
          }
        >
          <Text style={styles.botaoEditarTexto}>
            {editandoCampo === campo ? 'Salvar' : 'Editar'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Campo extra para senha ao salvar nome/email */}
      {editandoCampo === campo && campo !== 'senha' && (
        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          placeholder="Digite sua senha para confirmar"
          placeholderTextColor="#888"
          secureTextEntry
          value={valoresEdicao.senha}
          onChangeText={(text) => setValoresEdicao({ ...valoresEdicao, senha: text })}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header showBackButton={true} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>Meu Perfil</Text>

        {renderCampo('Nome', 'nome')}
        {renderCampo('Email', 'email')}
        {renderCampo('Senha', 'senha', true)}

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Função:</Text>
          <Text style={styles.valor}>{usuario.role}</Text>
        </View>

        <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluirConta}>
          <Text style={styles.botaoExcluirTexto}>Excluir Conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {mostrarModalExclusao && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Digite sua senha para confirmar a exclusão:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.input, { color: 'white', flex: 1 }]}
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry={!senhaVisivel}
                value={senhaConfirmacaoExclusao}
                onChangeText={setSenhaConfirmacaoExclusao}
              />
              <TouchableOpacity
                onPress={() => setSenhaVisivel(!senhaVisivel)}
                style={{ marginLeft: 10 }}
              >
                <Text style={{ color: 'white', fontSize: 18 }}>{senhaVisivel ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setMostrarModalExclusao(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.botaoExcluirTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmarExclusaoConta} style={styles.confirmButton}>
                <Text style={styles.botaoExcluirTexto}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  content: { padding: 20 },
  titulo: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  campoContainer: { marginBottom: 15, width: '100%' },
  label: { color: 'white', fontWeight: 'bold', marginBottom: 5 },
  valor: { color: 'white' },
  input: {
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
    width: '100%',
  },
  botaoEditar: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  botaoEditarTexto: { color: 'white', fontWeight: 'bold' },
  botaoExcluir: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  botaoExcluirTexto: { color: 'white', fontWeight: 'bold' },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 8,
    width: '85%',
  },
  modalText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
});
