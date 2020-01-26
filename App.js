import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//react nav 
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
//screen
import Loginscreen from './screens/Loginscreen';
import Mainscreen from './screens/Mainscreen';
import LoadingScreen from './screens/LoadingScreen';
//firebase
import firebase from 'firebase';
import firebaseConfig from './config';
firebase.initializeApp(firebaseConfig);

const MainNavigator = createSwitchNavigator({
  Loading: { screen: LoadingScreen },
  Login: { screen: Loginscreen },
  Main: { screen: Mainscreen },
});

const App = createAppContainer(MainNavigator);


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
