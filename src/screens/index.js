import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { HeaderBackButton, NavigationActions } from 'react-navigation';

import Router from '../router';

import ShelfScreen from './ShelfScreen';
import RecommandScreen from './RecommandScreen';
import RankingScreen from './RankingScreen';
import SettingScreen from './SettingScreen';

import HistoryScreen from './HistoryScreen';

import BookScreen from './BookScreen';
import BookForum from './BookForum';
import ReadScreen from './ReadScreen';
import CatalogScreen from './CatalogScreen';
import SearchScreen from'./SearchScreen';
import SourceChangeScreen from './SourceChangeScreen';

import { theme } from '../theme';

const options = (props) => {
  const { navigation, navigationOptions, screenProps } = props;
  return {
    headerStyle: theme.styles.navContainer,
    headerTitleStyle: theme.styles.navTitle,
  };
};

const BookTabNavigator = TabNavigator({
  Shelf: {
    screen: ShelfScreen,
  },
  Recommand: {
    screen: RecommandScreen,
  },
  Ranking: {
    screen: RankingScreen,
  },
  Setting: {
    screen: SettingScreen,
  },
}, {
  mode: 'screen',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  // tabBarOptions: {
  //   activeTintColor: theme.styles.variables.color.main,
  // },
});

const BookNavigator = StackNavigator({
  Info: {
    screen: BookScreen,
  },
  Forum: {
    screen: BookForum,
  },
  Read:{
    screen: ReadScreen,
  },
  Catalog: {
    screen: CatalogScreen,
  },
  SourceChange: {
    screen: SourceChangeScreen,
  }
}, {
  headerMode: 'screen',
  navigationOptions: options,
  initialRouteName: 'Info',
});

const MainNavigator = StackNavigator({
  Home: {
    screen: BookTabNavigator,
  },
  Book: {
    screen: BookNavigator,
    navigationOptions: (props) => {
      return {
        ...options(props),
        header: null,
      };
    },
  },
  History: {
    screen: HistoryScreen,
  },
  Search: {
    screen: SearchScreen,
  },
}, {
  mode: 'screen',
  headerMode: 'screen',
  navigationOptions: options,
  initialRouteName: 'Home',
});

export default MainNavigator;