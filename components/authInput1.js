import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const authInput = () => {
  return (
    <View>
<TextInput
style={styles.input}
/>
    </View>
  )
}

export default authInput

const styles = StyleSheet.create({
    input:{
        width:'100%',
        paddingHorizontal:5,
        paddingVertical:7,
        marginHorizontal:5,
        borderRadius:12,
        borderWidth:1,
        borderColor:'rgba(112, 112, 112, 1)'  
    }
})