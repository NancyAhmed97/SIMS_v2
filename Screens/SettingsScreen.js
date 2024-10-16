import { Dimensions, I18nManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { setuserInfo } from '../hooks/authorizationReducer';
import { changeLocal } from '@/hooks/languageReducer';
import { CommonActions } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const items = useSelector((state) => state);
    const dispatch=useDispatch();

const changeLanguage=()=>{
    if(items.lang.currentLocal.language==='en'){
        dispatch(changeLocal('ar'))
   
      }else{
        dispatch(changeLocal('en'))

    
      }
}
 
    useEffect(() => {
    if(items.lang.currentLocal.language == 'ar'){
        I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
    }
    }, [items.lang.currentLocal.language])
    return (
        <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
            <TouchableOpacity style={[items.lang.currentLocal.language == 'ar' &&{alignSelf:'flex-start'},styles.profileContainer]} onPress={() => navigation.navigate('profile')}>
<View>
<Text style={[items.lang.currentLocal.language == 'ar' &&{alignSelf:'flex-start'},styles.name]}>{items.authorization.userInfo.userOrBloger?items.authorization.userInfo.userOrBloger.name:""}</Text>
                <Text style={styles.email}>{items.authorization.userInfo.userOrBloger&&items.authorization.userInfo.userOrBloger.email}</Text>

</View>
                <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />

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
                    <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('Approved')}>
                    <Text style={styles.settingsItemText}>
                    {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.approvedCampaigns}

                     </Text>
                                        <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />


                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('Rejected')}>
                    <Text style={styles.settingsItemText}>
                    {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.rejectedCampaigns}

                         </Text>
                                        <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />


                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('paid')}>
                    <Text style={styles.settingsItemText}>
                    {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.paidCampaigns}

                         </Text>
                                        <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />


                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('live')}>
                    <Text style={styles.settingsItemText}>
                    {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.liveCampaigns}
                         </Text>
                                        <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />


                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('done')}>
                    <Text style={styles.settingsItemText}>
                        {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.doneCampaigns} 
                        </Text>
                                        <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />


                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.settingsItem} onPress={() => {
                    if (items.authorization.userInfo&&items.authorization.userInfo.intent === 'bloger') {
                        navigation.navigate('Wallet')

                    } else {
                        navigation.navigate('Requested')

                    }
                }}>
                    <Text style={styles.settingsItemText}>{items.authorization.userInfo&&items.authorization.userInfo.intent === 'bloger' ? 'Wallet' : 'Payment'} </Text>
                                        <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />


                </TouchableOpacity> */}
                <TouchableOpacity style={styles.settingsItem} onPress={changeLanguage}>

                    <Text style={styles.settingsItemText}>
                    {items.lang.currentLocal.settings&&items.lang.currentLocal.settings.lang}    

                         </Text>
                                        <TabBarIcon name={items.lang.currentLocal.language == 'ar'?'chevron-back-outline':'chevron-forward-outline'} color={Colors.light.tint} size={30} />


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

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Dimensions.get('screen').height / 10,
        paddingHorizontal: 8,
        backgroundColor:'#fff'

    },
    profileContainer: {
        marginBottom: 33,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'

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