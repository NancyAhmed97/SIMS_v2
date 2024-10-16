import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import bloggerHome from '../../Screens/bloggerHome';
import Wallet from '../../Screens/Wallet';

const homeNavigatin = () => {
  const Stack = createStackNavigator();

  return (
    <View
    style={{ flex: 1 }}
  >
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Set the background color here and remove header
      }}
    >
      <Stack.Screen name="home" component={bloggerHome} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  </View>
  )
}

export default homeNavigatin

const styles = StyleSheet.create({})