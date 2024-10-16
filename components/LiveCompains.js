import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const LiveCompains = ({ campain }) => {
    const items = useSelector((state) => state);

    return (
        <View style={{ marginTop: 22 }}>
            {campain.length !== 0 ?
                <Text
                    style={[styles.title, items.lang.currentLocal.language == 'ar' && { alignSelf: 'flex-start' }]}
                >  {items.lang.currentLocal.settings && items.lang.currentLocal.settings.liveCampaigns}
                </Text> :
                <View></View>
            }


            {campain.length !== 0 &&

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={require('../assets/images/Placeholder_02 (1).png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={require('../assets/images/Placeholder_02 (1).png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={require('../assets/images/Placeholder_02 (1).png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={require('../assets/images/Placeholder_02 (1).png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageContainer}>
                        <Image source={require('../assets/images/Placeholder_02 (1).png')} />
                    </TouchableOpacity>
                </ScrollView>
            }
        </View>
    )
}

export default LiveCompains

const styles = StyleSheet.create({
    title: {
        fontWeight: '700',
        fontSize: 13,
        marginBottom: 12
    }
})