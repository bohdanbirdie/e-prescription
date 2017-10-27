import { StyleSheet } from 'react-native';
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
    alignItems: 'center',
  },
  textWrapper: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

const coursePageStyles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const courseCardStyles = StyleSheet.create({
  container: {
    // flex: 1,
    alignSelf: 'stretch',
    height: 175,
    paddingLeft: 15,
  }
});

const courseDrugsListStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    // height: 40,
    paddingLeft: 15,
  },
  text: {
    color: '#000000',
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
    alignItems: 'center',
  },
  iconWrapper: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  textWrapper: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export {
  courseStyles,
  coursePageStyles,
  courseCardStyles,
  courseDrugsListStyles,
  listItem
};
