import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, ListView, TouchableHighlight, Text} from 'react-native';
import Swipeout from 'react-native-swipeout';

import Course from './../components/courses/courseCmp'
import {app} from './../feathers'
import {homePageStyles as styles} from './../styles';

export default class HomePage extends Component < {} > {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Add', // for a textual button, provide the button title (label)
        id: 'addCourse', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '400', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ],
    leftButtons: [
      {
        title: 'Settings', // for a textual button, provide the button title (label)
        id: 'settings', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '400', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  }

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    })
    this.state = {
      user: app.get('user'),
      dataSource: dataSource.cloneWithRows(app.get('user').courses || [])
    }

    const updateUser = user => {
      this.setState({
        user,
        dataSource: dataSource.cloneWithRows(user.courses)
      })
    }

    app.service('users').on('patched', updateUser.bind(this))
    app.service('users').on('updated', updateUser.bind(this))

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  renderRow(rowData, sectionID, rowID) {
    let swipeBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 1, 0.6)',
        onPress: () => {
          this.deleteCourse(rowData);
        }
      }
    ];
    return (
      <Swipeout right={swipeBtns} autoClose={true} backgroundColor='transparent'>
        <TouchableHighlight onPress={() => this.goToCoursePage(rowData)} key={rowID}>
          <View>
            <Course courseItem={rowData}/>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'addCourse':
        this.props.navigator.push({
          screen: 'epres.addCoursePage', // unique ID registered with Navigation.registerScreen
          title: 'Add course', // navigation bar title of the pushed screen (optional)
          animated: true, // does the push have transition animation or does it happen immediately (optional)
        });
        break;
      case 'settings':
        this.props.navigator.push({
          screen: 'epres.settingsPage', // unique ID registered with Navigation.registerScreen
          title: 'Settings', // navigation bar title of the pushed screen (optional)
          animated: true, // does the push have transition animation or does it happen immediately (optional)
        });
        break;
      default:

    }
  }

  deleteCourse(course) {
    app.service('users').update(app.get('user')._id, {
      $pull: {
        courses: {
          _id: course._id
        }
      }
    }).then((value) => {
      console.log(value);
    }).catch((err) => {
      console.log(err);
    })

  }

  goToCoursePage(course) {
    this.props.navigator.push({
      screen: 'epres.CoursePage', // unique ID registered with Navigation.registerScreen
      title: course.name, // navigation bar title of the pushed screen (optional)
      passProps: {
        course
      }, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
    });
  }

  getCourses() {
    if (this.state.user.courses && this.state.user.courses.length) {
      return (<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true}/>)
    }

    return (
      <Text>No courses yet</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getCourses()}
      </View>
    );
  }

}

HomePage.propTypes = {
  navigator: PropTypes.object
}
