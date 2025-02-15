/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '592715753658-ca3ainoablt2nk5af3q3a9jqsrfuga0t.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  forceCodeForRefreshToken: true, // Ensures fresh authentication
});

AppRegistry.registerComponent(appName, () => App);
