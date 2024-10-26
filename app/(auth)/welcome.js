import { Alert, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View, Button, Platform } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from 'expo-router'
import { changeLocal } from '@/hooks/languageReducer';
import { useDispatch } from 'react-redux';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



const storePushToken = async (FCMToken) => {
  try {
    await AsyncStorage.setItem('FCMToken', FCMToken);
    console.log("success")
  } catch (e) {
    console.error('Failed to save push token', e);
  }
};


function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

const welcome = () => {
  const [FCMToken, setFCMToken] = useState('');
  const [notification, setNotification] = useState(
    undefined
  );
  const notificationListener = useRef();
  const responseListener = useRef();
    const navigation = useNavigation();
// console.log(FCMToken)
    useEffect(() => {
      registerForPushNotificationsAsync()
      .then(FCMToken => {
        setFCMToken(FCMToken ?? '');
        if (FCMToken) {
          storePushToken(FCMToken);
        }
      })
        .catch((error) => storePushToken(`${error}`));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
          Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    const dispatch =useDispatch()
  useEffect(() => {
    dispatch(changeLocal('en'))

  }, [])

  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/logo-01.png')}style={styles.img} />

        </View>
        <Text style={styles.info}>Lorem Ipsum is simply dummy text and typesetting. </Text>
        <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.bloggerContainer} onPress={()=>navigation.navigate('blogger-sign-up-1')}>
            <Text style={styles.bloggerText}>Blogger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate('user-sign-up')}>
            <Text style={styles.userText}>User</Text>
          </TouchableOpacity>

        </View>
      </View>

      <TouchableOpacity style={styles.loginLink} onPress={() => {
        navigation.navigate('sign-in')
            // const url = `whatsapp://send?phone=${+201000943383}&text=${encodeURIComponent('jjhgjfj')}`;

            // Linking.canOpenURL(url)
            //   .then((supported) => {
            //     if (supported) {
            //       return Linking.openURL(url);
            //     } else {
            //       Alert.alert('WhatsApp is not installed on this device');
            //     }
            //   })
            //   .catch((err) => Alert.alert('An error occurred', err.message));
        
      }}>
        <Text style={styles.loginLinkText}>I already have an account</Text>
        <Image source={require('../../assets/images/Button.png')} />

      </TouchableOpacity>
    </View>
  )
}

export default welcome

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: Dimensions.get('window').height / 18,
      paddingBottom: Dimensions.get('window').height / 30,
      paddingHorizontal: 8,
      paddingBottom: 50,
      backgroundColor:'#fff'
  
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width:'90%'
    },
    info: {
      textAlign: 'center',
      color: 'rgba(32, 32, 32, 1)',
      fontSize: 14,
      fontWeight: '400'
    },
    btnContainer: {
      flexDirection: 'row',
      marginTop: 22,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    bloggerContainer: {
      borderWidth: 2,
      borderColor: 'rgba(90, 51, 146, 1)',
      width: '49%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 8
    },
    bloggerText: {
      color: 'rgba(90, 51, 146, 1)',
      fontSize: 16
  
    },
    userContainer: {
      borderWidth: 2,
      width: '49%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: 'rgba(90, 51, 146, 1)',
      borderColor: 'rgba(90, 51, 146, 1)'
  
    },
    userText: {
      color: '#fff',
      fontSize: 16
  
    },
    loginLink: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center'
    },
    loginLinkText: {
      marginHorizontal: 7,
      color: 'rgba(32, 32, 32, 1)',
      fontSize: 16,
      fontWeight: '400'
  
    },
    img:{
      width:'100%',
      resizeMode:'contain'
    }
  })