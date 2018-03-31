import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { Icon } from 'react-native-elements';

import styles from './BottomNav.style';
import readerThemes from './ReaderTheme.style';

class BottomNav extends Component {
  state = {
    isSetting: false,
    selected: undefined,
  }

  renderSettingBar() {
    return (
      <View style={styles.Setting}>
        {
          Object.keys(readerThemes)
            .filter(key => key !== 'MOON')
            .map((key, index) => {
              const item = readerThemes[key];
              const isSelected = this.state.selected ? key === this.state.selected : index == 0;
              return (
                <TouchableWithoutFeedback key={key} onPress={() => this._onChangeBackgroundColor(key, item)}>
                  <View style={[styles.roundx, item.background]} >
                    {
                      isSelected ?
                        <Icon
                          size={styles.check.size}
                          name="check"
                          type='MaterialIcons'
                          color={styles.check.color}
                        /> : false
                    }
                  </View>
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
          color={'#fff'}
        />
        <Text style={styles.FotterItems}>{title}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const buttons = [{
      title: '目录',
      icon: 'format-list-bulleted',
      onPress: this.props.onCatalogIn,
    }, {
      title: '夜间',
      icon: 'brightness-low',
      onPress: this.props.onChangeMode,
    }, {
      title: '设置',
      icon: 'settings',
      onPress: this._bgColorSettingShow,
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

  _onChangeBackgroundColor = (key, item) => {
    this.setState({
      selected: key,
    }, () => this.props.onChangeBackGround(key));
  }

  _bgColorSettingShow = () => {
    const flag = this.state.isSetting;
    this.setState({ isSetting: !flag });
  }

}

export default BottomNav;