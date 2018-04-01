import { iOSUIKitTall, iOSColors } from 'react-native-typography';

export const defaultTheme = 'QIDIAN_WHITE';
export const moonTheme = 'MOON';
const commonTheme = {
  text: iOSUIKitTall.title3Object,
};
const themes = {
  [moonTheme]: {
    ...commonTheme,
    text: iOSUIKitTall.title3WhiteObject,
    background: {
      backgroundColor: iOSColors.black,
    },
  },
  [defaultTheme]: {
    ...commonTheme,
    background: {
      backgroundColor: iOSColors.white,
    },
  },
  ZHUISHU_GREEN: {
    ...commonTheme,
    background: {
      backgroundColor: '#a2cda6',
    },
  },
  QIDIAN_PINK: {
    ...commonTheme,
    background: {
      backgroundColor: '#ffc4c7',
    },
  },
  QIDIAN_ROCK_YELLOW: {
    ...commonTheme,
    background: {
      backgroundColor: '#e8e1b7',
    },
  },
  QIDIAN_X: {
    ...commonTheme,
    background: {
      backgroundColor: '#e4d2a1',
    },
  },
  QIDIAN_Y: {
    ...commonTheme,
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
