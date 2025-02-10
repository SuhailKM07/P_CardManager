import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/ui/home/HomeScreen';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';

export default function App() {
  return (
    <Provider store={Store}>
      <HomeScreen />
    </Provider>
  );
}
