import React, { useState } from "react"
import { View, Text } from "react-native"
import { Card } from "../ui/Card.component"
import { CustomInput } from "../ui/CustomInput.component"
import { CustomButton } from "../ui/CustomButton.component"
import { validateEmail } from "../../helpers"

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')

    const validateForm = () => {
        if (validateEmail(email)) {
            setError('')
        } else {
            setError('Email is not valid')
        }
    }
    const sendPasswordHandler = () => {
        if (!error) {
            console.log('send password');
        } 
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', margin: 10 }}>
            <Card title="Forgot Password">
                <CustomInput placeholder="Email" value={email} error={error}
                    onChangeTextHandler={
                        (text) => {
                            validateForm()
                            setEmail(text)
                        }} secureMode={false} />

                <CustomButton onClick={() => {
                    sendPasswordHandler()
                }} backgroundColor={'rgb(48, 111, 21)'}><Text style={{ padding:10, color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>Send new password</Text></CustomButton>
            </Card>
        </View>
    )
}