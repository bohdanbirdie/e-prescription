import { Navigation } from 'react-native-navigation';

import LoginPage from './loginPage';
import HomePage from './homePage';
import CoursePage from './coursePage';
import AddCoursePage from './addCoursePage';
import AddDrugPage from './addDrugPage';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('epres.LoginPage', () => LoginPage);
  Navigation.registerComponent('epres.HomePage', () => HomePage);
  Navigation.registerComponent('epres.CoursePage', () => CoursePage);
  Navigation.registerComponent('epres.addCoursePage', () => AddCoursePage);
  Navigation.registerComponent('epres.addDrugPage', () => AddDrugPage);
}
