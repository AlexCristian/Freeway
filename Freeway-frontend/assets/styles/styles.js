import {StyleSheet, Dimensions} from 'react-native';

const DIMENSION_WIDTH = Dimensions.get('window').width;
const DIMENSION_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  containerCardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {height: 0, width: 0},
  },
  descriptionCardItem: {
    color: '#757E90',
    textAlign: 'center',
  },
  actionsCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: '#363636',
    shadowOffset: {height: 10, width: 0},
  },
  containerHome: {marginHorizontal: 10, marginVertical: 10},
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },
  message: {
    color: '#757E90',
    fontSize: 12,
    paddingTop: 5,
  },
});
