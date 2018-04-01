import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import { NavigationActions, HeaderBackButton } from 'react-navigation';
import { Icon, Button, Rating, Divider, Avatar, ButtonGroup } from 'react-native-elements';
import { ParallaxView } from 'react-native-pin-parallax-view';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Page from '../../components/Page';
import RefreshFlatList, { RefreshState } from '../../components/RefreshFlatList';
import BookComment from '../../components/BookComment';
import Toast from '../../components/Toast';

import getRealm from '../../models';

import { theme } from '../../theme';
import styles from './index.style';

import { item } from '../../services/book';

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

class BookScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions, screenProps }) => {
    return {
      ...navigationOptions,
      title: `${navigation.state.params.title ? navigation.state.params.title : ''}`,
      headerStyle: {
        position: 'absolute',
        backgroundColor: theme.styles.variables.colors.transparent,
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 0,
      },
      headerLeft: (
        <HeaderBackButton
          title='返回'
          tintColor={'#fff'}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      ),
      headerRight: (
        <View style={theme.styles.navRightContainer}>
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='share-alternative'
            type='entypo'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => { }}
          />
        </View>
      ),
      tabBarVisible: false,
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      book: {},
    };
  }

  componentDidMount() {
    this._onFetch();
  }

  renderListStyleItem(item, onPress) {
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
      >
        <View style={styles.listStyleItem.container}>
          <Text style={styles.listStyleItem.label}>{item.label ? item.label : ''}</Text>
          <Text style={styles.listStyleItem.value}>{item.value ? item.value : ''}</Text>
          <Icon
            containerStyle={styles.listStyleItem.chevron.container}
            name='chevron-right'
            type='entypo'
            size={styles.listStyleItem.chevron.size}
            color={styles.listStyleItem.chevron.color}
            underlayColor={styles.listStyleItem.chevron.color}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderBookInfo(book) {
    return (
      <View style={styles.info.container}>
        <Image source={{ uri: book.cover }} style={styles.info.preview} />
        <View style={styles.info.text.container}>
          <Text style={styles.info.text.title}>{book.title ? book.title : '--'}</Text>
          <Text style={styles.info.text.author}>{book.author ? book.author : '--'}</Text>
          <View style={[styles.info.text.inline]}>
            <Rating style={styles.info.text.rating} ratingCount={10} startingValue={+book.score} readonly={true} imageSize={theme.styles.variables.size.md} />
            <Text style={styles.info.text.others}>{book.latelyFollower ? `${formatNumber(book.latelyFollower)}人读过` : ''}</Text>
          </View>
          <Text style={styles.info.text.others}>{book.majorCate && book.minorCate ? `${book.majorCate} | ${book.minorCate}` : '--'}</Text>
          <Text style={styles.info.text.others}>{book.wordCount && 'undefiend' !== typeof book.isSerial ? `${formatNumber(book.wordCount, 1)}字 | ${book.isSerial ? '连载中' : '已完结'}` : '--'}</Text>
        </View>
      </View>
    );
  }

  renderBookStatisticsItem(item) {
    return (
      <View key={item.label} style={styles.statistics.item.container}>
        <View style={styles.statistics.item.data.container}>
          <Text style={styles.statistics.item.data.number}>{item.number ? item.number : '--'}</Text>
          <Text style={styles.statistics.item.data.unit}>{item.unit ? item.unit : ''}</Text>
        </View>
        <Text style={styles.statistics.item.label}>{item.label}</Text>
      </View>
    );
  }

  renderBookStatistics(book) {
    const statistics = [{
      label: '月票',
      number: 0,
    }, {
      label: '推荐',
      number: formatNumber(book.postCount, 0, false),
      unit: '万'
    }, {
      label: '打赏',
      number: formatNumber(book.followerCount, 1, false),
      unit: '万次',
    }, {
      label: '粉丝',
      number: formatNumber(book.latelyFollower, 1, false, 1),
      unit: '万+',
    }];
    return (
      <View style={styles.statistics.container}>
        {statistics.map(item => this.renderBookStatisticsItem(item))}
      </View>
    );
  }

  renderBookDetail(book) {
    return (
      <View style={styles.detail.container}>
        <View style={styles.detail.description.container}>
          <Text style={styles.detail.description.title}>简介</Text>
          <Text style={styles.detail.description.text}>{book.longIntro ? book.longIntro : '--'}</Text>
        </View>
        {this.renderListStyleItem({ label: '目录', value: `连载至 ${book.chaptersCount} 章` })}
      </View>
    );
  }

  renderBookHonor(book) {
    // return (
    //   <View style={styles.honor.container}>
    //     {this.renderListStyleItem({ label: '作品荣誉', value: `${book.BookHonor && book.BookHonor.length ? book.BookHonor[0].Honors : ''}` })}
    //   </View>
    // );
    return false;
  }

  renderCommmentList(list) {
    if (!list || !list.length) {
      return false;
    }
    return (
      <View style={styles.area.contentContainer}>
        {list.map(item => <BookComment key={item.Id} item={item} />)}
      </View>
    );
  }

  renderBookComment(book) {
    // return (
    //   <View style={styles.area.container}>
    //     {this.renderListStyleItem({ label: '书评', value: `${book.BookForumCount ? `${formatNumber(book.BookForumCount, 0, true, 1)}+` : ''}` }, () => {
    //       this.props.screenProps.router.navigate(this.props.navigation, 'Forum');
    //     })}
    //     {this.renderCommmentList(book.BookReviewList)}
    //   </View>
    // );
    return false;
  }

  renderAuthorBooks(books) {
    return (
      <ScrollView horizontal={true} style={styles.author.books.container}>
        {
          books.map(book => {
            return (
              <TouchableWithoutFeedback
                key={book._id}
                onPress={() => {
                  this.props.navigation.navigate('Book', book, NavigationActions.navigate({
                    routeName: 'Info', params: {
                      BookId: book._id,
                    }
                  }));
                }}
              >
                <View style={styles.author.books.book.container}>
                  <Image style={styles.author.books.book.preview} source={{ uri: book.cover }} />
                  <View style={styles.author.books.book.titleWrapper}>
                    <Text style={styles.author.books.book.title}>{book.title}</Text>
                  </View>
                  <Text style={styles.author.books.book.readers}>{`${formatNumber(book.latelyFollower, 1, true, 1)}人...`}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        }
      </ScrollView>
    );
  }

  renderAuthorInfo(book) {
    const { author, authorBooks = [] } = book;
    return (
      <View style={styles.area.container}>
        {this.renderListStyleItem({ label: '作家', value: '' })}
        <View style={styles.area.contentContainer}>
          <View style={styles.author.info.container}>
            <Avatar
              medium
              rounded
              title="A"
            />
            <View style={styles.author.info.textContainer}>
              <Text style={styles.author.info.name}>{author}</Text>
              <Text style={styles.author.info.info}></Text>
            </View>
          </View>
          {this.renderAuthorBooks(authorBooks)}
        </View>
      </View>
    );
  }

  renderToolbarButton(text, color = theme.styles.variables.colors.text, backgroundColor = theme.styles.variables.colors.contrast) {
    return (
      <Text style={{
        backgroundColor,
        color,
        height: 60, lineHeight: 60, width: theme.styles.variables.width / 3,
        fontSize: theme.styles.variables.size.lg,
        textAlign: 'center',
      }}>{text}</Text>
    )
  }

  renderToolbar(book) {
    const nullBtn = () => this.renderToolbarButton(' ');
    const readBtn = () => this.renderToolbarButton('立即阅读', theme.styles.variables.colors.contrast, theme.styles.navContainer.backgroundColor)
    const addShelf = () => this.renderToolbarButton('加入书架');
    return (
      <ButtonGroup
        onPress={(selectIndex) => {
          if (selectIndex === 1) {
            // 立即阅读
            this.props.navigation.navigate('Book', book, NavigationActions.navigate({
              routeName: 'Read', params: {
                book,
              }
            }));
          } else if (selectIndex === 2) {
            // 加入书架
            requestAnimationFrame(async () => {
              const { realm, err } = await getRealm();
              const alreadyIn = realm.objectForPrimaryKey('Shelf', book._id);
              if (alreadyIn) return false;

              // TODO, 如果加入的书籍本身已经被阅读过，则直接提取阅读记录存储到书架内
              const appendTime = new Date().getTime();
              realm.write(() => {
                realm.create('Shelf', {
                  book,
                  bookId: book._id,
                  lastAppendTime: appendTime,
                });
              });
            });
          }
        }}
        component={TouchableWithoutFeedback}
        buttons={[{ element: nullBtn }, { element: readBtn }, { element: addShelf }]}
        containerBorderRadius={0}
        containerStyle={{ height: 60, padding: 0, margin: 0, borderWidth: 0 }}
        buttonStyle={{ margin: 0, padding: 0, }}
      />
    )
  }

  render() {
    const book = this.state.book;
    return (
      <Page containerStyle={styles.page}>
        <ParallaxView
          style={styles.parallax}
          scrollableViewStyle={styles.scrollview}
          onScroll={(e) => {
            this._onScrollOverTitle(e.nativeEvent.contentOffset.y);
          }}
          light='light'
          scrollEventThrottle={3}
          backgroundSource={require('../../assets/bookBack.png')}
          header={this.renderBookInfo(book)}
          windowHeight={styles.info.container.height}
          backgroundHeight={styles.info.container.height + ifIphoneX(80, 60)}
        >
          {this.renderBookStatistics(book)}
          {this.renderBookDetail(book)}
          {/* {this.renderBookHonor(book)}
          {this.renderBookComment(book)} */}
          {this.renderAuthorInfo(book)}
        </ParallaxView>
        {this.renderToolbar(book)}
      </Page>
    );
  }

  _onFetch = async () => {
    const { err, data } = await item(this.props.navigation.state.params.BookId);
    if (err) {
      return;
    }
    if (!data) {
      return;
    }

    this.setState({
      book: data,
    });
  }

  _onScrollOverTitle = (y) => {
    if (!this.overed && y >= 35) {
      this.overed = true;
      this.props.navigation.setParams({
        title: this.state.book.title,
      });
    } else if (this.overed && y < 35) {
      this.overed = false;
      this.props.navigation.setParams({
        title: '',
      });
    }
  }
}

export default BookScreen;
