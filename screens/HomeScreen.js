import React, { useEffect, useState } from 'react'
import { FlatList, Alert } from 'react-native'
import { Container } from '../styles/FeedStyles'
import { PostCard } from '../components/PostCard'
import firebase, { firestore } from 'firebase';

export default function HomeScreen() {

    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(null)
    const [deleted, setDeleted] = useState(false)

    const fetchPosts = async () => {
        try {
            const list = [];

            await firestore()
                .collection('posts')
                .orderBy('postTime', 'desc')
                .get()
                .then((querySnapshot) => {
                    // console.log('Total Posts: ' + querySnapshot.size)

                    querySnapshot.forEach((doc) => {
                        const { userId, post, postImg, postTime, likes, comments } = doc.data();
                        list.push({
                            id: doc.id,
                            userId,
                            userName: 'Test Username',
                            userImg:
                                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                            postTime: postTime,
                            post,
                            postImg,
                            liked: false,
                            likes,
                            comments
                        })
                    })
                })

            setPosts(list)

            if (loading) {
                setLoading(false)
            }
            console.log('Posts: ', list)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);



    useEffect(() => {
        fetchPosts();
        setDeleted(false);
    }, [deleted]);

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete post',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                },
            ],
            { cancelable: false },
        );
    };

    const deletePost = (postId) => {
        console.log('Current Post Id: ', postId);

        firestore()
            .collection('posts')
            .doc(postId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const { postImg } = documentSnapshot.data();

                    if (postImg != null) {

                        const storageRef = firebase.storage().refFromURL(postImg);
                        const imageRef = firebase.storage().ref(storageRef.fullPath);

                        imageRef
                            .delete()
                            .then(() => {
                                console.log(`${postImg} has been deleted successfully.`);
                                deleteFirestoreData(postId);
                            })
                            .catch((e) => {
                                console.log('Error while deleting the image. ', e);
                            });
                        // If the post image is not available
                    } else {
                        deleteFirestoreData(postId);
                    }
                }

            });
    };


    const deleteFirestoreData = (postId) => {
        firestore()
            .collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                Alert.alert(
                    'Post deleted!',
                    'Your post has been deleted successfully!',
                );
                setDeleted(true);
            })
            .catch((e) => console.log('Error deleting post.', e));
    };

    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <PostCard item={item} onDelete={handleDelete} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
        />
        // <Container>  
        //  </Container>
    )
}

