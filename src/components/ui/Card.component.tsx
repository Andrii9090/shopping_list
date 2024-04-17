import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Line } from "./Line.component"

type Props = {
    title: string
    children: React.ReactNode
}
export const Card = ({title, children }: Props) => {

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Line/>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    }, 
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})