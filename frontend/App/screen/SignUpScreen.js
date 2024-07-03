import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Kayıt işlemi
    if (!email || !password || !username) {
      Alert.alert('Error', 'Email, username ve password boş bırakılamaz');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.56.1:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        if (responseData.token) {
          await signIn(responseData.token);
          Alert.alert(responseData.message);
          navigation.navigate('Home');
        } else {
          Alert.alert('Kullanıcı Kaydı Yapıldı');
        }
      } else {
        Alert.alert('Error', responseData.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Zaten hesabınız var mı? Giriş</Text>
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
  loginButton: {
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

export default SignUpScreen;
