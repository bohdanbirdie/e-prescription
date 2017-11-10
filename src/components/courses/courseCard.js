import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions} from 'react-native';
import {H1, H3, Progress} from 'nachos-ui';
import moment from 'moment';

import {courseCardStyles as styles} from './../../styles'

export default class CourseCard extends Component {
  constructor(props) {
    super(props);
    const {name, finished, startedAt} = this.props.courseItem;
    const {icon, color, definition, canBeApplied} = this.defineStatus(finished, startedAt)
    this.props.canBeApplied(canBeApplied)
    const {height, width} = Dimensions.get('window');
    this.state = {
      name,
      finished,
      startedAt,
      icon,
      color,
      definition,
      height,
      width,
      canBeApplied,
      progress: 0,
      daysLeft: ''
    }
  }

  componentWillMount() {
    this.getDuration()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.courseItem !== nextProps.courseItem) {
      const {name, finished, startedAt} = nextProps.courseItem;
      const {icon, color, definition, canBeApplied} = this.defineStatus(finished, startedAt);
      this.setState({
        name,
        finished,
        startedAt,
        icon,
        color,
        definition,
        canBeApplied
      });
      this.getDuration(nextProps.courseItem);
    }
  }

  defineStatus(finished, startedAt) {
    if (finished) {
      return {icon: 'ios-checkbox-outline', color: '#00CC00', definition: 'finished', canBeApplied: false}
    } else {
      if (startedAt == 'null') {
        return {icon: 'ios-close', color: '#CCCCCC', definition: 'pending', canBeApplied: true}
      }
      return {icon: 'ios-walk', color: '#0000CC', definition: 'in progress', canBeApplied: false}
    }
  }

  getDuration(course) {
    const courseItem = {};
    if (course) {
      courseItem.startedAt = course.startedAt;
      courseItem.duration = course.duration;
    } else {
      courseItem.startedAt = this.props.courseItem.startedAt;
      courseItem.duration = this.props.courseItem.duration;
    }

    let daysLeft;
    if (moment(courseItem.startedAt, 'YYYY-MM-DD')._isValid) {
      daysLeft = moment(courseItem.startedAt, 'YYYY-MM-DD').add(courseItem.duration, 'days').diff(moment(), 'days');
      this.setState({
        progress: ((100 / courseItem.duration) * (courseItem.duration - daysLeft)) / 100,
        daysLeft: ' | ' + daysLeft + ' days left'
      });
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <H1 style={{color: '#000000'}}>
            {this.props.courseItem.name.charAt(0).toUpperCase() + this.props.courseItem.name.slice(1)}
          </H1>
          <H3 style={{color: '#000000'}}>
            Duration: {this.props.courseItem.duration} days{this.state.daysLeft}
          </H3>
          <H3 style={{color: '#000000'}}>
            Status: {this.state.definition}
          </H3>
        </View>
      </View>
    )
  }
}

CourseCard.propTypes = {
  courseItem: PropTypes.object,
  canBeApplied: PropTypes.func
}
