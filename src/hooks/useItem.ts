import { useContext, useCallback } from "react"
import { Alert, ToastAndroid } from "react-native"
import itemRepository from "../repositories/item.repository"
import ItemContext from "../contexts/item.context"
import { sortHelper } from "../helpers"

const useItem = () => {
    const context = useContext(ItemContext)

    const updateItem = useCallback(async (updatedItem: ListItemType) => {
        const data = await itemRepository.update(updatedItem)

        if (!data) {
            ToastAndroid.show('Connection error!', ToastAndroid.SHORT)
        } else {
            if (data?.isError) {
                ToastAndroid.show(data.msg, ToastAndroid.SHORT)
            } else {
                let newItems = context?.items
                if (newItems) {
                    let index = newItems.findIndex((i: ListItemType) => i.id === updatedItem.id)
                    if (index !== -1) {
                        newItems[index] = data.data
                    }

                    context?.setItems(sortHelper(newItems))
                }
            }
        }
    }, [])

    const deleteHandler = useCallback((item: ListItemType) => {
        Alert.alert('Remove?', 'Do you want remove this?', [
            {
                text: 'Yes',
                onPress: () => {
                    context?.setItems((prev: ListItemType[]) => {
                        let index = prev.findIndex((i: ListItemType) => i.id === item.id)
                        if (index !== -1) {
                            prev.splice(index, 1)
                            item.is_delete = true
                            itemRepository.update(item)
                            return [...prev]
                        }
                        return prev
                    })
                },
            },
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                },
            },
        ])
    }, [])

    return {
        deleteHandler,
        updateItem
    }
}

export default useItem