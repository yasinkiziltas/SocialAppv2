import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export const fetchFonts = () => {
    return Font.loadAsync({
        'kufam-semi': require('../assets/fonts/Kufam-SemiBoldItalic.ttf'),
        'lato-bold': require('../assets/fonts/Lato-Bold.ttf'),
        'lato-bold-italic': require('../assets/fonts/Lato-BoldItalic.ttf'),
        'lato-italic': require('../assets/fonts/Lato-Italic.ttf'),
        'lato-regular': require('../assets/fonts/Lato-Regular.ttf')
    });
};

export default function SocialButton({ buttonTitle, btnType, color, backgroundColor, ...rest }) {

    const [dataLoaded, setDataLoaded] = useState(false)

    if (!dataLoaded) {
        return (
            <AppLoading
                onError={console.log('')}
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
            />
        )
    }

    let bgColor = backgroundColor;
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: bgColor }]}
            {...rest}>

            <View style={styles.iconWrapper}>
                <FontAwesome name={btnType} style={styles.icon} size={22} color={color} />
            </View>

            <View style={styles.btnTxtWrapper}>
                <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 3,
    },
    iconWrapper: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontWeight: 'bold',
    },
    btnTxtWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'lato-regular',
    },
});