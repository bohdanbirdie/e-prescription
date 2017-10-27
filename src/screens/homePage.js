import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import Course from './../components/courses/courseCmp'

import { app } from './../feathers'

// import PushNotification from 'react-native-push-notification';

// import PushController from './pushController';

export default class homePage extends Component<{}> {
  constructor(){
    super();
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid})
    this.state = {
      user: app.get('user'),
      dataSource: dataSource.cloneWithRows(app.get('user').courses)
    }
  };

  renderRow(rowData, sectionID, rowID){
    return (
      <TouchableHighlight onPress={() => this.goToCoursePage(rowData)}>
        <View>
          <Course courseItem={rowData}/>
        </View>
      </TouchableHighlight>
    );
  }

  goToCoursePage(course){
    console.log(course);
    this.props.navigator.push({
      screen: 'epres.CoursePage', // unique ID registered with Navigation.registerScreen
      title: course.name, // navigation bar title of the pushed screen (optional)
      passProps: { course }, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      // animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      // backButtonTitle: undefined, // override the back button title (optional)
      // backButtonHidden: false, // hide the back button altogether (optional)
      // navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
      // navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}>

        </ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
