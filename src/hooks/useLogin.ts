import { useState } from "react"
import { validateEmail } from "../helpers"

export const useLogin = () => {
    const [data, setData] = useState<LoginType>({
        email: '',
        password: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState<Errors>({ email: '', password: '' })

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


        if (isEmailValid && error.email === '' && error.password === '') {
            setError((prev) => { return { ...prev, email: '', password: ''} })
            return true
        }
        return false
    }
    return {
        isLoading,
        data,
        error,
        validateForm,
        setData,
        setIsLoading
    }
}