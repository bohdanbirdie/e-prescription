import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { courseStyles as styles } from './../../styles'

export default class Course extends Component {
  constructor(props) {
    super(props);
    const { name, finished, startedAt } = this.props.courseItem;
    const {icon, color} = this.defineStatus(finished, startedAt)
    this.state = {
      name,
      finished,
      startedAt,
      icon,
      color
    }
  }

  defineStatus(finished, startedAt){
    if (finished) {
      return {icon: 'ios-checkbox-outline', color: '#00CC00'}
    } else {
      if (startedAt == 'null') {
        return {icon: 'ios-close', color: '#CCCCCC'}
      }
      return {icon: 'ios-walk', color: '#0000CC'}
    }
  }

  render(){
    return(
      <View style={styles.wrapper}>
        <View style={styles.iconWrapper}>
          <Icon name={this.state.icon} size={30} color={this.state.color} />
        </View>
        <View style={styles.textWrapper}>
          <Text>{this.props.courseItem.name}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Icon name="ios-arrow-forward" size={30} color="#C0C0C0" />
        </View>
      </View>
    )
  }
}

Course.propTypes = {
  courseItem: PropTypes.object
}
