import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import RankingScreen from './RankingScreen';
import RanksScreen from './RanksScreen';

export default StackNavigator({
  Ranks: {
    screen: RanksScreen,
  },
  Ranking: {
    screen: RankingScreen,
  },
}, {
  initialRouteName: 'Ranking',
  headerMode: 'none',
});
