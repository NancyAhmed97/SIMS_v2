import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoriesContainer from '../components/CategoriesContainer';
import { base_url } from '../constants/constants';
import axios from 'axios';
import { useSelector } from 'react-redux';
const CategoriesScreen = () => {
    const [data, setData] = useState([])
    const items = useSelector((state) => state);

    return (
        <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
              <Text style={[styles.title,items.lang.currentLocal.language == 'ar'&&{textAlign:'left'}]}>{items.lang.currentLocal.categories.title}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.itemContainer}>
                    {items.categories.categories.map((item) => (
                        <View key={item.id} style={styles.item}>
                            <CategoriesContainer item={item} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default CategoriesScreen

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
        marginBottom: 18
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