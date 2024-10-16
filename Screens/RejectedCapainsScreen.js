import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Image } from 'react-native';
import { useNavigation } from 'expo-router';

const RejectedCapainsScreen = () => {
    const items = useSelector((state) => state);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation()

    useEffect(() => {

        const getdata = () => {
            axios.get(`http://92.113.26.138:8081/api/user/rejected-campaign?userId=${items.authorization.userInfo.userOrBloger.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${items.authorization.userInfo.token}`,
                    },
                }
            ).then(response => {
                setData(response.data);
                setLoading(false);


            })
                .catch(error => {
                    setLoading(false);
                    Alert.alert(error.response.data.errorMessage)
                })
        }
        getdata()
    }, [])

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="rgba(90, 51, 146, 1)" />
            </View>
        );
    }
    return (
        <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
            <Header
                title={items.lang.currentLocal.settings && items.lang.currentLocal.settings.rejectedCampaigns}
                />
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.length !== 0 ? data.map((item) => {

                    return (
                        <View style={styles.campainContainer}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
                                onPress={() => navigation.navigate('BloggerInfo', {
                                    blogerId: item.blogerId
                                })}
                            >
                                <Image source={{ uri: item.blogerImage }} style={{ width: 50, height: 50, borderRadius: 50, marginHorizontal: 7 }} />
                                <Text>{item.blogerName}</Text>
                            </TouchableOpacity>
                            <Text style={items.lang.currentLocal.language == 'ar' ? { marginBottom: 12, fontWeight: 'bold', alignSelf: 'flex-start' } : { marginBottom: 12, fontWeight: 'bold' }}>{items.lang.currentLocal.bloggerrInfo.description} : </Text>
                            <Text style={[styles.campainInfo, items.lang.currentLocal.language == 'ar' && { alignSelf: 'flex-start' }]}>{item.campaignDescription}</Text>
                            <View style={styles.dateConatiner}>
                                <View>
                                <Text style={[styles.fromText, items.lang.currentLocal.language == 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.bloggerrInfo.From}</Text>
                                <Text style={styles.fromValue}>{item.from.slice(0, 10)}</Text>
                                </View>
                                <View>

                                </View>

                                <View>
                                <Text style={[styles.fromText, items.lang.currentLocal.language == 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.bloggerrInfo.To}</Text>
                                <Text style={styles.toValue}>{item.to.slice(0, 10)}</Text>
                                </View>
                                <View></View>
                            </View>
                            <TouchableOpacity style={styles.btnContainer}>
                            </TouchableOpacity>
                        </View>

                    )
                }) :

                    <View style={styles.emptyContainer}>
                        <Text style={styles.textContainer}>Explore Bloggers</Text>
                    </View>
                }





            </ScrollView>
        </View>)
}

export default RejectedCapainsScreen

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 8
    },
    campainContainer: {
        paddingVertical: 22,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1
    },
    dateConatiner: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 22
    },
    campainInfo: {
        fontSize: 14,
        fontWeight: '400',

    },
    toText: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 7
    },
    fromText: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 7

    },
    toValue: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 7,
        color: "rgba(112, 112, 112, 1)"

    },
    toValue: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 7,
        color: "rgba(112, 112, 112, 1)"

    },
    fromValue: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 7,
        color: "rgba(112, 112, 112, 1)"

    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        marginTop: 22,
        backgroundColor: 'rgba(90, 51, 146, 1)',
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 7
    },
    btnText: {
        color: '#fff'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('screen').height / 1.5
    },
    textContainer: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'red'
    }
})