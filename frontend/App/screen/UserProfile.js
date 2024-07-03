import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await fetch('http://192.168.56.1:5000/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch user profile');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      signOut(); // Context'ten çıkış işlemi
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  const handleUpdatePassword = () => {
    console.log('Update password logic');
  };

  const handleUpdateSurvey = () => {
    console.log('Update survey');
    navigation.navigate('Anket');
  };

  const handleSurvey = () => {
    console.log('Survey');
    navigation.navigate('Anket');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.info}>{userInfo.username}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{userInfo.email}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Anket" onPress={handleSurvey} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Anketi Güncelle" onPress={handleUpdateSurvey} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Oturumu Kapat" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
  },
  userInfoContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default UserProfile;

