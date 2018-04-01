import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';

import Page from '../../components/Page';
import { RefreshState } from '../../components/RefreshFlatList';

class RanksScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: '排行榜',
      headerLeft: (
        <HeaderBackButton
          title='返回'
          tintColor={'#fff'}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      tabBarVisible: false,
    };
  }

  state = {
    ranks: [],
  }

  componentDidMount() {
    this._init();
  }

  renderRankItem(item) {
    return (
      <ListItem
        roundAvatar
        avatar={{ uri: item.cover }}
        key={item._id}
        title={item.title}

        onPress={() => {
          this.props.navigation.getParam('onRankClicked', () => { })(item);
          this.props.navigation.goBack();
        }}
      />
    )
  }

  render() {
    return (
      <Page>
        <List containerStyle={{ flex: 1, marginTop: 0 }}>
          <ScrollView>
            {this.state.ranks.map(item => this.renderRankItem(item))}
          </ScrollView>
        </List>
      </Page>
    );
  }

  _init = async () => {
    const ranks = this.props.navigation.getParam('ranks', []);
    this.setState({
      ranks: ranks.male,
    });
  }
}

export default RanksScreen;
