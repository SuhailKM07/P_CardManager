import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {CreditCardLayout, Headder} from './components/Helper';
import {SizeConfig} from '../../components/SizeConfig';
import {Icon} from 'react-native-basic-elements';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ScrollView
        style={{
          paddingHorizontal: SizeConfig.width * 3,
          paddingVertical: SizeConfig.height * 2,
        }}>
        <View style={{gap: SizeConfig.width * 5}}>
          <Headder />
          <CreditCardLayout />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
