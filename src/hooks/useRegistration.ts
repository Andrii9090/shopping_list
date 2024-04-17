import { useCallback, useState } from "react"
import { setAuthToken, validateEmail } from "../helpers"
import userRepository from "../repositories/user.repository"
import { ToastAndroid } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import ScreenName from "../screensName"

const initialData = {
    email: '',
    password: '',
    repeatPassword: '',
}

export const useRegistration = () => {
    const [data, setData] = useState<RegistrationType>(initialData)
    const [error, setError] = useState<ErrorsRegistrtion>({ email: '', password: '', repeatPassword: '' })
    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    const validateForm = () => () => {
        const isEmailValid = validateEmail(data.email)
        if (!data.email) {
            setError((prev) => { return { ...prev, email: 'Email is required' } })
        } else if (!isEmailValid) {
            setError((prev) => { return { ...prev, email: 'Email is not valid' } })
        } else {
            setError((prev) => { return { ...prev, email: '' } })
        }

        if (!data.password) {
            setError((prev) => { return { ...prev, password: 'Password is required' } })
        } else if (data.password.length < 6) {
            setError((prev) => { return { ...prev, password: 'Password must be at least 6 characters' } })
        } else {
            setError((prev) => { return { ...prev, password: '' } })
        }

        if (!data.repeatPassword) {
            setError((prev) => { return { ...prev, repeatPassword: 'Repeat password is required' } })
        } else if (data.repeatPassword !== data.password) {
            setError((prev) => { return { ...prev, repeatPassword: 'Passwords do not match' } })
        } else {
            setError((prev) => { return { ...prev, repeatPassword: '' } })
        }
        if (isEmailValid && error.email === '' && error.password === '' && error.repeatPassword === '') {
            setError((prev) => { return { ...prev, email: '', password: '', repeatPassword: '' } })
            return true
        }
        return false
    }


    const registrationHandler = useCallback(async () => {
        setLoading(true)
        if (validateForm()) {
            const resData = await userRepository.registration(data.email, data.password, data.repeatPassword)
            
            if (!resData) {
                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
                setLoading(false)
            } else {
                if (resData.isError) {
                    setLoading(false)
                    ToastAndroid.show(resData.msg, ToastAndroid.SHORT)
                }
                else {
                    setData(initialData)
                    setAuthToken(resData?.data.token)
                    ToastAndroid.show('Registration successful!', ToastAndroid.SHORT)
                    setLoading(false)
                    navigation.navigate(ScreenName.Lists)
                }
            }
        }

    }, [data])

    return {
        data,
        loading,
        error,
        setData,
        validateForm,
        registrationHandler,
    }
}

