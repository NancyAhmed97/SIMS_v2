import { View} from 'react-native'
import React from 'react'
import CategoriesScreen from '../../Screens/CategoriesScreen';
import BloggersList from '../../Screens/BloggersList';
import { createStackNavigator } from '@react-navigation/stack';

const catigouriesNavigation = () => {
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
        <Stack.Screen name="categories" component={CategoriesScreen} />
        <Stack.Screen name="bloggerList" component={BloggersList} />
      </Stack.Navigator>
    </View>

  )
}

export default catigouriesNavigation