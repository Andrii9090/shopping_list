import React, { useCallback, useEffect, useState } from 'react'
import { Item } from './Item.component'
import { BtnModal, ImageModal } from './Image.component'
import CreateEditForm from '../ui/CreateEditForm.component'
import ListItemsContext from '../../contexts/item.context'
import useItems, { loading } from '../../hooks/useItems'
import { Alert, ListRenderItemInfo, ToastAndroid, View, VirtualizedList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { EmptyList } from '../ui/EmptyList.component'
import imageRepository from '../../repositories/image.repository'
import itemRepository from '../../repositories/item.repository'
import { FlatList } from 'react-native-gesture-handler'

type routeParams = {
    listId: number
}

export const Items = () => {
    const listId = (useRoute().params as routeParams).listId
    const [items, setItems] = useState<ListItemType[]>([])
    const { status, getItems, createItem } = useItems(listId, items, setItems)
    const [editingId, setEditingId] = useState<number>(-1)
    const [imageUrl, setImageUrl] = useState<string>('')
    const [searchData, setSearchData] = useState<ListItemType[]>([])


    const onChangeTextHandler = useCallback(async (title: string) => {
        let timer = null
        if (title.length > 2) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(async () => {
                const data = await itemRepository.getAll(listId, title.toLowerCase())
                if (data) {
                    if (data.isError) {
                        ToastAndroid.show(data.msg, ToastAndroid.SHORT)
                    } else {
                        setSearchData(data.data)
                    }
                }
            }, 300)

        } else {
            setSearchData([])
        }
    }, [])

    const clickSearchHandler = useCallback(async (item: ListItemType | null) => {
        if (item) {
            item.is_delete = false
            item.is_active = true
            const data = await itemRepository.update(item)
            if (data) {
                if (data.isError) {
                    ToastAndroid.show(data.msg, ToastAndroid.SHORT)
                } else {
                    setItems((prev) => [data.data, ...prev])
                }
            } else {
                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
            }
        }
        setSearchData([])
    }, [])


    useEffect(() => {
        getItems(listId)
    }, [])

    return (
        <ListItemsContext.Provider value={{ items, setItems, editingId, setEditingId, imageUrl, setImageUrl }}>
            <ImageModal
                onPress={async (selectedBtn: string) => {
                    if (selectedBtn === BtnModal.DELETE) {
                        Alert.alert('Remove?', 'Do you want remove this?', [
                            {
                                text: 'Yes',
                                onPress: () => {
                                    const id = items.filter((item) => item.image === imageUrl)[0].id
                                    setImageUrl('')
                                    if (id) {
                                        imageRepository.deleteImage(id)
                                            .then((data) => {
                                                if (data) {
                                                    if (data.isError) {
                                                        ToastAndroid.show(data.message, ToastAndroid.SHORT)
                                                    } else {
                                                        setItems((prev) => [...prev.map((item) => {
                                                            if (item.id === id) {
                                                                item = data.data
                                                            }
                                                            return item
                                                        })])
                                                    }
                                                } else {
                                                    ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
                                                }
                                            })
                                            .catch((err) => {
                                                ToastAndroid.show(err.message, ToastAndroid.SHORT)
                                            })
                                    }
                                },
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel',
                                onPress: () => {
                                },
                            },
                        ])

                    }
                }}
            />
            <View style={{ margin: 5, marginTop: 15 }}>
                <CreateEditForm
                    onChangeTextHandler={onChangeTextHandler}
                    clickSearchHandler={clickSearchHandler}
                    isSearch={true}
                    searchData={searchData}
                    placeholder="Item's name"
                    colorIcon={'rgb(0, 51, 133)'}
                    onPress={(title: string) => {
                        if (title) {
                            createItem(title)
                        }
                    }} iconName={'plus'} />
            </View>
            <View style={{ marginBottom: 58 }}>
                <FlatList
                    ListEmptyComponent={
                        <EmptyList text="No items" />
                    }
                    refreshing={status === loading.LOADING}
                    onRefresh={() => {
                        getItems(listId)
                    }}
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(itemData: ListRenderItemInfo<ListItemType>) => <Item item={itemData.item} key={itemData.item.id} />}
                />
            </View>
        </ListItemsContext.Provider>
    )
}
