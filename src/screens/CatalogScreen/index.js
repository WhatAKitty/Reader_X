import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, VirtualizedList, Dimensions } from 'react-native';

import { StackNavigator, HeaderBackButton } from 'react-navigation';
import { Button, Divider, List, ListItem } from 'react-native-elements';
import { iOSColors } from 'react-native-typography'

import styles from './index.style';
import { theme } from '../../theme';

const { height } = Dimensions.get('window');

class CatalogScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { bookName, onScrollToTop } = navigation.state.params;
    return {
      title: `${bookName}`,
      headerLeft: (
        <HeaderBackButton
          title=''
          tintColor={'#fff'}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <View style={styles.navRightContainer}>
          <Button
            buttonStyle={styles.button}
            color={'#fff'}
            title='顶底直达'
            fontSize={16}
            onPress={onScrollToTop}
          />
        </View>
      ),
      tabBarVisible: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onScrollToTop: () => {
        this.refs.chapterList.scrollToIndex({
          index: 0,
        });
      },
    })
  }

  renderSeparator() {
    return (
      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
      </View>
    );
  }

  renderRow({ item, index, separators }) {
    if (item.unreadable) {
      return false;
    }

    const chapterIndex = this.props.navigation.state.params.chapterIndex;
    const itemColor = index === chapterIndex ? { color: iOSColors.red } : {};
    return (
      <ListItem
        key={index}
        hideChevron={true}
        title={item.title}
        onPress={() => this._onChapterClicked(index, item)}
        titleStyle={[itemColor, { fontSize: 15 }]}
        containerStyle={styles.itemContainerStyle}
      />
    );
  }

  render() {
    const { chapterList: data, chapterIndex = 0 } = this.props.navigation.state.params;
    return (
      <List containerStyle={{ marginTop: 0 }} >
        <VirtualizedList
          ref="chapterList"
          style={{ backgroundColor: '#eeeeee', padding: 0, margin: 0 }}
          data={data}
          initialScrollIndex={chapterIndex}
          initialNumToRender={30}
          renderItem={this.renderRow.bind(this)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => `${index}`}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 51 * index,
            index,
          })}
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
        />
      </List>
    );
  }

  _onChapterClicked = (index, item) => {
    this.props.navigation.state.params.onChapterClicked(index, item);
    this.props.navigation.goBack();
  }
}


export default CatalogScreen;