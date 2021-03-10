import React, { useContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from './AuthProvider'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import firebase from 'firebase'

import * as Facebook from 'expo-facebook';


export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true)


    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false)
    }

    React.useEffect(() => {

        Facebook.initializeAsync({
            appId: '419161475842882',
            appName: 'RN Social App'
        });

        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber;
    }, [])



    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
