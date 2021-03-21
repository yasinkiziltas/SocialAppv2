import React, { useEffect, useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { AuthContext } from '../navigation/AuthProvider';
import firebase, { firestore } from 'firebase';
import { AsyncStorage } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

export default function EditProfileScreen() {
    const { user, logout } = useContext(AuthContext)
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [userData, setUserData] = useState(null);

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    const getUser = async () => {
        try {
            await firestore()
                .collection('users')
                .doc(user.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        console.log('User Data: ', documentSnapshot.data());
                        setUserData(documentSnapshot.data());
                    }
                    else {
                        console.log('User boş!')
                    }
                })

        } catch (error) {
            console.log('Error: ', error)
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    const handleUpdate = async () => {
        let imgUrl = await uploadImage();

        if (imgUrl == null && userData.userImg) {
            imgUrl = userData.userImg;
        }

        try {
            firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    fname: userData.fname,
                    lname: userData.lname,
                    about: userData.about,
                    phone: userData.phone,
                    country: userData.country,
                    city: userData.city,
                    userImg: imgUrl,
                })
                .then(() => {
                    console.log('User Updated!');
                    Alert.alert(
                        'Profile Updated!',
                        'Your profile has been updated successfully.'
                    );
                })
        } catch (error) {
            console.log('Error: ', error)
        }


    }

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        setUploading(true)
        setTransferred(0)


        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uploadUri, true);
            xhr.send(null);
        });



        const storageRef = firebase.storage().ref(`photos/${filename}`);
        const task = storageRef.put(blob);

        try {
            await task;
            const url = await storageRef.getDownloadURL();
            setUploading(false);
            setImage(null)
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }
    }



    const takePhotoFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)

        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,

            }).then((image) => {
                console.log(image);
                const imageUri = image.uri;
                setImage(imageUri)
                bs.current.snapTo(1);
            })
        }

        else {
            Alert.alert("You need to give up permission to work!")
        }
    }


    const choosePhotoFromLibrary = async () => {
        const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)

        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,

            }).then((image) => {
                console.log(image);
                const imageUri = image.uri;
                setImage(imageUri)
                bs.current.snapTo(1);
            })
        }

        else {
            Alert.alert("You need to give up permission to work!")
        }
    }



    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );



    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[330, -5]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.View
                style={{
                    margin: 20,
                    opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={{
                                    uri: image
                                        ? image
                                        : userData
                                            ? userData.userImg ||
                                            'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                                            : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <MaterialCommunityIcons
                                        name="camera"
                                        size={35}
                                        color="#fff"
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        {userData ? userData.fname : ''} {userData ? userData.lname : ''}
                    </Text>
                    {/* <Text>{user.uid}</Text> */}
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#333333" size={20} />
                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={userData ? userData.fname : ''}
                        onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#333333" size={20} />
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor="#666666"
                        value={userData ? userData.lname : ''}
                        onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.action}>
                    <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
                    <TextInput
                        multiline
                        numberOfLines={3}
                        placeholder="About Me"
                        placeholderTextColor="#666666"
                        value={userData ? userData.about : ''}
                        onChangeText={(txt) => setUserData({ ...userData, about: txt })}
                        autoCorrect={true}
                        style={[styles.textInput, { height: 40 }]}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="phone" color="#333333" size={20} />
                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        value={userData ? userData.phone : ''}
                        onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.action}>
                    <FontAwesome name="globe" color="#333333" size={20} />
                    <TextInput
                        placeholder="Country"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={userData ? userData.country : ''}
                        onChangeText={(txt) => setUserData({ ...userData, country: txt })}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.action}>
                    <MaterialCommunityIcons
                        name="map-marker-outline"
                        color="#333333"
                        size={20}
                    />
                    <TextInput
                        placeholder="City"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={userData ? userData.city : ''}
                        onChangeText={(txt) => setUserData({ ...userData, city: txt })}
                        style={styles.textInput}
                    />
                </View>
                <FormButton buttonTitle="Update" onPress={handleUpdate} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
    },
});
