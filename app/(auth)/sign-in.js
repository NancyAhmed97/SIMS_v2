import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import AuthInput from '../../components/AuthInput'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import axios from 'axios';
import { base_url } from '../../constants/constants';
import { useDispatch } from 'react-redux';
import { setuserInfo } from '../../hooks/authorizationReducer';

const signIn = () => {
    const nativation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [seePassword, setSeePassword] = React.useState(false);
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Please enter all fild')
        } else {
            const user = {
                email: email,
                password: password,
            }
            axios
                .post(`${base_url}/api/signin`, user)
                .then((response) => {
                    if(response.data.intent==='user'){
                                            dispatch(setuserInfo(response.data))
                    nativation.navigate('(tabs)')

                    }else{
                                            dispatch(setuserInfo(response.data))
                    nativation.navigate('(blogerTabs)')

                    }
                    
                    // dispatch(setuserInfo(response.data))
                    // nativation.navigate('(tabs)')


                })
                .catch((error) => {
                    Alert.alert(error.response.data.errorMessage)
                })
        }


    }

    return (
        <ImageBackground
            source={require('../../assets/images/Bubbles.png')} // Replace with your image path
            style={styles.background}
        >
            <Text></Text>
            <View style={{ paddingHorizontal: 22 }}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.paragraph}>Good to see you back!</Text>
                {/* <TextInput
            style={styles.input}
            placeholder='Mobile number'
        /> */}
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Email</Text>
                    <AuthInput
                        placeholder={'Email'}
                        inputValue={email}
                        inputFunction={(text) => setEmail(text)}
                        inputType={true}

                    />
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.label}>Password</Text>
                    <View>
                        <AuthInput
                            placeholder={'Password'}
                            inputValue={password}
                            inputFunction={(text) => setPassword(text)}
                            inputType={seePassword}


                        />
                        <TouchableOpacity onPress={() => setSeePassword(!seePassword)} style={styles.eyeIcon}>
                            <TabBarIcon name={seePassword ? "eye-off-outline" : 'eye-outline'} />

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 22,alignItems:'flex-end' }}>
             <TouchableOpacity onPress={()=>nativation.navigate('forgetPassword')}>
                <Text style={{fontWeight:'bold'}}>Forget password?</Text>
             </TouchableOpacity>
                </View>
            </View>

            <View style={styles.btnsContainer}>
                <TouchableOpacity style={styles.cancel} onPress={() => nativation.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.send} onPress={handleSubmit}>
                    <Text style={styles.sendText}>Sign in
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )
}

export default signIn

const styles = StyleSheet.create({
    background: {
        flex: 1, // Ensure the background image fills the screen
        resizeMode: 'cover', // or 'stretch' if you want to stretch the image
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        paddingBottom: 50,
        backgroundColor: '#fff'

    },
    title: {
        fontWeight: '700',
        fontSize: 52,
        marginBottom: 8
    },
    paragraph: {
        color: 'rgba(32, 32, 32, 1)',
        fontWeight: '300',
        fontSize: 19,
        marginBottom: 50
    },
    input: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(112, 112, 112, 1)',
        padding: 12
    },
    send: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(90, 51, 146, 1)',
        borderRadius: 12,
        paddingVertical: 18,
        marginBottom: 12,
        width: '49%'

    },
    sendText: {
        color: '#fff'
    },
    cancel: {
        borderWidth: 2,
        borderColor: 'rgba(90, 51, 146, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 18,
        marginBottom: 12,
        width: '49%'



    },
    eyeIcon: {
        position: 'absolute',
        right: '10%',
        top: 7
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        marginBottom: 8,
        fontWeight: '500',
        fontSize: 15
    },

})