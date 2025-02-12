import * as React from 'react';
import {View, Pressable, Text} from 'react-native';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SizeConfig} from '../../components/SizeConfig';
import {Icon} from 'react-native-basic-elements';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationTypes} from '../../navigation/NavigationTypes';

GoogleSignin.configure({
  webClientId:
    '592715753658-ca3ainoablt2nk5af3q3a9jqsrfuga0t.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  forceCodeForRefreshToken: true,
});

const GoogleLogin = async () => {
  try {
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    return await GoogleSignin.signIn();
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export default function CustomGoogleButton() {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  let navigation = useNavigation<NavigationProp<StackNavigationTypes>>();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      console.log('Google Sign-In Response:', response);
    } catch (apiError: any) {
      console.error('Sign-In Error:', apiError);
      navigation.navigate('Home');
      setError(apiError.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Pressable
        onPress={handleGoogleLogin}
        style={{
          flexDirection: 'row',
          backgroundColor: '#87CEEB',
          gap: SizeConfig.width * 5,
          alignItems: 'center',
          justifyContent: 'center',
          height: SizeConfig.height * 5,
          width: '100%',
          borderRadius: SizeConfig.width * 3,
        }}>
        <Icon
          name="googleplus"
          type="AntDesign"
          size={SizeConfig.width * 7}
          color={'black'}
        />
        <Text
          style={{
            fontSize: SizeConfig.fontSize * 4.5,
            fontFamily: 'RedHatDisplay-Medium',
            color: 'black',
          }}>
          Login with google
        </Text>
      </Pressable>

      {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
    </View>
  );
}
