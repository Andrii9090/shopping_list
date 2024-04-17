import { Alert, ToastAndroid } from "react-native";
import { MenuType } from "../components/menu/ListContextMenu.component";
import listRepository from "../repositories/list.repository";
import ListContext from "../contexts/list.context";
import { useCallback, useContext, useState } from "react";

export const useContextMenu = (setIsEdit: React.Dispatch<React.SetStateAction<number>>) => {
    const context = useContext(ListContext);
    const [modalVisible, setModalVisible] = useState(false);
    const selectedMenuHandler = useCallback((menuId: number, itemId: number) => {

        switch (menuId) {
            case MenuType.ADD_USER:
                setModalVisible(!modalVisible)
                break;
            case MenuType.CLEAR_INACTIVE:
                Alert.alert('Delete inactive', 'Are you sure you want to delete items that are not active?', [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            const data = await listRepository.clearItems(itemId);
                            if (!data) {
                                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
                            }
                            if (data?.isError) {
                                ToastAndroid.show(data.msg, ToastAndroid.SHORT)
                            } else {
                                ToastAndroid.show('Success', ToastAndroid.SHORT)
                            }
                        }
                    },
                    {
                        text: 'No',
                        style: 'cancel'
                    }
                ])
                break;
            case MenuType.REMOVE:
                Alert.alert('Remove', 'Are you sure you want to delete this list?', [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            const data = await listRepository.remove(itemId);
                            if (!data) {
                                ToastAndroid.show('Conection error!', ToastAndroid.SHORT)
                            }

                            if (data?.isError) {
                                ToastAndroid.show(data.msg, ToastAndroid.SHORT)
                            } else {
                                setTimeout(() => {
                                    context?.setLists((prev: MainItemType[]) => prev.filter((item) => item.id !== itemId));
                                }, 230);
                            }

                        }
                    },
                    {
                        text: 'No',
                        style: 'cancel'
                    }
                ])
                break;
            case MenuType.EDIT:
                setIsEdit(itemId)
        }
    }, [])

    return {
        modalVisible,
        setModalVisible,
        selectedMenuHandler,
    }
}