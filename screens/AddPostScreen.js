import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { InputWrapper, InputField, AddImage, SubmitButton, SubmitButtonText, StatusWrapper } from '../styles/AddPost'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

import 'firebase/firestore';
import firebase, { firestore } from 'firebase';
import { AuthContext } from '../navigation/AuthProvider'


export default function AddPostScreen() {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);

    const { userId } = useContext(AuthContext)

    const pickFromCamera = async () => {
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
            })
        }

        else {
            Alert.alert("You need to give up permission to work!")
        }
    }


    const pickFromGallery = async () => {
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
            })
        }

        else {
            Alert.alert("You need to give up permission to work!")
        }
    }

    const submitPost = async () => {
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);
        console.log('Post: ', post);

        firestore()
            .collection('posts')
            .add({
                userId: userId,
                post: post,
                postImg: imageUrl,
                postTime: firestore.Timestamp.fromDate(new Date()),
                likes: null,
                comments: null,
            })
            .then(() => {
                console.log('Post Added!');
                Alert.alert(
                    'Post published!',
                    'Your post has been published Successfully!',
                );
                setPost(null);
                this.props.navigation.navigate('HomeScreen')
            })
            .catch((error) => {
                console.log('Something went wrong with added post to firestore.', error);
            });
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

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {uploading ? (
                <StatusWrapper>
                    <Text>{transferred} % Completed!</Text>
                    <ActivityIndicator style={{ marginTop: 10 }} size="large" color="#000ff" />
                </StatusWrapper>

            ) : (
                <SubmitButton onPress={submitPost}>
                    <SubmitButtonText>Post</SubmitButtonText>
                </SubmitButton>
            )}

            <InputWrapper>
                {image != null ? <AddImage source={{ uri: image }} /> : null}
                <InputField
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={2}
                    onChangeText={(content) => setPost(content)}
                    value={post}
                >
                </InputField>





            </InputWrapper>


            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={() => pickFromCamera()}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>

                <ActionButton.Item buttonColor='#3498db' title="Choose Photo" onPress={() => pickFromGallery()}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>

        </View>
    )
}


const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});