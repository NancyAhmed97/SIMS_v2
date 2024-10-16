import { ActivityIndicator, Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base_url } from '../constants/constants';
import { Alert } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

const BloggerPaidCompain = () => {
    const items = useSelector((state) => state);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [url, setUrl] = useState(false);

    useEffect(() => {

        const getdata = () => {
            axios.get(`${base_url}/api/bloger/paid-campaign?blogerId=${items.authorization.userInfo.userOrBloger.id}`,
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
    const SendCompainUrl = (item) => {
        // setModalVisible(!modalVisible)
        console.log(item);
        const newCampaignUrl = url;
        item.campaignUrl = newCampaignUrl;

        axios.post(`${base_url}/api/campaign/complete/to-client`, item, {
            headers: {
                Authorization: `Bearer ${items.authorization.userInfo.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            setModalVisible(!modalVisible)
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
                    title={items.lang.currentLocal.settings && items.lang.currentLocal.settings.paidCampaigns}
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
                                <TouchableOpacity style={styles.btnContainer} onPress={() => setModalVisible(true)}>
                                    <View style={styles.btn}>
                                        <Text style={styles.btnText}>{items.lang.currentLocal.bloggerrInfo.sendCampaignURL}</Text>

                                    </View>
                                </TouchableOpacity>

                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}style={styles.close}>

                                                <TabBarIcon name={'close'} size={28} />

                                            </TouchableOpacity>
                                            <Text 
                                             style={[styles.modalText, items.lang.currentLocal.language == 'ar' && { alignSelf: 'flex-start' }]}
                                            >{items.lang.currentLocal.bloggerrInfo.CampaignURL}</Text>
                                            <TextInput
                                                value={url}
                                                onChangeText={(value) => setUrl(value)}
                                                style={styles.input}
                                            />
                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => SendCompainUrl(item)}>
                                                <Text style={styles.textStyle}>{items.lang.currentLocal.bloggerrInfo.send}</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>


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

export default BloggerPaidCompain

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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        width:'80%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'rgba(90, 51, 146, 1)',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        marginTop:22
    },
    input:{
        width:'95%',
        paddingHorizontal:5,
        paddingVertical:12,
        marginHorizontal:5,
        borderRadius:12,
        borderWidth:1,
        borderColor:'rgba(112, 112, 112, 1)'  ,
        marginBottom:22

    },
    close:{
        position:'absolute',
        right:'2%',
        top:'2%',
    },
    
});
