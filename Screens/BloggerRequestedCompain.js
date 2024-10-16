import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base_url } from '../constants/constants';
import { Alert } from 'react-native';

const BloggerRequestedCompain = () => {
    const items = useSelector((state) => state);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getdata = () => {
            axios.get(`${base_url}/api/bloger/requested-campaign?blogerId=${items.authorization.userInfo.userOrBloger.id}`,
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
                .catch(error => Alert.alert(error.response.data.errorMessage)
                )



   
        }
        getdata()
    }, [data])
    const handdleReject = (id) => {


        axios.post(`${base_url}/api/campaign/response/to-admin?campaignId=${id}&blogerResponse=false&content=${''}`, {}, {
            headers: {
                Authorization: `Bearer ${items.authorization.userInfo.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            Alert.alert(res.data.statusMsg);
        })
        .catch((error) => {
            Alert.alert(error.response?.data?.error || 'An error occurred');
        });

        // axios.post(`${base_url}/api/campaign/response/to-admin?campaignId=${id}&blogerResponse=false&content=${''}`,
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${items.authorization.userInfo.token}`,
        //         },
        //     }
        // ).then(response => {
        //     setData(response.data);
        //     setLoading(false);


        // })
        //     .catch(error => Alert.alert(error.response.data.errorMessage)
        //     )

    }
    const handdleAccept = (id) => {

        axios.post(`${base_url}/api/campaign/response/to-admin?campaignId=${id}&blogerResponse=${true}&content=${''}`, {}, {
            headers: {
                Authorization: `Bearer ${items.authorization.userInfo.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            Alert.alert(res.data.statusMsg);
        })
        .catch((error) => {
            Alert.alert(error.response?.data?.error || 'An error occurred');
        });




    }
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
                title={'requested Campaign'}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.length !== 0 ? data.map((item) => {

                    return (
                        <View style={styles.campainContainer}>
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
                            <View style={styles.btnsContainer}>
                                <TouchableOpacity style={styles.btnContainer} onPress={() => handdleAccept(item.id)}>
                                    <View style={styles.btn}>
                                        <Text style={styles.btnText}>{items.lang.currentLocal.bloggerrInfo.accept}</Text>

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.btnContainer} onPress={() => handdleReject(item.id)}>
                                    <View style={styles.btn}>
                                        <Text style={styles.btnText}>{items.lang.currentLocal.bloggerrInfo.reject}</Text>

                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>

                    )
                }) :

                    <View style={styles.emptyContainer}>
                        <Text style={styles.textContainer}>Explore Bloggers</Text>
                    </View>
                }





            </ScrollView>
        </View>

    )
}
export default BloggerRequestedCompain

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
        borderRadius: 7,
        marginRight: 7
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
    },
    btnsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})