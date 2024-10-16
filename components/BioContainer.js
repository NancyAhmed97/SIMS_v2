import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const BioContainer = () => {
  const items = useSelector((state) => state);


  return (
    <View >
      <View style={{flexDirection:'row',alignItems:'center'}}>
        
      <Image source={{uri:items.authorization.userInfo.userOrBloger&&items.authorization.userInfo.userOrBloger.image}} style={{width:40,height:40,borderRadius:50,resizeMode:'contain'}}/>
      <Text style={[styles.name,items.lang.currentLocal.language == 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.blogger.hello}, {items.authorization?items.authorization.userInfo.userOrBloger.name:""}</Text>
      </View>
      {items.authorization.userInfo.userOrBloger.bio&&
      <View style={styles.bio}>
        <Text>{items.authorization.userInfo.userOrBloger.bio}</Text>
      </View>
}
    </View>
  )
}

export default BioContainer

const styles = StyleSheet.create({
    name:{
        marginBottom:25,
        fontWeight:'700',
        fontSize:16,
        marginTop:22
    },
    bio:{
        backgroundColor:'rgba(249, 249, 249, 1)',
        padding:12,
        borderRadius:12
    }
})