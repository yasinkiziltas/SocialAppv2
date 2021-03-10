import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'

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

export default function LoginScreen({ navigation }) {
    const [dataLoaded, setDataLoaded] = useState(false)

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login, googleLogin, facebookLogin } = useContext(AuthContext)

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
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            {/* <Text style={styles.text}>Social App</Text> */}

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

            <FormButton
                buttonTitle="Sign In"
                onPress={() => login(email, password)}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => { }}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>

            {Platform.OS === "android" ? (
                <View>
                    <SocialButton
                        buttonTitle="Sign In with Facebook"
                        btnType="facebook"
                        color="#4867aa"
                        backgroundColor="#e6eaf4"
                        onPress={() => facebookLogin()}
                    />


                    <SocialButton
                        buttonTitle="Sign In with Google"
                        btnType="google"
                        color="#de4d41"
                        backgroundColor="#f5e7ea"
                        onPress={() => googleLogin()}
                    />
                </View>
            ) : null}





            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.navButtonText}>Don't have an account?</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 150,
        width: '30%',
        resizeMode: 'cover',
        marginBottom: 15
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
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'lato-regular',
    },
});