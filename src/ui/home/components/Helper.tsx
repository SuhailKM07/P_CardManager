import {Icon} from 'react-native-basic-elements';
import {SizeConfig} from '../../../components/SizeConfig';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useEffect, useState} from 'react';

export const Headder = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: SizeConfig.height * 3,
        alignItems: 'center',
      }}>
      <Icon
        type="AntDesign"
        name="arrowleft"
        color={'black'}
        size={SizeConfig.width * 7}
        style={{position: 'absolute'}}
      />
      <Text
        style={{
          textAlign: 'center',
          flex: 1,
          fontSize: SizeConfig.fontSize * 5,
          fontFamily: 'RedHatDisplay-Medium',
        }}>
        Check Out
      </Text>
    </View>
  );
};

import React from 'react';

import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

export const CreditCardLayout = () => {
  const NexSection = useSharedValue<boolean>(false);

  const [cardNo, setCardNo] = useState('');
  const [secretLable, setSecretLable] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [exDate, setExDate] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pushNext, setPushNext] = useState(false);

  const NextSectionTapGesture = Gesture.Tap().onBegin(() => {
    NexSection.value = pushNext ? true : false;
  });

  const HideSuccessMessage = useAnimatedStyle(() => ({
    opacity: withDelay(
      3000,
      withTiming(NexSection.value ? 1 : 0, {duration: 1000}),
    ),
    display: NexSection.value ? 'flex' : 'none',
  }));

  const ScaleSuccessMessageIcon = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withDelay(
          3500,
          withTiming(
            NexSection.value ? SizeConfig.width * 0.15 : SizeConfig.width * 0,
            {
              duration: 500,
            },
          ),
        ),
      },
    ],
  }));

  const NextSectionAnimatedStyles = useAnimatedStyle(() => ({
    position: withTiming(NexSection.value ? 'relative' : 'absolute', {
      duration: 2000,
    }),

    left: withTiming(NexSection.value ? 0 : SizeConfig.width * 55, {
      duration: 2000,
    }),

    width: withTiming(
      NexSection.value ? SizeConfig.width * 3 : SizeConfig.width * 13,
      {
        duration: 2000,
      },
    ),
    height: withTiming(
      NexSection.value ? SizeConfig.width * 3 : SizeConfig.width * 13,
      {
        duration: 2000,
      },
    ),

    borderRadius: withTiming(
      NexSection.value
        ? (SizeConfig.width * 13) / 2
        : (SizeConfig.width * 13) / 2,
      {
        duration: 2000,
      },
    ),
  }));

  const MakeLoadingVisible = useAnimatedStyle(() => ({
    opacity: NexSection.value
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
    backgroundColor: NexSection.value
      ? withDelay(
          1800,
          withTiming('#f86f15', {
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

  const ChangingTheNextScreen = useAnimatedStyle(() => ({
    display: NexSection.value ? 'none' : 'flex',
  }));

  const ChangingTheNextScreenText = useAnimatedStyle(() => ({
    display: NexSection.value ? 'flex' : 'none',
  }));

  let StringSlicer = (name: string, index: number, lable: string) => {
    if (lable == 'cardNumber') {
      setCardNo(prev => prev + name[index]);
    } else if (lable == 'secretLable') {
      setSecretLable(prev => prev + name[index]);
    } else if (lable == 'cardHolder') {
      setCardHolder(prev => prev + name[index]);
    } else if (lable == 'exDate') {
      setExDate(prev => prev + name[index]);
    } else if (lable == 'pinCode') {
      setPinCode(prev => prev + name[index]);
    }
  };

  useEffect(() => {
    if (
      cardNo.length &&
      secretLable.length &&
      cardHolder.length &&
      exDate.length &&
      pinCode.length
    ) {
      setPushNext(true);
    }
  }, [cardNo, secretLable, cardHolder, exDate, pinCode]);

  let StopTimer = (timeLock: NodeJS.Timeout) => {
    clearInterval(timeLock);
  };

  let timerFunction = (name: string, lable: string) => {
    let count = 0;
    let timeLock = setInterval(() => {
      if (count >= name.length) {
        StopTimer(timeLock);
        return;
      }
      StringSlicer(name, count, lable);
      count++;
    }, 200);
  };

  const pressed = useSharedValue<boolean>(false);

  const tapGesture = Gesture.Tap().onBegin(() => {
    pressed.value = true;
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          pressed.value ? SizeConfig.width * 0 : -SizeConfig.width * 10,
        ),
      },
    ],
  }));

  const defaultDataWith6Colors = [
    '#B0604D',
    '#899F9C',
    '#B3C680',
    '#5C6265',
    '#F5D399',
    '#F1F1F1',
  ];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Carousel
        autoPlayInterval={2000}
        data={defaultDataWith6Colors}
        height={SizeConfig.height * 35}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={SizeConfig.width * 100}
        style={{
          width: SizeConfig.width * 100,
          // backgroundColor: 'red',
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={() => {
          return (
            <View
              style={{
                paddingHorizontal: SizeConfig.width * 6,
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  borderRadius: SizeConfig.width * 3,
                  height: SizeConfig.height * 30,
                  zIndex: -2,
                }}>
                <Animated.View
                  style={[
                    {
                      justifyContent: 'space-evenly',
                      height: '100%',
                      paddingHorizontal: SizeConfig.width * 5,
                      paddingVertical: SizeConfig.width * 3,
                      overflow: 'hidden',
                    },
                    ChangingTheNextScreen,
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: SizeConfig.width * 50,
                      }}>
                      <Text
                        style={{
                          fontSize: SizeConfig.fontSize * 3,
                          fontFamily: 'RedHatDisplay-Medium',
                          color: 'white',
                        }}>
                        Enter Card Number
                      </Text>
                      <TextInput
                        value={cardNo}
                        style={{
                          fontSize: SizeConfig.fontSize * 4,
                          fontFamily: 'RedHatDisplay-ExtraBold',
                          color: 'white',
                          borderBottomColor: 'white',
                          borderBottomWidth: 1,
                        }}
                        onChangeText={text => {
                          setCardNo(text);
                        }}
                        onFocus={() => {
                          timerFunction('0000 0000 0000 0000', 'cardNumber');
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: SizeConfig.width * 20,
                      }}>
                      <Text
                        style={{
                          fontSize: SizeConfig.fontSize * 3,
                          fontFamily: 'RedHatDisplay-Medium',
                          color: 'white',
                        }}>
                        Secret Lable
                      </Text>
                      <TextInput
                        value={secretLable}
                        style={{
                          fontSize: SizeConfig.fontSize * 4,
                          fontFamily: 'RedHatDisplay-Bold',
                          color: 'white',
                          borderBottomColor: 'white',
                          borderBottomWidth: 1,
                        }}
                        onChangeText={text => {
                          setSecretLable(text);
                        }}
                        onFocus={() => {
                          timerFunction('123', 'secretLable');
                        }}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      width: SizeConfig.width * 50,
                    }}>
                    <Text
                      style={{
                        fontSize: SizeConfig.fontSize * 3,
                        fontFamily: 'RedHatDisplay-Medium',
                        color: 'white',
                      }}>
                      Card Holder
                    </Text>
                    <TextInput
                      value={cardHolder}
                      style={{
                        fontSize: SizeConfig.fontSize * 4,
                        fontFamily: 'RedHatDisplay-Bold',
                        color: 'white',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                      }}
                      onChangeText={text => {
                        setCardHolder(text);
                      }}
                      onFocus={() => {
                        timerFunction('Suhail S', 'cardHolder');
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: SizeConfig.width * 28,
                      }}>
                      <Text
                        style={{
                          fontSize: SizeConfig.fontSize * 3,
                          fontFamily: 'RedHatDisplay-Medium',
                          color: 'white',
                        }}>
                        Ex Date
                      </Text>
                      <TextInput
                        value={exDate}
                        style={{
                          fontSize: SizeConfig.fontSize * 4,
                          fontFamily: 'RedHatDisplay-Bold',
                          color: 'white',
                          borderBottomColor: 'white',
                          borderBottomWidth: 1,
                        }}
                        onChangeText={text => {
                          setExDate(text);
                        }}
                        onFocus={() => {
                          timerFunction('01/23', 'exDate');
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: SizeConfig.width * 20,
                      }}>
                      <Text
                        style={{
                          fontSize: SizeConfig.fontSize * 3,
                          fontFamily: 'RedHatDisplay-Medium',
                          color: 'white',
                        }}>
                        Pin Code
                      </Text>
                      <TextInput
                        value={pinCode}
                        style={{
                          fontSize: SizeConfig.fontSize * 4,
                          fontFamily: 'RedHatDisplay-Bold',
                          color: 'white',
                          borderBottomColor: 'white',
                          borderBottomWidth: 1,
                        }}
                        onChangeText={text => {
                          setPinCode(text);
                        }}
                        onFocus={() => {
                          timerFunction('03294', 'pinCode');
                        }}
                      />
                    </View>
                    <GestureDetector gesture={tapGesture}>
                      <View
                        style={[
                          {
                            width: SizeConfig.width * 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          },
                        ]}>
                        <Animated.Image
                          source={require('../../../assets/images/Home/visa.png')}
                          style={[
                            {
                              width: SizeConfig.width * 20,
                              height: SizeConfig.width * 10,
                              resizeMode: 'center',
                            },
                            animatedStyles,
                          ]}
                        />
                      </View>
                    </GestureDetector>
                  </View>
                </Animated.View>

                <View
                  style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '100%',
                    // zIndex: -1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: SizeConfig.width * 13,
                      width: '100%',
                      justifyContent: 'center',
                      height: SizeConfig.height * 7,
                    }}>
                    {/* Wrapping an Animated.View inside GestureDetector */}
                    <GestureDetector gesture={NextSectionTapGesture}>
                      <Animated.View
                        style={[
                          {
                            backgroundColor: '#f86f15',
                            width: SizeConfig.width * 13,
                            height: SizeConfig.width * 13,
                            borderRadius: (SizeConfig.width * 13) / 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // zIndex: 2,
                          },
                          NextSectionAnimatedStyles,
                        ]}>
                        <Icon
                          type="AntDesign"
                          name="arrowright"
                          size={SizeConfig.width * 8}
                          color={'white'}
                        />
                      </Animated.View>
                    </GestureDetector>

                    <Animated.View
                      style={[
                        {
                          width: SizeConfig.width * 3,
                          height: SizeConfig.width * 3,
                          backgroundColor: '#f86f15',
                          borderRadius: (SizeConfig.width * 3) / 2,
                        },
                        MakeLoadingVisible,
                        MakeLoadingColorVisible,
                      ]}
                    />
                    <Animated.View
                      style={[
                        {
                          width: SizeConfig.width * 3,
                          height: SizeConfig.width * 3,
                          backgroundColor: '#f86f15',
                          borderRadius: (SizeConfig.width * 3) / 2,
                        },
                        MakeLoadingVisible,
                        MakeLoadingColorVisible,
                      ]}
                    />
                  </View>
                  <Animated.Text
                    style={[
                      {
                        fontSize: SizeConfig.fontSize * 4,
                        color: 'white',
                        fontFamily: 'RedHatDisplay-Bold',
                        zIndex: -1,
                      },
                      ChangingTheNextScreenText,
                    ]}>
                    Verifying Your Card
                  </Animated.Text>
                </View>

                <Animated.View
                  style={[
                    {
                      backgroundColor: 'black',
                      borderRadius: SizeConfig.width * 3,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      // zIndex: -2,
                      gap: SizeConfig.height * 2,
                    },
                    HideSuccessMessage,
                  ]}>
                  <Animated.View
                    style={[
                      {
                        backgroundColor: '#f86f15',
                        width: SizeConfig.width * 15,
                        height: SizeConfig.width * 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: (SizeConfig.width * 15) / 2,
                      },
                      ScaleSuccessMessageIcon,
                    ]}>
                    <Image
                      source={require('../../../assets/images/Home/tick.png')}
                      style={{
                        width: SizeConfig.width * 10,
                        height: SizeConfig.width * 10,
                        resizeMode: 'center',
                        tintColor: 'white',
                      }}
                    />
                  </Animated.View>
                  <Text
                    style={{
                      fontSize: SizeConfig.fontSize * 4,
                      color: 'white',
                      fontFamily: 'RedHatDisplay-Bold',
                    }}>
                    Successfully Added!
                  </Text>
                </Animated.View>
              </View>
            </View>
          );
        }}
      />
    </GestureHandlerRootView>
  );
};
