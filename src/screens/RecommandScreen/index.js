import React, { Component } from 'react';
import { Text } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Page from '../../components/Page';
import BookList, { BookListType } from '../../components/BookList';
import { RefreshState } from '../../components/RefreshFlatList';
import { recommends } from '../../services/book'


class RecommandScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    let toEnd = true;
    return {
      title: '推荐',
      tabBarLabel: '推荐',
      tabBarIcon: ({ tintColor }) => (
        <Icon

          name='colours'
          type='entypo'
          color={tintColor}

        />
      ),
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      loading: false,
      loadFlag: RefreshState.Idle,
    }
  }

  render() {
    return (
      <Page>
        <BookList
          keyExtractor={(item, index) => `${item.BookId}`}
          dynamic={true}
          type={BookListType.Complete}
          booklist={this.state.result}
          ListFooterComponent={this.renderFooter}
          onItemClicked={(item, index) => {
            this.props.navigation.navigate('Book', item, NavigationActions.navigate({ routeName: 'Info', params: item }));
          }}
          datasource={recommends}
        />
      </Page>
    );
  }
}

export default RecommandScreen;
