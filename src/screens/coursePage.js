import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import CourseCard from './../components/courses/courseCard'
import CourseDrugsList from './../components/courses/courseDrugsList'
import { coursePageStyles as styles } from './../styles'

export default class CoursePage extends Component<{}> {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <ScrollView style={styles.container}>
        <CourseCard courseItem={this.props.course} />
        <CourseDrugsList courseItem={this.props.course} />
      </ScrollView>
    )
  }
}

CoursePage.propTypes = {
  course: PropTypes.object
}
