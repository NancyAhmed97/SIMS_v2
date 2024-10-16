import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';

const Header = ({title}) => {
    const navigation= useNavigation();
    const items = useSelector((state) => state);

  return (
    <View style={styles.container}>
<TouchableOpacity onPress={()=>navigation.goBack()}>
<TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-forward-outline':'chevron-back-outline'}  color={'rgba(90, 51, 146, 1)'} size={30} />

</TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View></View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:Dimensions.get('window').height/18,
        paddingBottom:Dimensions.get('window').height/30,
borderBottomWidth:1,
borderBottomColor:'#e5e5e5'
        
    },
    title:{
        fontWeight:'700',
        fontSize:18
    }
})