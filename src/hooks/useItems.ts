import { Dispatch, SetStateAction, useState } from "react"
import ItemRepository from "../repositories/item.repository"
import { ToastAndroid } from "react-native"
import { formatTitle } from "../helpers"

export enum loading {
    LOADING = 'loading',
    SUCCESS = 'success',
}
const useItems = (listId: number, items: ListItemType[], setItems: Dispatch<SetStateAction<ListItemType[]>>) => {
    const [status, setStatus] = useState<loading>(loading.LOADING)

    const getItems = async (listId: number) => {
        setItems([])
        setStatus(loading.LOADING)
        const data = await ItemRepository.getAll(listId)
        if (!data) {
            setStatus(loading.SUCCESS)
            ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
        } else {
            if (data?.isError) {
                setStatus(loading.SUCCESS)
                ToastAndroid.show(data.msg, ToastAndroid.SHORT)
            } else {
                setItems([...data.data])

                setStatus(loading.SUCCESS)
            }
        }
    }

    const createItem = async (title: string) => {
        setStatus(loading.LOADING)
        const newItem = {
            list_id: listId,
            title: formatTitle(title),
            is_active: true,
        }
        const data = await ItemRepository.create(newItem)

        if (!data) {
            ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
        } else {
            if (data?.isError) {
                ToastAndroid.show(data.msg, ToastAndroid.SHORT)
            } else {
                setItems([data.data, ...items])
            }
        }
        setStatus(loading.SUCCESS)
    }

    return {
        status,
        getItems,
        createItem
    }
}

export default useItems