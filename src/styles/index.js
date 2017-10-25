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
    // backgroundColor: '#EFEF00',
  },
  textWrapper: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: '#EFEFEF',
    // paddingLeft: 5
  },
})

export { courseStyles }
