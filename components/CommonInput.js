import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CommonInput = ({ 
    placeholder,
    inputValue,
    inputFunction,
    inputType

 }) => {
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={!inputType} 
                onChangeText={inputFunction}
                value={inputValue}

            />
        </View>
    )
}

export default CommonInput

const styles = StyleSheet.create({
    input:{
        backgroundColor:'#e5e5e5',
        width:Dimensions.get('screen').width/1.5,
        paddingHorizontal:5,
        paddingVertical:12,
        marginHorizontal:5,
        borderRadius:12
    }
})