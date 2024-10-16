import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';

const WalletContainer = ({data}) => {
  const navigation=useNavigation();
  const items = useSelector((state) => state);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate('Wallet')}>
        <LinearGradient
          colors={['rgba(90, 51, 146, 1)', 'rgba(248, 17, 64, 1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View>
            <Text style={styles.title}>{items.lang.currentLocal.blogger.availableBalance}</Text>
            <Text style={styles.price}>$ {data!==null?data.balance!==0&&data.balance:""} </Text>

          </View>
          <View>
            <Image source={require('../assets/images/BalanceButton.png')}
            style={items.lang.currentLocal.language == 'ar' &&{transform:[{scaleX:-1}]}}
            />
          </View>
        </LinearGradient>

      </TouchableOpacity>
    </View>
  )
}

export default WalletContainer

const styles = StyleSheet.create({
  gradient: {
    padding: 22,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:33
  },
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 12

  },
  price: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '400',
    fontSize: 13
  }
})