import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [erros, setErros] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    endereco: '',
    numero: '',
    cep: '',
    cidade: '',
    estado: '',
  });

  const validarCampos = () => {
    let errosTemp = {};

    if (!nome) {
      errosTemp.nome = 'Digite seu nome';
    }

    if (!sobrenome) {
      errosTemp.sobrenome = 'Digite seu sobrenome';
    }

    if (!dataNascimento) {
      errosTemp.dataNascimento = 'Digite sua data de nascimento';
    }

    if (!endereco) {
      errosTemp.endereco = 'Digite seu endereço';
    }

    if (!numero) {
      errosTemp.numero = 'Digite o número';
    }

    if (!cep) {
      errosTemp.cep = 'Digite o CEP';
    }

    if (!cidade) {
      errosTemp.cidade = 'Digite a cidade';
    }

    if (!estado) {
      errosTemp.estado = 'Digite o estado';
    }

    setErros(errosTemp);

    return Object.keys(errosTemp).length === 0;
  };

  const handleSalvar = async () => {
    const dados = {
      id: '0',
      nome,
      sobrenome,
      dataNascimento,
      endereco,
      numero,
      cep,
      cidade,
      estado,
    };

    if (validarCampos()) {
      try {
        dados.id = Math.floor(Math.random() * 10000) + '';
        await AsyncStorage.setItem(
          dados.id,
          JSON.stringify(dados),
          () => {
            console.warn(
              'Dados salvos no AsyncStorage com sucesso!'
            );
          }
        );
      } catch (error) {
        console.warn(
          'Erro ao salvar os dados no AsyncStorage:',
          error
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          {erros.nome !== '' ? (
            <Text style={styles.erro}>{erros.nome}</Text>
          ) : (
            <Text></Text>
          )}
          <Text>Nome:</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            maxLength={100}
          />

          {erros.sobrenome !== '' ? (
            <Text style={styles.erro}>{erros.sobrenome}</Text>
          ) : (
            <Text></Text>
          )}
          <Text>Sobrenome:</Text>
          <TextInput
            style={styles.input}
            value={sobrenome}
            onChangeText={setSobrenome}
            placeholder="Digite seu sobrenome"
            maxLength={100}
          />

          {erros.dataNascimento !== '' ? (
            <Text style={styles.erro}>{erros.dataNascimento}</Text>
          ) : (
            <Text></Text>
          )}
          <Text>Data de Nascimento:</Text>
          <TextInput
            style={styles.input}
            value={dataNascimento}
            onChangeText={setDataNascimento}
            placeholder="DD/MM/AAAA"
            maxLength={10}
          />

          {erros.endereco !== '' ? (
            <Text style={styles.erro}>{erros.endereco}</Text>
          ) : (
            <Text></Text>
          )}
          <Text>Endereço:</Text>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Digite seu endereço"
            maxLength={1000}
          />

          {erros.numero !== '' ? (
            <Text style={styles.erro}>{erros.numero}</Text>
          ) : (
            <Text></Text>
          )}
          <Text>Número:</Text>
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder="Digite o número"
            keyboardType="numeric"
            maxLength={5}
          />

          {erros.cep !== '' ? (
            <Text style={styles.erro}>{erros.cep}</Text>
          ) : (
            <Text></Text>
          )}
          <Text>CEP:</Text>
          <TextInput
            style={styles.input}
            value={cep}
            onChangeText={setCep}
            placeholder="CEP"
            keyboardType="numeric"
            maxLength={9}
          />

          {erros.cidade !== '' ? (
            <Text style={styles.erro}>{erros.cidade}</Text>
          ) : (
            <Text></Text>
          )}
          <Text>Cidade:</Text>
          <TextInput
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
            placeholder="Digite a cidade"
            maxLength={100}
          />

          {erros.estado !== '' ? (
            <Text style={styles.erro}>{erros.estado}</Text>
          ) : (
            <Text></Text>
          )}
          <Text>Estado:</Text>
          <TextInput
            style={styles.input}
            value={estado}
            onChangeText={setEstado}
            placeholder="Digite o estado"
            maxLength={2}
          />

          <Button
            title="Salvar"
            onPress={handleSalvar}
            color="#B84221"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MostrarDados = ({ route }) => {
  const { dados } = route.params;

  return (
    <View style={styles.container}>
      <Text>Nome: {dados.nome}</Text>
      <Text>Sobrenome: {dados.sobrenome}</Text>
      <Text>Data de Nascimento: {dados.dataNascimento}</Text>
      <Text>Endereço: {dados.endereco}</Text>
      <Text>Número: {dados.numero}</Text>
      <Text>CEP: {dados.cep}</Text>
      <Text>Cidade: {dados.cidade}</Text>
      <Text>Estado: {dados.estado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  erro: {
    color: 'red',
    marginBottom: 5,
  },
});

export default Cadastro;

