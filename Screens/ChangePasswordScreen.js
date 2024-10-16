import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import AuthInput from '../components/AuthInput'
import { useSelector } from 'react-redux'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import axios from 'axios'
import { base_url } from '../constants/constants'

const ChangePasswordScreen = () => {
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const items = useSelector((state) => state);

    const handleSubmit = () => {

        if (!oldPassword || !confirmPassword || !password) {
            Alert.alert('Please enter all fild')
        } else if (password !== confirmPassword) {
            Alert.alert('the password does not match')
        } else {
            const user = {
                oldPassword: oldPassword,
                newPassword: password,
                userId: items.authorization.userInfo.userOrBloger.id
            }
            axios
                .put(`${base_url}/api/password`, user, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${items.authorization.userInfo.token}`,
                    },
                })
                .then((response) => {
                    Alert.alert(response.data)
                    setPassword('')
                    setOldPassword('')
                    setConfirmPassword('')
                })
                .catch((error) => {
                    Alert.alert(error.response.data)
                })
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Header
                    title={items.lang.currentLocal.settings && items.lang.currentLocal.settings.changePassword}
                />
                <View style={styles.userInfoContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginBottom: 22 }}>
                            <Text style={[styles.label, items.lang.currentLocal.settings && items.lang.currentLocal.language === 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.currentPassword} :</Text>
                            <AuthInput
                                placeholder={'***********'}
                                inputType={showOldPassword}
                                inputValue={oldPassword}
                                inputFunction={(text) => setOldPassword(text)}

                            />
                            <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}  style={items.lang.currentLocal.language === 'ar' ?styles.eyeIcon:styles.areyeIcon}>
                                <TabBarIcon name={showOldPassword ? "eye-off-outline" : 'eye-outline'} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 22 }}>
                            <Text style={[styles.label, items.lang.currentLocal.settings && items.lang.currentLocal.language === 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.newPassword} :</Text>
                            <AuthInput
                                placeholder={'***********'}
                                inputValue={password}
                                inputFunction={(text) => setPassword(text)}
                                inputType={showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}  style={items.lang.currentLocal.language === 'ar' ?styles.eyeIcon:styles.areyeIcon}>
                                <TabBarIcon name={showPassword ? "eye-off-outline" : 'eye-outline'} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 22 }}>
                            <Text style={[styles.label, items.lang.currentLocal.settings && items.lang.currentLocal.language === 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.confirmPassword} :</Text>

                            <AuthInput
                                placeholder={'***********'}
                                inputValue={confirmPassword}
                                inputFunction={(text) => setConfirmPassword(text)}
                                inputType={showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={items.lang.currentLocal.language === 'ar' ?styles.eyeIcon:styles.areyeIcon}>
                                <TabBarIcon name={showOldPassword ? "eye-off-outline" : 'eye-outline'} />

                            </TouchableOpacity>
                        </View>
                    </ScrollView>


                </View>
            </View>
            <View style={styles.btnsContainer}>

                <TouchableOpacity style={styles.ChangePassword} onPress={handleSubmit}>
                    <Text style={styles.ChangePasswordText}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.changePassword}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        paddingBottom: 22
    },

    imageContainer: {
        marginBottom: 22,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,


    },
    image: {
        width: 200,
        height: 200
    },

    userInfoContainer: {
        marginTop: Dimensions.get('screen').height / 10
    },
    eyeIcon: {
        position: 'absolute',
        left: '5%',
        top: '45%'
    },
    areyeIcon: {
        position: 'absolute',
        right: '5%',
        top: '45%'
    },
    userInfo: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',  // Shadow color
        shadowOffset: { width: 0, height: 2 },  // Shadow offset
        shadowOpacity: 0.25,  // Shadow opacity
        shadowRadius: 3.84,  // Shadow radius
        paddingHorizontal: 12,
        paddingVertical: 22

    },

    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    editeProfile: {
        borderWidth: 2,
        borderColor: 'rgba(90, 51, 146, 1)',
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8
    },
    ChangePassword: {
        borderWidth: 1,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(90, 51, 146, 1)',
        borderColor: 'rgba(90, 51, 146, 1)'
    },
    ChangePasswordText: {
        color: '#fff',
        fontSize: 16
    },
    editeProfileText: {
        color: 'rgba(90, 51, 146, 1)',
        fontSize: 16

    },
    label: {
        marginBottom: 8,
        fontWeight: '500',
        fontSize: 15
    }
})