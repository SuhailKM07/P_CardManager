import {Icon} from 'react-native-basic-elements';
import {SizeConfig} from '../../../components/SizeConfig';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  runOnJS,
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
import {AllCardDetails} from '../../../redux/slices/CardDetailsSlice';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import {baseGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import {RootState} from '../../../redux/Store';

export const CreditCardLayout = () => {
  const NexSection = useSharedValue<boolean>(false);
  const pressed = useSharedValue<boolean>(false);

  const [cardNo, setCardNo] = useState('');
  const [secretLable, setSecretLable] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [exDate, setExDate] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pushNext, setPushNext] = useState(false);
  const [AddNewCard, setAddNewCard] = useState(false);

  let dispatch = useDispatch();

  const NextSectionTapGesture = Gesture.Tap()
    // .runOnJS(true)
    .onBegin(() => {
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
            NexSection.value ? SizeConfig.width * 0.19 : SizeConfig.width * 0,
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

    left: withTiming(NexSection.value ? 0 : SizeConfig.width * 61, {
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
    if (pushNext) {
      setTimeout(() => {
        dispatch(
          AllCardDetails({
            cardNo,
            secretLable,
            cardHolder,
            exDate,
            pinCode,
          }),
        );
        NexSection.value = false;
        pressed.value = false;

        setCardNo('');
        setSecretLable('');
        setCardHolder('');
        setExDate('');
        setPinCode('');
        setPushNext(false);
        setAddNewCard(false);
      }, 5700);
    }
  }, [pushNext]);

  useEffect(() => {
    if (
      cardNo.length >= 19 &&
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

  const tapGesture = Gesture.Tap()
    // .runOnJS(true)
    .onBegin(() => {
      pressed.value = true;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          pressed.value ? SizeConfig.width * 0 : -SizeConfig.width * 18,
        ),
      },
    ],
  }));

  const FillNewCardTapAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(AddNewCard ? 1 : 0, {
          duration: 1000,
        }),
      },
    ],
  }));
  const ListOfCards = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(
          !NexSection.value ? SizeConfig.width * 0.27 : SizeConfig.width * 0,
          {
            duration: 500,
          },
        ),
      },
    ],
  }));

  let CardDetailsData = useSelector(
    (state: RootState) => state.CardDetailsSlice.list,
  );

  return (
    <Carousel
      data={CardDetailsData}
      height={SizeConfig.height * 32}
      loop={false}
      width={SizeConfig.width * 100}
      style={{
        width: '100%',
        height: SizeConfig.height * 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.8,
        parallaxAdjacentItemScale: 0.57,
      }}
      renderItem={({
        item,
        index,
      }: {
        item: {
          name?: string;
          cardNo: string;
          secretLable: string;
          cardHolder: string;
          exDate: string;
          pinCode: string;
        };
        index: number;
      }) => {
        {
          if (item?.name !== 'scr') {
            return (
              <Animated.View
                style={[
                  {
                    justifyContent: 'space-evenly',
                    paddingHorizontal: SizeConfig.width * 5,
                    paddingVertical: SizeConfig.width * 3,
                    overflow: 'hidden',
                    backgroundColor: 'black',
                    borderRadius: SizeConfig.width * 3,
                    height: SizeConfig.height * 28,
                    elevation: 20,
                    shadowColor: 'black',
                  },
                  ListOfCards,
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
                      value={item?.cardNo}
                      style={{
                        fontSize: SizeConfig.fontSize * 4,
                        fontFamily: 'RedHatDisplay-ExtraBold',
                        color: 'white',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: SizeConfig.width * 27,
                      alignItems: 'center',
                      justifyContent: 'center',
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
                      value={item?.secretLable}
                      style={{
                        fontSize: SizeConfig.fontSize * 4,
                        fontFamily: 'RedHatDisplay-Bold',
                        color: 'white',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
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
                    value={item?.cardHolder}
                    style={{
                      fontSize: SizeConfig.fontSize * 4,
                      fontFamily: 'RedHatDisplay-Bold',
                      color: 'white',
                      borderBottomColor: 'white',
                      borderBottomWidth: 1,
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
                      value={item?.exDate}
                      style={{
                        fontSize: SizeConfig.fontSize * 4,
                        fontFamily: 'RedHatDisplay-Bold',
                        color: 'white',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
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
                      value={item?.pinCode}
                      style={{
                        fontSize: SizeConfig.fontSize * 4,
                        fontFamily: 'RedHatDisplay-Bold',
                        color: 'white',
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                  <View
                    style={[
                      {
                        width: SizeConfig.width * 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      source={require('../../../assets/images/Home/visa.png')}
                      style={[
                        {
                          width: SizeConfig.width * 20,
                          height: SizeConfig.width * 10,
                          resizeMode: 'center',
                        },
                      ]}
                    />
                  </View>
                </View>
              </Animated.View>
            );
          } else {
            return (
              <View
                style={{
                  paddingHorizontal: SizeConfig.width * 2,
                }}>
                {!AddNewCard ? (
                  <View
                    style={[
                      {
                        height: SizeConfig.height * 28,
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#f86f15',
                        borderRadius: SizeConfig.width * 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: SizeConfig.height * 2,
                        elevation: 10,
                        backgroundColor: 'white',
                        shadowColor: '#f86f15',
                      },
                    ]}>
                    <Pressable
                      style={{
                        height: SizeConfig.width * 10,
                        width: SizeConfig.width * 10,
                        backgroundColor: '#f86f15',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: (SizeConfig.width * 10) / 2,
                      }}
                      onPress={() => {
                        setAddNewCard(true);
                      }}>
                      <Icon
                        type="AntDesign"
                        name="plus"
                        size={SizeConfig.width * 5}
                        color={'white'}
                      />
                    </Pressable>
                    <Text
                      style={{
                        fontSize: SizeConfig.fontSize * 5,
                        fontFamily: 'RedHatDisplay-Medium',
                        color: '#f86f15',
                      }}>
                      Add a new card
                    </Text>
                  </View>
                ) : (
                  <Animated.View
                    style={[
                      {
                        backgroundColor: 'black',
                        borderRadius: SizeConfig.width * 3,
                        height: SizeConfig.height * 28,
                      },
                      FillNewCardTapAnimatedStyle,
                    ]}>
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
                            onPress={() => {
                              timerFunction(
                                '0000 0000 0000 0000',
                                'cardNumber',
                              );
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
                            onPress={() => {
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
                          onPress={() => {
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
                            onPress={() => {
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
                            onPress={() => {
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
                        zIndex: -3,
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
                                backgroundColor: pushNext ? '#f86f15' : 'gray',
                                width: SizeConfig.width * 13,
                                height: SizeConfig.width * 13,
                                borderRadius: (SizeConfig.width * 13) / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                zIndex: 10,
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
                  </Animated.View>
                )}
              </View>
            );
          }
        }
      }}
    />
  );
};

export const BillingDetails = () => {
  return (
    <View
      style={{
        gap: SizeConfig.height * 3,
        backgroundColor: 'white',
        padding: SizeConfig.width * 7,
        borderRadius: SizeConfig.width * 3,
        elevation: 10,
      }}>
      <Text
        style={{
          fontFamily: 'RedHatDisplay-Bold',
          fontSize: SizeConfig.fontSize * 5,
          color: 'black',
        }}>
        Order Details
      </Text>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4.5,
              color: 'black',
            }}>
            Bonsal Plant
          </Text>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4.5,
              color: 'black',
            }}>
            $38.99
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4.5,
              color: 'black',
            }}>
            Plant Pot
          </Text>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4.5,
              color: 'black',
            }}>
            $38.99
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4.5,
              color: 'black',
            }}>
            Plant Soil
          </Text>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4.5,
              color: 'black',
            }}>
            $38.99
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', gap: SizeConfig.width * 20}}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4,
              color: 'black',
            }}>
            Bonsal Plant
          </Text>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4,
              color: 'black',
            }}>
            $38.99
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: SizeConfig.width * 20}}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4,
              color: 'black',
            }}>
            Plant Pot
          </Text>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4,
              color: 'black',
            }}>
            $38.99
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: SizeConfig.width * 20}}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4,
              color: 'black',
            }}>
            Plant Soil
          </Text>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Medium',
              fontSize: SizeConfig.fontSize * 4,
              color: 'black',
            }}>
            $38.99
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: SizeConfig.width * 20,
            paddingTop: SizeConfig.height * 2,
          }}>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Bold',
              fontSize: SizeConfig.fontSize * 4.5,
              color: 'black',
            }}>
            Total
          </Text>
          <Text
            style={{
              fontFamily: 'RedHatDisplay-Bold',
              fontSize: SizeConfig.fontSize * 4.5,
              color: 'black',
            }}>
            $98.99
          </Text>
        </View>
      </View>
    </View>
  );
};
