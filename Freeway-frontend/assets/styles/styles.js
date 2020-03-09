import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerCardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
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
    marginHorizontal: 15,
  },
});
