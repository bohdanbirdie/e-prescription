import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen:
    {
      label: 'One',
      screen: 'epres.LoginPage',
      title: 'Sign In'
    },
});
