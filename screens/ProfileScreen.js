import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FormButton from '../components/FormButton'
import { AuthContext } from '../navigation/AuthProvider'

export default function ProfileScreen() {
    const { userId, userName, userEmail, logout } = React.useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', marginBottom: 15 }}>Welcome <Text style={{ fontWeight: 'bold', color: 'green' }}>{userId}</Text></Text>
            <Text style={{ color: 'black' }}>Welcome <Text style={{ fontWeight: 'bold', color: 'green' }}>{userEmail}</Text></Text>
            <FormButton buttonTitle='Logout' onPress={() => logout()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    text: {
        fontSize: 20,
        color: 'black'
    }
})