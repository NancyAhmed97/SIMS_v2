import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { setuserInfo } from '../hooks/authorizationReducer';
import { changeLocal } from '@/hooks/languageReducer';

const BloggerSettingsScreen = () => {
    const navigation = useNavigation();
    const items = useSelector((state) => state);
    const dispatch = useDispatch()
    const openSettings = () => {
        if (items.lang.currentLocal.language == 'ar') {
            dispatch(changeLocal('en'))

        } else {
            dispatch(changeLocal('ar'))

        }

    }
    const changeLanguage=()=>{
        if(items.lang.currentLocal.language==='en'){
            dispatch(changeLocal('ar'))
        
        
          }else{
            dispatch(changeLocal('en'))
        
        
          }
    }
  return (
    <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
    <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('profile')}>
        <Image source={{uri:items.authorization.userInfo.userOrBloger&&items.authorization.userInfo.userOrBloger.image}} style={styles.image} />
        <Text style={styles.name}>{items.authorization.userInfo.userOrBloger?items.authorization.userInfo.userOrBloger.name:""}</Text>
        <Text style={styles.email}>{items.authorization.userInfo.userOrBloger&&items.authorization.userInfo.userOrBloger.email}</Text>
    </TouchableOpacity>

    <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.settingsItem} onPress={() => {
            if (items.authorization.userInfo&&items.authorization.userInfo.intent === 'bloger') {
                navigation.navigate('BloggerRequested')

            } else {
                navigation.navigate('Requested')

            }
        }}>
            <Text style={styles.settingsItemText}>
            {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.requestedCampaigns}
            </Text>
            <TabBarIcon name={'chevron-forward-outline'} color={Colors.light.tint} size={30} />

        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('Approved')}>
            <Text style={styles.settingsItemText}>Approved campaigns </Text>
            <TabBarIcon name={'chevron-forward-outline'} color={Colors.light.tint} size={30} />

        </TouchableOpacity> */}
{/* 
        <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('Rejected')}>
            <Text style={styles.settingsItemText}>Rejected campaigns </Text>
            <TabBarIcon name={'chevron-forward-outline'} color={Colors.light.tint} size={30} />

        </TouchableOpacity> */}
        <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('BloggerPaid')}>
            <Text style={styles.settingsItemText}>
            {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.paidCampaigns}

                 </Text>
            <TabBarIcon name={'chevron-forward-outline'} color={Colors.light.tint} size={30} />

        </TouchableOpacity>


        <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('BloggerDone')}>
            <Text style={styles.settingsItemText}>
            {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.doneCampaigns} 

                 </Text>
            <TabBarIcon name={'chevron-forward-outline'} color={Colors.light.tint} size={30} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem} onPress={() => {
            if (items.authorization.userInfo&&items.authorization.userInfo.intent === 'bloger') {
                navigation.navigate('Wallet')

            } else {
                navigation.navigate('Requested')

            }
        }}>
            <Text style={styles.settingsItemText}>{items.authorization.userInfo&&items.authorization.userInfo.intent === 'bloger' ?items.lang.currentLocal.settings.Wallet : 'Payment'} </Text>
            <TabBarIcon name={'chevron-forward-outline'} color={Colors.light.tint} size={30} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem} onPress={changeLanguage}>

            <Text style={styles.settingsItemText}>
            {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.lang}    

                 </Text>
            <TabBarIcon name={'chevron-forward-outline'} color={Colors.light.tint} size={30} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem} onPress={() => {
            navigation.navigate('(auth)')
            dispatch(setuserInfo({}))

        }
        }>
            <Text style={styles.settingsItemText}>
            {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.logout}    

                 </Text>

        </TouchableOpacity>
    </ScrollView>
</View>
  )
}

export default BloggerSettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Dimensions.get('screen').height / 10,
        paddingHorizontal: 8
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 33

    },
    name: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5
    },
    email: {
        fontWeight: '500',
        fontSize: 14,

    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 22,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1
    },
    settingsItemText: {
        fontSize: 15,
        fontWeight: '500'
    }
})