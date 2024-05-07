import React, { useContext, useEffect } from 'react'
import { GestureResponderEvent, View, StyleSheet } from 'react-native'

import { ItemUI } from '../ui/ItemUI.component'

import { LeftActions } from './LeftAction.component'
import useItem from '../../hooks/useItem'
import CreateEditForm from '../ui/CreateEditForm.component'
import imageRepository from '../../repositories/image.repository'
import ListItemsContext from '../../contexts/item.context'
import Ionicons from '@expo/vector-icons/Ionicons'
import { CustomButton } from '../ui/CustomButton.component'

type Props = {
    item: ListItemType
}

export const Item = ({ item }: Props) => {
    const { editingId, setEditingId, setItems } = useContext(ListItemsContext)
    const { updateItem, deleteHandler } = useItem()

    useEffect(() => {
        const downloadImage = async () => {
            if (item.image !== null) {
                imageRepository.getImage(item.image)
                    .then((imageData) => {
                        setItems((prev) => {
                            return [...prev.map((prevItem) => {
                                if (prevItem.id === item.id) {
                                    prevItem.imageData = imageData
                                }
                                return prevItem
                            })]
                        })
                    })
                    .catch((error) => console.log('error', error))
            }
        }
        downloadImage()
    }, [item.image, item.updatedAt])

    return (
        <>
            {editingId !== item.id &&
                <View style={styles.container}>
                    <View style={{marginEnd:5}}>
                        <LeftActions item={item} />
                    </View>
                    <View style={{flex:10}}>
                        <ItemUI
                            onLongPressHandler={(event: GestureResponderEvent) => setEditingId(item.id || -1)}
                            title={item.title}
                            is_active={item.is_active}
                            onPress={() => {
                                updateItem({ ...item, is_active: !item.is_active })
                            }}
                        />
                    </View>
                </View>
            }
            {editingId === item.id &&
                <View style={[styles.container, { justifyContent: 'space-between'}]}>
                    <View style={{flexGrow: 1   , flexShrink:1}}>
                        <CreateEditForm title={item.title} iconName='check' colorIcon='rgb(0, 51, 133)' placeholder={''} onPress={(title: string) => {
                            setEditingId(-1)
                            updateItem({ ...item, title })
                        }} />
                    </View>
                    <View >
                        <CustomButton style={{ marginTop: 10 }} backgroundColor='transparent' onClick={() => {
                            deleteHandler(item)
                            setEditingId(-1)
                        }}>
                            <Ionicons name="trash" size={30} color="red" />
                        </CustomButton>
                    </View>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 6,
        padding:4,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.5,
        elevation: 2,
    },
})