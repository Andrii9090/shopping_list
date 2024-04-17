import React, { useContext, useEffect } from "react"
import { View, Image } from "react-native"
import TokenContext from "../contexts/token.context"
import ScreenName from "../screensName"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"

export const Splash = () => {
    const { token, isLoadingApp, setIsLoadingApp } = useContext(TokenContext)
    const navigator = useNavigation<StackNavigationProp<RootStackParamList, ScreenName.Splash>>()
    useEffect(() => {
        setTimeout(() => {
            setIsLoadingApp(false)
            if (!token) navigator.navigate(ScreenName.Login)
            else navigator.navigate(ScreenName.Lists)
        }, 2500)
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Image source={require('../../assets/images/logoListon.png')} />
            <Image source={require('../../assets/images/loading_splash.gif')} style={{ width: 100, height: 100 }} />
        </View>
    )
}