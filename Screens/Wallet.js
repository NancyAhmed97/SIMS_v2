import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import WalletContainer from '../components/WalletContainer'
import axios from 'axios'
import { base_url } from '../constants/constants'
import { useSelector } from 'react-redux'

const Wallet = () => {
    const [data, setData] = useState([])
    const items = useSelector((state) => state);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      
        const getData = () => {
   
            axios.get(`${base_url}/api/bloger/wallet?blogerId=66f6c26dd34cd51b2199f716`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${items.authorization.userInfo.token}`,
                },
              }).then((res) => {
                setData(res.data);
                setLoading(false)
        
              }).catch((error) => {
                console.log(error);
        
              })
                }
        getData()
      }, []);
      
      if (loading) {
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="rgba(90, 51, 146, 1)" />
          </View>
        );
      }
    
    return (
      <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
            <Header title={items.lang.currentLocal.settings.Wallet} />
            <WalletContainer  data={data} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.campaigns.map((item)=>{
                    return(
                        <View style={styles.walletContainerBox}>
                        <View>
                            <Text style={[styles.date,items.lang.currentLocal.language == 'ar' &&{alignSelf:'flex-start'}]}>{item.createdDate.slice(0,10)}</Text>
                            <Text style={styles.title}>Customer name’s campaign </Text>
    
                        </View>
                        <View>
                            <Text style={styles.price}>
                                $21,00
                            </Text>
                        </View>
                    </View>
    
                    )
                })}
          
            </ScrollView>
        </View>
    )
}

export default Wallet

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        flex: 1,
        backgroundColor:'#fff'
    },
    walletContainerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'rgba(249, 249, 249, 1)',
        padding:22,
        borderRadius:12,
        marginVertical:22
    },
    price: {
        fontWeight: '700',
        fontSize: 17,
        color: 'rgba(0, 0, 0, 1)'
    },
    title: {
        color: 'rgba(32, 32, 32, 1)',
        fontWeight: '700',
        fontSize: 14,

    },
    date:{
        color: 'rgba(0, 0, 0, 1)',
        fontWeight: '600',
        fontSize: 10,
        marginTop:12


    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})