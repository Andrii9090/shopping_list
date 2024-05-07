import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useCallback, useContext } from "react"
import { View, Text, StyleSheet, ToastAndroid, ActivityIndicator } from "react-native"
import { Card } from "../ui/Card.component"
import { CustomInput } from "../ui/CustomInput.component"
import { CustomButton } from "../ui/CustomButton.component"
import { useLogin } from "../../hooks/useLogin"
import ScreenName from "../../screensName"
import userRepository from "../../repositories/user.repository"
import { setAuthToken } from "../../helpers"
import TokenContext from "../../contexts/token.context"
import * as Updates from 'expo-updates'

export const LoginForm = () => {
    const { isLoading, data, error, validateForm, setData, setIsLoading } = useLogin()
    const tokenContext = useContext(TokenContext)

    const navigator = useNavigation<StackNavigationProp<RootStackParamList>>()
    const loginHandler = useCallback(async () => {
        setIsLoading(true)
        if (validateForm()) {
            const response = await userRepository.login(data.email, data.password)

            if (!response) {
                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
                setIsLoading(false)
            } else {
                if (response.isError) {
                    ToastAndroid.show(response.msg, ToastAndroid.SHORT)
                    setIsLoading(false)
                } else {
                    setAuthToken(response.data.token)
                    tokenContext?.setToken(response.data.token)
                    ToastAndroid.show('Success', ToastAndroid.SHORT)
                    setTimeout(() => {
                        setData({ email: '', password: '' })
                        setIsLoading(false)
                        Updates.reloadAsync()
                    }, 1500)
                }
            }
        } else {
            ToastAndroid.show('Form is not valid!', ToastAndroid.SHORT)
            setIsLoading(false)
        }
    }, [data, error])

    return (
        <View style={{ flex: 1, justifyContent: 'center', margin: 10 }}>
            <Card title="Login">
                <ActivityIndicator animating={isLoading} size={"large"} />
                <View>
                    <CustomInput placeholder="Email" value={data.email} error={error?.email} secureMode={false}
                        onChangeTextHandler={
                            (text) => {
                                setData((prev) => { return { ...prev, email: text } })
                                validateForm()

                            }
                        } />
                    <CustomInput placeholder="Password" error={error?.password} value={data.password} secureMode={true} onChangeTextHandler={
                        (text) => {
                            setData((prev) => { return { ...prev, password: text } })
                            validateForm()
                        }
                    } />
                </View>
                <View>
                    <CustomButton style={styles.button} backgroundColor="transparent" onClick={() => navigator.navigate(ScreenName.ForgotPassword)}>
                        <Text style={[styles.buttonTxt, { color: 'rgba(112, 112, 112, 0.7)', textAlign: 'right', fontWeight: 'normal' }]}>Forgot password?</Text>
                    </CustomButton>
                    <CustomButton style={styles.button} onClick={() => loginHandler()}>
                        <Text style={styles.buttonTxt}>Login</Text>
                    </CustomButton>
                    <CustomButton style={styles.button} backgroundColor="rgb(0, 51, 133)" onClick={() => navigator.navigate(ScreenName.Registration)}>
                        <Text style={styles.buttonTxt}>Registration</Text>
                    </CustomButton>
                    <CustomButton onClick={() => navigator.navigate(ScreenName.ForgotPassword)} backgroundColor={'rgb(245, 155, 0), 0.7)'}>
                        <Text style={styles.buttonTxt}>Change password</Text>
                    </CustomButton>
                </View>
            </Card >
        </View >
    )
}

const styles = StyleSheet.create({
    buttonTxt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        padding: 10
    },
    button: {
        margin: 5
    }
})

