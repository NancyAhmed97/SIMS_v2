import { View} from 'react-native'
import React from 'react'
import SettingsScreen from '../../Screens/SettingsScreen';
import LiveCompain from '../../Screens/LiveCompain';
import ApprovedCampainsScreen from '../../Screens/ApprovedCampainsScreen';
import RejectedCapainsScreen from '../../Screens/RejectedCapainsScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import ChangePasswordScreen from '../../Screens/ChangePasswordScreen';
import EditePasswordScreen from '../../Screens/EditePasswordScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RequestedCompain from '../../Screens/RequestedCompain';
import BloggerRequestedCompain from '../../Screens/BloggerRequestedCompain';
import BloggerApprovedCampainsScreen from '../../Screens/BloggerApprovedCampainsScreen';
import BloggerRejectedCompain from '../../Screens/BloggerRejectedCompain';
import BloggerSettingsScreen from '../../Screens/BloggerSettingsScreen';
import BloggerPaidCompain from '../../Screens/BloggerPaidCompain';
import BloggerDoneCompain from '../../Screens/BloggerDoneCompain';
import Wallet from '../../Screens/Wallet';

const settingsNavigation = () => {
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
        <Stack.Screen name="settings" component={BloggerSettingsScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="editeProfile" component={EditePasswordScreen} />
        <Stack.Screen name="Rejected" component={BloggerRejectedCompain} />
        <Stack.Screen name="Approved" component={BloggerApprovedCampainsScreen} />
        <Stack.Screen name="live" component={LiveCompain} />
        <Stack.Screen name="BloggerRequested" component={BloggerRequestedCompain} />
        <Stack.Screen name="BloggerPaid" component={BloggerPaidCompain} />
        <Stack.Screen name="BloggerDone" component={BloggerDoneCompain} />
        <Stack.Screen name="Wallet" component={Wallet} />
      </Stack.Navigator>
    </View>
  )
}
export default settingsNavigation
