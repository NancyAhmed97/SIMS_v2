import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, Alert, Button, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import AuthInput from '../../components/AuthInput'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import PhoneInput from 'react-native-international-phone-number';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'

const blogersignup = () => {
    const nativation = useNavigation();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [phone, setPhone] = useState(null);
    const [whatsapp, setWhatsapp] = useState(null);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountryWhats, setSelectedCountryWhats] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [inputValueWhats, setInputValueWhats] = useState('');
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirmPassword, setConfirmSeePassword] = useState(false);
    const [selecteCountry, setSelecteCountry] = useState([]);
    const [selecteCity, setSelecteCity] = useState('');


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
    const handleCity = (value) => {
        setCountry(value);
        axios.post('https://countriesnow.space/api/v0.1/countries/states', {
            "country": value

        }).then((res) => {
            const cityItems = res.data.data.states.map(item => ({
                label: item.name,
                value: item.name, // You can use iso3 if you prefer
            }));
            setSelecteCity(cityItems)
        }).catch((error)=>{

        })
    }
    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
            Alert.alert('Permission Required', 'We need camera and media library permissions to make this work!');
        }
    };

    const handleImagePicker = async () => {
        await requestPermissions();

        Alert.alert(
            "Select Image Source",
            "Choose an option to pick an image:",
            [
                {
                    text: "Gallery",
                    onPress: pickImageFromGallery,
                },
                {
                    text: "Camera",
                    onPress: takePhotoWithCamera,
                },
                { text: "Cancel", style: "cancel" },
            ]
        );
    };

    const pickImageFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhotoWithCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSelectedCountry = (country) => {
        setSelectedCountry(country)
        
    }
    const handleInputValue = (phoneNumber) => {
        setInputValue(phoneNumber)
    }
    const handleSelectedCountryWhats = (country) => {
        setSelectedCountryWhats(country)
    }
    const handleInputValueWhats = (phoneNumber) => {
        setInputValueWhats(phoneNumber)
    }

    const handleNextPage = () => {
        
        if (!name || !email || !password || !confirmPassword || !inputValue || !inputValueWhats || !country || !city || !image) {
            Alert.alert('please Fill Full fileds')
        } else if (password !== confirmPassword) {
            Alert.alert('password doesnot match')
        } else {
            nativation.navigate('blogger-sign-up-2', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                phone: selectedCountry.callingCode+ inputValue,
                whatsapp: selectedCountryWhats.callingCode+ inputValueWhats,
                city: city,
                country: country,
                image: image
            })
        }
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
                <View>
                    <View style={styles.imgContainer}>
                        {image ? <Image source={{ uri: image }} style={styles.image} />

                            :
                            <TouchableOpacity onPress={handleImagePicker} >
                                <Image source={require('../../assets/images/Screenshot_2.png')} style={styles.image} />
                            </TouchableOpacity>

                        }
                    </View>

                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Full Name</Text>
                    <AuthInput
                        placeholder={'Full Name'}
                        inputType={true}
                        inputValue={name}
                        inputFunction={(text) => setName(text)}
                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Email</Text>
                    <AuthInput
                        placeholder={'Email'}
                        inputType={true}
                        inputValue={email}
                        inputFunction={(text) => setEmail(text)}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Password</Text>
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
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Confirm Password</Text>
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

                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Phone Number</Text>
                    {/* <AuthInput
                        placeholder={'Phone Number'}
                        inputType={true}
                        inputValue={phone}
                        inputFunction={(text) => setPhone(text)}
                        
                    /> */}
                    <PhoneInput
                        value={inputValue}
                        onChangePhoneNumber={handleInputValue}
                        selectedCountry={selectedCountry}
                        onChangeSelectedCountry={handleSelectedCountry}
                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>WhatsApp</Text>
                    {/* <AuthInput
                        placeholder={'WhatsApp'}
                        inputType={true}
                        inputValue={whatsapp}
                        inputFunction={(text) => setWhatsapp(text)}
                        
                    /> */}
                    <PhoneInput
                        value={inputValueWhats}
                        onChangePhoneNumber={handleInputValueWhats}
                        selectedCountry={selectedCountryWhats}
                        onChangeSelectedCountry={handleSelectedCountryWhats}
                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Country</Text>
             
                    <RNPickerSelect
                        onValueChange={handleCity}
                        items={selecteCountry}
                        style={pickerSelectStyles}
                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>City</Text>
                    {/* <AuthInput
                        placeholder={'City'}
                        inputType={true}
                        inputValue={city}
                        inputFunction={(text) => setCity(text)}
                        
                    /> */}
                    <RNPickerSelect
                        onValueChange={(value) => setCity(value)}
                        items={selecteCity}
                        style={pickerSelectStyles}

                    />
                </View>
            </ScrollView>

            <View style={styles.btnsContainer}>
                <TouchableOpacity style={styles.cancel} onPress={() => nativation.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.send} onPress={handleNextPage}>
                    <Text style={styles.sendText}>Next
                    </Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
}

export default blogersignup

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
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 50
    },
    eyeIcon: {
        position: 'absolute',
        right: '10%',
        top: 33
    },
    input: {
        width: '95%',
        paddingHorizontal: 5,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(112, 112, 112, 1)'
    },
    

})
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
  