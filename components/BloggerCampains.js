import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'

const BloggerCampains = () => {
    const navigation=useNavigation()

  return (
    <View style={styles.container}>
<TouchableOpacity style={styles.campainContainer} onPress={()=> navigation.navigate('RequestedCampain')}>
    <Text  style={styles.campainText}>Requested</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.campainContainer} onPress={()=>navigation.navigate('ApproveCampains')}>
    <Text  style={styles.campainText}>Approved</Text>
</TouchableOpacity>

    </View>
  )
}

export default BloggerCampains

const styles = StyleSheet.create({
    container:{
        paddingVertical:22,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff'

    },
    campainContainer:{
        width:'49%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(253, 243, 243, 1)',
        paddingVertical:8,
        borderRadius:12
    },
    campainText:{
        color:'rgba(248, 17, 64, 1)',
        fontSize:16,
        fontWeight:'500'
    }
})