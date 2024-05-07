import { Animated, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { Dispatch, useCallback, useRef } from 'react'
import { ItemUI } from '../ui/ItemUI.component'
import { ListItemMenu } from '../menu/ListContextMenu.component'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useContextMenu } from '../../hooks/useContetxMenu'
import { AddUser } from './Adduser.component'
import listRepository from '../../repositories/list.repository'
import ScreenName from '../../screensName'
import CreateEditForm from '../ui/CreateEditForm.component'

type Props = {
    item: MainItemType
    isEdit: boolean
    setIsEdit: Dispatch<React.SetStateAction<number>>
    setList: Dispatch<React.SetStateAction<MainItemType[]>>
}

export default function ItemOfList({ item, isEdit, setIsEdit, setList }: Props) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
    const fadeAnim = useRef(new Animated.Value(0)).current
    const { selectedMenuHandler, modalVisible, setModalVisible } = useContextMenu(setIsEdit)

    const onSubmitUserCodeHandler = useCallback(async (code: string) => {
        const data = await listRepository.addUserToList(item.id as number, code)

        if (!data) {
            ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
        }
        if (data.isError) {
            ToastAndroid.show(data.msg, ToastAndroid.SHORT)
        } else {
            ToastAndroid.show('Success', ToastAndroid.SHORT)
        }
    }, [item.id])

    const fadeIn = useCallback(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true, }).start();
    }, [])

    if (item.is_active) {
        setTimeout(() => fadeIn(), 200)
    }

    async function updateHandler(newTitle: string): Promise<void> {
        if (item.title !== newTitle) {
            item.title = newTitle
            const data = await listRepository.update(item)
            if (!data) {
                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
            } else {
                if (!data?.isError) {
                    const updatedItem = data.data
                    setList((prev) => prev.map((item) => item.id === updatedItem.id ? updatedItem : item))
                } else {
                    ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
                }
            }
        }
        setIsEdit(0)
    }

    return (
        <>
            {modalVisible && <AddUser modalVisible={modalVisible} setModalVisible={setModalVisible} onSubmitHandler={onSubmitUserCodeHandler} />}
            {isEdit &&
                <View style={{ marginBottom: 4, borderColor: 'rgba(135, 135, 135, 0.5)', borderRadius: 5, borderWidth: 0.5 }}>
                    <CreateEditForm title={item.title} onPress={(text: string) => updateHandler(text)} iconName='check' colorIcon='rgb(0, 51, 133)' placeholder={''} />
                </View>
            }
            {!isEdit &&
                <View style={styles.container}>
                    <View style={{ flex: 10 }}>
                        <ItemUI
                            title={item.title}
                            onPress={() => {
                                navigation.navigate(ScreenName.ListItems, { listId: item.id ?? 0 })
                            }}

                            onLongPressHandler={() => setIsEdit(item.id ?? -1)}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ListItemMenu onSelected={(menuId) => selectedMenuHandler(menuId, item.id ?? 0)} />
                    </View>
                </View >
            }
        </ >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: -4,
        },
        shadowOpacity: 0.5,
        elevation: 2,
    },
})