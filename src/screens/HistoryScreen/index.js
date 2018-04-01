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

import { history } from '../../services/book';

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
          datasource={history}
          type={BookListType.Complete}
          onItemClicked={(item) => {
            this.props.navigation.navigate('Book', item, NavigationActions.navigate({ routeName: 'Info', params: {
              book: item,
            } }));
          }}
        />
      </Page>
    );
  }
}

export default HistoryScreen;
