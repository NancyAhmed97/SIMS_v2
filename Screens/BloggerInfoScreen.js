import { Alert, Linking, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useState } from 'react';
import { base_url } from '../constants/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addToFav, deleteFav, getFav } from '../hooks/favoritesReducer';
import RNPickerSelect from 'react-native-picker-select';

import { Colors } from '@/constants/Colors';
const BloggerInfoScreen = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [infodate, setInfoDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [toShow, setToShow] = useState(false);
  const [favState, setFavState] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { blogerId } = route.params
  const items = useSelector((state) => state);
  const isFav = items.favoritRducer.favouriteBlogger.some((blogger) => blogger.id === blogerId);
  const dispatch = useDispatch();

  useEffect(() => {

    const getData = () => {
      dispatch(getFav({ userID: items.authorization.userInfo.userOrBloger.id, token: items.authorization.userInfo.token }));

      axios.get(`${base_url}/api/bloger/${blogerId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${items.authorization.userInfo.token}`,
          },
        }
      ).then(response => {

        setInfoDate(response.data);

        setLoading(false);


      })
        .catch(error => {
          setLoading(false);

          Alert.alert(error.response.data.errorMessage)


        })

    }
    getData()
  }, [blogerId]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const onToChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setToShow(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  const showToDatePicker = () => {
    setToShow(true);
  };

  const SendCompain = () => {
    const compaincvc = {
      "campaignDescription": desc,
      "campaignType": type,
      "from": date,
      "to": toDate,
      "blogerStatus": "",
      "clientStatus": "",
      "blogerId": blogerId,
      "clientId": items.authorization.userInfo.userOrBloger.id,
      "adminApprovalClient": false,
      "content": "",
      "campaignUrl": "",
      "adminApprovalBloger": false
    }


    axios.post('http://92.113.26.138:8081/api/campaign/request/to-admin', compaincvc, {
      headers: {
        'Authorization': `Bearer ${items.authorization.userInfo.token}`,
        'Content-Type': 'application/json'
      }

    })
      .then(function (response) {
        Alert.alert(response.data.statusMsg);
        setShowModel(false)
        setType('')
        setDesc('')
        setDate('')
        setToDate('')
      })
      .catch(function (error) {
        Alert.alert(error.response.data.errorMessage)
        console.log(error);

      });

  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="rgba(90, 51, 146, 1)" />
      </View>
    );
  }
  return (
    <View style={[items.lang.currentLocal.language == 'ar' && { direction: 'rtl' }, styles.container]}>
      <View>
        <Header
          title={infodate.name}
        />

        <ScrollView showsVerticalScrollIndicator={false} style={{ height: Dimensions.get('screen').height - 270 }}>
          <Image source={{ uri: infodate.image }} style={styles.image} />
          <View style={styles.info_container}>
            <Text style={styles.name}>{infodate.name}</Text>
            <Text style={styles.price}>{infodate.price} $</Text>
          </View>

          <View>
            <Text style={styles.bio}>{infodate.bio}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={[styles.name,items.lang.currentLocal.language == 'ar' ?{marginBottom:22,alignSelf:'flex-start'} :{ marginBottom: 22 }]}>{items.lang.currentLocal.bloggerrInfo.socialMedia}</Text>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <TouchableOpacity
                  style={styles.socialMediaContainer}
                  onPress={async () => {
                    const instagramUrl = infodate.instagramUrl;

                    const supported = await Linking.canOpenURL(instagramUrl);
                    if (supported) {
                      await Linking.openURL(instagramUrl);
                    } else {
                      // Fallback to web URL if the app isn't installed
                      await Linking.openURL('https://www.instagram.com/your_username');
                    }
                  }}
                >
                  <TabBarIcon name={'logo-instagram'} color={'rgba(90, 51, 146, 1)'} size={33} />
                  <Text style={styles.followers}>{infodate.instagramFollowers} {items.lang.currentLocal.bloggerrInfo.followes} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialMediaContainer}
                  onPress={async () => {
                    const snapchatUrl = infodate.snapchatUrl;

                    const supported = await Linking.canOpenURL(snapchatUrl);
                    if (supported) {
                      await Linking.openURL(snapchatUrl);
                    } else {
                      // Fallback to web URL if the app isn't installed
                      await Linking.openURL('https://www.snapchat.com/add/your_username');
                    }
                  }}
                >
                  <TabBarIcon name={'logo-snapchat'} color={'rgba(90, 51, 146, 1)'} size={33} />
                  <Text style={styles.followers}>{infodate.snapchatFollowers} {items.lang.currentLocal.bloggerrInfo.followes} </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.socialMediaContainer}
                  onPress={async () => {
                    const snapchatUrl = infodate.tiktokUrl;

                    const supported = await Linking.canOpenURL(snapchatUrl);
                    if (supported) {
                      await Linking.openURL(snapchatUrl);
                    } else {
                      // Fallback to web URL if the app isn't installed
                      await Linking.openURL('https://www.tiktok.com/add/your_username');
                    }
                  }}
                >
                  <TabBarIcon name={'logo-tiktok'} color={'rgba(90, 51, 146, 1)'} size={33} />
                  <Text style={styles.followers}>{infodate.tiktokFollowers} {items.lang.currentLocal.bloggerrInfo.followes} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialMediaContainer}
                  onPress={async () => {
                    const snapchatUrl = infodate.youtubeUrl;

                    const supported = await Linking.canOpenURL(snapchatUrl);
                    if (supported) {
                      await Linking.openURL(snapchatUrl);
                    } else {
                      // Fallback to web URL if the app isn't installed
                      await Linking.openURL('https://www.tiktok.com/add/your_username');
                    }
                  }}
                >
                  <TabBarIcon name={'logo-youtube'} color={'rgba(90, 51, 146, 1)'} size={33} />
                  <Text style={styles.followers}>{infodate.youtubeFollowers} {items.lang.currentLocal.bloggerrInfo.followes} </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={{
              flexDirection: 'row', alignItems: 'center', marginBottom: 12
            }}>
              <Text style={styles.title}>{items.lang.currentLocal.bloggerrInfo.Career}  :</Text>
              <Text style={styles.value}>{infodate.career}</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.title}>{items.lang.currentLocal.bloggerrInfo.specializations}  :</Text>
              <Text style={styles.value}>{infodate.specialization}</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.title}>{items.lang.currentLocal.bloggerrInfo.date} :</Text>
              <Text style={styles.value}>{infodate.dateOfBirth.slice(0, 10)}</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.title}>{items.lang.currentLocal.bloggerrInfo.language}  :</Text>
              <Text style={styles.value}>{infodate.language}</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.title}>{items.lang.currentLocal.bloggerrInfo.gender}  :</Text>
              <Text style={styles.value}>{infodate.gender}</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.title}>{items.lang.currentLocal.bloggerrInfo.maritalStatus}  :</Text>
              <Text style={styles.value}>{infodate.maritalStatus}</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.title}>{items.lang.currentLocal.bloggerrInfo.nationality} :</Text>
              <Text style={styles.value}>{infodate.nationality}</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.title}>{items.lang.currentLocal.bloggerrInfo.interests} :</Text>
              {infodate.interests.map((item) => {
                return (
                  <Text style={styles.value}>{item} </Text>

                )
              })}

            </View>
          </View>
          <View style={styles.sectionContainer}>

            <View style={{
              flexDirection: 'row', alignItems: 'center', marginBottom: 12
            }}>
              <Text style={styles.value}>I {infodate.showsFaceInStories ? 'can' : 'can not'} show My Face In Stories</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.value}>I {infodate.usesVoiceInContent ? 'can' : 'can not'} Use My Voice</Text>

            </View>
            <View style={{
              flexDirection: 'row', alignItems: 'center',
              marginBottom: 12
            }}>
              <Text style={styles.value}>I {infodate.wearsHijab ? 'Wear' : 'Wear not'} Hijab</Text>

            </View>


          </View>
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>

        {isFav ?
          <TouchableOpacity style={styles.favContainer} onPress={() => dispatch(deleteFav({ userID: items.authorization.userInfo.userOrBloger.id, bloggerID: blogerId, token: items.authorization.userInfo.token }))}>
            <TabBarIcon name={'heart'} color={Colors.light.tint} size={33} />


          </TouchableOpacity>

          :
          <TouchableOpacity style={styles.favContainer} onPress={() => dispatch(addToFav({ userID: items.authorization.userInfo.userOrBloger.id, bloggerID: blogerId, token: items.authorization.userInfo.token }))}>
            <TabBarIcon name={'heart-outline'} color={Colors.light.tint} size={33} />


          </TouchableOpacity>


        }

        <TouchableOpacity style={styles.send} onPress={() => setShowModel(true)}>
          <Text style={styles.sendText}>{items.lang.currentLocal.bloggerrInfo.Request}
          </Text>
        </TouchableOpacity>
        {
          showModel &&
          <View style={styles.modalContainer}>
            <ScrollView>
              <TouchableOpacity onPress={() => setShowModel(false)} style={styles.close}>
                <TabBarIcon name={'close'} size={33} />

              </TouchableOpacity>
              <View>
                <View>
                  <Text style={[styles.label, items.lang.currentLocal.settings && items.lang.currentLocal.language === 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.bloggerrInfo.type}</Text>

                  <RNPickerSelect
                    onValueChange={(value) => setType(value)}
                    items={[
                      { label:items.lang.currentLocal.bloggerrInfo.gift, value: 'Gift' },
                      { label:items.lang.currentLocal.bloggerrInfo.visit, value: 'Vist' },
                    ]}
                    style={pickerSelectStyles}

                  />

                </View>
                <View>
                  <Text style={[styles.label, items.lang.currentLocal.settings && items.lang.currentLocal.language === 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.bloggerrInfo.description}</Text>
                  <TextInput
                    placeholder='campaign Description'
                    value={desc}
                    onChangeText={(text) => setDesc(text)}
                    style={styles.input}
                  />
                </View>
                <View>
                  <View>

                    <Text style={[styles.label, items.lang.currentLocal.settings && items.lang.currentLocal.language === 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.bloggerrInfo.From}</Text></View>
                  <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                    <Text style={styles.inputText}>
                      {date ? date.toLocaleDateString() : 'Select Date'}
                    </Text>
                  </TouchableOpacity>

                  {/* Show Date Picker */}
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onChange}
                    />
                  )}


                  <View>
                    <Text style={[styles.label, items.lang.currentLocal.settings && items.lang.currentLocal.language === 'ar' && { alignSelf: 'flex-start' }]}>{items.lang.currentLocal.bloggerrInfo.To}</Text>
                    <TouchableOpacity style={styles.input} onPress={showToDatePicker}>
                      <Text style={styles.inputText}>
                        {toDate ? toDate.toLocaleDateString() : 'Select Date'}
                      </Text>
                    </TouchableOpacity>

                    {toShow && (
                      <DateTimePicker
                        value={toDate}
                        mode="date"
                        display="default"
                        onChange={onToChange}
                      />
                    )}
                  </View>

                </View>

              </View>

            </ScrollView>
            <TouchableOpacity style={[styles.send, {
              width: '99%',
              marginTop: 22
            }]} onPress={SendCompain}>
              <Text style={styles.sendText}>{items.lang.currentLocal.bloggerrInfo.Request}
              </Text>
            </TouchableOpacity>

          </View>
        }
      </View>
    </View>
  )
}

