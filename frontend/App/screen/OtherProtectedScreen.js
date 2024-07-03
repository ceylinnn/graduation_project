import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtherProtectedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is another protected screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OtherProtectedScreen;
