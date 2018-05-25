import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { Icon, Slider } from 'react-native-elements';
import ScreenBrightness from 'react-native-screen-brightness';

import getRealm from '../../models';

import styles from './BottomNav.style';
import readerThemes from './ReaderTheme.style';

class BottomNav extends Component {
  state = {
    isSetting: false,
    selected: undefined,
    brightness: undefined,
  }

  async componentDidMount() {
    // 从数据库中获取亮度
    const { realm, err } = await getRealm();
    const realmConfig = realm.objectForPrimaryKey('Config', 'brightness');
    if (realmConfig) {
      this.setState({
        brightness: +realmConfig.value,
      });
      return;
    }

    // 数据库中不存在，从设备中获取
    ScreenBrightness.getBrightness().then(this._onChangeBrightness);
  }

  renderSettingBar() {
    return (
      <View style={styles.setting.container}>
        <View style={styles.setting.brightness.container}>
          <View style={styles.setting.brightness.icon}>
            <Icon
              size={23}
              name="light-down"
              type='entypo'
              color="white"
            />
          </View>
          <View style={styles.setting.brightness.slider}>
            <Slider
              minimumTrackTintColor={styles.setting.brightness.sliderTrack.backgroundColor}
              thumbTintColor={styles.setting.brightness.sliderThumb.backgroundColor}
              value={this.state.brightness}
              onSlidingComplete={this._onChangeBrightness} />
          </View>
          <View style={styles.setting.brightness.icon}>
            <Icon
              size={23}
              name="light-up"
              type='entypo'
              color="white"
            />
          </View>
        </View>
        <View style={styles.setting.themes.container}>

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
        style={styles.tool.container}
        onPress={onPress}
      >
        <Icon
          size={styles.tool.icon.size}
          name={icon}
          type='MaterialIcons'
          color={styles.tool.icon.color}
        />
        <Text style={styles.tool.text}>{title}</Text>
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
      onPress: () => {
        this._onChangeBrightness(0);
        this.props.onChangeMode();
      },
    }, {
      title: '设置',
      icon: 'settings',
      onPress: this._bgColorSettingShow,
    }];
    return (
      <View>
        {this.state.isSetting && this.renderSettingBar()}
        <View style={styles.container}>
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

  _onChangeBrightness = brightness => {
    requestAnimationFrame(() => {
      // 设置
      this.setState({
        brightness,
      }, async () => {
        // 设置亮度
        ScreenBrightness.setBrightness(brightness);

        // 写入数据库
        const { realm, err } = await getRealm();
        realm.write(() => {
          realm.create('Config', {
            key: 'brightness',
            value: `${brightness}`,
          }, true);
        });
      });
    });
  }

}

export default BottomNav;