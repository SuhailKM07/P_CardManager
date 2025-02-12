import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {BillingDetails, CreditCardLayout, Headder} from './components/Helper';
import {SizeConfig} from '../../components/SizeConfig';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import analytics from '@react-native-firebase/analytics';
import {RootState} from '../../redux/Store';
import {useSelector} from 'react-redux';
export default function HomeScreen() {
  const onPurchase = useSharedValue(false);
  const [reSetUI, setAnimatedUi] = useState(false);
  let CardDetailsData = useSelector(
    (state: RootState) => state.CardDetailsSlice.list,
  );

  const NextSectionTapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(setAnimatedUi)(true);
    onPurchase.value = true;
  });

  useEffect(() => {
    setTimeout(() => {
      onPurchase.value = false;
    }, 9000);
  }, [reSetUI]);

  const ChangingTheScreenHeight = useAnimatedStyle(() => ({
    width: withTiming(
      onPurchase.value && CardDetailsData?.length > 1 ? '100%' : '75%',
      {duration: 2000},
    ),
    height: withTiming(
      onPurchase.value && CardDetailsData?.length > 1
        ? SizeConfig.height * 100
        : SizeConfig.height * 6,
      {duration: 2000},
    ),
    marginVertical: withTiming(
      onPurchase.value && CardDetailsData?.length > 1
        ? 0
        : SizeConfig.height * 7,
      {
        duration: 2000,
      },
    ),
  }));

  const MakeLoadingVisible = useAnimatedStyle(() => ({
    opacity:
      onPurchase.value && CardDetailsData?.length > 1
        ? withDelay(
            1500,
            withTiming(1, {
              duration: 1000,
            }),
          )
        : withDelay(
            1000,
            withTiming(0, {
              duration: 1000,
            }),
          ),

    backgroundColor: 'gray',
  }));
  const MakeLoadingColorVisible = useAnimatedStyle(() => ({
    backgroundColor:
      onPurchase.value && CardDetailsData?.length > 1 && CardDetailsData?.length
        ? withDelay(
            1800,
            withTiming('white', {
              duration: 1000,
            }),
          )
        : withDelay(
            1000,
            withTiming('gray', {
              duration: 1000,
            }),
          ),
  }));

  const PayItTextAnimation = useAnimatedStyle(() => ({
    display:
      onPurchase.value && CardDetailsData?.length > 1 && CardDetailsData?.length
        ? 'none'
        : 'flex',
  }));
  const ProcessingTextAnimation = useAnimatedStyle(() => ({
    display:
      onPurchase.value && CardDetailsData?.length > 1 && CardDetailsData?.length
        ? 'flex'
        : 'none',
  }));

  const showCompleteMessage = useAnimatedStyle(() => ({
    opacity: withDelay(
      4000,
      withTiming(
        onPurchase.value &&
          CardDetailsData?.length > 1 &&
          CardDetailsData?.length
          ? 1
          : 0,
        {duration: 1000},
      ),
    ),
    display:
      onPurchase.value && CardDetailsData?.length > 1 && CardDetailsData?.length
        ? 'flex'
        : 'none',
  }));

  const showCompleteMessageIcon = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withDelay(
          4500,
          withTiming(
            onPurchase.value &&
              CardDetailsData?.length &&
              CardDetailsData?.length
              ? SizeConfig.width * 0.29
              : SizeConfig.width * 0,
            {
              duration: 500,
            },
          ),
        ),
      },
    ],
  }));

  useEffect(() => {
    console.log('******************************');
    analytics().logEvent('app_opened');
    console.log('******************************');
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SizeConfig.width * 3,
              paddingVertical: SizeConfig.height * 2,
            }}>
            <View style={{gap: SizeConfig.width * 5}}>
              <Headder />
              <CreditCardLayout />
              <BillingDetails />
            </View>
          </ScrollView>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'absolute',
              height: SizeConfig.deviceHeight,
              width: '100%',
            }}>
            <GestureDetector gesture={NextSectionTapGesture}>
              <Animated.View
                style={[
                  {
                    backgroundColor:
                      CardDetailsData.length > 1 ? '#f86f15' : 'gray',
                    borderRadius: SizeConfig.width * 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: SizeConfig.height * 7,
                  },
                  ChangingTheScreenHeight,
                ]}>
                <>
                  <Animated.Text
                    style={[
                      {
                        fontFamily: 'RedHatDisplay-Bold',
                        fontSize: SizeConfig.fontSize * 4.5,
                        color: 'white',
                      },
                      PayItTextAnimation,
                    ]}>
                    Pay It
                  </Animated.Text>

                  <View
                    style={{
                      position: 'absolute',
                      gap: SizeConfig.width * 7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Animated.View
                      style={[
                        {flexDirection: 'row', gap: SizeConfig.width * 7},
                        ProcessingTextAnimation,
                      ]}>
                      <Animated.View
                        style={[
                          {
                            width: SizeConfig.width * 4,
                            height: SizeConfig.width * 4,
                            backgroundColor: 'white',
                            borderRadius: (SizeConfig.width * 4) / 2,
                          },
                          MakeLoadingVisible,
                          MakeLoadingColorVisible,
                        ]}
                      />
                      <Animated.View
                        style={[
                          {
                            width: SizeConfig.width * 4,
                            height: SizeConfig.width * 4,
                            backgroundColor: 'white',
                            borderRadius: (SizeConfig.width * 4) / 2,
                          },
                          MakeLoadingVisible,
                          MakeLoadingColorVisible,
                        ]}
                      />
                      <Animated.View
                        style={[
                          {
                            width: SizeConfig.width * 4,
                            height: SizeConfig.width * 4,
                            backgroundColor: 'white',
                            borderRadius: (SizeConfig.width * 4) / 2,
                          },
                          MakeLoadingVisible,
                          MakeLoadingColorVisible,
                        ]}
                      />
                    </Animated.View>
                    <Animated.View style={[ProcessingTextAnimation]}>
                      <Text
                        style={{
                          fontFamily: 'RedHatDisplay-Bold',
                          fontSize: SizeConfig.fontSize * 6,
                          color: 'white',
                        }}>
                        Processing
                      </Text>
                    </Animated.View>
                  </View>
                  <Animated.View
                    style={[
                      {
                        backgroundColor: '#f86f15',
                        borderRadius: SizeConfig.width * 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        gap: SizeConfig.height * 2,
                      },
                      showCompleteMessage,
                    ]}>
                    <Animated.View
                      style={[
                        {
                          backgroundColor: 'white',
                          width: SizeConfig.width * 15,
                          height: SizeConfig.width * 15,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: (SizeConfig.width * 15) / 2,
                        },
                        showCompleteMessageIcon,
                      ]}>
                      <Image
                        source={require('../../assets/images/Home/tick.png')}
                        style={{
                          width: SizeConfig.width * 10,
                          height: SizeConfig.width * 10,
                          resizeMode: 'center',
                          tintColor: '#f86f15',
                        }}
                      />
                    </Animated.View>
                    <Text
                      style={{
                        fontSize: SizeConfig.fontSize * 6,
                        color: 'white',
                        fontFamily: 'RedHatDisplay-Bold',
                      }}>
                      Complete!
                    </Text>
                  </Animated.View>
                </>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
