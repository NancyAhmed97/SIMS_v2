import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';

const MainHeader = () => {
    const navigation=useNavigation()
    const items = useSelector((state) => state);

  return (
    <View style={styles.headerContainer}>
 <View style={styles.imageContainer}>
       <Image source={require('../assets/images/logo-01.png')}style={styles.img} />

        </View>
        <View style={styles.searchContainer}>

        <TouchableOpacity style={styles.search}onPress={()=>navigation.navigate('search')}>
          <Text>{items.lang.currentLocal.home.search}</Text>
          <TabBarIcon name={'search-outline'} color={Colors.light.tint} size={24} />
        </TouchableOpacity>
</View>

              <TouchableOpacity
              onPress={ () => navigation.navigate('notification')}

      >
        <TabBarIcon name={'notifications-outline'} color={Colors.light.tint} size={24} />

        </TouchableOpacity>
            {/* <View style={styles.imageContainer}>
       <Image source={require('../assets/images/logo-01.png')}style={styles.img} />

        </View>
      <View style={styles.searchContainer}>

        <TouchableOpacity style={styles.search}onPress={()=>navigation.navigate('search')}>
          <Text>Search</Text>
          <TabBarIcon name={'search-outline'} color={Colors.light.tint} size={24} />
        </TouchableOpacity>
   
      </View>
        <TouchableOpacity
              onPress={ () => navigation.navigate('notification')}

      >
        <TabBarIcon name={'notifications-outline'} color={Colors.light.tint} size={24} />

        </TouchableOpacity> */}
    </View>
  )
}

export default MainHeader

const styles = StyleSheet.create({
    headerContainer:{
        paddingVertical:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        // width:Dimensions.get('window').width-35

    },
    searchContainer:{
        marginHorizontal:12,
        backgroundColor:'rgba(248, 248, 248, 1)',
         paddingHorizontal:7,
        paddingVertical:12,
        borderRadius:8,
        width:Dimensions.get('screen').width/1.7
    },
    search:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
    },
    imageContainer:{
      width:50,
    },
    img:{
      width:"100%",
      resizeMode:'contain',
      height:50

    }
})