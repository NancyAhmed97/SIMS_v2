import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import AuthInput from '../components/AuthInput'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { base_url } from '../constants/constants'
import PhoneInput from 'react-native-international-phone-number'

const EditePasswordScreen = () => {
  const items = useSelector((state) => state);
  const [name, setName] = useState(items.authorization.userInfo.userOrBloger.name)
  const [email, setEmail] = useState(items.authorization.userInfo.userOrBloger.email)
  const [phone, setPhone] = useState(items.authorization.userInfo.userOrBloger.phone)
  const [inputValue, setInputValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleInputValue = (phoneNumber) => {
    setInputValue(phoneNumber)
}
const handleSelectedCountry = (country) => {
  setSelectedCountry(country)
  
}
  const handleSubmit = () => {

    if (!name || !email || !phone) {
      Alert.alert('Please enter all fild')
    } else {
      const user = {
        first_name: name,
        email: email,
        phone: phone
      }
      axios
        .put(`${base_url}/api/profile?user_id=${items.authorization.userInfo.userOrBloger.id}`, user, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${items.authorization.userInfo.token}`,
          },
        })
        .then((response) => {
          Alert.alert(response.data)
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
          title={items.lang.currentLocal.settings && items.lang.currentLocal.settings.editeProfile}
          />
        <View style={styles.userInfoContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 22 }}>
        <Text style={[styles.label,items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.name} :</Text>
        <AuthInput
                  placeholder={name}
                  inputValue={name}
                  inputFunction={(text) => setName(text)}
                  inputType={true}

                    />
                </View>
                <View style={{ marginBottom: 22 }}>
                <Text style={[styles.label,items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.email} :</Text>
                <View>
                        <AuthInput
                  placeholder={email}
                  inputValue={email}
                  inputFunction={(text) => setEmail(text)}
                  inputType={true}


                        />
                    </View>
                </View>
                <View style={{ marginBottom: 22 }}>
                <Text style={[styles.label,items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.phone} :</Text>
            
                            <PhoneInput
                        value={inputValue}
                        onChangePhoneNumber={handleInputValue}
                        selectedCountry={selectedCountry}
                        onChangeSelectedCountry={handleSelectedCountry}
                    />
                </View>
                        </ScrollView>

        </View>
      </View>
      <View style={styles.btnsContainer}>

        <TouchableOpacity style={styles.ChangePassword} onPress={handleSubmit}>
          <Text style={styles.ChangePasswordText}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.saveChange}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditePasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    paddingBottom: 22,
    backgroundColor:'#fff'
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 15,
    marginHorizontal:14
},
})