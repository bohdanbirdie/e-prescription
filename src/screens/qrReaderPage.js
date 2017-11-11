import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';


export default class QRReader extends Component < {} > {
  constructor(props) {
    super(props);
    const {height, width} = Dimensions.get('window');
    this.state = {
      height,
      width,
      reactivate: false
    }
  }

  onSuccess(e){
    if (e.data.split('.')[0] === 'epres') {
      this.props.navigator.resetTo({
        screen: 'epres.RegistrationPage',
        title: 'Sign Up',
        animated: true,
      })
    } else {
      Alert.alert(
        'Oooopss',
        'QR code is not valid',
        [
          {text: 'Try again', onPress: () => {
            this.scanner.reactivate()
          }, style: 'cancel' },
          {text: 'Cancel', onPress: () =>
            this.props.navigator.resetTo({
              screen: 'epres.LoginPage',
              title: 'Sign Up',
              animated: true,
            }),
            style: 'destructive'
          },
        ],
      )
    }

  }

  render() {
    return (
      <View>
        <QRCodeScanner
          ref={(node) => { this.scanner = node }}
          onRead={(e) => this.onSuccess(e)}
          cameraStyle={{height: this.state.height}}
          />
      </View>
    )
  }
}

QRReader.propTypes = {
  navigator: PropTypes.object
}
