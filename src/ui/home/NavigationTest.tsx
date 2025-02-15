import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function NavigationTest({navigation}) {
  return (
    <View>
      <Text
        onPress={() => {
          navigation.navigate('Home');
        }}>
        NavigationTest
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
