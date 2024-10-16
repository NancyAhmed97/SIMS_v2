import { StyleSheet, Text, Button, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import AuthInput from '../../components/AuthInput'
import { useRoute } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import DateTimePicker from '@react-native-community/datetimepicker';

const blogersignup = () => {
    const nativation = useNavigation();
    const route = useRoute();
    const { name } = route.params
    const email = route.params.email
    const password = route.params.password
    const confirmPassword = route.params.confirmPassword
    const phone = route.params.phone
    const whatsapp = route.params.whatsapp
    const city = route.params.city
    const country = route.params.country
    const image = route.params.image
    const [address, setAddress] = useState(null);
    const [birh, setBirth] = useState(null);
    const [lang, setLang] = useState(null);
    const [status, setStatus] = useState(null);
    const [nationality, setNationality] = useState(null);
    const [career, setCareer] = useState(null);
    const [interests, setInterests] = useState([]);
    const [gender, setGender] = useState(null);
    const [selecteCategories, setSelecteCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        axios.get('http://92.113.26.138:8081/api/categories').then((res) => {

            const countryItems = res.data.map(item => ({
                label: item.name,
                value: item.name, // You can use iso3 if you prefer
            }));
            setSelecteCategories(countryItems);

        }).catch((error) => {
            Alert.alert(error.response.data.errorMessage)

        })
    }, [])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        // Format the date for display
        const formatted = currentDate.toLocaleDateString(); // Customize this format as needed
        setFormattedDate(formatted);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const handleInterests = (value) => {
        if (value !== null && value !== undefined) {
            setInterests((prevInterests) => [...prevInterests, value]);
        }
    }
    const handleNextPage = () => {
        if (!address || !date || !lang || !status || !nationality || !career || !interests || !gender) {
            Alert.alert('please Fill Full fileds')
        } else {
            nativation.navigate('blogger-sign-up-3', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                phone: phone,
                whatsapp: whatsapp,
                city: city,
                country: country,
                image: image,
                address: address,
                birh: date,
                lang: lang,
                status: status,
                nationality: nationality,
                career: career,
                interests: interests,
                gender: gender
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
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Full Address</Text>
                    <AuthInput
                        placeholder={'Full Address'}
                        inputValue={address}
                        inputFunction={(text) => setAddress(text)}
                        inputType={true}


                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Date of Birth</Text>
          
          

<TouchableOpacity onPress={() => showMode('date')}style={styles.input}>
<Text >{formattedDate?formattedDate:'Date of Birth'}</Text>
</TouchableOpacity>

                    {/* <Button title="Show Date Picker" onPress={() => showMode('date')} /> */}

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}

                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Langouage</Text>
                    {/* <AuthInput
                        placeholder={'Langouage'}
                        inputValue={lang}
                        inputFunction={(text) => setLang(text)}
                        inputType={true}


                    /> */}
                    <RNPickerSelect
                        onValueChange={(value) => setLang(value)}
                        items={[
                            { label: 'English', value: 'English' },
                            { label: 'Arabic', value: 'Arabic' },

                        ]}
                        style={pickerSelectStyles}


                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Gender</Text>
                    {/* <AuthInput
                        placeholder={'Gender'}
                        inputValue={gender}
                        inputFunction={(text) => setGender(text)}
                        inputType={true}


                        
                    /> */}
                    <RNPickerSelect
                        onValueChange={(value) => setGender(value)}
                        items={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                        ]}
                        style={pickerSelectStyles}

                    />
                </View>

                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Marital Status</Text>
                    {/* <AuthInput
                        placeholder={'Marital Status'}
                        inputValue={status}
                        inputFunction={(text) => setStatus(text)}
                        inputType={true}


                    /> */}
                    <RNPickerSelect
                        onValueChange={(value) => setStatus(value)}
                        items={[
                            { label: 'Single', value: 'single' },
                            { label: 'Married', value: 'married' },
                            { label: 'Single Mother', value: 'singleMother' },
                            { label: 'Single Fathet', value: 'singleFather' },

                        ]}
                        style={pickerSelectStyles}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Nationality</Text>
                    <AuthInput
                        placeholder={'Nationality'}
                        inputValue={nationality}
                        inputFunction={(text) => setNationality(text)}
                        inputType={true}

                    />

                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Career</Text>
                    <AuthInput
                        placeholder={'Career'}
                        inputValue={career}
                        inputFunction={(text) => setCareer(text)}
                        inputType={true}


                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Interests</Text>

                    <RNPickerSelect
                        onValueChange={handleInterests}
                        items={selecteCategories}
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
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(112, 112, 112, 1)',
        paddingHorizontal: 5,


    },

})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: '95%',
        paddingHorizontal: 5,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(112, 112, 112, 1)'
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: 'rgba(112, 112, 112, 1)',
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
        marginTop: 5,
    },

});