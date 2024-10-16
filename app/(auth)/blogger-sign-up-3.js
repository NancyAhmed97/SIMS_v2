import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import AuthInput from '../../components/AuthInput'
import { useRoute } from '@react-navigation/native'

const blogersignup = () => {
    const nativation=useNavigation();
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
    const [instaUrl, setInstaUrl] = useState(null)
    const [instaFollowers, setInstaFollowers] = useState(null)
    const [instaPosts, setInstaPosts] = useState(null)
    const [engagement, setEngagement] = useState(null)
    const [snapUrl, setsnapUrl] = useState(null)
    const [snapchatFollowers, setSnapchatFollowers] = useState(null)
    const [tiktok, setTiktok] = useState(null)
    const [tiktokFollowers, setTiktokFollowers] = useState(null)
    const handleNextPage=()=>{
        if(!instaUrl||!instaFollowers||!instaPosts||!engagement||!snapUrl||!snapchatFollowers||!tiktok||!tiktokFollowers){
            Alert.alert('please Fill Full fileds')
        }else{
            nativation.navigate('blogger-sign-up-4',{
                name:name,
                email:email,
                password:password,
                confirmPassword:confirmPassword,
                phone:phone,
                whatsapp:whatsapp,
                city:city,
                country:country,
                address:address,
                image:image,
                birh:birh,
                lang:lang,
                status:status,
                nationality:nationality,
                career:career,
                interests:interests,
                gender:gender,
                instaUrl:instaUrl,
                instaFollowers:instaFollowers,
                instaPosts:instaPosts,
                engagement:engagement,
                snapUrl:snapUrl,
                snapchatFollowers:snapchatFollowers,
                tiktok:tiktok,
                tiktokFollowers:tiktokFollowers
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
<View style={{marginBottom:22}}>
    <Text style={styles.label}>Instagram Url </Text>
    <AuthInput
    placeholder={'Instagram Url '}
    inputValue={instaUrl}
    inputFunction={(text) => setInstaUrl(text)}
    inputType={true}

    
    />
</View>
<View style={{marginBottom:22}}>
    <Text style={styles.label}>Followers</Text>
    <AuthInput
    placeholder={'Followers'}
    inputValue={instaFollowers}
    inputFunction={(text) => setInstaFollowers(text)}
    inputType={true}

    
    />
</View>
<View style={{marginBottom:22}}>
    <Text style={styles.label}>Posts</Text>
    <AuthInput
    placeholder={'Posts'}
    inputValue={instaPosts}
    inputFunction={(text) => setInstaPosts(text)}
    inputType={true}

    
    />
</View>
<View style={{marginBottom:22}}>
    <Text style={styles.label}>Engagement</Text>
    <AuthInput
    placeholder={'Engagement'}
    inputValue={engagement}
    inputFunction={(text) => setEngagement(text)}
    inputType={true}

    
    />
</View>

<View style={{marginBottom:22}}>
    <Text style={styles.label}>Snapchat Url</Text>
    <AuthInput
    placeholder={'Snapchat Url'}
    inputValue={snapUrl}
    inputFunction={(text) => setsnapUrl(text)}
    inputType={true}

    
    />
</View>
<View style={{marginBottom:22}}>
    <Text style={styles.label}>Snapchat Followers</Text>
    <AuthInput
    placeholder={'Snapchat Followers'}
    inputValue={snapchatFollowers}
    inputFunction={(text) => setSnapchatFollowers(text)}
    inputType={true}

    />

</View>
<View style={{marginBottom:22}}>
    <Text style={styles.label}>Tiktok Url</Text>
    <AuthInput
    placeholder={'Tiktok Url'}
    inputValue={tiktok}
    inputFunction={(text) => setTiktok(text)}
    inputType={true}

    
    />
</View>
<View style={{marginBottom:22}}>
    <Text style={styles.label}>Tiktok Followers</Text>
    <AuthInput
    placeholder={'Tiktok Followers'}
    inputValue={tiktokFollowers}
    inputFunction={(text) => setTiktokFollowers(text)}
    inputType={true}

    
    />
</View>
</ScrollView>
<View style={styles.btnsContainer}>
                <TouchableOpacity style={styles.cancel} onPress={()=>nativation.goBack()}>
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
        paddingTop:50

    },
    title: {
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 22,
    },

    label:{
        marginBottom:8,
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
        width:'49%'
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
        width:'49%'



    },
    btnsContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    }

})