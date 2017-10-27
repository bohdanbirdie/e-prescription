import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { listItem as styles } from './../../styles'

export default class ListItem extends Component<{}> {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.props.onPress.bind(this)}>
      <View style={styles.item}>
        <Icon
          name={this.props.leftIcon}
          size={this.props.iconSize}
          color={this.props.leftIconColor}
          style={styles.iconWrapper}
        />
        <Text style={styles.textWrapper}>{this.props.text}</Text>
        <Icon
          name={this.props.rightIcon || 'ios-arrow-forward'}
          size={this.props.iconSize}
          color={this.props.rightIconColor || '#C0C0C0'}
          style={styles.iconWrapper}
        />
      </View>
      </TouchableHighlight>
    )
  }
}

ListItem.propTypes = {
  onPress: PropTypes.func,
  leftIcon: PropTypes.string,
  leftIconColor: PropTypes.string,
  iconSize: PropTypes.number,
  text: PropTypes.string,
  rightIcon: PropTypes.string,
  rightIconColor: PropTypes.string,
}
