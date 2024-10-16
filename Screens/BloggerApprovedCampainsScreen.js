import { ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux';
import { base_url } from '../constants/constants';
import axios from 'axios';
const BloggerApprovedCampainsScreen = () => {
    const items = useSelector((state) => state);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getdata = () => {
            axios.get(`${base_url}/api/user/Accepted-campaign?userId=${items.authorization.userInfo.userOrBloger.id}`,
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
    }, [data])
    const HanddlePayment=(id)=>{
        axios.post(`${base_url}/api/bloger/add/paid-campaign?campaignId=${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${items.authorization.userInfo.token}`,
                },
            }
        ).then(response => {

Alert.alert('Payment succes')
        })
            .catch(error => {
                setLoading(false);
                Alert.alert(error.response.data.errorMessage)
            })
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
                title={'Approved Campains'}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.length !== 0 ? data.map((item) => {

                    return (<View style={styles.campainContainer}>
                        <Text style={styles.campainInfo}>{item.campaignDescription}</Text>
                        <View style={styles.dateConatiner}>
                            <View>
                                <Text style={styles.fromText}>From</Text>
                                <Text style={styles.fromValue}>{item.from.slice(0, 10)}</Text>
                            </View>
                            <View>
                                <Text style={styles.toText}>To</Text>
                                <Text style={styles.toValue}>{item.to.slice(0, 10)}</Text>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={()=>HanddlePayment(item.id)}>
                                <Text style={styles.btnText}>Payment</Text>
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

export default BloggerApprovedCampainsScreen

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
        marginTop: 22
    },
    btn: {
        marginTop: 22,
        backgroundColor: 'rgba(90, 51, 146, 1)',
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 7
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold'
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