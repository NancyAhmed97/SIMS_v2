import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, Text, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import BlogerContainer from '../components/BlogerContainer'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base_url } from '../constants/constants';
import { useRoute } from '@react-navigation/native';

const BloggersList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const items = useSelector((state) => state);
    const { catId } = route.params
    const { catName } = route.params
    const [filteredBloggers, setFilteredBloggers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get(`http://92.113.26.138:8081/api/bloger/filter?${catName ? `category=${catName}` : ''}${items.filteration.type? `&type=${items.filteration.type}` : ''}${items.filteration.cuntry? `&country=${items.filteration.cuntry}` : ''}${items.filteration.age? `&age=${items.filteration.age}` : ''}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${items.authorization.userInfo.token}`,
                },
            }
        ).then(response => {
            setFilteredBloggers(response.data);
            setLoading(false)

        })
            .catch(error => {
                setLoading(false)

                Alert.alert(error.response.data.errorMessage)

            }
            )
    }, [filteredBloggers, items.filteration.type, catName,items.filteration.cuntry])


    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="rgba(90, 51, 146, 1)" />
            </View>
        );
    }
    return (
        <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
            {/* <Header /> */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-forward-outline':'chevron-back-outline'}  color={Colors.light.tint} size={30} />

                </TouchableOpacity>
                <Text style={styles.title}>{catName ? catName : 'Blogger List'}</Text>
                <View></View>
                {/* <TouchableOpacity
                    onPress={() => navigation.toggleDrawer()}

                >
                    <TabBarIcon name={'options-outline'} color={Colors.light.tint} size={24} />

                </TouchableOpacity> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bloggerListContainer}>
                    {filteredBloggers.length>0?
                    filteredBloggers.map((item=>{
                        return(
                            <View style={styles.bloggerContainer}>
                            <BlogerContainer
                                item={item ? item : []}
                            />

                        </View>

                        )
                    }))
                :
                <View>
                <Text>Not found</Text>
            </View>
                }
                    {/* {filteredBloggers ? filteredBloggers && filteredBloggers.length !== 0 ? filteredBloggers.map((item) => {
                        return (
                            <View style={styles.bloggerContainer}>
                                <BlogerContainer
                                    item={item ? item : []}
                                />

                            </View>
                        )

                    }) :

                        items.blogers.bloggers.map((blogeritem) => {
                            return (
                                <View style={styles.bloggerContainer}>
                                    <BlogerContainer
                                        item={blogeritem}
                                    />

                                </View>
                            )
                        })
                        :
                        <View>
                            <Text>Not found</Text>
                        </View>

                    } */}
                    {/* {items.blogers.bloggers.map((item)=>{
                    return(
                        <View style={styles.bloggerContainer}>
                        <BlogerContainer
                        item={item}
                        />

                    </View>    
                    )
                    })} */}
                    {/* <View style={styles.bloggerContainer}>
                        <BlogerContainer />

                    </View>

                    <View style={styles.bloggerContainer}>
                        <BlogerContainer />

                    </View>
                    <View style={styles.bloggerContainer}>
                        <BlogerContainer />

                    </View>
                    <View style={styles.bloggerContainer}>
                        <BlogerContainer />

                    </View>
                    <View style={styles.bloggerContainer}>
                        <BlogerContainer />

                    </View>
                    <View style={styles.bloggerContainer}>
                        <BlogerContainer />

                    </View>
                    <View style={styles.bloggerContainer}>
                        <BlogerContainer />

                    </View> */}
                </View>
            </ScrollView>
        </View>
    )
}

export default BloggersList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor:'#fff'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Dimensions.get('window').height / 18,
        paddingBottom: Dimensions.get('window').height / 30,
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:1

    },
    title: {
        fontWeight: '700',
        fontSize: 18
    },
    bloggerListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    bloggerContainer: {
        width: '49%',
        marginBottom: 22

    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})