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
    const timeout = setTimeout(() => {
      onPurchase.value = false;
      setAnimatedUi(false);
      console.log('Timeout executed: onPurchase.value set to false');
    }, 10000);

    console.log('onPurchase.value:', onPurchase.value);
    console.log('reSetUI:', reSetUI);

    return () => clearTimeout(timeout); // Cleanup timeout on re-renders/unmount
  }, [reSetUI]); // Runs only when reSetUI changes

  const ChangingTheScreenHeight = useAnimatedStyle(() => ({
    width: withTiming(
      onPurchase.value && CardDetailsData?.length > 1 ? '100%' : '75%',
      {duration: 3000},
    ),
    height: withTiming(
      onPurchase.value && CardDetailsData?.length > 1
        ? SizeConfig.height * 100
        : SizeConfig.height * 6,
      {duration: 3000},
    ),
    marginVertical: withTiming(
      onPurchase.value && CardDetailsData?.length > 1
        ? 0
        : SizeConfig.height * 7,
      {
        duration: 3000,
      },
    ),
  }));

  const MakeLoadingVisible = useAnimatedStyle(() => ({
    opacity:
      onPurchase.value && CardDetailsData?.length > 1
        ? withDelay(
            2500,
            withTiming(1, {
              duration: 1000,
            }),
          )
        : 0,

    backgroundColor: 'gray',
  }));
  const MakeLoadingColorVisible = useAnimatedStyle(() => ({
    backgroundColor:
      onPurchase.value && CardDetailsData?.length > 1
        ? withDelay(
            2800,
            withTiming('white', {
              duration: 1000,
            }),
          )
        : withDelay(
            2000,
            withTiming('gray', {
              duration: 1000,
            }),
          ),
  }));

  const PayItTextAnimation = useAnimatedStyle(() => ({
    display: onPurchase.value && CardDetailsData?.length > 1 ? 'none' : 'flex',
  }));
  const ProcessingTextAnimation = useAnimatedStyle(() => ({
    display: onPurchase.value && CardDetailsData?.length > 1 ? 'flex' : 'none',
    opacity:
      onPurchase.value && CardDetailsData?.length > 1
        ? withDelay(
            2500,
            withTiming(1, {
              duration: 1000,
            }),
          )
        : 0,
  }));

  const showCompleteMessage = useAnimatedStyle(() => ({
    opacity:
      onPurchase.value && CardDetailsData?.length > 1
        ? withDelay(
            4000,
            withTiming(1, {
              duration: 1000,
            }),
          )
        : 0,
    display: onPurchase.value && CardDetailsData?.length > 1 ? 'flex' : 'none',
  }));

  const showCompleteMessageIcon = useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          onPurchase.value && CardDetailsData?.length > 1
            ? withDelay(
                5500,
                withTiming(SizeConfig.width * 0.23, {
                  duration: 500,
                }),
              )
            : 0,
      },
    ],
    opacity:
      onPurchase.value && CardDetailsData?.length > 1
        ? withDelay(4500, withTiming(1))
        : 0,
  }));

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
                <GestureDetector gesture={NextSectionTapGesture}>
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
                </GestureDetector>

                <View
                  style={{
                    position: 'absolute',
                    gap: SizeConfig.width * 13,
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
                  <Animated.View style={[showCompleteMessageIcon]}>
                    <Text
                      style={{
                        fontSize: SizeConfig.fontSize * 6,
                        color: 'white',
                        fontFamily: 'RedHatDisplay-Bold',
                      }}>
                      Complete!
                    </Text>
                  </Animated.View>
                </Animated.View>
              </>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
