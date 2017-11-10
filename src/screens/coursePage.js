import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import {Button} from 'nachos-ui';

import PushController from './../components/shared/pushController'
import CourseCard from './../components/courses/courseCard'
import CourseDrugsList from './../components/courses/courseDrugsList'
import CourseCalendar from './../components/courses/courseCalendar'
import {coursePageStyles as styles, theme} from './../styles'
import {app} from './../feathers'

export default class CoursePage extends Component < {} > {
  constructor(props) {
    super(props);
    const {finished, startedAt} = this.props.course;
    const {canBeApplied} = this.defineStatus(finished, startedAt)
    this.state = {
      course: this.props.course,
      canBeApplied,
    }
  }

  defineStatus(finished, startedAt) {
    if (finished) {
      return {canBeApplied: false}
    } else {
      if (startedAt == 'null') {
        return {canBeApplied: true}
      }
      return {canBeApplied: false}
    }
  }

  applyToCourse() {
    app.service('users').patch(null, {
      "courses.$.finished": false,
      "courses.$.startedAt": moment().format('YYYY-MM-DD')
    }, {
      query: {
        _id: app.get('user')._id,
        courses: {
          $elemMatch: {
            _id: this.state.course._id
          }
        }
      }
    }).then((user) => {
      app.set('user', user[0]);
      user[0].courses.map((course) => {
        if (course._id == this.state.course._id) {
          this.setState({course: course, canBeApplied: false})
        }
      })
      // this.scheduleNotifications(this.state.course.medicineList)
    }).catch((err) => {
      console.log(err);
    })

  }

  scheduleNotifications(list) {
    const notificationList = {}
    for (let i = 0; i < list.length; i++) {
      notificationList[list[i].medication] = []
      for (let j = 0; j < list[i].admissions.length; j++) {
        for (var x = 0; x < this.state.course.duration; x++) {
          PushNotification.localNotificationSchedule({
            message: `Time to get a ${list[i].medication}`,
            date: moment(list[i].admissions[j], 'HH:mm:ss').add(x, 'day').toDate()
          });
        }
      }
    }

    PushNotification.cancelAllLocalNotifications()

  }

  enableApply(canBeApplied) {
    this.setState({canBeApplied})
  }

  getCourseBottom() {
    if (this.state.canBeApplied) {
      return (
        <View>
          <CourseCard courseItem={this.state.course} canBeApplied={canBeApplied => this.enableApply(canBeApplied)}/>
          <CourseDrugsList courseItem={this.state.course}/>
          <Button
            onPress={() => this.applyToCourse()}
            type='success'
            style={{margin: 15, backgroundColor: theme.green}}
            kind='squared'>
            Apply to course
          </Button>
        </View>
      )
    }
    return (<CourseCalendar courseItem={this.state.course}/>)
  }

  render() {
    return (
      <ScrollView style={styles.container} scrollEnabled={this.state.canBeApplied}>
        {this.getCourseBottom()}
        <PushController/>
      </ScrollView>
    )
  }
}

CoursePage.propTypes = {
  course: PropTypes.object
}
