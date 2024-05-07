import React, { useState } from "react"
import { View, Text, ToastAndroid } from "react-native"
import { Card } from "../ui/Card.component"
import { CustomInput } from "../ui/CustomInput.component"
import { CustomButton } from "../ui/CustomButton.component"
import { validateEmail } from "../../helpers"
import userRepository from "../../repositories/user.repository"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import ScreenName from "../../screensName"

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigator = useNavigation<StackNavigationProp<RootStackParamList>>()

    const validateForm = () => {
        if (validateEmail(email)) {
            setError('')
        } else {
            setError('Email is not valid')
        }
    }
    const sendPasswordHandler = () => {
        if (!error) {
            userRepository.resetPassword(email)
            .then((res) => {
                if(res) {
                    setEmail('')
                    setError('')
                    ToastAndroid.show('Email sent', ToastAndroid.TOP)
                    navigator.navigate(ScreenName.Login)
                }
            })
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