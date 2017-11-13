import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button} from 'nachos-ui';
import PushNotification from 'react-native-push-notification';

import {settingsPageStyle as styles, theme} from './../styles'
import {app} from './../feathers'

export default class SettingsPage extends Component < {} > {
  constructor(props) {
    super(props);
  }

  signOut(){
    app.logout()
    this.props.navigator.resetTo({
      screen: 'epres.LoginPage',
      title: 'Sign In',
      passProps: {loggedOut: true},
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.signOut()}
          type='danger'
          style={{marginTop: 15, backgroundColor: theme.blue}}
          kind='squared'>
          Logout
        </Button>
        <Button
          onPress={() => PushNotification.cancelAllLocalNotifications()}
          type='danger'
          style={{backgroundColor: theme.red}}
          kind='squared'>
          Cancel all notifications
        </Button>
      </View>
    )
  }
}

SettingsPage.propTypes = {
  navigator: PropTypes.object
}
