import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimentions';


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

export default function FormButton({ buttonTitle, ...rest }) {

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
    return (
        <TouchableOpacity {...rest} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'lato-regular',
    },
});