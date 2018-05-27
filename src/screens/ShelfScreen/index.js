import React, { Component } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
  AsyncStorage,
  InteractionManager,
} from 'react-native';

import { Icon, Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import Page from '../../components/Page';
import Toast from '../../components/Toast';
import BookList, { BookListType } from '../../components/BookList';

import getRealm, { SortDescriptor } from '../../models';

import { list } from '../../services/book';

import { theme } from '../../theme';
import styles from './index.style';
import iOSColors from 'react-native-typography/dist/helpers/iOSColors';

class ShelfScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: '古意流苏',
      headerRight: (
        <View style={theme.styles.navRightContainer}>
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='magnifying-glass'
            type='entypo'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => {
              navigation.navigate('Search');
            }}
          />
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='dots-three-horizontal'
            type='entypo'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => { }}
          />
        </View>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='list'
          type='entypo'
          color={tintColor}
        />
      ),
      tabBarLabel: '书架',
    };
  };

  constructor(props) {
    super(props);

    this.shelfList = undefined;
    this.listenerAdded = false;
  }

  componentWillUnmount() {
    this._removeDataListener();
  }

  renderFooter(booklist) {
    if (booklist.length === 0) {
      return false;
    }
    return (
      <View style={styles.readMore.container}>
        <Button
          containerViewStyle={styles.readMore.button.wrapper}
          buttonStyle={[styles.readMore.button.button, { borderColor: theme.styles.variables.colors.main }]}
          title="浏览记录"
          textStyle={{ color: theme.styles.variables.colors.main, fontSize: styles.readMore.button.fontSize }}
          iconRight={{ name: 'chevron-right', color: theme.styles.variables.colors.main, style: styles.readMore.button.chevron }}
          onPress={() => {
            this.props.navigation.navigate('History');
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <Page>
        <BookList
          ref="bookList"
          type={BookListType.Simple}
          swipable={true}
          swipeProps={{
            autoClose: true,
            backgroundColor: iOSColors.white,
            right: [{
              text: '移除',
              onPress: (rowData, rowID) => {
                console.log(rowData)
                InteractionManager.runAfterInteractions(async () => {
                  const { realm, err } = await getRealm();
                  realm.write(() => {
                    realm.delete(realm.objectForPrimaryKey('Shelf', rowData._id));
                  });
                });
              },
              backgroundColor: theme.styles.variables.colors.main,
              type: 'delete',
              textColor: iOSColors.white,
            }],
          }}
          datasource={this._onFetch}
          ListFooterComponent={this.renderFooter.bind(this)}
          extraData={theme.styles.variables.colors.main}  // 设置主题色（如果不设置则无法触发list刷新DOM）
          onItemClicked={(item) => {
            let BookId = item._id;
            this.props.navigation.navigate(
              'Book',
              {
                BookId: BookId,
                bookName: item.title,
              },
              NavigationActions.navigate({
                routeName: 'Read',
                params: {
                  book: item,
                },
              }),
            );
          }}
          keyExtractor={(item, index) => `${item._id}`}
        />
      </Page>
    );
  }

  /**
   * @issue 临时增加`await list()`无用代码防止出现一直加载中的情况。具体原因暂不清楚。
   */
  _onFetch = async () => {
    await list();
    if (this.shelfList) {
      return { data: this.shelfList.map(shelf => shelf.book) };
    }

    const { realm, err } = await getRealm();
    const sortProperties = [['book.lastReadedTime', true], ['lastAppendTime', true]];
    this.shelfList = realm.objects('Shelf').sorted(sortProperties);
    this._addDataListener();
    return { data: this.shelfList.map(shelf => shelf.book) };
  }

  _addDataListener = () => {
    this.shelfList.addListener((puppies, changes) => {
      if (changes.insertions.length > 0 || changes.deletions.length > 0 || changes.modifications.length > 0) {
        this.refs.bookList.refresh();
      }
    });
  }

  _removeDataListener = () => {
    this.shelfList.removeAllListeners();
  }
}

export default ShelfScreen;
