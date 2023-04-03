import 'react-native-gesture-handler';

/**
 * @format
 */

import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import * as RootNavigation from './src/services/RootNavigation.js';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    if (!notification.data.hasOwnProperty('filePath')) {
      RootNavigation.navigate('Match', {
        title: 'About Match',
        item: notification.data,
      });
    }
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
