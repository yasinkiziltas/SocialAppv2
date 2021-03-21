import React, { useEffect, useState } from 'react'
import { Image, Text, StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native'
import { AuthContext } from '../navigation/AuthProvider'
import { PostCard } from '../components/PostCard'
import firebase, { firestore } from 'firebase';
import FormButton from '../components/FormButton'


{/* <View style={styles.container}>
<Text style={{ color: 'black', marginBottom: 15 }}>Welcome <Text style={{ fontWeight: 'bold', color: 'green' }}>{userId}</Text></Text>
<Text style={{ color: 'black' }}>Welcome <Text style={{ fontWeight: 'bold', color: 'green' }}>{userEmail}</Text></Text>
<FormButton buttonTitle='Logout' onPress={() => logout()} />
</View> */}

export default function ProfileScreen({ navigation, route }) {
    const { userId, logout } = React.useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(null)

    const fetchPosts = async () => {
        try {
            const list = [];

            await firestore()
                .collection('posts')
                .where('userId', '==', userId)
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
                setLoading(false);
            }

            console.log('Posts: ', list)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = () => {

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
                showsVerticalScrollIndicator={false}
            >
                <Image style={styles.userImg} source={require('../assets/users/user-8.jpg')} />
                <Text style={styles.userName}>Jenny Doe</Text>
                <Text>{route.params ? route.params.userId : userId}</Text>
                <Text style={styles.aboutUser}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>

                <View style={styles.userBtnWrapper}>
                    {route.params ? (
                        <>
                            <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                                <Text>Message</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                                <Text>Follow</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('EditProfile')}>
                                <Text>Edit</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        </>
                    )}

                </View>

                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>22</Text>
                        <Text style={styles.userInfoSubTitle}>Posts</Text>
                    </View>

                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>22,00</Text>
                        <Text style={styles.userInfoSubTitle}>Followers</Text>
                    </View>

                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>900</Text>
                        <Text style={styles.userInfoSubTitle}>Following</Text>
                    </View>

                    <View style={styles.userInfoItem}>

                    </View>
                </View>


                {posts.map((item) => (
                    <PostCard style={{ marginTop: 15 }} key={item.id} item={item} onDelete={handleDelete} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});