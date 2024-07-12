import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Enviando requisição de login...');
      
      const success = true;

      if (success) {
        Alert.alert('Login realizado com sucesso!');
        
        navigation.navigate('CrudScreen');
      } else {
        Alert.alert('Erro ao fazer login', 'Verifique seu email e senha e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={80} color="#6a0dad" style={styles.icon} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={[styles.button, { backgroundColor: '#6a0dad' }]}>
          <FontAwesome name="sign-in" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={{ width: 10 }} /> 
        <TouchableOpacity onPress={handleCadastro} style={[styles.button, { backgroundColor: '#6a0dad' }]}>
          <FontAwesome name="user-plus" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10002b', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderRadius: 20, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 20, 
    marginHorizontal: 5, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10, 
  },
  buttonIcon: {
    marginRight: 5,
  },
  icon: {
    marginBottom: 20, 
  },
});
