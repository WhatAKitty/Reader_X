import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
} from 'react-native';

import { Icon, Button } from 'react-native-elements';
import { NavigationActions, HeaderBackButton } from 'react-navigation';

import Page from '../../components/Page';
import BookList, { BookListType } from '../../components/BookList';
import realm, { SortDescriptor } from '../../models';

import { theme } from '../../theme';

class HistoryScreen extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: '浏览记录',
      headerLeft: (
        <HeaderBackButton
          title='返回'
          tintColor={'#fff'}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <BookList
          datasource={this._onFetch}
          type={BookListType.Complete}
          onItemClicked={(item) => {
            this.props.navigation.navigate('Book', item, NavigationActions.navigate({ routeName: 'Info', params: {
              BookId: item._id,
            } }));
          }}
          keyExtractor={(item, index) => `${item._id}`}
        />
      </Page>
    );
  }

  _onFetch = async () => {
    const sortProperties = [['lastReadedTime', true]];
    const bookList = realm.objects('Book').sorted(sortProperties);
    return { data: bookList };
  }

}

export default HistoryScreen;
