/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import { GoogleSignin, } from 'react-native-google-signin';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './GamePages/Login';
import MainMenu from './GamePages/MainMenu';
import Register from './GamePages/Register';

export default class App extends Component {

  render() {
    return (
      <Pagemanager />
    );
  }
}
// Create const for manage navigation---------------------------------
const Pagemanager = createStackNavigator(
  // create page object
  { login: Login, mainmenu: MainMenu, register: Register, }, { initialRouteName: 'register', }
)
