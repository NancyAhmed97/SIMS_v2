import { Alert, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { changeLocal } from '@/hooks/languageReducer';
import { useDispatch } from 'react-redux';

const welcome = () => {
    const navigation = useNavigation();
    const dispatch =useDispatch()
  useEffect(() => {
    dispatch(changeLocal('en'))

  }, [])

  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/logo-01.png')}style={styles.img} />

        </View>
        <Text style={styles.info}>Lorem Ipsum is simply dummy text and typesetting. </Text>
        <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.bloggerContainer} onPress={()=>navigation.navigate('blogger-sign-up-1')}>
            <Text style={styles.bloggerText}>Blogger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate('user-sign-up')}>
            <Text style={styles.userText}>User</Text>
          </TouchableOpacity>

        </View>
      </View>

      <TouchableOpacity style={styles.loginLink} onPress={() => {
        navigation.navigate('sign-in')
            // const url = `whatsapp://send?phone=${+201000943383}&text=${encodeURIComponent('jjhgjfj')}`;

            // Linking.canOpenURL(url)
            //   .then((supported) => {
            //     if (supported) {
            //       return Linking.openURL(url);
            //     } else {
            //       Alert.alert('WhatsApp is not installed on this device');
            //     }
            //   })
            //   .catch((err) => Alert.alert('An error occurred', err.message));
        
      }}>
        <Text style={styles.loginLinkText}>I already have an account</Text>
        <Image source={require('../../assets/images/Button.png')} />

      </TouchableOpacity>
    </View>
  )
}

export default welcome

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: Dimensions.get('window').height / 18,
      paddingBottom: Dimensions.get('window').height / 30,
      paddingHorizontal: 8,
      paddingBottom: 50,
      backgroundColor:'#fff'
  
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width:'90%'
    },
    info: {
      textAlign: 'center',
      color: 'rgba(32, 32, 32, 1)',
      fontSize: 14,
      fontWeight: '400'
    },
    btnContainer: {
      flexDirection: 'row',
      marginTop: 22,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    bloggerContainer: {
      borderWidth: 2,
      borderColor: 'rgba(90, 51, 146, 1)',
      width: '49%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 8
    },
    bloggerText: {
      color: 'rgba(90, 51, 146, 1)',
      fontSize: 16
  
    },
    userContainer: {
      borderWidth: 2,
      width: '49%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: 'rgba(90, 51, 146, 1)',
      borderColor: 'rgba(90, 51, 146, 1)'
  
    },
    userText: {
      color: '#fff',
      fontSize: 16
  
    },
    loginLink: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center'
    },
    loginLinkText: {
      marginHorizontal: 7,
      color: 'rgba(32, 32, 32, 1)',
      fontSize: 16,
      fontWeight: '400'
  
    },
    img:{
      width:'100%',
      resizeMode:'contain'
    }
  })