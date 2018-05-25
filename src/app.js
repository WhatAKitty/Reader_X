import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './screens';
import { Text } from 'react-native';
import FetchMock from 'react-native-fetch-mock';
import ScreenBrightness from 'react-native-screen-brightness';
import ThemeProvider, { theme } from './theme';
import getRealm from './models';

import DeviceStorage from './utils/DeviceStorage';
global.DeviceStorage = DeviceStorage;

// mock data
const fetch = new FetchMock(require('../__mocks__'), {
  fetch: global.fetch,
  exclude: [
    'https://(.*)',
  ],
}).fetch;
global.fetch = fetch;

class App extends Component {
  async componentDidMount() {
    const { realm, err } = await getRealm();
    const realmConfig = realm.objectForPrimaryKey('Config', 'brightness');
    if (realmConfig) {
      ScreenBrightness.setBrightness(+realmConfig.value);
    }
  }

  render() {
    return (
      <ThemeProvider>
        <StatusBar barStyle={theme.styles.barStyle} />
        <AppNavigator />
      </ThemeProvider>
    );
  }
}


export default App;
