import React from 'react';
import HomeScreen from './src/ui/home/HomeScreen';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';
import Login from './src/ui/login/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name={'Login'}
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
