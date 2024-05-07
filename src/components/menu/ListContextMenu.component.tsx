import React from 'react'
import { Text } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu'


export enum MenuType {
    ADD_USER = 0,
    CLEAR_INACTIVE = 1,
    REMOVE = 2,
    EDIT = 3
}

type Props = {
    onSelected: (value: MenuType) => void
}

export const ListItemMenu = ({ onSelected }: Props) => {
    return (
        <Menu onSelect={(value) => onSelected(value)}>
            <MenuTrigger customStyles={{ triggerWrapper: { padding: 5 } }}>
                <Ionicons
                    name="menu"
                    size={23}
                    color="'rgb(0, 51, 133)'"
                />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption value={MenuType.EDIT}>
                    <Text>Edit</Text>
                </MenuOption>
                <MenuOption value={MenuType.ADD_USER}>
                    <Text>Add user to list</Text>
                </MenuOption>
                <MenuOption value={MenuType.CLEAR_INACTIVE}>
                    <Text>Clear inactive items</Text>
                </MenuOption>
                <MenuOption value={MenuType.REMOVE}>
                    <Text style={{ color: 'rgb(205, 47, 29)', fontWeight: 'bold' }}>Remove list</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}
