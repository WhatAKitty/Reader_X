import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import styles from './index.style';

/**
 * 
 * @param {*} number 
 * @param {*} fixed 
 * @param {*} type 0: round 1: floor 2: ceil
 */
function fixedRound(number, fixed, type = 0) {
  if (!fixed) {
    fixed = 0;
  }
  // 输入必须为数字
  if (typeof number !== 'number' || typeof fixed !== 'number')
    throw new Error('Parameters should be type of number!');
  // fixed 必须为整数
  if (fixed % 1 !== 0)
    throw new Error('Parameter `fixed` should be an integer!');

  if (fixed === 0) return Math.round(number);
  var t = Math.pow(10, fixed);
  switch (type) {
    case 0: return Math.round(number * t) / t;
    case 1: return Math.floor(number * t) / t;
    case 2: return Math.ceil(number * t) / t;
    default:
      throw new Error(`No type ${type}`);
  }

}

const formatNumber = (number, fixed = 0, unit = true, type = 0) => {
  if ('undefined' === typeof number) {
    return '0';
  }
  if (number >= 10000) {
    return `${fixedRound(number / 10000, fixed, type)}${unit ? '万' : ''}`;
  }
  return number;
};

const formatTitle = (title) => {
  if (title.length > 7) {
    return `${title.substring(0, 5)}...`;
  }
  return title;
}

const BookGroup = (props) => {
  const { books, navigation } = props;
  return (
    <ScrollView horizontal={true} style={styles.container}>
      {
        books.map(book => {
          return (
            <TouchableWithoutFeedback
              key={book._id}
              onPress={() => {
                navigation.navigate('Book', book, NavigationActions.navigate({
                  routeName: 'Info', params: {
                    BookId: book._id,
                  }
                }));
              }}
            >
              <View style={styles.book.container}>
                <Image style={styles.book.preview} source={{ uri: book.cover }} />
                <View style={styles.book.titleWrapper}>
                  <Text style={styles.book.title}>{formatTitle(book.title)}</Text>
                </View>
                <Text style={styles.book.readers}>{`${formatNumber(book.latelyFollower, 1, true, 1)}人...`}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })
      }
    </ScrollView>
  );
}

BookGroup.propTypes = {
  books: PropTypes.array.isRequired,
}

export default BookGroup;
