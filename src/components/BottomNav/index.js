import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  InteractionManager,
  TouchableWithoutFeedback,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import styles, { containerColors } from './index.style';
const { height, width } = Dimensions.get('window');

let tht;

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSetting: false,
    }
    tht = this;

    this.settingShow = this.settingShow.bind(this);
    this.renderSettingBar = this.renderSettingBar.bind(this);
    this.renderBottomBtn = this.renderBottomBtn.bind(this);
  }

  settingShow() {
    const flag = this.state.isSetting;
    this.setState({ isSetting: !flag });
  }

  renderSettingBar() {
    return (
      <View style={styles.Setting}>
        {
          Object.keys(BACKGROUND_COLOR).map(key => {
            const item = BACKGROUND_COLOR[key];
            return (
              <TouchableWithoutFeedback key={key} onPress={() => this.props.onChangeBackGround(item)}>
                <View style={[styles.roundx, { backgroundColor: containerColors[item.name] }]} />
              </TouchableWithoutFeedback>
            );
          })
        }
      </View>
    );
  }

  renderBottomBtn({
    title,
    icon,
    onPress,
  }) {
    return (
      <TouchableOpacity
        key={title}
        style={{ flex: 1 }}
        onPress={onPress}
      >
        <Icon
          size={24}
          name={icon}
          type='MaterialIcons'
          color={'#fff'} />
        <Text style={styles.FotterItems}>{title}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const buttons = [{
      title: '目录',
      icon: 'format-list-bulleted',
      onPress: () => {
        let item = {
          chapterList: this.props.chapterList,
          bookName: this.props.bookName,
          bookNum: this.props.recordNum,
          callback: (chapterId, index) => {
            this.props.getContent(chapterId, index);
          }
        };
        this.props.screenProps.router.navigate(this.props.navigation, 'Book', {}, NavigationActions.navigate({ routeName: 'Catalog', params: item }));
      },
    }, {
      title: '夜间',
      icon: 'brightness-low',
      onPress: this.props.modeChange,
    }, {
      title: '设置',
      icon: 'settings',
      onPress: this.settingShow,
    }];
    return (
      <View>
        {this.state.isSetting && this.renderSettingBar()}
        <View style={styles.Fotter}>
          {buttons.map(button => this.renderBottomBtn(button))}
        </View>
      </View>
    );
  }
}

export const BACKGROUND_COLOR = {
  'ZHUISHU_GREEN': {
    value: 1,
    name: 'zhuishuGreen',
  },
  'QIDIAN_PINK': {
    value: 2,
    name: 'qidianPink',
  },
  'QIDIAN_ROCK_YELLOW': {
    value: 3,
    name: 'qidianRockYellow',
  },
  'QIDIAN_WHITE': {
    value: 4,
    name: 'qidianwhite',
  },
  'QIDIAN_X': {
    value: 5,
    name: 'qidianX',
  },
  'QIDIAN_Y': {
    value: 6,
    name: 'qidianY',
  },
};

export default BottomNav;