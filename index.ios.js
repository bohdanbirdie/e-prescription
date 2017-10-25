// import { AppRegistry } from 'react-native';
// import App from './App';
//
// AppRegistry.registerComponent('ePrescription', () => App);
import 'babel-polyfill';
import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';

import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
import {app, socket} from './src/feathers' //init feathers-client


registerScreens(); // this is where you register all of your app's screens

Navigation.startSingleScreenApp({
  screen:
    {
      label: 'One',
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
      // icon: require('../img/one.png'),
      // selectedIcon: require('../img/one_selected.png'), // iOS only
      title: 'Sign In'
    },
});
