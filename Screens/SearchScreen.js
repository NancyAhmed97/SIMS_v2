import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { base_url } from '../constants/constants';
import { useSelector } from 'react-redux';
import { useNavigation } from 'expo-router';

const SearchScreen = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState('')
    const [dataBlogger, setDataBlogger] = useState('')
    const items = useSelector((state) => state);
    const navigation = useNavigation()
    return (
        <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-forward-outline':'chevron-back-outline'} color={'rgba(90, 51, 146, 1)'} size={30} />

                </TouchableOpacity>
                <View style={styles.input}
                >
                    <TextInput
                        placeholder={items.lang.currentLocal.home.search}
                        value={search}
                        style={{ width: '90%' }}
                        onTextInput={(text) => setSearch(text)}
                        onChangeText={(text) => {
                            axios.get(`${base_url}/api/bloger/search?keyword=${text}`,

                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${items.authorization.userInfo.token}`,
                                    },
                                }
                            ).then(response => {
                                //    setData(response.data.categories);
                                //    setData(response.data.blogers);
                                //    array1.concat(array2)
                                // setData(response.data.categories)
                                setData(response.data.categories);
                                setDataBlogger(response.data.blogers)

                            })
                                .catch(error => console.log(error.response.data)

                                )

                        }}
                    />
                    <TabBarIcon name={'search-outline'} color={Colors.light.tint} size={24} />

                </View>
            </View>
            <ScrollView>
                {data.length > 0 &&
                    data.map((item) => {

                        return (
                            <TouchableOpacity style={styles.result} onPress={() => navigation.navigate('bloggerList', {
                                catId: item.id,
                                catName: item.name
                            })}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>
                                    <TabBarIcon name={'search-outline'} color={Colors.light.tint} size={24} />
                                    <Text style={styles.resultText}>{item.name}</Text>

                                </View>
                                <View>
                                    <Text>{items.lang.currentLocal.search.category}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })

                }
                       {dataBlogger.length > 0 &&
                    dataBlogger.map((item) => {
                        return (
                            <TouchableOpacity style={styles.result} onPress={() => navigation.navigate('BloggerInfo', {
                                blogerId: item.id,
                            })}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>
                                    <TabBarIcon name={'search-outline'} color={Colors.light.tint} size={24} />
                                    <Text style={styles.resultText}>{item.name}</Text>

                                </View>
                                <View>
                                    <Text>{items.lang.currentLocal.search.blogger}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })

                }
            </ScrollView>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'space-between',
        paddingTop: Dimensions.get('window').height / 18,
        paddingBottom: Dimensions.get('window').height / 30,
        paddingHorizontal: 8,


    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    input: {
        width: '90%',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 9,
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    result: {
        flexDirection: 'row',
        paddingVertical: 22,
        alignItems: 'center',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    },
    resultText: {
        marginHorizontal: 8,
        fontWeight: 'bold',

    }
})