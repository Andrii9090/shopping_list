import { useFonts } from "expo-font"
import * as SplashScreen from 'expo-splash-screen'

const useFontsLoad = () => {
    const [fontsLoaded, fontError] = useFonts({
        'exo2-regular': require('../../assets/fonts/Exo2-Regular.ttf'),
    })

    if (!fontsLoaded) return null

    const handleOnLayout = async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }

    return {
        fontsLoaded: fontsLoaded,
        fontError: fontError,
        handleOnLayout: handleOnLayout
    }
}

export default useFontsLoad