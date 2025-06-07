import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import Footer from '../components/Footer';

const orgaos = {
  1: {
    uf: 'AC',
    nome: 'SANEACRE',
    endereco: 'Av. Ceará, 1234 - Rio Branco/AC',
    telefone: '(68) 3212-1234',
  },
  2: {
    uf: 'AL',
    nome: 'CASAL - ALAGOAS',
    endereco: 'Rua do Sol, 321 - Maceió/AL',
    telefone: '(82) 3315-0000',
  },
  3: {
    uf: 'AP',
    nome: 'CAESA',
    endereco: 'Rua Amapá, 101 - Macapá/AP',
    telefone: '(96) 3222-0000',
  },
  4: {
    uf: 'AM',
    nome: 'COSAMA',
    endereco: 'Av. Eduardo Ribeiro, 456 - Manaus/AM',
    telefone: '(92) 3303-3000',
  },
  5: {
    uf: 'BA',
    nome: 'EMBASA',
    endereco: 'Av. San Martin, 392 - Salvador/BA',
    telefone: '(71) 3372-9000',
  },
  6: {
    uf: 'CE',
    nome: 'CAGECE',
    endereco: 'Rua Moreira, 123 - Fortaleza/CE',
    telefone: '(85) 3101-1100',
  },
  7: { uf: 'DF', nome: 'CAESB', endereco: 'SIA Trecho 1, Brasília/DF', telefone: '(61) 3213-0715' },
  8: {
    uf: 'ES',
    nome: 'CESAN',
    endereco: 'Av. Governador Bley, Vitória/ES',
    telefone: '(27) 2127-5000',
  },
  9: { uf: 'GO', nome: 'SANEAGO', endereco: 'Rua 7, 234 - Goiânia/GO', telefone: '(62) 3243-2000' },
  10: {
    uf: 'MA',
    nome: 'CAEMA',
    endereco: 'Rua Silva Maia, São Luís/MA',
    telefone: '(98) 3219-5000',
  },
  11: {
    uf: 'MT',
    nome: 'SANEAMENTO MT',
    endereco: 'Rua dos Ypês, Cuiabá/MT',
    telefone: '(65) 3313-1313',
  },
  12: {
    uf: 'MS',
    nome: 'SANESUL',
    endereco: 'Av. Mato Grosso, Campo Grande/MS',
    telefone: '(67) 3318-7700',
  },
  13: {
    uf: 'MG',
    nome: 'COPASA',
    endereco: 'Rua Mar de Espanha, 525 - BH/MG',
    telefone: '(31) 3250-2000',
  },
  14: {
    uf: 'PA',
    nome: 'COSANPA',
    endereco: 'Av. Dr. Freitas, Belém/PA',
    telefone: '(91) 3213-3400',
  },
  15: {
    uf: 'PB',
    nome: 'CAGEPA',
    endereco: 'Rua Feliciano Dourado, João Pessoa/PB',
    telefone: '(83) 3208-1300',
  },
  16: {
    uf: 'PR',
    nome: 'SANEPAR',
    endereco: 'Rua Eng. Rebouças, 1376 - Curitiba/PR',
    telefone: '(41) 3330-3000',
  },
  17: {
    uf: 'PE',
    nome: 'COMPESA',
    endereco: 'Av. Cruz Cabugá, Recife/PE',
    telefone: '(81) 3412-9800',
  },
  18: {
    uf: 'PI',
    nome: 'AGESPISA',
    endereco: 'Av. Maranhão, Teresina/PI',
    telefone: '(86) 2106-7000',
  },
  19: {
    uf: 'RJ',
    nome: 'CEDAE',
    endereco: 'Rua Sacadura Cabral, Rio de Janeiro/RJ',
    telefone: '(21) 2211-0000',
  },
  20: {
    uf: 'RN',
    nome: 'CAERN',
    endereco: 'Rua Raimundo Chaves, Natal/RN',
    telefone: '(84) 3232-4567',
  },
  21: {
    uf: 'RS',
    nome: 'CORSAN',
    endereco: 'Rua Caldas Júnior, Porto Alegre/RS',
    telefone: '(51) 3210-7000',
  },
  22: {
    uf: 'RO',
    nome: 'CAERD',
    endereco: 'Rua Rogério Weber, Porto Velho/RO',
    telefone: '(69) 3212-6000',
  },
  23: {
    uf: 'RR',
    nome: 'CAER',
    endereco: 'Av. Ville Roy, Boa Vista/RR',
    telefone: '(95) 2121-5000',
  },
  24: {
    uf: 'SC',
    nome: 'CASAN',
    endereco: 'Av. Presidente Kennedy, Florianópolis/SC',
    telefone: '(48) 3271-9100',
  },
  25: {
    uf: 'SP',
    nome: 'SABESP',
    endereco: 'Rua Costa Carvalho, 300 - São Paulo/SP',
    telefone: '0800 055 0195',
  },
  26: {
    uf: 'SE',
    nome: 'DESO',
    endereco: 'Av. Tancredo Neves, Aracaju/SE',
    telefone: '(79) 3222-6660',
  },
  27: { uf: 'TO', nome: 'SANEATINS', endereco: 'Av. LO-04, Palmas/TO', telefone: '(63) 3219-9000' },
};

export default function OrgaosPublicos() {
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const dados = orgaos[estadoSelecionado];

  return (
    <View style={styles.container}>
      <Header showBackButton={true} />
      <View style={styles.content}>
        <Text style={styles.title}>Órgãos Públicos</Text>

        <Text style={styles.label}>Selecione seu estado:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={estadoSelecionado}
            style={styles.picker}
            dropdownIconColor="white"
            onValueChange={(itemValue) => setEstadoSelecionado(itemValue)}
          >
            <Picker.Item label="Escolha um estado..." value={null} />
            {Object.entries(orgaos).map(([key, { uf }]) => (
              <Picker.Item key={key} label={`${key} - ${uf}`} value={parseInt(key)} />
            ))}
          </Picker>
        </View>

        {dados && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>{dados.nome}</Text>
            <Text style={styles.infoText}>Endereço: {dados.endereco}</Text>
            <Text style={styles.infoText}>Telefone: {dados.telefone}</Text>
          </View>
        )}
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    color: 'white',
    height: 50,
    width: '100%',
  },
  infoBox: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  infoTitle: {
    color: '#00bfff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
});
