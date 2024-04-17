import React from "react"
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"

type Props = {
    onClick: () => void
    backgroundColor?: string
    children: React.ReactNode
    style?: StyleProp<ViewStyle> | undefined
}

export const CustomButton = ({backgroundColor, style, children, onClick}: Props) => {

    return (
        <TouchableOpacity activeOpacity={0.45} style={[style, styles.button, { backgroundColor: backgroundColor ? backgroundColor : 'rgb(48, 111, 21)' }]} 
        onPress={onClick}
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        borderRadius: 5,
    },
})