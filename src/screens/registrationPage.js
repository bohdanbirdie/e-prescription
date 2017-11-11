import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator} from 'react-native';
import { Input, H3, H5, Button } from 'nachos-ui';

import { app } from './../feathers'
import { loginPageStyles as styles, theme } from './../styles';


export default class RegistrationPage extends Component < {} > {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel', // for a textual button, provide the button title (label)
        id: 'cancel', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '400', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      spinnerVisible: false,
      badLogin: false,
      emailInput: {
        status: 'normal',
        value: '',
        valid: false
      },
      passwordInput: {
        status: 'normal',
        value: '',
        valid: false
      },
      confirmPasswordInput: {
        status: 'normal',
        value: '',
        valid: false
      },
    };

  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'cancel':
        this.props.navigator.resetTo({
          screen: 'epres.LoginPage',
          title: 'Sign Up',
          animated: true,
        })
        break;
      default:

    }
  }

  emailHandler(value){
    let emailInput
    if (value.length > 0) {
      if (this.validateEmail(value)) {
        emailInput = {
          status: 'valid',
          value: value,
          valid: true
        }
      } else {
        emailInput = {
          status: 'error',
          value: value,
          valid: false
        }
      }
    } else {
      emailInput = {
        status: 'normal',
        value: value,
        valid: false
      }
    }
    this.setState({emailInput, badLogin: false});
  }

  validateEmail(email){
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailPattern.test(email);
  }

  validatePassword(password){
    return password.length >= 5 ? true :  false;
  }

  passwordHandler(password){
    let passwordInput
    if (password.length > 0) {
      if (this.validatePassword(password)) {
        passwordInput = {
          status: 'valid',
          value: password,
          valid: true
        }
      } else {
        passwordInput = {
          status: 'error',
          value: password,
          valid: true
        }
      }
    } else {
      passwordInput = {
        status: 'normal',
        value: password,
        valid: false
      }
    }
    this.setState({passwordInput, badLogin: false});
  }

  confirmPasswordHandler(password){
    let confirmPasswordInput
    if (password.length > 0 && password === this.state.passwordInput.value) {
      confirmPasswordInput = {
        status: 'valid',
        value: password,
        valid: true
      }
    } else {
      confirmPasswordInput = {
        status: 'error',
        value: password,
        valid: false
      }
    }
    this.setState({confirmPasswordInput, badLogin: false});
  }

  goToHomePage(){
    this.props.navigator.resetTo({
      screen: 'epres.HomePage',
      title: 'Medicine list',
      animated: true,
    });
  }

  register(){
    this.setState({spinnerVisible: true});
    app.service('users').create({
      email: this.state.emailInput.value,
      password: this.state.passwordInput.value
    }).then(response => {

      app.authenticate({
        strategy: 'local',
        email: this.state.emailInput.value,
        password: this.state.passwordInput.value
      }).then(response => {
        return app.passport.verifyJWT(response.accessToken);
      })
      .then(payload => {
        return app.service('users').get(payload.userId);
      })
      .then(user => {
        app.set('user', user);
        this.setState({spinnerVisible: false})
        this.goToHomePage();
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          spinnerVisible: false,
          badLogin: true
        })
      })

    })
    .catch((err) => {
      console.log(err);
      this.setState({
        spinnerVisible: false,
        badLogin: true
      });
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Input
          status={this.state.emailInput.status}
          style={{margin: 15}}
          placeholder='Email'
          value={this.state.emailInput.value}
          onChangeText={value => this.emailHandler(value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <H5 style={{marginTop: 10}}> Password must be at least 5 symbols length</H5>
        <Input
          status={this.state.passwordInput.status}
          style={{margin: 15}}
          placeholder='Password'
          value={this.state.passwordInput.value}
          onChangeText={value => this.passwordHandler(value)}
          secureTextEntry={true}
          selectTextOnFocus={true}
          returnKeyType="done"
        />
        <Input
          status={this.state.confirmPasswordInput.status}
          style={{margin: 15}}
          placeholder='Confirm Password'
          value={this.state.confirmPasswordInput.value}
          onChangeText={value => this.confirmPasswordHandler(value)}
          secureTextEntry={true}
          selectTextOnFocus={true}
          returnKeyType="done"
        />
        {this.state.badLogin ? <H3 style={styles.badLogin}>Bad login</H3> : null}
        {this.state.spinnerVisible ?
          <ActivityIndicator
             animating={true}
             color={theme.blue}
             size="large"
             style={{marginTop: 20}}/>:
           <Button
             onPress={() => this.register()}
             type='primary'
             style={{margin: 15}}
             kind='squared'
             disabled={!( this.state.passwordInput.valid && this.state.confirmPasswordInput.valid && this.state.emailInput.valid)}>
             Sign Up with email
           </Button>
           }
      </View>
    );
  }
}

RegistrationPage.propTypes = {
  navigator: PropTypes.object
}
