import React, { useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from "react-native"
import userRepository from "../../repositories/user.repository"
import { removeAuthToken } from "../../helpers"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import ScreenName from "../../screensName"
import { Card } from "../ui/Card.component"
import { CustomButton } from "../ui/CustomButton.component"
import { ChangeEmail } from "./ChangeEmail.component"
import TokenContext from "../../contexts/token.context"
import { CustomModal } from "../ui/CustomModal.component"

export const UserProfile = () => {
    const navigator = useNavigation<StackNavigationProp<RootStackParamList>>()
    const tokenContext = useContext(TokenContext)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [accessCode, setAccessCode] = useState('')

    const [user, setUser] = useState<UserType>({
        email: '',
    })

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true)
            const user = await userRepository.getUserData(tokenContext?.token ? tokenContext.token : '')

            if (!user) {
                navigator.navigate(ScreenName.Login)
            } else {
                setIsLoading(false)
                setUser(user)
            }
        }
        getUser()
    }, [])

    return (
        <>
            <CustomModal isVisible={isVisible} setIsVisible={setIsVisible}>
                <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10 }}>

                    <Text>Send this code
                        <Text style={{ fontWeight: 'bold', fontSize: 20, }}> {accessCode} </Text>to a user who wants to add you to their list.</Text>
                    <Text>WARNING! This code is valid for 10 minutes</Text>
                    <CustomButton onClick={() => setIsVisible(false)} style={{ marginTop: 20 }} backgroundColor={'rgb(0, 136, 194)'}><Text style={styles.button}>Close</Text></CustomButton>
                </View>
            </CustomModal>
            <View style={{ flex: 1, justifyContent: 'center', margin: 10 }}>
                <Card title="User Profile">
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        {isLoading && <ActivityIndicator size={'large'} />}
                        {!isEditing && <View style={{ flexGrow: 10 }}><Text style={{ marginBottom: 5, fontSize: 18, textAlign: 'center' }}>{user?.email}</Text></View>}
                        {isEditing && <ChangeEmail user={user} setUser={setUser} setIsEditing={setIsEditing} isEditing={isEditing} />}
                        {!isEditing &&
                            <View style={{ flexGrow: 1 }}><CustomButton onClick={() => setIsEditing(!isEditing)} backgroundColor={'transparent'}>
                                <Text style={[styles.button, { color: 'rgb(0, 51, 133)' }]}>Change Email</Text>
                            </CustomButton></View>
                        }
                    </View>
                    <CustomButton onClick={() => {
                        userRepository.getAccessCode().then((res) => {
                            if (!res) {
                                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
                            } else {
                                if (res.isError) {
                                    ToastAndroid.show(res.msg, ToastAndroid.SHORT)
                                } else {
                                    setIsVisible(true)
                                    setAccessCode(res.data.code)
                                }
                            }
                        })

                    }} backgroundColor={'rgb(0, 136, 194)'}><Text style={styles.button}>Get Profile Code</Text></CustomButton>
                    <CustomButton onClick={async () => {
                        removeAuthToken().then(() => {
                            tokenContext?.setToken(null)
                            navigator.navigate(ScreenName.Login)
                        })
                    }} backgroundColor={'rgb(235, 133, 0)'}><Text style={styles.button}>Logout</Text></CustomButton>
                    <CustomButton onClick={() => navigator.navigate(ScreenName.ForgotPassword)} backgroundColor={'rgb(0, 51, 133), 0.7)'}>
                        <Text style={styles.button}>Change password</Text>
                    </CustomButton>
                </Card>
            </View >
        </>
    )

}


const styles = StyleSheet.create({
    button: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        padding: 10
    }
})