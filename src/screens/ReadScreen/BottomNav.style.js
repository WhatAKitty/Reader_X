import { Dimensions } from 'react-native';
import { iOSColors } from 'react-native-typography'
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

export default {
  container: {
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
  tool: {
    container: {
      flex: 1,
    },
    icon: {
      color: iOSColors.white,
      size: 24,
    },
    text: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 12,
    },
  },
  setting: {
    container: {
      backgroundColor: '#000',
      zIndex: 2,
      opacity: 0.85,
      position: 'absolute',
      width: width,
      bottom: 50,
      flexDirection: 'column',
      alignItems: 'center',
      right: 0,
    },
    brightness: {
      container: {
        flex: 1,
        height: 70,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
      },
      icon: {
        width: width * 3 / 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      slider: {
        flex: 1,
        width: width * 14 / 20,
        alignItems: "stretch",
        justifyContent: "center",
      },
      sliderThumb: {
        backgroundColor: iOSColors.white,
      },
      sliderTrack: {
        backgroundColor: theme.styles.variables.colors.main,
      },
    },
    themes: {
      container: {
        width: width,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    },
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

};