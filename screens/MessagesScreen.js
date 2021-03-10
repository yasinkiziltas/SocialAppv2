import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function MessagesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Chat Screen</Text>
            <Button title="Click here" onPress={() => alert('Clicked')} />
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