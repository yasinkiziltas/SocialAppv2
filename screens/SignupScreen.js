import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { AuthContext } from '../navigation/AuthProvider'


export const fetchFonts = () => {
    return Font.loadAsync({
        'kufam-semi': require('../assets/fonts/Kufam-SemiBoldItalic.ttf'),
        'lato-bold': require('../assets/fonts/Lato-Bold.ttf'),
        'lato-bold-italic': require('../assets/fonts/Lato-BoldItalic.ttf'),
        'lato-italic': require('../assets/fonts/Lato-Italic.ttf'),
        'lato-regular': require('../assets/fonts/Lato-Regular.ttf')
    });
};

export default function SignupScreen({ navigation }) {
    const [dataLoaded, setDataLoaded] = useState(false)

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const { register } = useContext(AuthContext)

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
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Confirm password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Sign Up"
                onPress={() => register(email, password)}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Terms of service
                     </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                    Privacy Policy
        </Text>
            </View>


            <SocialButton
                buttonTitle="Sign Up with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => { }}
            />


            <SocialButton
                buttonTitle="Sign Up with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => { }}
            />

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Have an account? Sign In</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'kufam-semi',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'lato-regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'lato-regular',
        color: 'grey',
    },
});