import React, {useEffect, useState} from 'react';
import HomeScreen from './src/ui/home/HomeScreen';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';
import Login from './src/ui/login/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {StackNavigationTypes} from './src/navigation/NavigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator<StackNavigationTypes>();

function App() {
  const fcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('New FCM:', fcmToken);
  };

  useEffect(() => {
    notification();

    PushNotification.getChannels(function (channel_ids: string[]) {
      console.log('channel ', channel_ids); // ['channel_id_1']
    });
  }, []);

  const notification = () => {
    const messaging = firebase.messaging;
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

      if (
        remoteMessage?.notification?.body &&
        remoteMessage?.notification?.title
      ) {
        PushNotification.localNotification({
          channelId: 'fcm_fallback_notification_channel',
          message: remoteMessage?.notification.body,
          title: remoteMessage?.notification.title,
        });
      }
    });
    return unsubscribe;
  };

  useEffect(() => {
    fcmToken();
  }, []);

  const [initialRoute, setInitialRoute] = useState<
    keyof StackNavigationTypes | null
  >(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('userLoginToken');
        setInitialRoute(value !== null ? 'Home' : 'Login');
        console.log('User ID Tokken ', value);
      } catch (error) {
        console.error('Error retrieving data:', error);
        setInitialRoute('Login');
      }
    };

    checkLoginStatus();
  }, []);

  if (initialRoute === null) return null;

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
