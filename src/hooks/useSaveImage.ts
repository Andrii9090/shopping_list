import { Dispatch, SetStateAction, useCallback, useContext } from "react"
import ItemContext from '../contexts/item.context'
import { ToastAndroid } from "react-native"
import imageRepository from "../repositories/image.repository"


const useSaveImage = (itemId: number) => {

    const saveImage = useCallback(async (uri: string, item:ListItemType) => {
        if (uri) {
            const data = await imageRepository.saveImage(itemId, uri)
            if (data) {
                if (data.isError) {
                    ToastAndroid.show(data.msg, ToastAndroid.SHORT)
                }else{
                    item.image = data.data
                    ToastAndroid.show("Image saved", ToastAndroid.SHORT)
                }
            } else {
                ToastAndroid.show("Conection error!", ToastAndroid.SHORT)
            }
        }
        return item
    }, [])

    return {
        saveImage,
    }
}

export default useSaveImage