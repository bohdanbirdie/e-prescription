import {StyleSheet} from 'react-native';

const theme = {
  blue: '#368FFB',
  gray: '#CCCCCC',
  brightGray: '#EEEEEE',
  green: '#8CD8BA',
  yellow: '#FFE74C',
  red: '#FF5964'
}

const loginPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 30
  },
  badLogin: {
    color: theme.red
  },
  signIn: {
    height: 60,
    margin: 20
  },
  buttons: {
    width: 100
  }
});

const homePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

const courseStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FBFBFB',
    alignSelf: 'stretch',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row'
  },
  iconWrapper: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWrapper: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

const coursePageStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const addCoursePageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    paddingLeft: 15,
  },
  nameInput: {
    height: 60,
    fontSize: 30
  },
  durationInput: {
    height: 40,
    fontSize: 20
  }
});

const addDrugPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  nameInput: {
    paddingLeft: 15,
    height: 35,
    fontSize: 30,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
});

const courseCardStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 175,
    paddingLeft: 15
  },
  text: {
    color: '#000000'
  }
});

const courseDrugsListStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    // height: 40,
    paddingLeft: 15
  },
  text: {
    color: '#000000'
  }
});

const listItem = StyleSheet.create({
  item: {
    alignSelf: 'stretch',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconWrapper: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5
  },
  textWrapper: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

const courseCalendarStyle = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    marginTop: 17,
  },
  admission: {
    paddingLeft: 5
  },
  drugItem: {
    // backgroundColor: theme.brightGray,
    // borderRadius: 5,
    margin: 4,
    padding: 5
  },
  drugName: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

export {
  theme,
  loginPageStyles,
  homePageStyles,
  courseStyles,
  coursePageStyles,
  addCoursePageStyles,
  addDrugPageStyles,
  courseCardStyles,
  courseDrugsListStyles,
  listItem,
  courseCalendarStyle
};
