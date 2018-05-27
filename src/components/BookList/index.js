import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  Image,
} from 'react-native';

import { Icon, Button, List, ListItem, Divider } from 'react-native-elements';
import Swipeout from '../ReactNativeSwipeout';

import Page from '../Page';
import RefreshFlatList, { RefreshState } from '../RefreshFlatList';
import Toast from '../Toast';

import { theme } from '../../theme';
import styles from './index.style';

import { list } from '../../services/book';
import { mergeDeep } from '../../utils/object';

export const BookListType = {
  Simple: 1,
  Complete: 2,
  Custom: 3,
};

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booklist: this.props.booklist || [],
      loadingFlag: true,
      rowID: -1,
    };

    this.renderSimpleInfo = this.renderSimpleInfo.bind(this);
    this.renderCompleteInfo = this.renderCompleteInfo.bind(this);
    this.renderSimpleRow = this.renderSimpleRow.bind(this);
    this.renderCompleteRow = this.renderCompleteRow.bind(this);
    this.renderPureRow = this.renderPureRow.bind(this);
    this.renderSwipableRow = this.renderSwipableRow.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.renderListFooterComponent = this.renderListFooterComponent.bind(this);
  }

  componentDidMount() {
    this.props.dynamic && this._onFetch();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.booklist !== this.props.booklist) {
      this.setState({
        booklist: nextProps.booklist,
      });
    }
  }

  get styles() {
    if (this.currentstyle) return this.currentstyle;
    switch (this.props.type) {
      case BookListType.Simple:
        return (this.currentstyle = mergeDeep({}, styles.common, styles.simple));
      case BookListType.Complete:
        return (this.currentstyle = mergeDeep({}, styles.common, styles.complete));
      case BookListType.Custom:
        return (this.currentstyle = mergeDeep({}, styles.common, this.props.style));
      default:
        throw 'error book list type specified.';
    }
  }

  refresh() {
    this._onFetch();
  }

  renderSimpleInfo(item) {
    return (
      <View style={this.styles.item.info.container}>
        <View style={this.styles.item.info.text.container}>
          <Text style={this.styles.item.info.text.text}>
            {item.author}
          </Text>
        </View>
        <View style={this.styles.item.info.text.container}>
          <Text style={this.styles.item.info.text.text}>
            {item.lastReadedChapter === null ? `最新章节：${item.lastChapter}` : `最近阅读：${item.lastReadedChapterName}`}
          </Text>
        </View>
      </View>
    );
  }

  renderCompleteInfo(item) {
    return (
      <View style={this.styles.item.info.container}>
        <View style={[this.styles.item.info.text.container, this.styles.item.info.description.container]}>
          <Text style={[this.styles.item.info.text.text]} numberOfLines={2} ellipsizeMode='tail'>
            {item.longIntro || item.shortIntro}
          </Text>
        </View>
        <View style={[this.styles.item.info.text.container, this.styles.item.info.authors.container]}>
          <Text style={this.styles.item.info.text.text}>
            {item.author}
          </Text>
        </View>
      </View>
    );
  }

  renderSimpleRow({ item: rowData, index, onPress }) {
    return (
      <ListItem
        containerStyle={this.styles.item.container}
        hideChevron={true}
        leftIcon={<Image source={{ uri: rowData.cover }} style={this.styles.item.preview} />}
        title={rowData.title}
        titleStyle={this.styles.item.title.text}
        titleContainerStyle={this.styles.item.title.container}
        subtitle={this.renderSimpleInfo(rowData)}
        onPress={() => onPress(rowData)}
      />
    );
  }

  renderCompleteRow({ item: rowData, index, onPress }) {
    return (
      <ListItem
        containerStyle={this.styles.item.container}
        hideChevron={true}
        leftIcon={<Image source={{ uri: rowData.cover }} style={this.styles.item.preview} />}
        title={rowData.title}
        titleStyle={this.styles.item.title.text}
        titleContainerStyle={this.styles.item.title.container}
        subtitle={this.renderCompleteInfo(rowData)}
        onPress={() => onPress(rowData, index)}
      />
    );
  }

  renderPureRow({ item: rowData, index }) {
    const onPress = this.props.onItemClicked;
    switch (this.props.type) {
      case BookListType.Simple:
        return this.renderSimpleRow({ item: rowData, index, onPress });
      case BookListType.Complete:
        return this.renderCompleteRow({ item: rowData, index, onPress });
      case BookListType.Custom:
        return this.props.renderRow({ item: rowData, index, onPress });
      default:
        throw 'error book list type specified.';
    }
  }

  renderSwipableRow({ item: rowData, index }) {
    const swipeProps = {
      ...this.props.swipeProps,
      right: (this.props.swipeProps.right || []).map(btn => ({
        ...btn,
        onPress: (sectionID, rowID) => {
          btn.onPress(this.state.booklist[rowID], rowID);
        },
      })),
      left: (this.props.swipeProps.left || []).map(btn => ({
        ...btn,
        onPress: (sectionID, rowID) => {
          btn.onPress(this.state.booklist[rowID], rowID);
        },
      })),
      rowID: index,
    }
    return (
      <Swipeout {...swipeProps}>
        {this.renderPureRow({ item: rowData, index })}
      </Swipeout>
    );
  }

  renderRow({ item: rowData, index }) {
    if (this.props.swipable) {
      return this.renderSwipableRow({ item: rowData, index });
    } else {
      return this.renderPureRow({ item: rowData, index });
    }
  }

  renderSeparator() {
    return <Divider style={this.styles.divider} />;
  }

  renderListFooterComponent() {
    const LFC = this.props.ListFooterComponent;
    if ('undefined' === typeof LFC || LFC == null || ('boolean' === typeof LFC && !LFC)) {
      return false;
    }
    if ('function' === typeof LFC) {
      return LFC(this.state.booklist);
    }
    return () => React.cloneElement(LFC, {
      booklist: this.state.booklist,
    });
  }

  render() {
    return (
      <List containerStyle={this.styles.list.container}>
        <RefreshFlatList
          {...this.props}
          data={this.state.booklist}
          renderItem={this.renderRow}
          ListFooterComponent={this.renderListFooterComponent}
          ItemSeparatorComponent={this.renderSeparator}
          onHeaderRefresh={this._onHeaderRefresh}
        />
      </List>
    );
  }

  _onFetch = () => {
    requestAnimationFrame(async () => {
      const { err, data } = await this.props.datasource();
      if (err) {
        return;
      }
      if (!data || !data.length) {
        return;
      }

      this.setState({
        booklist: data,
      });
    });
  }

  _onHeaderRefresh = () => {
    this.props.dynamic && this._onFetch();
  }
}

BookList.propTypes = {
  swipable: PropTypes.bool.isRequired,
  swipeProps: PropTypes.object.isRequired,
  dynamic: PropTypes.bool.isRequired,
  datasource: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(BookListType)).isRequired,
  style: PropTypes.object,
  renderRow: PropTypes.func,
  onItemClicked: PropTypes.func.isRequired,
};

BookList.defaultProps = {
  swipable: false,
  swipeProps: {},
  dynamic: true,
  datasource: list,
  type: BookListType.Complete,
  onItemClicked: () => { },
};

export default BookList;
