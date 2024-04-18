import React, { useState } from "react"
import { TextInput, Text, StyleSheet, StyleProp, ViewStyle } from "react-native"

type Props = {
    placeholder: string
    value: string
    error?: string
    onChangeTextHandler: (text: string) => void
    secureMode?: boolean,
    style?: StyleProp<ViewStyle> | undefined
}

export const CustomInput = ({ placeholder, value, error, onChangeTextHandler, secureMode = false }: Props) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <>
            <TextInput defaultValue={value} style={[styles.input, { color: error ? 'red' : 'black' }]} placeholder={placeholder} value={value} secureTextEntry={secureMode}
                onFocus={() => { setIsFocused(true) }} onBlur={() => { setIsFocused(false) }}
                onChangeText={(text) => {
                    onChangeTextHandler(text)
                }} />
            {error && <Text style={{ color: 'red', marginBottom: 5, marginLeft: 12 }}>{error}</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: .3,
        padding: 6,
        borderRadius: 5,
        color: 'black',
        borderColor:'rgba(135, 135, 135, 0.5)',
    },
})