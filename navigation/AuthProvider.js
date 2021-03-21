import React, { createContext, useState } from 'react'
import firebase, { auth, firestore } from 'firebase'

import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

export const AuthContext = createContext();

const firebaseConfig = {
    apiKey: "AIzaSyCAxm4DjvSg646ltJKgknmVqbu5JAZ6zr8",
    authDomain: "rn-social-app-v2.firebaseapp.com",
    databaseURL: "https://rn-social-app-v2-default-rtdb.firebaseio.com",
    projectId: "rn-social-app-v2",
    storageBucket: "rn-social-app-v2.appspot.com",
    messagingSenderId: "798009613709",
    appId: "1:798009613709:web:882249d3524e1f5b7c31c4"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setEmail] = useState(null)

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userName,
                setUserName,
                userEmail,
                setEmail,
                userId,
                setUserId,

                login: async (email, password) => {
                    try {
                        await firebase.auth().signInWithEmailAndPassword(email, password)
                        const user = firebase.auth().currentUser;

                        if (user) {
                            setUserId(user.uid);
                            setUserName(user.displayName);
                            setEmail(user.email);
                            console.log('Log success: ', userId)
                        }

                    }
                    catch (e) {
                        console.log(e)
                    }
                },

                googleLogin: async () => {
                    try {
                        const result = await Google.logInAsync({
                            androidClientId: '969954545502-064h1uipl1pegooek56lh4cm8svh9k6d.apps.googleusercontent.com',
                            iosClientId: '969954545502-dlsa7sbsfgodt1m5ac80rqgq9l6ilr1r.apps.googleusercontent.com',
                            scopes: ['profile', 'email'],
                        });

                        if (result.type === 'success') {

                            setUserId(result.user.id)
                            setUserName(result.user.name)

                            console.log('başardın lan!')

                            const credential = firebase.auth.GoogleAuthProvider.signInWithCredential(result.accessToken)
                            firebase.auth().signInWithCredential(credential).catch((error) => {
                                console.log(error);
                            })

                            return result.accessToken;

                        } else {
                            console.log('cancelled')
                        }
                    } catch (e) {
                        console.log(e)
                    }
                },

                facebookLogin: async () => {
                    //1.yontem
                    // try {
                    //     const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] })
                    //     if (type == 'success') {
                    //         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
                    //         // alert('Logged in!', `Hi ${(await response.json()).name}!`);
                    //     }
                    // } catch (error) {
                    //     console.log(error)
                    // }

                    try {
                        const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] })

                        if (type == 'success') {
                            const credential = firebase.auth.FacebookAuthProvider.credential(token)
                            console.log('Successful!')
                            firebase.auth().signInWithCredential(credential).catch((error) => {
                                console.log(error);
                            })

                        }
                    }

                    catch (e) {
                        console.log(e)
                    }

                },

                register: async (email, password) => {
                    try {
                        await firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                firestore().collection('users').doc(auth().currentUser.uid)
                                    .set({
                                        fname: '',
                                        lname: '',
                                        email: email,
                                        createdAt: firestore.Timestamp.fromDate(new Date()),
                                        userImg: null,
                                    })
                                    .catch(error => {
                                        console.log('Something went wrong with added user to firestore: ', error);
                                    })
                            })
                    }
                    catch (e) {
                        console.log(e)
                    }
                },

                logout: async () => {
                    try {
                        await firebase.auth().signOut()
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
            }}
        >
            { children}
        </AuthContext.Provider >
    )
}