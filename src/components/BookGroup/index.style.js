import { colors, size } from '../../theme';

export default {
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  book: {
    container: {
      flexDirection: 'column',
      marginRight: 15,
    },
    preview: {
      width: 95,
      height: 125,
    },
    titleWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
    },
    title: {
      fontSize: size.md,
      color: colors.text,
      textAlign: 'center',
    },
    readers: {
      fontSize: size.md,
      color: colors.info,
      textAlign: 'center',
    },
  },
}
