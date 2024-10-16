import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { setuserInfo } from '../hooks/authorizationReducer';
import { useDispatch, useSelector } from 'react-redux';

const BloggerHeader = () => {
    const navigation= useNavigation()
const dispatch=useDispatch();
const items = useSelector((state) => state);

  return (
    <View style={styles.container}>
        <TouchableOpacity>
{/* <Image source={require(items.authorization.userInfo.userOrBloger.image)} style={styles.image}/> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
                             navigation.navigate('(auth)')
               
        }}>
        <TabBarIcon name={'settings-outline'} color={Colors.light.tint} size={30} />

            </TouchableOpacity>
    </View>
  )
}

export default BloggerHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:Dimensions.get('window').height/18,
        paddingBottom:Dimensions.get('window').height/30,

        
    },
    title:{
        fontWeight:'700',
        fontSize:18
    },
    image:{
        width:50,
        height:50
    }
})