import React from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"
import { Card } from "../ui/Card.component"
import { CustomInput } from "../ui/CustomInput.component"
import { CustomButton } from "../ui/CustomButton.component"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import ScreenName from "../../screensName"
import { useRegistration } from "../../hooks/useRegistration"



export const RegistrationForm = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    const { loading, data, setData, error, registrationHandler } = useRegistration()

    return (
        <>
            <ActivityIndicator size="large" color="#0000ff" animating={loading} />

            <View style={{ flex: 1, justifyContent: 'center', margin: 10 }}>
                <Card title="Registration">
                    <CustomInput placeholder="Email" error={error.email} value={data.email} onChangeTextHandler={
                        (text) => {
                            setData({ ...data, email: text })
                        }
                    } secureMode={false} />
                    <CustomInput placeholder="Password" error={error.password} value={data.password} onChangeTextHandler={
                        (text) => {
                            setData({ ...data, password: text })
                        }
                    } secureMode={true} />
                    <CustomInput placeholder="Repeat password" error={error.repeatPassword} value={data.repeatPassword} onChangeTextHandler={
                        (text) => {
                            setData({ ...data, repeatPassword: text })
                        }
                    } secureMode={true} />

                    <CustomButton style={{ marginTop: 10 }} onClick={registrationHandler} backgroundColor={'rgb(48, 111, 21)'}><Text style={styles.text}>Registration</Text></CustomButton>
                    <CustomButton style={{ marginTop: 10 }} onClick={() => { navigation.navigate(ScreenName.Login) }} backgroundColor={'rgb(0, 51, 133)'}><Text style={styles.text}>Login</Text></CustomButton>
                </Card>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        padding: 10
    }
})