export default BloggerInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: Dimensions.get('screen').height / 2,

  },
  imageContainer: {
    width: '100%',
    marginBottom: 12
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 241, 243, 0.46)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 22,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,

  },
  name: {
    fontSize: 16,
    fontWeight: '500'
  },
  price: {
    fontSize: 16,
    fontWeight: '700'

  },
  socialMediaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 12,
    marginTop: 7,
    height: Dimensions.get('screen').height / 10,
    marginBottom: 22
  },
  dateContainer: {
    flexDirection: 'row'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Dimensions.get('window').height / 80,
    alignItems: 'center',
    paddingHorizontal: 12,

  },
  send: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(90, 51, 146, 1)',
    borderRadius: 12,
    paddingVertical: 18,
    marginBottom: 12,
    width: '75%'
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
  info_container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,

  },
  name: {
    fontSize: 20,
    fontWeight: '700'
  },
  bio: {
    fontSize: 14,
    color: '#222222',
    marginVertical: Dimensions.get('screen').height / 75,
    paddingHorizontal: 8,

  },
  sectionContainer: {
    borderTopColor: '#e5e5e5',
    borderTopWidth: 5,
    paddingHorizontal: 8,
    // borderBottomColor: '#e5e5e5',
    // borderBottomWidth: 5,
    marginVertical: 8,
    paddingVertical: 12
  },
  modalContainer: {
    position: 'absolute',
    bottom: '0%',
    height: Dimensions.get('screen').height / 1.5,
    backgroundColor: '#fff',
    left: '0%',
    right: '0%',
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    padding: 12,
    borderRadius: 10,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5, // Negative height for shadow above
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    // Android elevation
    elevation: 5,

  },
  close: {
    alignItems: 'flex-end'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 22
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
  dateInput: {
    width: '95%',
    paddingHorizontal: 5,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 1)'

  },
  socialMediaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22
  },
  followers: {
    fontWeight: '600',
    marginHorizontal: 12,
    fontSize: 14
  },
  title: {
    fontWeight: '600',
    marginRight: 8,
    fontSize: 14

  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    width: '95%',
    paddingHorizontal: 5,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 1)'

  },
  inputAndroid: {
    width: '95%',
    paddingHorizontal: 5,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(112, 112, 112, 1)'
  },
});