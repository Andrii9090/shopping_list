import { useCallback, useEffect, useState } from "react"
import ListRepository from "../repositories/list.repository"
import { ToastAndroid } from "react-native"
import { loading } from "./useItems"


const useLists = () => {
    const [lists, setLists] = useState<MainItemType[]>([])
    const [status, setStatus] = useState<loading>(loading.LOADING)

    const getLists = async () => {
        setLists([])
        setStatus(loading.LOADING)
        const res = await ListRepository.getAll()
        if (res) {
            if (res?.isError) {
                ToastAndroid.show(res.msg, ToastAndroid.SHORT)
            } else {
                setLists(res.data)
            }

        } else {
            ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
        }
        setStatus(loading.SUCCESS)

    }

    return {
        lists,
        status,
        setLists,
        getLists
    }
}

export default useLists