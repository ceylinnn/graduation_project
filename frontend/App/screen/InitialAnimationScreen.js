/*import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const InitialAnimationScreen = ({ navigation }) => {
  const scaleValue = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Animasyon tamamlandığında yapılacak işlemler
      navigation.navigate('Home'); // HomeScreen'e geçiş
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { transform: [{ scale: scaleValue }] }]}>
        SeninStilin
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default InitialAnimationScreen;*/





import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const InitialAnimationScreen = () => {
  const navigation = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Login'); 
    });
  };

  useFocusEffect(() => {
    startAnimation(); // Her sayfa odaklandığında animasyonu başlat
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { transform: [{ scale: scaleValue }] }]}>
        𝑆𝑒𝑛𝑖𝑛𝑆𝑡𝑖𝑙𝑖𝑛
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default InitialAnimationScreen;
