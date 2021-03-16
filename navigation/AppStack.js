import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import HomeScreen from '../screens/HomeScreen'
import AddPostScreen from '../screens/AddPostScreen'
import ProfileScreen from '../screens/ProfileScreen'
import MessagesScreen from '../screens/MessagesScreen'
import ChatScreen from '../screens/ChatScreen'
import EditProfileScreen from '../screens/EditProfileScreen'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export const fetchFonts = () => {
    return Font.loadAsync({
        'kufam-semi': require('../assets/fonts/Kufam-SemiBoldItalic.ttf'),
        'lato-bold': require('../assets/fonts/Lato-Bold.ttf'),
        'lato-bold-italic': require('../assets/fonts/Lato-BoldItalic.ttf'),
        'lato-italic': require('../assets/fonts/Lato-Italic.ttf'),
        'lato-regular': require('../assets/fonts/Lato-Regular.ttf')
    });
};


const FeedStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="RN Social"
            component={HomeScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontFamily: 'kufam-semi',
                    fontSize: 18,
                },
                headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerRight: () => (
                    <View style={{ marginRight: 10 }}>
                        <FontAwesome5.Button
                            name="plus"
                            size={22}
                            backgroundColor="#fff"
                            color="#2e64e5"
                            onPress={() => navigation.navigate('AddPost')}
                        />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="AddPost"
            component={AddPostScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'kufam-semi',
                    color: '#2e64e5',
                },
                headerStyle: {
                    backgroundColor: '#2e64e515',
                    shadowColor: '#2e64e515',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
                // headerRight: () => (
                //     <TouchableOpacity>
                //         <Text
                //             style={{ fontSize: 18, fontWeight: 'bold', color: '#2e64e5', marginRight: 15 }}
                //             onPress={() => alert('Clicked')}
                //         >Post</Text>
                //     </TouchableOpacity>
                // )
            }}
        />
        <Stack.Screen
            name="HomeProfile"
            component={ProfileScreen}
            options={{
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
                headerBackTitleVisible: false,
                headerBackImage: () => (
                    <View style={{ marginLeft: 15 }}>
                        <Ionicons name="arrow-back" size={25} color="#2e64e5" />
                    </View>
                ),
            }}
        />
    </Stack.Navigator>
);

const MessageStack = ({ navigation }) => (
    <Stack.Navigator>

        <Stack.Screen
            name="Messages"
            component={MessagesScreen}
        />

        <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({
                title: route.params.userName,
                headerBackTitleVisible: false,
            })}
        />


    </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
                headerTitle: 'Edit Profile',
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                    elevation: 0,
                },
            }}
        />
    </Stack.Navigator>
);

export default function AppStack() {

    const getTabBarVisibility = (route) => { //eğer chat ekranında isek tab bar gorunmıcek.
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : '';

        if (routeName === 'Chat' || routeName === "AddPost") {
            return false;
        }
        return true;
    };

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
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#2e64e5',
            }}>
            <Tab.Screen
                name="Home"
                component={FeedStack}
                options={({ route }) => ({
                    tabBarLabel: 'Home',
                    tabBarVisible: route.state && route.state.index === 0, //eğer addpost ekranında isek tab bar gorunmıcek.
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Messages"
                component={MessageStack}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route), //eğer chat ekranında isek tab bar gorunmıcek.
                    // tabBarVisible: route.state && route.state.index === 0,
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            color={color}
                            size={size}
                        />
                    ),
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    // tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};