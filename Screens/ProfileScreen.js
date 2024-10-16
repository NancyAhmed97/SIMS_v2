import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const items = useSelector((state) => state);
  console.log(items.lang.currentLocal.settings &&items.lang.currentLocal.language);

  return (
    <View style={styles.container}>
      <View>
        <Header
          title={items.lang.currentLocal.settings && items.lang.currentLocal.settings.profile}

        />
        <View style={styles.userInfoContainer}>
   
          <ScrollView>
            <View style={{ marginBottom: 22 }}>
            <Text style={[styles.label,items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.name} :</Text>
            <View style={styles.value}>
                <Text style={items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}}>{items.authorization.userInfo.userOrBloger.name}</Text>

              </View>
      
            </View>
            <View style={{ marginBottom: 22 }}>
            <Text style={[styles.label,items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.email} :</Text>
            <View style={styles.value}>
                <Text style={items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}}>{items.authorization.userInfo.userOrBloger.email}</Text>

              </View>
            </View>
            <View style={{ marginBottom: 22 }}>
              <Text style={[styles.label,items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}]}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.phone} :</Text>
              <View style={styles.value}>
                <Text style={items.lang.currentLocal.settings &&items.lang.currentLocal.language==='ar'&&{alignSelf:'flex-start'}}>{items.authorization.userInfo.userOrBloger.phone}</Text>

              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity style={styles.editeProfile} onPress={() => navigation.navigate('editeProfile')}>
          <Text style={styles.editeProfileText}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.editeProfile}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ChangePassword} onPress={() => navigation.navigate('changePassword')}>
          <Text style={styles.ChangePasswordText}>{items.lang.currentLocal.settings && items.lang.currentLocal.settings.changePassword}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    paddingBottom: 22,
    backgroundColor: '#fff'
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
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
    justifyContent: 'space-between'
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
    width: '49%',
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
  },
  value: {
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
    marginBottom: 7,
    paddingBottom: 7
  }
})