import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import AuthInput from '../../components/AuthInput'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { base_url } from '../../constants/constants'
import RNPickerSelect from 'react-native-picker-select';

const blogersignup = () => {
    const nativation = useNavigation();
    const route = useRoute();

     const name=route.params.name
          const email=route.params.email
      const  password=route.params.password
      const   confirmPassword=route.params.confirmPassword
      const  phone=route.params.phone
      const whatsapp=route.params.whatsapp
      const city=route.params.city
      const country=route.params.country
      const image=route.params.image
        const      address=route.params.address
         const     birh=route.params.birh
          const    lang=route.params.lang
         const     status=route.params.status
         const     nationality=route.params.nationality
         const     career=route.params.career
          const    interests=route.params.interests
           const   gender=route.params.gender
        const instaUrl=route.params.instaUrl
        const instaFollowers=route.params.instaFollowers
        const instaPosts=route.params.instaPosts
        const engagement=route.params.engagement
        const snapUrl=route.params.snapUrl
        const snapchatFollowers=route.params.snapchatFollowers
        const tiktok=route.params.tiktok
        const tiktokFollowers=route.params.tiktokFollowers

    const [youtubeUrl, setYoutubeUrl] = useState(null)
    const [youtubeFollowers, setyoutubeFollowers] = useState(null)
    const [bio, setBio] = useState(null)
    const [hijab, setHijab] = useState(null)
    const [specialization, setSpecialization] = useState(null)
    const [publicPlace, setPublicPlace] = useState(null)
    const [face, setFace] = useState(null)
    const [voice, setVoice] = useState(null)
    const [price, setPrice] = useState(0)
    const handleNextPage = () => {

   
        
        if (!voice || !face || !publicPlace || !specialization || !hijab || !bio || !youtubeUrl || !youtubeFollowers||!price) {
            Alert.alert('please Fill Full fileds')
        } else {

            const user = {
                'name': name,
                'first_name': "",
                'last_name': "",              
                'email': email,
                'password': password,
                'phone': phone,
                'whatsapp': whatsapp,
                'city': city,
                'countryOfResidence': country,
                'fullAddress': address,
                'dateOfBirth': birh,
                'language': lang,
                'maritalStatus': status,
                'nationality': nationality,
                'career': career,
                'interests': interests,
                'gender': gender,
                'instagramUrl': instaUrl,
                'instagramFollowers': Number(instaFollowers),
                'instagramPosts': instaPosts,
                'instagramEngagement': Number(engagement),
                'snapchatUrl': snapUrl,
                'snapchatFollowers': Number(snapchatFollowers),
                'tiktokUrl': tiktok,
                'tiktokFollowers': Number(tiktokFollowers),
                'wearsHijab': hijab==='true'?true:false,
                'youtubeUrl': youtubeUrl,
                'youtubeFollowers': Number(youtubeFollowers),
                'bio': bio,
                'specialization': specialization,
                'usesVoiceInContent': voice==='true'?true:false,
                'showsFaceInStories': face==='true'?true:false,
                'goesInPublicPlaces': publicPlace==='true'?true:false,
                'image': image,
                'price':Number(price)
            }
            
            axios
                .post(`${base_url}/api/signup/bloger`, user)
                .then((response) => {
                    nativation.navigate('sign-in')

                })
                .catch((error) => {
                    Alert.alert(error.response.data.detail)
                    console.log(error.response.data);
                    
                })

        }
    }
    console.log(hijab);
    
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
                    <Text style={styles.label}>Youtube Url</Text>
                    <AuthInput
                        placeholder={'Youtube Url'}
                        inputType={true}
                        inputValue={youtubeUrl}
                        inputFunction={(text) => setYoutubeUrl(text)}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Youtube Followers</Text>
                    <AuthInput
                        placeholder={'Youtube Followers'}
                        inputType={true}
                        inputValue={youtubeFollowers}
                        inputFunction={(text) => setyoutubeFollowers(text)}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Bio</Text>
                    <AuthInput
                        placeholder={'Bio'}
                        inputType={true}
                        inputValue={bio}
                        inputFunction={(text) => setBio(text)}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Specialization</Text>
                    <AuthInput
                        placeholder={'Specialization'}
                        inputType={true}
                        inputValue={specialization}
                        inputFunction={(text) => setSpecialization(text)}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Price</Text>
                    <AuthInput
                        placeholder={'Price'}
                        inputType={true}
                        inputValue={price}
                        inputFunction={(text) => setPrice(text)}

                    />
                </View>

                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Do you wear hijab ?</Text>
    
                    <RNPickerSelect
                        onValueChange={(value) => setHijab(value)
                        }
                        items={[
                            { label: 'Yes', value:'true' },
                            { label: 'No', value: 'false'},
                        ]}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Do you go in public places?</Text>
   
                    <RNPickerSelect
                        onValueChange={(value) => setPublicPlace(value)}
                        items={[
                            { label: 'Yes', value:'true' },
                            { label: 'No', value: 'false' },
                        ]}
                        style={pickerSelectStyles}

                    />

                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Do you show your face in stories?</Text>
                    {/* <AuthInput
    placeholder={'Do you show your face in stories?'}
    inputType={true}
    inputValue={face}
    inputFunction={(text) => setFace(text)}
    
    /> */}
                    <RNPickerSelect
                        onValueChange={(value) => setFace(value)}
                        items={[
                            { label: 'Yes', value:'true' },
                            { label: 'No', value: 'false' },
                        ]}
                        style={pickerSelectStyles}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                    <Text style={styles.label}>Do you use your voice in your content ?</Text>
                    {/* <AuthInput
    placeholder={'Do you use your voice in your content ?'}
                      inputType={true}
                      inputValue={voice}
                      inputFunction={(text) => setVoice(text)}

    /> */}
                    <RNPickerSelect
                        onValueChange={(value) => setVoice(value)}
                        items={[
                            { label: 'Yes', value:'true' },
                            { label: 'No', value: 'false' },
                        ]}
                        style={pickerSelectStyles}

                    />
                </View>
            </ScrollView>
            <View style={styles.btnsContainer}>
                <TouchableOpacity style={styles.cancel} onPress={() => nativation.goBack()}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.send} onPress={handleNextPage}>
                    <Text style={styles.sendText}>Create
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
    }

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
