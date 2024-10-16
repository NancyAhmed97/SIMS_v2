import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BloggerHeader from '../components/BloggerHeader'
import BioContainer from '../components/BioContainer'
import WalletContainer from '../components/WalletContainer'
import LiveCompains from '../components/LiveCompains'
import BloggerCampains from '../components/BloggerCampains'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { base_url } from '../constants/constants'

const bloggerHome = () => {
  const items = useSelector((state) => state);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)
  const [campain, setCampain] = useState([]);

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



      axios.get(`${base_url}/api/bloger/live-campaign?blogerId=${items.authorization.userInfo.userOrBloger.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${items.authorization.userInfo.token}`,
          },
        }
      ).then(response => {
        setCampain(response.data);
      })
        .catch(error => Alert.alert(error.response.data.errorMessage)
        )
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
      {/* <BloggerHeader /> */}
      <BioContainer />
      {/* <BloggerCampains/> */}
      <LiveCompains campain={campain} />
      <WalletContainer data={data} />
    </View>
  )
}

export default bloggerHome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    paddingVertical:Dimensions.get('window').height/22,
    backgroundColor:'#fff'

  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})