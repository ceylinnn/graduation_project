//App.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthContext, AuthProvider } from './context/AuthContext';

// Screens 
import LoginScreen from './screen/Login';
import SignUpScreen from './screen/SignUpScreen';
import HomeScreen from './screen/HomeScreen';
import Anket from './screen/Anket';
import TopProduct from './screen/TopProduct';
import BottomProduct from './screen/BottomProduct'; 
import Shoes from './screen/Shoes';
import UserProfile from './screen/UserProfile';
import Gardrob from './screen/Gardrob';
import Kombin from './screen/Kombin';
import Outerwear from './screen/Outerwear';
import Favoriler from './screen/Favoriler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" 
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Anket" component={Anket} />
      <Stack.Screen name="TopProduct" component={TopProduct} />
      <Stack.Screen name="BottomProduct" component={BottomProduct} />
      <Stack.Screen name="Shoes" component={Shoes} />
      <Stack.Screen name="Outerwear" component={Outerwear} />
      <Stack.Screen name="Profil" component={UserProfile} />
      <Stack.Screen name="Gardrob" component={Gardrob} />
      <Stack.Screen name="Kombin" component={Kombin} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const App = () => {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconSource;

              if (route.name === 'Home') {
                iconSource = require('./assets/home(1).png'); 
              } else if (route.name === 'Gardrob') {
                iconSource = require('./assets/furniture.png'); 
              } else if (route.name === 'Kombin') {
                iconSource = require('./assets/dress-code.png'); 
              } else if (route.name === 'Profil') {
                iconSource = require('./assets/user(2).png'); 
              }else if (route.name === 'Favoriler') {
                iconSource = require('./assets/wishlist.png'); 
              }

              return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
            },
            tabBarActiveTintColor: '#912cee',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: '400',
              bottom: 5,
            },
            tabBarStyle: {
              backgroundColor: 'white',
              borderTopWidth: 2,
              borderTopColor: 'lightgray',
            },
          })}
          initialRouteName="Home"
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Profil" component={UserProfile} />
          <Tab.Screen name="Gardrob" component={Gardrob} />
          <Tab.Screen name="Kombin" component={Kombin} />
          <Tab.Screen name="Favoriler" component={Favoriler} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
