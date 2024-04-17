import React from "react"
import { StyleSheet, View, Text } from "react-native"

type Props = {
    text: string
}

export const EmptyList = ({ text }: Props = { text: 'No items' }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    }
})