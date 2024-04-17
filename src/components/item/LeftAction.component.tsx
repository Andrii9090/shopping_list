import React, { useContext } from 'react'
import { TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import useSaveImage from '../../hooks/useSaveImage'
import useImagePicker from '../../hooks/useImagePicker'
import ListItemsContext from '../../contexts/item.context'

type Props = {
    item: ListItemType
}
export const LeftActions = ({ item }: Props) => {
    const { setImageUrl, setItems } = useContext(ListItemsContext)
    const { saveImage } = useSaveImage(item.id)
    const { takeFromCamara, takeFromGallery } = useImagePicker()

    return (
        <TouchableOpacity
            onPress={() => {
                if (item.image) {
                    setImageUrl(item.image)
                } else {
                    Alert.alert('Add image', 'Select an image or take a photo', [
                        {
                            text: 'Take photo',
                            onPress: async () => {
                                const result = await takeFromCamara()
                                if (result) {
                                    const data = await saveImage(result, item)
                                    setItems((prev) => [...prev.map((item) => {
                                        if (item.id === data.id) {
                                            item = data
                                        }
                                        return item
                                    })])
                                }
                            },
                        },
                        {
                            text: 'Show gallery',
                            onPress: async () => {
                                const result = await takeFromGallery()
                                if (result) {
                                    const data = await saveImage(result, item)
                                    setItems((prev) => [...prev.map((item) => {
                                        if (item.id === data.id) {
                                            item = data
                                        }
                                        return item
                                    })])
                                }
                            },
                        },
                        {
                            text: 'Cancel',
                            onPress: async () => {
                                setImageUrl('')
                            },
                        }
                    ])
                }
            }}
            style={[styles.swipeAction, { height: '80%' }]}
        >
            {!item.image ? (
                <Image style={{ width: '60%', height: '60%' }} source={require('../../../assets/images/camara.png')} />
            )
                : item.imageData ? (
                    <Image
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        src={item.imageData}
                    />
                ) : (
                    <Image style={{ width: '60%', height: '60%' }} source={require('../../../assets/images/loading.gif')} />
                )
            }


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    swipeAction: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0,
        marginRight: 2,
        backgroundColor: 'rgb(227, 227, 227)',
    }
})