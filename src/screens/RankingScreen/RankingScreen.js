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
            onPress={() => navigation.navigate('Ranks')}
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
      rank: undefined,
      result: [],
      loadFlag: RefreshState.Idle,
    }
  }

  componentDidMount() {
    this._onFetch();
  }

  render() {
    return (
      <Page>
        <BookList
          keyExtractor={(item, index) => `${item._id}`}
          dynamic={false}
          type={BookListType.Complete}
          booklist={this.state.result}

          onItemClicked={(item, index) => {
            this.props.navigation.navigate('Book', item, NavigationActions.navigate({ routeName: 'Info', params: {
              BookId: item._id,
            } }));
          }}
        />
      </Page>
    );
  }

  _onFetch = async () => {
    const { data, err } = await list();
    if (err) {
      // 搜索失败
      this.setState({
        loadFlag: RefreshState.Failure,
      });
      return false;
    }

    const maleRank = data.male;
    const defaultRank = maleRank[0];
    // 设置默认排行榜
    this.setState({
      rank: {
        id: defaultRank._id,
        title: defaultRank.title,
      },
    });

    // 获取该榜单图书列表
    const { data: rankBooks, err: rankBooksErr } = await books(defaultRank._id);

    if (rankBooksErr) {
      this.setState({
        loadFlag: RefreshState.Failure,
        rank: undefined,
      });
      return false;
    }

    this.props.navigation.setParams({
      title: defaultRank.title,
    });

    this.setState({
      result: [...rankBooks],
      loadFlag: RefreshState.Idle,
    });
  }

}

export default RankingScreen;
