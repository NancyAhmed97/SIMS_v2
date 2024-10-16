import { View} from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteScreen from '../../Screens/FavoriteScreen';

const favoriteNavigation = () => {
    const Stack = createStackNavigator();

  return (
    <View
      style={{ flex: 1 }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,  }}>
        <Stack.Screen name="favorite" component={FavoriteScreen} />
      </Stack.Navigator>
    </View>
  )
}

export default favoriteNavigation