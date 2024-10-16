import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const ApproveCampains = () => {
  return (
    <View style={styles.container}>
    <Header 
title={'Approved campaign'}
/>
<ScrollView showsVerticalScrollIndicator={false}>
<View style={styles.campainContainer}>
<Text style={styles.campainInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
<View style={styles.dateConatiner}>
<View>
    <Text style={styles.fromText}>From</Text>
    <Text style={styles.fromValue}>12 Aug 2024</Text>
</View>
<View>

</View>

<View>
    <Text style={styles.toText}>To</Text>
    <Text style={styles.toValue}>12 Aug 2024</Text>
</View>
<View></View>
</View>

</View>
<View style={styles.campainContainer}>
<Text style={styles.campainInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
<View style={styles.dateConatiner}>
<View>
    <Text style={styles.fromText}>From</Text>
    <Text style={styles.fromValue}>12 Aug 2024</Text>
</View>
<View>
    <Text style={styles.toText}>To</Text>
    <Text style={styles.toValue}>12 Aug 2024</Text>
</View>
<View></View>
</View>

</View>
<View style={styles.campainContainer}>
<Text style={styles.campainInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
<View style={styles.dateConatiner}>
<View>
    <Text style={styles.fromText}>From</Text>
    <Text style={styles.fromValue}>12 Aug 2024</Text>
</View>
<View>
    <Text style={styles.toText}>To</Text>
    <Text style={styles.toValue}>12 Aug 2024</Text>
</View>
<View></View>
</View>

</View>
<View style={styles.campainContainer}>
<Text style={styles.campainInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
<View style={styles.dateConatiner}>
<View>
    <Text style={styles.fromText}>From</Text>
    <Text style={styles.fromValue}>12 Aug 2024</Text>
</View>
<View>
    <Text style={styles.toText}>To</Text>
    <Text style={styles.toValue}>12 Aug 2024</Text>
</View>
<View></View>
</View>

</View>
<View style={styles.campainContainer}>
<Text style={styles.campainInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
<View style={styles.dateConatiner}>
<View>
    <Text style={styles.fromText}>From</Text>
    <Text style={styles.fromValue}>12 Aug 2024</Text>
</View>
<View>
    <Text style={styles.toText}>To</Text>
    <Text style={styles.toValue}>12 Aug 2024</Text>
</View>
<View></View>
</View>

</View>
<View style={styles.campainContainer}>
<Text style={styles.campainInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
<View style={styles.dateConatiner}>
<View>
    <Text style={styles.fromText}>From</Text>
    <Text style={styles.fromValue}>12 Aug 2024</Text>
</View>
<View>
    <Text style={styles.toText}>To</Text>
    <Text style={styles.toValue}>12 Aug 2024</Text>
</View>
<View></View>
</View>

</View>



</ScrollView>
</View>  )
}

export default ApproveCampains

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:8,
        backgroundColor:'#fff'
    },
    campainContainer:{
        paddingVertical:22,
        borderBottomColor:"#e5e5e5",
        borderBottomWidth:1
    },
    dateConatiner:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:22
    },
    campainInfo:{
        fontSize:14,
        fontWeight:'400',
  
    },
    toText:{
        fontSize:14,
        fontWeight:'400',
        marginBottom:7
    },
    fromText:{
        fontSize:14,
        fontWeight:'400',
        marginBottom:7
  
    },
    toValue:{
        fontSize:14,
        fontWeight:'400',
        marginBottom:7,
        color:"rgba(112, 112, 112, 1)"
  
    },
    toValue:{
        fontSize:14,
        fontWeight:'400',
        marginBottom:7,
        color:"rgba(112, 112, 112, 1)"
  
    },
      fromValue:{
        fontSize:14,
        fontWeight:'400',
        marginBottom:7,
        color:"rgba(112, 112, 112, 1)"
  
    },
    btnContainer:{
        justifyContent:'center',
  alignItems:'center',marginRight:Dimensions.get('screen').width/5
    },
    btn:{
        marginTop:22,
        backgroundColor:'rgba(90, 51, 146, 1)',
        paddingHorizontal:22,
        paddingVertical:8,
        borderRadius:7
    },
    btnText:{
        color:'#fff'
    },
    btnsContainer:{
      flexDirection:'row',justifyContent:'center'
    },
    rejectContainer:{
      marginTop:22,
      paddingHorizontal:22,
      paddingVertical:8,
      borderRadius:7,
      borderWidth:1,
      borderColor:'rgba(90, 51, 146, 1)',
      marginHorizontal:12
  
    },
    rejectText:{
      color:'rgba(90, 51, 146, 1)'
    },
    approveContainer:{
      marginTop:22,
      paddingHorizontal:22,
      paddingVertical:8,
      borderRadius:7,
      borderWidth:1,
      borderColor:'rgba(90, 51, 146, 1)',
      backgroundColor:'rgba(90, 51, 146, 1)'
  
    }
  })