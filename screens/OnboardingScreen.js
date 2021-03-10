import React from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';


const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)'

    return (
        <View style={{ width: 5, height: 5, marginHorizontal: 3, backgroundColor }}>

        </View>
    )
}


const Skip = ({ ...props }) => {
    return (
        <Button
            title={"Skip"}
            color="#000000"
            {...props}
        />
    )
}

const Next = ({ ...props }) => {
    return (
        <Button
            title={"Next"}
            color="#000000"
            {...props}
        />
    )
}

const Done = ({ ...props }) => {
    return (
        <TouchableOpacity
            style={{ marginHorizontal: 8 }}
            {...props}
        >
            <Text style={{ fontSize: 16 }}>Done</Text>
        </TouchableOpacity>

    )
}


export default function OnboardingScreen({ navigation }) {
    return (
        <Onboarding
            onSkip={() => this.props.navigation.replace('Login')}
            onDone={() => navigation.navigate('Login')}
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../assets/onboarding-img1.png')} />,
                    title: 'Social App',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../assets/onboarding-img2.png')} />,
                    title: 'Social App',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../assets/onboarding-img3.png')} />,
                    title: 'Social App',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
            ]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})