import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button} from 'nachos-ui';

import {theme} from './../styles'
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

SettingsPage.propTypes = {
  navigator: PropTypes.object
}
