import { Navigation } from 'react-native-navigation';

import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';
import HomePage from './homePage';
import CoursePage from './coursePage';
import AddCoursePage from './addCoursePage';
import AddDrugPage from './addDrugPage';
import SettingsPage from './settingsPage';
import QRReader from './qrReaderPage';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('epres.LoginPage', () => LoginPage);
  Navigation.registerComponent('epres.RegistrationPage', () => RegistrationPage);
  Navigation.registerComponent('epres.HomePage', () => HomePage);
  Navigation.registerComponent('epres.CoursePage', () => CoursePage);
  Navigation.registerComponent('epres.addCoursePage', () => AddCoursePage);
  Navigation.registerComponent('epres.addDrugPage', () => AddDrugPage);
  Navigation.registerComponent('epres.settingsPage', () => SettingsPage);
  Navigation.registerComponent('epres.QRReaderPage', () => QRReader);
}
