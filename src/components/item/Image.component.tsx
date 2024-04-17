import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, ActivityIndicator, ToastAndroid } from 'react-native'
import { CustomModal } from '../ui/CustomModal.component'
import { CustomButton } from '../ui/CustomButton.component'
import { loading } from '../../hooks/useItems'
import imageRepository from '../../repositories/image.repository'
import ListItemsContext from '../../contexts/item.context'

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
            <Image
                src={image}
                style={{
                    flex: 1,
                    width: '100%',
                }}
            />
            <View style={styles.container}>
                <CustomButton
                    backgroundColor='rgb(0, 51, 133)'
                    onClick={() => {
                        onPress(BtnModal.DELETE)
                    }} >
                    <Text style={[styles.btnModalText, { color: 'rgb(224, 116, 0)', padding: 8 }]}>Delete</Text>
                </CustomButton>
                <CustomButton
                    backgroundColor='rgb(0, 51, 133)'
                    onClick={() => {
                        setImage('')
                        setImageUrl('')
                    }}
                >
                    <Text style={[styles.btnModalText, { color: 'rgb(255, 255, 255)', padding: 8 }]}>Close</Text>
                </CustomButton>
            </View>
        </CustomModal >
    )
}

const styles = StyleSheet.create({
    btnModal: {
        padding: 10,
        borderRadius: 5,
    },
    btnModalText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    container: {
        width: '100%',
        backgroundColor: 'rgba(61, 61, 61, 0.9)',
        flexGrow: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    }
})
