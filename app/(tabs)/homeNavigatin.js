import 'react-native-gesture-handler';  // Required for Gesture Handler to work properly
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../Screens/HomeScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import CustomDrawerContent from '../../components/CustomDrawerContent';
import { Dimensions } from 'react-native';
import BloggersList from '../../Screens/BloggersList';
import BloggerInfoScreen from '../../Screens/BloggerInfoScreen';
import Notifications from '../../Screens/Notifications';
import SearchScreen from '../../Screens/SearchScreen';

const homeNavigatin = () => {
  
    const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator 
    initialRouteName="Home" 
    drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
    screenOptions={{
        drawerType: 'front', // Set the drawer type to 'front' to overlay it on the screen

        drawerStyle: {
            width: Dimensions.get('screen').width/1.3, // Set the width of the drawer
          },
                headerShown: false, // Optionally hide the header
      drawerPosition: 'right', }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="bloggerList" component={BloggersList} />
      <Drawer.Screen name="BloggerInfo" component={BloggerInfoScreen} />
      <Drawer.Screen name="notification" component={Notifications} />
      <Drawer.Screen name="search" component={SearchScreen} />
    </Drawer.Navigator>
  )
}
export default homeNavigatin












