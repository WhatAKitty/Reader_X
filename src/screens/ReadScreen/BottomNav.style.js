import { Dimensions } from 'react-native';
import { iOSColors } from 'react-native-typography'

const { width } = Dimensions.get('window');

export default {
  Fotter: {
    height: 50,
    paddingTop: 6,
    backgroundColor: '#000',
    zIndex: 2,
    width: width,
    position: 'absolute',
    opacity: 0.85,
    bottom: 0,
    left: 0,
    flexDirection: 'row'
  },
  Setting: {
    height: 80,
    backgroundColor: '#000',
    zIndex: 2,
    opacity: 0.85,
    position: 'absolute',
    width: width,
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    right: 0,
  },
  roundx: {
    width: 30,
    height: 30,
    zIndex: 4,
    borderRadius: 30,
    opacity: 1,
    borderWidth: 1,
    borderColor: iOSColors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    size: 20,
    color: iOSColors.red,
  },

  FotterItems: {
    color: '#fff', textAlign: 'center', fontSize: 12,
  },

};