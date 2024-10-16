import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const authInput = ({placeholder,inputValue,inputFunction,inputType}) => {
  return (
    <View>
<TextInput
style={styles.input}
placeholder={placeholder}
value={inputValue}
onChangeText={inputFunction}
secureTextEntry={!inputType} 
// keyboardType={placeholder==='Phone Number'&&'number-pad'}
/>
    </View>  )
}

export default authInput

const styles = StyleSheet.create({
    input:{
        width:'95%',
        paddingHorizontal:5,
        paddingVertical:12,
        marginHorizontal:5,
        borderRadius:12,
        borderWidth:1,
        borderColor:'rgba(112, 112, 112, 1)'  
    }
})