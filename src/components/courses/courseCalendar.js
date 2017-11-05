import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';

import { courseCalendarStyle as styles } from './../../styles'

export default class CourseCalendar extends Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get('window');
    this.width = width;
    this.height = height;
    const { name, finished, startedAt, medicineList, duration } = this.props.courseItem;
    this.state = {
      name,
      finished,
      startedAt,
      medicineList,
      duration,
      status: this.defineStatus(finished, startedAt),
      markedDates: {},
      items: {},
      days: [],
      today: moment().format('YYYY-MM-DD')
    }

    this.markingStyles = {
      color: '#00C997',
      textColor: '#203B57'
    }
  }

  componentWillMount(){
    this.setState({
      markedDates: this.getMarkedDays(),
      items: this.getItems(),
      days: this.getDays()
    })
  }

  defineStatus(finished, startedAt){
    if (finished) {
      return {definition: 'finished'}
    } else {
      if (startedAt == 'null') {
        return {definition: 'pending'}
      }
      return {definition: 'in progress'}
    }
  }

  getDays(){
    const days = []
    for (var i = 0; i < this.state.duration; i++) {
      days.push(moment(this.state.startedAt, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD'))
    }
    return days;
  }

  getItems(){
    const days = this.getDays()
    let items = {}
    if (this.state.status.definition === 'in progress') {
      days.map((day) => {
        items[day] = [this.state.medicineList];
        // this.state.medicineList.map((item) => {
        //   items[day].push({
        //     text: item.medication
        //   })
        // })
      })
    }

    return items
  }



  getMarkedDays(){
    const { color } = this.markingStyles;
    const days = this.getDays()
    let items = {}
    if (this.state.status.definition === 'in progress') {
      days.map((day) => {
        items[day] = [{
          color: '#FFEEBA', textColor: 'black'
        }];
      })
      //Init range borders and selected day//
      items[days[0]][0].startingDay = true;
      items[days[days.length-1]][0].endingDay = true;
      if (items[this.state.today]) {
        items[this.state.today][0].color = color;
      }
      ///////////////////////////////////////
    }

    return items
  }

  onDayPress(day){
    const { color, textColor } = this.markingStyles;
    const markedDates = this.getMarkedDays()
    if (markedDates[day.dateString]) {
      switch (this.state.days.indexOf(day.dateString)) {
        case 0:
          markedDates[day.dateString] = [{startingDay: true, color, textColor}];
          break;
        case this.state.days.length-1:
          markedDates[day.dateString] = [{endingDay: true, color, textColor}];
          break;
        default:
          markedDates[day.dateString].push({color, textColor})
      }
    } else {
      markedDates[day.dateString] = [{startingDay: true, color, textColor}, {endingDay: true, color, textColor}]
    }

    this.setState({markedDates})
  }

  render(){
    return(
      <View>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={(month) => {console.log('trigger items loading')}}
          onDayPress={(day)=>this.onDayPress(day)}
          onDayChange={(day)=>{console.log('day changed', day)}}
          minDate={this.state.startedAt}
          maxDate={'2017-11-25'}
          pastScrollRange={1}
          futureScrollRange={3}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          markedDates={this.state.markedDates}
          markingType={'interactive'}
          style={{height: (this.height-245)}}
          theme={{height: 400, paddingBottom: 10, borderBottomColor: 'red', borderBottomWidth: 10}}
        />
      </View>
    )
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        {
          item.map((drug) => {
            return(
              <View key={drug.medication} style={styles.drugItem}>
                <Text style={styles.drugName}>{drug.medication}</Text>
                {drug.admissions.map((admission) => {
                  return (<Text style={styles.admission} key={admission}>{admission}</Text>)
                })}
              </View>
            )
          })
        }
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
}


CourseCalendar.propTypes = {
  courseItem: PropTypes.object
}
