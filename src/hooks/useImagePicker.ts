import * as ImagePicker from 'expo-image-picker'
import { useCallback } from 'react'
import { Swipeable } from 'react-native-gesture-handler'


const useImagePicker = () => {
    const takeFromCamara = useCallback(async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        })
        if (!result.canceled) {
            return result.assets[0].uri
        } else {
            return null
        }
    }, [])

    const takeFromGallery = useCallback(async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });
        if (!result.canceled) {
            return result.assets[0].uri
        } else {
            return null
        }
    }, [])



    return {
        takeFromCamara,
        takeFromGallery
    }
}

export default useImagePicker