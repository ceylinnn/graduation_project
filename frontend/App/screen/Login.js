// Login.js
import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Giriş işlemi
    try {
      const response = await fetch('http://192.168.56.1:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        await signIn(responseData.token); // Oturum açma işlemi
        Alert.alert('Giriş Başarılı');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', responseData.error || 'Invalid login credentials');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Hesabınız yok mu?  Üye ol</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  input: {
    marginBottom: 16,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#4876ff',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  signupButton: {
    backgroundColor: '#4876ff',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;
