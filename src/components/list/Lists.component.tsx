import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FlatList, ToastAndroid, View, Text } from 'react-native'
import CreateEditForm from '../ui/CreateEditForm.component'
import ItemOfList from './Item.component'
import { ListProviderComponent } from '../providers/List.provider'
import useLists from '../../hooks/useLists'
import ListRepository from '../../repositories/list.repository'
import ListContext from '../../contexts/list.context'
import { formatTitle, getAuthToken, setAuthToken } from '../../helpers'
import TokenContext from '../../contexts/token.context'
import { EmptyList } from '../ui/EmptyList.component'
import { loading } from '../../hooks/useItems'


export const Lists = () => {
    const [editItemId, setEditItemId] = useState<number>(0)
    const { lists, status, getLists, setLists } = useLists()
    const tokenContext = useContext(TokenContext)
    if (getAuthToken() === null && tokenContext?.token) {
        setAuthToken(tokenContext?.token)
    }

    useEffect(() => {
        getLists()
    }, [])

    const createListHandler = useCallback(async (title: string) => {
        if (title.length > 0) {
            const res = await ListRepository.create({ title: formatTitle(title), id: new Date().getTime(), is_active: true, updatedAt: new Date().toISOString() })
            if (res) {
                if (res?.isError) {
                    ToastAndroid.show(res.msg, ToastAndroid.SHORT)
                } else {
                    setLists((prev) => [res.data, ...prev])
                }
            } else {
                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
            }
        }
    }, [])

    return (
        <>
            <View style={{ margin: 10, marginTop: 15, flexGrow: 0 }}>
                <CreateEditForm
                    placeholder="List's name"
                    onPress={(title: string) => {
                        createListHandler(title)
                    }}
                    iconName="plus"
                    colorIcon='rgb(0, 51, 133)'
                />
            </View>
            <View style={{ flexGrow: 10 }}>

                <ListProviderComponent>
                    <ListContext.Provider value={{ lists, setLists }}>
                        <FlatList
                            style={{ padding: 3 }}
                            ListEmptyComponent={<EmptyList text="No lists" />}
                            refreshing={status === loading.LOADING}
                            onRefresh={() => {
                                getLists()
                            }}
                            data={lists}
                            renderItem={(itemList) => <ItemOfList setIsEdit={setEditItemId} item={itemList.item} isEdit={itemList.item.id === editItemId} key={itemList.item.id} setList={setLists} />}
                            keyExtractor={(item) => item.id?.toString() || ''}
                        />
                    </ListContext.Provider>
                </ListProviderComponent>

            </View>
            {!lists || lists.length === 0 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>No lists</Text></View>}
        </ >
    )
}
