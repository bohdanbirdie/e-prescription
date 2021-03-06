import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Button } from 'nachos-ui';

import ListItem from './../components/shared/listItem'
import { addDrugPageStyles as styles, theme } from './../styles';

export default class AddDrug extends Component<{}> {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Cancel', // for a textual button, provide the button title (label)
        id: 'cancelDrug', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '400', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  }

  constructor(props){
    super(props);
    this.state = {
      admissions: [],
      drugName: '',
      allowToSave: false
    }
    this.admissionsAmount = 0;

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'cancelDrug':
        this.props.navigator.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
        break;
      default:

    }
  }

  saveAndGoBack(){
    this.props.applySavedDrug(this.state)
    this.props.navigator.dismissModal({
      animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });

  }

  addAdmission(){
    this.setState({admissions: this.state.admissions.concat('')})
  }

  getAdmissions(){
    return(
      this.state.admissions.map((time, index) =>
        <DatePicker
          key={index}
          style={{width: 200}}
          date={time}
          mode="time"
          placeholder="Select time"
          format="HH:mm:ss"
          showIcon={false}
          is24Hour={true}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              borderRightWidth: 0,
              borderBottomWidth: 0,
              borderTopWidth: 0,
              marginTop: 10,
              paddingLeft: 15,
              alignItems: 'flex-start',
              alignSelf: 'stretch',
            },
            placeholderText: {
              borderRadius: 0,
              fontSize: 15,
              color: '#FF0000'
            }
          }}
          onDateChange={(date) => {
            const admissions = this.state.admissions;
            admissions[index] = date
            this.setState({admissions, allowToSave: true});
        }}
      />)
    )
  }

  saveDrug(){
    if (this.state.admissions.length > 0 && this.state.drugName.length > 0 && this.state.allowToSave) {
      return(
        <Button
          kind='squared'
          type='success'
          onPress={()=>this.saveAndGoBack()}
          style={{marginTop: 20, backgroundColor: theme.green}}>
          Save
        </Button>)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Drug name"
          autoCorrect={false}
          style={styles.nameInput}
          onChangeText={(drugName) => this.setState({drugName})}/>
        {this.getAdmissions()}

        <View style={{marginTop: 20}}>
          <ListItem
            leftIcon="ios-add-circle-outline"
            iconSize={20}
            leftIconColor="#0000CC"
            text='Add admission time'
            onPress={()=>this.addAdmission()}/>
        </View>
        {this.saveDrug()}
      </View>
    );
  }
}

AddDrug.propTypes = {
  navigator: PropTypes.object,
  applySavedDrug: PropTypes.func
}
