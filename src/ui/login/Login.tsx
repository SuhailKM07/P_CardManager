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
import React from 'react';
import {SizeConfig} from '../../components/SizeConfig';
import LottieView from 'lottie-react-native';
import {scaleZetaToMatchClamps} from 'react-native-reanimated/lib/typescript/animation/springUtils';
import {Icon} from 'react-native-basic-elements';
import CustomGoogleButton from './CustomGoogleButton';

export default function Login() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <View
        style={{
          paddingHorizontal: SizeConfig.width * 5,
          paddingVertical: SizeConfig.height * 4,
          flex: 1,
          backgroundColor: 'white',
        }}>
        <LottieView
          source={require('../../assets/images/Login/login.json')}
          style={{
            height: SizeConfig.height * 30,
          }}
          autoPlay
          loop
        />

        <ScrollView>
          <View style={{gap: SizeConfig.height * 3}}>
            <View style={{gap: SizeConfig.height * 3}}>
              <View style={{gap: SizeConfig.height * 1}}>
                <Text
                  style={{
                    fontSize: SizeConfig.fontSize * 4,
                    fontFamily: 'RedHatDisplay-Bold',
                    color: 'black',
                  }}>
                  Email
                </Text>
                <TextInput
                  numberOfLines={1}
                  style={{
                    borderWidth: 1,
                    fontSize: SizeConfig.fontSize * 4,
                    fontFamily: 'RedHatDisplay-Medium',
                    color: 'black',
                    borderRadius: SizeConfig.width * 3,
                  }}
                />
              </View>
              <View style={{gap: SizeConfig.height * 1}}>
                <Text
                  style={{
                    fontSize: SizeConfig.fontSize * 4,
                    fontFamily: 'RedHatDisplay-Bold',
                    color: 'black',
                  }}>
                  Password
                </Text>

                <TextInput
                  numberOfLines={1}
                  style={{
                    borderWidth: 1,
                    fontSize: SizeConfig.fontSize * 4,
                    fontFamily: 'RedHatDisplay-Medium',
                    color: 'black',
                    borderRadius: SizeConfig.width * 3,
                  }}
                />
              </View>
            </View>

            <Pressable
              style={{
                flexDirection: 'row',
                backgroundColor: '#90EE90',
                gap: SizeConfig.width * 5,
                alignItems: 'center',
                justifyContent: 'center',
                height: SizeConfig.height * 5,
                width: '100%',
                borderRadius: SizeConfig.width * 3,
              }}>
              <Text
                style={{
                  fontSize: SizeConfig.fontSize * 4.5,
                  fontFamily: 'RedHatDisplay-Medium',
                  color: 'black',
                }}>
                Login
              </Text>
            </Pressable>

            <Text
              style={{
                fontSize: SizeConfig.fontSize * 4.5,
                fontFamily: 'RedHatDisplay-Medium',
                color: 'black',
                textAlign: 'center',
              }}>
              Or
            </Text>
            <CustomGoogleButton />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
