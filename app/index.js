import { View, Text, I18nManager, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect } from 'expo-router'
import { useSelector } from 'react-redux';
import 'intl-pluralrules';

const Pages = () => {
  const items = useSelector((state) => state);
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }

  // }


  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     const { status } = await Notifications.getPermissionsAsync();
  //     if (status !== 'granted') {
  //       await Notifications.requestPermissionsAsync();
  //     }

  //     const token = await Notifications.getExpoPushTokenAsync();
  //     console.log('Expo Push Token:', token);
  //     // You can send this token to your backend server
  //   };

  //   requestPermissions();
  // }, []);


  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging().getToken().then(token => {
  //       console.log(token);

  //     })
  //   } else {
  //     console.log('promiss', authStatus);

  //   }
  //   messaging.getInitialNotification().then(async(remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log('noti', remoteMessage.notification);

  //     }
  //   })
  //   messaging().onNotificationOpenedApp(async(remoteMessage)=> {
  //     console.log('notitrytytrhy', remoteMessage.notification);

  //   }

  //   )


  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });


  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;

  // }, [])
  if (!items.authorization.userInfo.token) {
    return (<Redirect href={'/(auth)/welcome'} />)

  } else if (items.authorization.userInfo.intent === 'user') {
    return (<Redirect href={'/(tabs)/homeNavigatin'} />)

  } else if (items.authorization.userInfo.intent === 'bloger') {

    return (<Redirect href={'/(blogerTabs)/homeNavigatin'} />)
  }
}

export default Pages