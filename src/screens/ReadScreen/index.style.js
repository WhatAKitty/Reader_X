import { Dimensions } from 'react-native';
import { iOSUIKitTall, iOSColors } from 'react-native-typography'

const { height, width } = Dimensions.get('window');

export default {
  header: {
    self: {
      position: 'absolute',
      backgroundColor: iOSColors.black,
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0,
      opacity: 0.75
    },
  },
  title: {
    wrapper: {
      height: 40,
      paddingLeft: 20,
      paddingTop: 10,
    },
    text: {
      ...iOSUIKitTall.caption2Object,
      color: iOSColors.gray,
      height: 30,
      lineHeight: 30,
    },
  },
  footer: {
    wrapper: {
      flexDirection: 'row',
      height: 40,
      paddingLeft: 20,
      paddingRight: 20,
    },
    text: {
      ...iOSUIKitTall.caption2Object,
      color: iOSColors.gray,
      flex: 1,
      height: 40,
      lineHeight: 40,
      textAlignVertical: 'bottom',
    },
    right: {
      textAlign: 'right',
    },
  },
}
