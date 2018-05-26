import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Page from '../../components/Page';
import BookList, { BookListType } from '../../components/BookList';
import { RefreshState } from '../../components/RefreshFlatList';
import { Pages } from '../../components/ReactNativePages';
import BookGroup from '../../components/BookGroup';

import { recommends } from '../../services/book'

const { width } = Dimensions.get('window');
const padding = (width - 315) / 2;
const bannerHeight = width / 1080 * 325;
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

  state = {
    covers: [],
    groups: [],
  };

  componentDidMount() {
    this._init();
  }

  renderCovers({ _id, pic }, index) {
    return (
      <View key={_id} style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('Book', {
              _id,
            }, NavigationActions.navigate({
              routeName: 'Info', params: {
                BookId: _id,
              }
            }));
          }}
        >
          <Image source={{ uri: pic }} resizeMode="cover" style={{
            width: null,
            height: null,
            resizeMode: 'cover',
            flex: 1,
          }}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderGroup({ title, subTitle, books }, index) {
    return (
      <View key={`${index}`} style={{ flex: 1, height: 200, marginTop: 20, marginLeft: padding, marginRight: padding }}>
        <Text style={{}}>{title}</Text>
        <BookGroup
          navigation={this.props.navigation}
          books={books}
        />
      </View>
    );
  }

  render() {
    return (
      <Page>
        <ScrollView>
          <Pages containerStyle={{ height: bannerHeight }}>
            {
              this.state.covers.map(this.renderCovers.bind(this))
            }
          </Pages>
          {
            this.state.groups.map(this.renderGroup.bind(this))
          }
        </ScrollView>
      </Page>
    );
  }

  _init = async () => {
    const { data, err } = await recommends();
    if (err) {
      return;
    }

    const { covers, groups } = data;
    this.setState({
      covers,
      groups,
    });
  }

}

export default RecommandScreen;
