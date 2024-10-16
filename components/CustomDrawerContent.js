import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setcuntry, setType,setAge,setlowerPrice,setHeighererPrice } from '../hooks/FilterationRedux';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

const CustomDrawerContent = () => {
    const [nationality, setNationality] = useState('')
    const [gander, setGender] = useState('')
    const [price, setPrice] = useState(0)
    const [cat, setCat] = useState('')
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [activeCountry, setActiveCountry] = useState(100);
    const [activeGender, setActiveGender] = useState('');
    const items = useSelector((state) => state);
    const [data, setData] = useState([]);
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [ageState, setAgeState] = useState(0)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    useEffect(() => {
        const getdata = () => {
            axios.get(`http://92.113.26.138:8081/api/bloger/min-max-price`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${items.authorization.userInfo.token}`,
                    },
                }
            ).then(response => {
                setData(response.data);
                setFromValue(response.data[0])
                setToValue(response.data[1])

            })
                .catch(error => {
                    Alert.alert(error.response.data.errorMessage)
                })
        }
        getdata()

    }, [])
    console.log(fromValue);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
                >
                    <TabBarIcon name={'close-outline'} color={Colors.light.tint} size={30} />

                </TouchableOpacity>
                <Text style={styles.title}>Filter</Text>
                <View></View>
            </View>
            <ScrollView>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity style={items.filteration.cuntry == 'EG' ? styles.activeCountryContainer : styles.catContainer}
                        onPress={() => {
                            dispatch(setcuntry('EG'))
                            setActiveCountry('EG')
                        }}
                    >
                        <Text style={styles.cat}>Egypt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={items.filteration.cuntry == 'ar' ? styles.activeCountryContainer : styles.catContainer} onPress={() => setActiveCountry('ar')}>
                        <Text style={styles.cat}>United Arab Emirates </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={items.filteration.cuntry == 'sa' ? styles.activeCountryContainer : styles.catContainer} onPress={() => setActiveCountry('sa')}>
                        <Text style={styles.cat}>saudi arabia</Text>
                    </TouchableOpacity>

                </View>


                <View style={styles.sectionContainer1}>
                    <TouchableOpacity style={items.filteration.type == 'male' ? styles.activeCountryContainer : styles.catContainer} onPress={() => {
                        setActiveGender('male')
                    }}>
                        <Text style={styles.gender}>Male</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={items.filteration.type == 'female' ? styles.activeCountryContainer : styles.catContainer} onPress={() => {
                        setActiveGender('female')

                    }}>
                        <Text style={styles.gender}>Female</Text>

                    </TouchableOpacity>

                </View>
                <View style={styles.sectionContainer2}>
                    <View style={styles.section2}>
                        <TouchableOpacity onPress={()=>setAgeState('10')}style={ageState=='10'?styles.activeageContainer:styles.ageContainer}>
                            <Text style={styles.age}>10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>setAgeState('20')}style={ageState=='20'?styles.activeageContainer:styles.ageContainer}>
                            <Text style={styles.age}>20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>setAgeState('30')}style={ageState=='30'?styles.activeageContainer:styles.ageContainer}>
                            <Text style={styles.age}>30</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>setAgeState('40')}style={ageState=='40'?styles.activeageContainer:styles.ageContainer}>
                            <Text style={styles.age}>40</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>setAgeState('50')}style={ageState=='50'?styles.activeageContainer:styles.ageContainer}>
                            <Text style={styles.age}>50</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>setAgeState('60')}style={ageState=='60'?styles.activeageContainer:styles.ageContainer}>
                            <Text style={styles.age}>60</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>setAgeState('70')}style={ageState=='70'?styles.activeageContainer:styles.ageContainer}>
                            <Text style={styles.age}>70</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>setAgeState('80')}style={ageState=='80'?styles.activeageContainer:styles.ageContainer}>
                            <Text style={styles.age}>80</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>setAgeState('90')}style={ageState=='90'?styles.activeAgeContainer:styles.ageContainer}>
                            <Text style={styles.age}>90</Text>
                        </TouchableOpacity>
           
                    </View>



                </View>
                {/* <View style={[styles.sectionContainer, { flexDirection: 'column', flexWrap: 'nowrap' }]}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${fromValue}</Text>
                        <Text style={styles.price}>-</Text>
                        <Text style={styles.price}>${toValue}</Text>
                    </View>
                    <RangeSlider
                        min={0} max={200}
                        fromValueOnChange={value => {
                            dispatch(setlowerPrice(value))
                            setFromValue(value)
                        }}
                        toValueOnChange={value => {
                            dispatch(setHeighererPrice(value))
                            setToValue(value)
                        }}
                    />

                </View> */}

            </ScrollView>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.clearBtn} onPress={() => {
                    dispatch(setcuntry(''))
                    dispatch(setType(''))
                    navigation.dispatch(DrawerActions.closeDrawer())
                }}>
                    <Text >Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneBtn} onPress={()=>{
                    if(activeGender){
                        dispatch(setType(activeGender))

                    }else if(activeCountry){
                        dispatch(setcuntry(activeCountry))

                    }else if(ageState){
                        dispatch(setAge(ageState))
                    }
                                        navigation.dispatch(DrawerActions.closeDrawer())
                    
                }}>
                    <Text>Done</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    container: {
        paddingTop: Dimensions.get('screen').height / 15,
        paddingHorizontal: 8,
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 22
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    sectionContainer: {
        paddingVertical: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',



    },
    sectionContainer1: {
        paddingVertical: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        flexDirection: 'row',

    },
    sectionContainer2: {
        paddingVertical: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',

    },
    nationalityItem: {
        width: '24%',
        backgroundColor: '#fff',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        height: Dimensions.get('screen').height / 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
        marginBottom: 12
    },
    genderItem: {
        backgroundColor: 'rgba(255, 247, 247, 1)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 8

    },
    gender: {
        color: 'rgba(0, 0, 0, 1)',
        fontWeight: '500',
        fontSize: 15
    },
    section2: {
        backgroundColor: 'rgba(241, 174, 174, 0.15)',
        width: Dimensions.get('screen').width / 1.4,
        paddingHorizontal: 7,
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center'
    },
    age: {
        paddingHorizontal: 7,
        color: '#000'
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 12
    },
    price: {
        fontWeight: '500',
        fontSize: 19
    },
    catContainer: {
        width: '49%',
        backgroundColor: 'rgba(249, 249, 249, 1)',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 12
    },
    activeCountryContainer: {
        width: '49%',
        backgroundColor: 'rgba(241, 174, 174, 1)',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 12

    },
    cat: {
        fontWeight: '500',
        fontSize: 15
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    clearBtn: {
        borderColor: Colors.light.tint,
        borderWidth: 1,
        paddingHorizontal: 22,
        paddingVertical: 5,
        marginHorizontal: 7,
        borderRadius: 5
    },
    doneBtn: {
        borderColor: Colors.light.tint,
        borderWidth: 1,
        paddingHorizontal: 22,
        paddingVertical: 5,
        marginHorizontal: 7,
        borderRadius: 5,
        backgroundColor: Colors.light.tint
    },
    activeageContainer:{
        backgroundColor:'rgb(237 159 159)',
        borderRadius:100,
        paddingVertical:7

    },
    ageContainer:{
        paddingVertical:7
    }
})