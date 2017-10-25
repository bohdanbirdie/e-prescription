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
      <TouchableHighlight onPress={() => console.log(rowData)}>
        <View>
          <Course courseItem={rowData}/>
        </View>
      </TouchableHighlight>
    );
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
