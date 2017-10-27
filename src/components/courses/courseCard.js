import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { H1, H2, H3, Progress } from 'nachos-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import { courseCardStyles as styles } from './../../styles'

export default class CourseCard extends Component {
  constructor(props) {
    super(props);
    const { name, finished, startedAt } = this.props.courseItem;
    const { icon, color, definition } = this.defineStatus(finished, startedAt)
    const { height, width } = Dimensions.get('window');
    this.state = {
      name,
      finished,
      startedAt,
      icon,
      color,
      definition,
      height,
      width
    }
  }

  defineStatus(finished, startedAt){
    if (finished) {
      return {icon: 'ios-checkbox-outline', color: '#00CC00', definition: 'finished'}
    } else {
      if (startedAt == 'null') {
        return {icon: 'ios-close', color: '#CCCCCC', definition: 'pending'}
      }
      return {icon: 'ios-walk', color: '#0000CC', definition: 'in progress'}
    }
  }

  getDuration(){
    let daysLeft;
    if (this.props.courseItem.startedAt != 'null') {
      daysLeft = `, 3 daysLeft`;
    } else {
      daysLeft = '';
    }

    return(
      <H3 style={{color: '#000000'}}>Duration: {this.props.courseItem.duration} days{daysLeft}</H3>
    )
  }

  render(){
    return(
      <View>
        <Progress progress={0.3} width={this.state.width}/>
        <View style={styles.container}>
          <H1 style={{color: '#000000'}}>
            {this.props.courseItem.name.charAt(0).toUpperCase() + this.props.courseItem.name.slice(1)}</H1>
          {this.getDuration()}
          <H3 style={{color: '#000000'}}>Status: {this.state.definition}
          </H3>
        </View>
      </View>
    )
  }
}
