import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const buttons = [
  { text: '𝑇𝑂𝑃𝑆', screen: 'TopProduct', image: require('../assets/backgroundClouths.jpg') },
  { text: '𝐵𝑂𝑇𝑇𝑂𝑀', screen: 'BottomProduct', image: require('../assets/backgroundClouths.jpg') },
  { text: '𝑆𝐻𝑂𝐸𝑆', screen: 'Shoes', image: require('../assets/backgroundClouths.jpg') },
  {/* text: '𝑂𝑈𝑇𝐸𝑅𝑊𝐸𝐴𝑅', screen: 'Outerwear', image: require('../assets/backgroundClouths.jpg') */},
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  const navigateToUserProfile = () => {
    navigation.navigate('Profil');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>𝑆𝑒𝑛𝑖𝑛𝑆𝑡𝑖𝑙𝑖𝑛</Text>
        <TouchableOpacity onPress={navigateToUserProfile} style={styles.iconContainer}>
          <Image
            source={require('../assets/user(1).png')} 
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>
      {buttons.map((button, index) => (
        <View key={index} style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(button.screen)}
          >
            <ImageBackground
              source={button.image}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <Text style={styles.buttonText}>{button.text}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',//#eee0e5
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: '30%',
    marginVertical: 5,
    color: 'black',
  },
  iconContainer: {
    padding: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginVertical: 20,
    bottom: 20,
  },
  button: {
    width: '100%',
    height: 220,
    borderRadius: 5,
    overflow: 'hidden', //
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  buttonText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default HomeScreen;
