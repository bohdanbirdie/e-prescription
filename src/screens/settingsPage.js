import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {Button} from 'nachos-ui';

import {coursePageStyles as styles, theme} from './../styles'
import {app} from './../feathers'

export default class SettingsPage extends Component < {} > {
  constructor(props) {
    super(props);
  }

  signOut(){
    app.logout()
    this.props.navigator.resetTo({
      screen: 'epres.LoginPage', // unique ID registered with Navigation.registerScreen
      title: 'Sign In', // navigation bar title of the pushed screen (optional)
      passProps: {loggedOut: true}, // simple serializable object that will pass as props to the pushed screen (optional)
      // animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
      // animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
      // navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
      // navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    });
  }

  render() {
    return (
      <View>
        <Button
          onPress={() => this.signOut()}
          type='danger'
          style={{margin: 15, backgroundColor: theme.red}}
          kind='squared'>
          Logout
        </Button>
      </View>
    )
  }
}

// Settings.propTypes = {
//   course: PropTypes.object
// }
