import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BlogerContainer from '../components/BlogerContainer';
import axios from 'axios';
import { base_url } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../hooks/favoritesReducer';
import { useNavigation } from 'expo-router';

const FavoriteScreen = ({ item }) => {
    const items = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigation=useNavigation()
    return (
        <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
            <Text style={[styles.title,items.lang.currentLocal.language == 'ar'&&{textAlign:'left'}]}>{items.lang.currentLocal.wishlist.title}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.itemContainer}>
                    {items.favoritRducer.favouriteBlogger ? items.favoritRducer.favouriteBlogger.map((item) => {
                        return (
                            <View key={item.id} style={styles.item}>
                                <BlogerContainer
                                    item={item}
                                    productIds={''}
                                />
                            </View>
                        )
                    })
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: Dimensions.get('window').width, height: Dimensions.get('screen').height / 1.3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16,marginBottom:14. }}>No Favorites Yet !</Text>
                            <Text style={{  fontSize: 16 }}>Love any blogger ? save it to save your time</Text>
                            <TouchableOpacity 
                            style={{backgroundColor:"red",marginTop:12,paddingHorizontal:22,paddingVertical:7,borderRadius:7}}
                            onPress={()=>navigation.navigate('homeNavigatin')}>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>Browse</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 7,
        paddingVertical: Dimensions.get('screen').height / 15,
        backgroundColor:'#fff'

    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 18,
        width:'100%'
    },
    itemContainer: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        marginVertical: 8,
        width: '49%', // 2 items per row
    },

})