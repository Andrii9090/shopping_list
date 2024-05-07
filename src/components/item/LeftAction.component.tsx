import React, { useContext } from 'react'
import { TouchableOpacity, Image, StyleSheet, Alert, View } from 'react-native'
import useSaveImage from '../../hooks/useSaveImage'
import useImagePicker from '../../hooks/useImagePicker'
import ListItemsContext from '../../contexts/item.context'

type Props = {
    item: ListItemType
}

const IMAGE_SIZE = 30
export const LeftActions = ({ item }: Props) => {
    const { setImageUrl, setItems } = useContext(ListItemsContext)
    const { saveImage } = useSaveImage(item.id)
    const { takeFromCamara, takeFromGallery } = useImagePicker()

    const onPressHandler = () => {
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
    }
    return (
        <TouchableOpacity
            onPress={onPressHandler}
        >
            <View style={{ width: IMAGE_SIZE, padding: 5 }}>
                {!item.image ? (
                    <Image
                        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 5 }}
                        source={require('../../../assets/images/camara.png')} />
                )
                    : (item.imageData) && (
                        <Image
                            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 5 }}
                            src={item.imageData}
                        />
                    )
                }
            </View>
        </TouchableOpacity>
    )
}
