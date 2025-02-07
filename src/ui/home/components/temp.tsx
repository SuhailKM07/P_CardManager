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
        style={{position: 'absolute', zIndex: 2}}
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

export const CreditCardLayout = () => {
  const [cardNo, setCardNo] = useState('');
  const [secretLable, setSecretLable] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [exDate, setExDate] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pushNext, setPushNext] = useState(false);
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

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    // backgroundColor: pressed.value ? 'green' : 'red',
    transform: [
      {
        scale: withTiming(
          pressed.value ? SizeConfig.width * 20 : SizeConfig.width * 10,
        ),
      },
    ],
  }));

  return (
    <GestureHandlerRootView>
      <View
        style={{
          paddingHorizontal: SizeConfig.width * 6,
        }}>
        <View
          style={{
            backgroundColor: 'black',
            borderRadius: SizeConfig.width * 3,
            overflow: 'hidden',
            height: SizeConfig.height * 30,
          }}>
          <View
            style={{
              justifyContent: 'space-evenly',
              height: '100%',
              paddingHorizontal: SizeConfig.width * 5,
              paddingVertical: SizeConfig.width * 3,
              overflow: 'hidden',
            }}>
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
                      animatedStyles,
                    ]}
                  />
                </View>
              </GestureDetector>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};
