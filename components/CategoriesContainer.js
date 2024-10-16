import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

const CategoriesContainer = ({item}) => {
    const navigation = useNavigation(); // Correctly use the hook here
    

    return (
        <TouchableOpacity style={styles.BlogerContainer}onPress={()=>navigation.navigate('bloggerList',{
            catId:item.id,
            catName:item.name
        })}>
            <View style={styles.blogerImgContainer}>
                <Image source={{uri:item.image}} style={styles.blogerImg} />
                <Image source={{uri:item.image}} style={styles.blogerImg} />
                <Image source={{uri:item.image}} style={styles.blogerImg} />
                <Image source={{uri:item.image}} style={styles.blogerImg} />

            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>{item.number}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CategoriesContainer

const styles = StyleSheet.create({
    BlogerContainer: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 8,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.1)',           // Shadow color
        shadowOffset: { width: 0, height: 5 }, // Shadow offset
        shadowOpacity: 10,           // Shadow opacity

    },
    blogerImgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    blogerImg: {
        marginVertical: 1,
        width: '49%', // 2 items per row
        height: 85,
        borderRadius: 8,


    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 7
    },

    name: {
        color: '#202020',
        fontWeight: '700',
        fontSize: 13
    },
    numberContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(241, 115, 123, 0.5)',
        borderRadius: 8
    },
    number:{
        color:'rgba(32, 32, 32, 1)',
        fontWeight: '700',
        fontSize: 12
    }


})