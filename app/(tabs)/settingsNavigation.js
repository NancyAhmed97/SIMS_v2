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
import { useSelector } from 'react-redux';
import BloggerInfoScreen from '../../Screens/BloggerInfoScreen';
import PaidCampaignScreen from '../../Screens/PaidCampaignScreen';
import DoneCampaignScreen from '../../Screens/DoneCampaignScreen';

const settingsNavigation = () => {
  const Stack = createStackNavigator();
  const items = useSelector((state) => state);

  return (
    <View
      style={items.lang.currentLocal.language=='ar'?{direction:'rtl',flex:1}:{direction:'ltr',flex:1}}
      // style={[items.lang.currentLocal.language=='ar'&&{direction:'rtl'},styles.container]}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Set the background color here and remove header
        }}
      >
        <Stack.Screen name="settings" component={SettingsScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="editeProfile" component={EditePasswordScreen} />
        <Stack.Screen name="Rejected" component={RejectedCapainsScreen} />
        <Stack.Screen name="Approved" component={ApprovedCampainsScreen} />
        <Stack.Screen name="live" component={LiveCompain} />
        <Stack.Screen name="Requested" component={RequestedCompain} />
        <Stack.Screen name="paid" component={PaidCampaignScreen} />
        <Stack.Screen name="done" component={DoneCampaignScreen} />
        <Stack.Screen name="BloggerInfo" component={BloggerInfoScreen} />

      </Stack.Navigator>
    </View>
  )
}
export default settingsNavigation
