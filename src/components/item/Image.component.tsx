import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, ActivityIndicator, ToastAndroid } from 'react-native'
import { CustomModal } from '../ui/CustomModal.component'
import { CustomButton } from '../ui/CustomButton.component'
import { loading } from '../../hooks/useItems'
import imageRepository from '../../repositories/image.repository'
import ListItemsContext from '../../contexts/item.context'
import { FontAwesome } from '@expo/vector-icons'


type Props = {
    onPress: Function
}

export enum BtnModal {
    DELETE = 'DELETE',
}

export const ImageModal = ({ onPress }: Props) => {
    const { imageUrl, setImageUrl } = useContext(ListItemsContext)
    const [image, setImage] = useState<string>('')
    const [status, setStatus] = useState(loading.SUCCESS)

    useEffect(() => {
        setImage('')
        const getImage = async () => {
            setStatus(loading.LOADING)
            if (!imageUrl) return
            const data = await imageRepository.getImage(imageUrl, true)
            if (data) {
                setImage(data)
            } else {
                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
            }
            setStatus(loading.SUCCESS)
        }
        getImage()
    }, [imageUrl])

    return (
        <CustomModal isVisible={imageUrl !== ''} setIsVisible={() => {
            setImageUrl('')
        }}>
            <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%', flex: 1 }} size="large" color="rgba(95, 20, 200, 0.7)" animating={status === loading.LOADING} />
            {image && <Image
                src={image}
                style={{
                    flex: 1,
                    width: '100%',
                }}
            />}
            <View style={styles.container}>
                <CustomButton
                    style={{ padding: 8 }}
                    backgroundColor='rgba(171, 171, 171, 0.3)'
                    onClick={() => {
                        onPress(BtnModal.DELETE)
                    }} >
                    <FontAwesome
                        name='trash'
                        size={25}
                        color='rgba(179, 48, 0, 0.86)'
                    />
                </CustomButton>
                <CustomButton
                    style={{ padding: 8 }}
                    backgroundColor='rgba(171, 171, 171, 0.3)'
                    onClick={() => {
                        setImage('')
                        setImageUrl('')
                    }}
                >
                    <FontAwesome
                        name='close'
                        size={25}
                        color='white'
                    />
                </CustomButton>
            </View>
        </CustomModal >
    )
}

const styles = StyleSheet.create({
    btnModal: {
        borderRadius: 5,
    },
    btnModalText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})
