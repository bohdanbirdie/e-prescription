import React, { Component } from 'react';
import {
  View,
  ListView,
} from 'react-native';

import CourseCard from './../components/courses/courseCard'
import CourseDrugsList from './../components/courses/courseDrugsList'
import { coursePageStyles as styles } from './../styles'

export default class CoursePage extends Component<{}> {
  constructor(props){
    super(props);
    console.log(this.props);
  }

  render(){
    return(
      <View style={styles.container}>
        <CourseCard courseItem={this.props.course} />
        <CourseDrugsList courseItem={this.props.course} />
      </View>
    )
  }
}
