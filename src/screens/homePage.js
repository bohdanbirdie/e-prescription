import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ListView, TouchableHighlight } from 'react-native';

import Course from './../components/courses/courseCmp'
import { app } from './../feathers'
import { homePageStyles as styles } from './../styles';

export default class HomePage extends Component<{}> {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Add', // for a textual button, provide the button title (label)
        id: 'addCourse', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '400', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  }

  constructor(props){
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid})
    this.state = {
      user: app.get('user'),
      dataSource: dataSource.cloneWithRows(app.get('user').courses)
    }

    app.service('users').on('updated', user => {
      this.setState({user, dataSource: dataSource.cloneWithRows(user.courses)})
    })

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  renderRow(rowData, sectionID, rowID){
    return (
      <TouchableHighlight onPress={() => this.goToCoursePage(rowData)} key={rowID}>
        <View>
          <Course courseItem={rowData}/>
        </View>
      </TouchableHighlight>
    );
  }

  onNavigatorEvent(event){
    switch (event.id) {
      case 'addCourse':
        this.props.navigator.push({
          screen: 'epres.addCoursePage', // unique ID registered with Navigation.registerScreen
          title: 'Add course', // navigation bar title of the pushed screen (optional)
          animated: true, // does the push have transition animation or does it happen immediately (optional)
        });
        break;
      default:

    }
  }


  goToCoursePage(course){
    this.props.navigator.push({
      screen: 'epres.CoursePage', // unique ID registered with Navigation.registerScreen
      title: course.name, // navigation bar title of the pushed screen (optional)
      passProps: { course }, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}

HomePage.propTypes = {
  navigator: PropTypes.object
}
