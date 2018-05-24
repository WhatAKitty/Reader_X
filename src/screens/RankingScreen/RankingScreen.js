import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Page from '../../components/Page';
import { RefreshState } from '../../components/RefreshFlatList';
import BookList, { BookListType } from '../../components/BookList';

import { list, books } from '../../services/rank'

import { theme } from '../../theme';

class RankingScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.getParam('title', 'Loading'),
      headerRight: (
        <View style={theme.styles.navRightContainer}>
          <Icon
            containerStyle={theme.styles.navButtonContainer}
            name='dots-three-horizontal'
            type='entypo'
            color={theme.styles.navButton.color}
            underlayColor={theme.styles.navButton.underlayColor}
            onPress={() => navigation.navigate('Ranks', {
              ranks: navigation.getParam('ranks', []),

              onRankClicked: navigation.getParam('onRankClicked', () => { }),
            })}
          />
        </View>
      ),
      tabBarLabel: '排行',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='layers'
          type='entypo'
          color={tintColor}
        />
      ),
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      bookList: [],
      loadFlag: RefreshState.Idle,
    }
  }

  componentWillMount() {
    // init navigations event
    this.props.navigation.setParams({
      onRankClicked: this._onRankChanged,
    });
  }

  componentDidMount() {
    this._init();
  }

  render() {
    return (
      <Page>
        <BookList
          keyExtractor={(item, index) => `${item._id}`}
          dynamic={false}
          type={BookListType.Complete}
          booklist={this.state.bookList}

          onItemClicked={(item, index) => {
            this.props.navigation.navigate('Book', item, NavigationActions.navigate({
              routeName: 'Info', params: {
                BookId: item._id,
              }
            }));
          }}
        />
      </Page>
    );
  }

  _init = async () => {
    const { data: ranks, err } = await list();
    if (err) {
      // 搜索失败
      this.setState({
        loadFlag: RefreshState.Failure,
      });
      return false;
    }

    // 设置所有榜单到navigations
    this.props.navigation.setParams({
      ranks,
    });

    const maleRank = ranks.male;
    const defaultRank = maleRank[0];
    // 设置默认排行榜
    this._onFetchRankBooks({
      id: defaultRank._id,
      title: defaultRank.title
    });
  }

  _onFetchRankBooks = async ({ id, title }) => {
    // 获取该榜单图书列表
    const { data: rankBooks, err: rankBooksErr } = await books(id);

    if (rankBooksErr) {
      this.setState({
        loadFlag: RefreshState.Failure,
      });
      return;
    }

    this.setState({
      bookList: [...rankBooks],
      loadFlag: RefreshState.Idle,
    }, () => {
      this.props.navigation.setParams({
        title,
      });
    });
  }

  _onRankChanged = (rank) => {
    this._onFetchRankBooks({
      id: rank._id,
      title: rank.title,
    });
  }

}

export default RankingScreen;
