import { View, Text, StyleSheet, ToastAndroid } from "react-native"
import { CustomInput } from "../ui/CustomInput.component"
import React, { useCallback } from "react"
import { Line } from "../ui/Line.component"
import { CustomButton } from "../ui/CustomButton.component"
import { useLogin } from "../../hooks/useLogin"
import userRepository from "../../repositories/user.repository"

type Props = {
    user: UserType
    setUser: Function
    isEditing: boolean
    setIsEditing: Function
}

export const ChangeEmail = ({ user, setUser, isEditing, setIsEditing }: Props) => {
    const { data, setData, error, validateForm } = useLogin()

    const changeEmailHandler = useCallback(async () => {

        if (validateForm()) {
            const userEmail = await userRepository.changeEmail(data.email, data.password)
            if (userEmail) {
                setIsEditing(false)
                setUser({...user,  email: userEmail })
            }else{
                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
            }
        }
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
            <CustomInput placeholder="Email" error={error.email} value={data.email !== '' ? data.email : user.email} onChangeTextHandler={
                (text) => {
                    setData({ ...data, email: text })
                }} secureMode={false} />
            <CustomInput placeholder="Password" error={error.password} value={data.password !== '' ? data.password : ''} onChangeTextHandler={
                (text) => {
                    setData({ ...data, password: text })

                }}
                secureMode={true} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <CustomButton onClick={changeEmailHandler} backgroundColor={'transparent'}><Text style={[styles.button, { color: 'rgb(0, 51, 133)' }]}>Change</Text></CustomButton>
                <CustomButton onClick={() => setIsEditing(!isEditing)} backgroundColor={'transparent'}><Text style={[styles.button, { color: 'rgb(235, 133, 0)' }]}>Cancel</Text></CustomButton>
            </View>
            <Line />
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    }
})