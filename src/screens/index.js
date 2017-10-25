import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './first';
import HomePage from './homePage';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('epres.HomePage', () => HomePage);
}
