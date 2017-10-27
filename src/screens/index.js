import { Navigation } from 'react-native-navigation';

import LoginPage from './loginPage';
import HomePage from './homePage';
import CoursePage from './coursePage';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('epres.LoginPage', () => LoginPage);
  Navigation.registerComponent('epres.HomePage', () => HomePage);
  Navigation.registerComponent('epres.CoursePage', () => CoursePage);
}
