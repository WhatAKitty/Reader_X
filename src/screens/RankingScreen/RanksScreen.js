import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { List } from 'react-native-elements';

import { RefreshState } from '../../components/RefreshFlatList';

import { list } from '../../services/rank'

class RanksScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: '排行榜',
      tabBarVisible: false,
    };
  }

  componentDidMount() {
    this._onFetch();
  }

  renderRankItem(item) {
    return (
      <View key={item._id}>
        <Text>{item.title}</Text>
      </View>
    )
  }

  render() {
    return (
      <List>
        {this.state.list.map(item => this.renderRankItem(item))}
      </List>
    )
  }

  state = {
    loadFlag: RefreshState.Idle,
    list: [],
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

    this.setState({
      list: data.male,
    }, () => console.log(this.state.list));
  }
}

export default RanksScreen;
