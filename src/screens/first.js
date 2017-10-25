import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  // Button
} from 'react-native';
import {
  Input,
  H3,
  Button
} from 'nachos-ui';

import {app} from './../feathers'
import Spinner from 'react-native-loading-spinner-overlay';

// import PushNotification from 'react-native-push-notification';
// import PushController from './pushController';


export default class first extends Component<{}> {
  constructor(props) {
    super();
    this.state = {
      spinnerVisible: true,
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
    };
  }

  goToHomePage(){
    this.props.navigator.resetTo({
      screen: 'epres.HomePage',
      title: 'Medicine list',
      animated: true,
      // animationType: 'fade'
    });
  }

  componentWillMount() {
    app.authenticate().then((token) => {
      console.log(token)
      return app.passport.verifyJWT(token.accessToken)
      // .then((value) => {
      //   console.log(app);
      //
      //   this.goToHomePage()
      // })
    })
    .then(payload => {
      console.log('JWT Payload', payload);
      return app.service('users').get(payload.userId);
    })
    .then(user => {
      app.set('user', user);
      this.setState({spinnerVisible: false})
      this.goToHomePage();
      console.log('User', app.get('user'));
    })
    .catch((err) => {
      this.setState({spinnerVisible: false})
      console.log(err);
    })
  }

  componentDidMount() {
  //  setTimeout(() => {
  //    this.setState({
  //      spinnerVisible: !this.state.spinnerVisible
  //    });
  //    console.log(this.state.visible);
  //    }, 3000);
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

   passwordHandler(password){
     let passwordInput
     if (password.length > 0) {
       passwordInput = {
         status: 'valid',
         value: password,
         valid: true
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

   signIn(){
    //  email: "user@example.com",
    //  password: "password"
     this.setState({spinnerVisible: true})

     app.authenticate({
       strategy: 'local',
       email: this.state.emailInput.value,
       password: this.state.passwordInput.value
     }).then(response => {
       console.log('Authenticated!', response);
       return app.passport.verifyJWT(response.accessToken);
     })
     .then(payload => {
       console.log('JWT Payload', payload);
       return app.service('users').get(payload.userId);
     })
     .then(user => {
       app.set('user', user);
       this.setState({spinnerVisible: false})
       this.goToHomePage();
       console.log('User', app.get('user'));
     })
     .catch(error => {
       this.setState({
         spinnerVisible: false,
         badLogin: true
       })
       console.log('Error authenticating!', error);
     })
   }

  render() {
    // console.log(this.props);
    // console.log(PushNotification);
    // PushNotification.localNotificationSchedule({
    //   message: "My Notification Message", // (required)
    //   date: new Date(Date.now() + (30 * 1000)) // in 60 secs
    // });
    // console.log('notification', new Date(Date.now() + (30 * 1000)));
    return (
      <View style={styles.container}>
      <Spinner
        visible={this.state.spinnerVisible}
        overlayColor="rgba(0, 0, 0, 1)"
        textContent={"Loading..."}
        textStyle={{color: '#FFF'}}
         />
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
        {this.state.badLogin ? <H3 style={styles.badLogin}>Bad login</H3> : null}
        <Button
          onPress={() => this.signIn()}
          type='success'
          style={{margin: 15}}
          kind='squared'
          disabled={!(this.state.passwordInput.valid && this.state.emailInput.valid)}
        >
          Sign In
        </Button>
        {/* <PushController /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 30
  },
  badLogin: {
    color: 'rgb(224, 49, 38)'
  }
});
