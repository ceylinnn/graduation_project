import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import Sorular from "./Sorular";

const Anket = () => {
  const route = useRoute();
  const { userId } = route.params || {};

  const navigation = useNavigation();

  const goBackToProfile = () => {
    console.log('Geri butonuna tıklandı'); 
    navigation.navigate('Profil');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBackToProfile}>
        <Image source={require('../assets/left.png')} style={styles.backImage} />
      </TouchableOpacity>
      <Text style={styles.header}>𝑆𝑒𝑛𝑖𝑛𝑆𝑡𝑖𝑙𝑖𝑛</Text>
      <Text style={styles.title}>Hangi kombin tarzınıza yakın?</Text>
      <View style={styles.sorularContainer}>
        <Sorular/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
  },
  backImage: {
    width: 25,
    height: 25,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginBottom: '10%',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    top: '5%',
    color: 'black',
  },
  sorularContainer: {
    flex: 0.6,
    top: '5%',
  },
});

export default Anket;
