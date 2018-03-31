import { iOSUIKitTall, iOSColors } from 'react-native-typography';

export const defaultTheme = 'QIDIAN_WHITE';
export const moonTheme = 'MOON';
const themes = {
  [moonTheme]: {
    text: iOSUIKitTall.bodyWhiteObject,
    background: {
      backgroundColor: iOSColors.black,
    },
  },
  [defaultTheme]: {
    text: iOSUIKitTall.bodyObject,
    background: {
      backgroundColor: iOSColors.white,
    },
  },
  ZHUISHU_GREEN: {
    text: iOSUIKitTall.bodyObject,
    background: {
      backgroundColor: '#a2cda6',
    },
  },
  QIDIAN_PINK: {
    text: iOSUIKitTall.bodyObject,
    background: {
      backgroundColor: '#ffc4c7',
    },
  },
  QIDIAN_ROCK_YELLOW: {
    text: iOSUIKitTall.bodyObject,
    background: {
      backgroundColor: '#e8e1b7',
    },
  },
  QIDIAN_X: {
    text: iOSUIKitTall.bodyObject,
    background: {
      backgroundColor: '#e4d2a1',
    },
  },
  QIDIAN_Y: {
    text: iOSUIKitTall.bodyObject,
    background: {
      backgroundColor: '#f3deae',
    },
  },
};

export const getTheme = (key = defaultTheme) => {
  if (key === null) {
    key = defaultTheme;
  }
  return themes[key];
}

export default themes;
