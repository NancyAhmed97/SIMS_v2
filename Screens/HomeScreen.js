import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BlogerContainer from '../components/BlogerContainer';
import CategoriesContainer from '../components/CategoriesContainer';
import MainHeader from '../components/MainHeader';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { base_url } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setuserInfo } from "../hooks/authorizationReducer"
import { setbloggers } from '../hooks/blogersRedux';
import { addFavorite, addToFav } from '../hooks/favoritesReducer';
import { setcategories } from '../hooks/categories';
'react'

const HomeScreen = () => {
  const navigation = useNavigation(); // Correctly use the hook here
  const dispatch = useDispatch()
  const [blogerData, setBlogerData] = useState([])
  const [catData, setCatData] = useState([])
  const items = useSelector((state) => state);
  const [loading, setLoading] = useState(false)

  // const productIds = items.favoritRducer&&items.favoritRducer.favorites[0].map(product => product.id);
  useEffect(() => {

    const getdata = () => {
      axios.get(`${base_url}/api/bloger`).then(response => {
        dispatch(setbloggers(response.data.content))
        setBlogerData(response.data.content.slice(0, 6))
        setLoading(true)
      })
        .catch(error => Alert.alert(error.response.data.errorMessage)
        )


      axios.get(`${base_url}/api/category`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${items.authorization.userInfo.token}`,
          },
        }
      ).then(response => {

        setCatData(response.data.slice(0, 6));
        dispatch(setcategories(response.data));
        setLoading(true)



      })
        .catch(error => Alert.alert(error.response.data.errorMessage)
        )





    }
    getdata();
  }, [])
  if (!loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="rgba(90, 51, 146, 1)" />
      </View>
    );
  }
  return (
    <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
      <MainHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{items.lang.currentLocal.home.categories}</Text>
            <TouchableOpacity style={styles.seeMoreContainer} onPress={() => navigation.navigate('catigouriesNavigation')}>
              <Text style={styles.seeMoreText}><Text style={styles.title}>{items.lang.currentLocal.home.seeMore}</Text>
              </Text>
              <Image source={require('../assets/images/Button.png')} 
              
              style={items.lang.currentLocal.language == 'ar'&&{transform:[{scaleX:-1}]}}
                />
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
            {catData.map((item) => (
              <View key={item.id} style={styles.item}>
                <CategoriesContainer item={item} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.bloggerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}><Text style={styles.title}>{items.lang.currentLocal.home.bloggers}</Text>
            </Text>
            <TouchableOpacity style={styles.seeMoreContainer} onPress={() => navigation.navigate('bloggerList', {
              catName: null,
              catId: null
            })}>
              <Text style={styles.seeMoreText}><Text style={styles.title}>{items.lang.currentLocal.home.seeMore}</Text>
              </Text>
              <Image source={require('../assets/images/Button.png')}
              style={items.lang.currentLocal.language == 'ar'&&{transform:[{scaleX:-1
              }]}}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.itemContainer}>
            {blogerData.map((item) => {
              return (
                <View key={item.id} style={styles.item}>
                  <BlogerContainer
                    item={item}
                    productIds={''}

                  />
                </View>
              )
            }
            )}
            {/* {blogerData.map((item) => (
              <View key={item.id} style={styles.item}>
                <BlogerContainer
                item={item}
                productIds={''}

                />
              </View>
            ))} */}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
    paddingVertical: Dimensions.get('screen').height / 19,
    backgroundColor: '#fff'

  },
  categoriesContainer: {
    marginBottom: 25
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 8
  },
  seeMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  seeMoreText: {
    marginRight: 7,
    fontSize: 15,
    fontWeight: '700'
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})