import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import AuthInput from '../../components/AuthInput'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import axios from 'axios';
import { base_url } from '../../constants/constants';
import PhoneInput from 'react-native-international-phone-number';
import RNPickerSelect from 'react-native-picker-select';

const usersignup = () => {
    const nativation = useNavigation()
    const [selected, setSelected] = React.useState('+91');
    const [country, setCountry] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [name, setName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [seePassword, setSeePassword] = React.useState(false);
    const [seeConfirmPassword, setConfirmSeePassword] = React.useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selecteCountry, setSelecteCountry] = useState([]);

useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries').then((res) => {

        const countryItems = res.data.data.map(item => ({
            label: item.country,
            value: item.country, // You can use iso3 if you prefer
        }));
        setSelecteCountry(countryItems);

    }).catch((error) => {
    })
}, [])
    const handleSubmit = async () => {
        
        if (!name || !userName || !email || !password || !confirmPassword || !inputValue || !country) {
            Alert.alert('Please enter all fild')
        } else if (password !== confirmPassword) {
            Alert.alert('the password does not match')
        } else {
            const user = {
                email: email,
                password: password,
                fullname: name,
                username: userName,
                country: country,
                phone: selectedCountry.callingCode+inputValue,
            }
            axios
                .post(`${base_url}/api/signup/user`, user)
                .then((response) => {
                    nativation.navigate('sign-in')

                })
                .catch((error) => {
                   Alert.alert(error.response.data)
                })
        }


    }
    const handleSelectedCountry = (country) => {
        setSelectedCountry(country)
        
    }
    const handleInputValue = (phoneNumber) => {
        setInputValue(phoneNumber)
    }
    return (
        <ImageBackground
            source={require('../../assets/images/Bubbles.png')} // Replace with your image path
            style={styles.background}
        >
            <Text style={styles.title}>Create
                Account</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Full Name</Text>
                    <AuthInput
                        placeholder={'Full Name'}
                        inputValue={name}
                        inputFunction={(text) => setName(text)}
                        inputType={true}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>User Name</Text>
                    <AuthInput
                        placeholder={'User Name'}
                        inputValue={userName}
                        inputFunction={(text) => setUserName(text)}
                        inputType={true}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Email</Text>
                    <AuthInput
                        placeholder={'Email'}
                        inputValue={email}
                        inputFunction={(text) => setEmail(text)}
                        inputType={true}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
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
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <View>
                        <AuthInput
                            placeholder={'Confirm Password'}
                            inputValue={confirmPassword}
                            inputFunction={(text) => setConfirmPassword(text)}
                            inputType={seeConfirmPassword}


                        />
                        <TouchableOpacity onPress={() => setConfirmSeePassword(!seeConfirmPassword)} style={styles.eyeIcon}>
                            <TabBarIcon name={seeConfirmPassword ? "eye-off-outline" : 'eye-outline'} />

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Phone Number</Text>
            
                            <PhoneInput
                        value={inputValue}
                        onChangePhoneNumber={handleInputValue}
                        selectedCountry={selectedCountry}
                        onChangeSelectedCountry={handleSelectedCountry}
                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Country</Text>
                    {/* <AuthInput
                        placeholder={'Country'}
                        inputValue={country}
                        inputFunction={(text) => setCountry(text)}
                        inputType={true}

                    /> */}
                             <RNPickerSelect
                        onValueChange={(value)=>setCountry(value)
                        }
                        items={selecteCountry}
                        style={pickerSelectStyles}

                    />
                </View>
            </ScrollView>

            <View style={styles.btnsContainer}>
                <TouchableOpacity style={styles.cancel} onPress={() => nativation.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.send} onPress={handleSubmit}>
                    <Text style={styles.sendText}>Create
                    </Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
}

export default usersignup

const styles = StyleSheet.create({
    background: {
        flex: 1, // Ensure the background image fills the screen
        resizeMode: 'cover', // or 'stretch' if you want to stretch the image
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        paddingBottom: 50,
        backgroundColor: '#fff',
        paddingTop: 50

    },
    title: {
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 22,
    },

    label: {
        marginBottom: 8,
        fontWeight: '500',
        fontSize: 15
    },
    send: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(90, 51, 146, 1)',
        borderRadius: 12,
        paddingVertical: 12,
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
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    eyeIcon: {
        position: 'absolute',
        right: '10%',
        top: 7
    }

});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      color: 'black',
      marginTop: 5,
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      color: 'black',
      marginTop: 5,
    },
  });