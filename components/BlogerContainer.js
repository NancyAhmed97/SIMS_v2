import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { base_url } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, deleteFav, getFav, getFavous } from '../hooks/favoritesReducer';

const BlogerContainer = ({ item, productIds }) => {
    const [favState, setFavState] = useState(true)
    const navigation = useNavigation();
    const items = useSelector((state) => state);
    const favBloggers = useSelector(getFavous);
    const isFav = items.favoritRducer.favouriteBlogger.some((blogger) => blogger.id === item.id);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getFav({ userID: items.authorization.userInfo.userOrBloger.id, token: items.authorization.userInfo.token }));

    }, [])


    return (
        <TouchableOpacity style={styles.BlogerContainer} onPress={() => navigation.navigate('BloggerInfo', {
            blogerId: item.id
        })}>
            <View style={styles.blogerImgContainer}>
                <Image source={{ uri: (item && item.image) }} style={styles.blogerImg} />

            </View>
            {isFav ?
                <TouchableOpacity style={styles.favContainer} onPress={() => dispatch(deleteFav({ userID:items.authorization.userInfo.userOrBloger.id,bloggerID:item.id,token: items.authorization.userInfo.token }))}>
                    <TabBarIcon name={'heart'} color={Colors.light.tint} size={24} />


                </TouchableOpacity>

                :
                <TouchableOpacity style={styles.favContainer} onPress={() => dispatch(addToFav({ userID: items.authorization.userInfo.userOrBloger.id, bloggerID: item.id, token: items.authorization.userInfo.token }))}>
                    <TabBarIcon name={'heart-outline'} color={Colors.light.tint} size={24} />


                </TouchableOpacity>


            }
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.name}>{item && item.name}</Text>
                    <Text style={styles.price}>$ 17000</Text>

                </View>
                <View style={styles.socialmediaContainer}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Image source={require('../assets/images/facebook.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Image source={require('../assets/images/tiktok.png')} style={styles.icon} />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Image source={require('../assets/images/instagram.png')} style={styles.icon} />


                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default BlogerContainer

const styles = StyleSheet.create({
    BlogerContainer: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 8,
        borderRadius: 8,
        shadowColor: 'rgba(0, 0, 0, 0.1)',           // Shadow color
        shadowOffset: { width: 0, height: 5 }, // Shadow offset
        shadowOpacity: 10,           // Shadow opacity
        height: Dimensions.get('window').height /2
    },
    blogerImgContainer: {
    },
    blogerImg: {
        width: '100%',
        borderRadius: 8,
        height: '100%'

    },
    favContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        top: 12,
        left: 12

    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        borderRadius: 5,
        position: 'absolute',
        bottom: 8,
        left: 8,
        right: 8,
        padding: 5



    },
    name: {
        fontWeight: '400',
        fontSize: 12,
        marginBottom: 3
    },
    price: {
        color: '#202020',
        fontWeight: '700',
        fontSize: 17
    },
    socialmediaContainer: {
        flexDirection: 'row'
    },
    iconContainer: {
        marginRight: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 22,
        height: 22
    }
})