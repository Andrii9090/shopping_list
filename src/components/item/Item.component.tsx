import React, { useContext, useEffect } from 'react'
import { GestureResponderEvent, View } from 'react-native'

import { ItemUI } from '../ui/Item.component'

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
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <View style={{ flexGrow: 2 }}>
                <LeftActions item={item} />
            </View>
            {editingId !== item.id &&
                <View style={{ flexGrow: 15 }}>
                    <ItemUI
                        onLongPressHandler={(event: GestureResponderEvent) => setEditingId(item.id || -1)}
                        title={item.title}
                        is_active={item.is_active}
                        onPress={() => {
                            updateItem({ ...item, is_active: !item.is_active })
                        }}
                    />
                </View>
            }
            {editingId === item.id &&
                <View style={{ flexGrow: 15, flexDirection: 'row' }}>
                    <View style={{ flexGrow: 10, flexShrink:3 }} >
                        <CreateEditForm title={item.title} iconName='pencil' colorIcon='rgb(0, 51, 133)' placeholder={''} onPress={(title: string) => {
                            setEditingId(-1)
                            updateItem({ ...item, title })
                        }} />
                    </View>
                    <View style={{ flexGrow: 1, flexShrink: 1, alignContent: 'center' }}>
                        <CustomButton style={{ marginTop: 10 }} backgroundColor='transparent' onClick={() => {
                            deleteHandler(item)
                            setEditingId(-1)
                        }}>
                            <Ionicons name="trash" size={30} color="red" />
                        </CustomButton>
                    </View>
                </View>
            }
        </View>
    )
}

