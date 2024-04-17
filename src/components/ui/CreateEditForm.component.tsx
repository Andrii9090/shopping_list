import React, { useState } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { SearchForm } from './SearchForm.component'
import { CustomInput } from './CustomInput.component'
import { CustomButton } from './CustomButton.component'
import itemRepository from '../../repositories/item.repository'

const iconSize = 30

type Props = {
    placeholder: string
    onPress: (text: string) => void
    isSearch?: boolean
    title?: string
    iconName: keyof typeof FontAwesome.glyphMap;
    colorIcon?: string
    searchData?: ListItemType[]
    onChangeTextHandler?: (text: string) => void
    clickSearchHandler?: (item: ListItemType) => void
}

const CreateEditForm = ({ title = '', placeholder, searchData, clickSearchHandler, onChangeTextHandler, onPress, isSearch = false, iconName, colorIcon }: Props) => {
    const [value, setTitle] = useState(title)

    return (
        <>
            {isSearch && searchData && clickSearchHandler && <SearchForm data={searchData} onClick={(item) => {
                clickSearchHandler(item)
                setTitle('')
            }} />}
            <View style={styles.container}>
                <View style={{ flexGrow: 1 }}>
                    <CustomInput
                        placeholder={placeholder}
                        onChangeTextHandler={(text) => {
                            setTitle(text)
                            if (onChangeTextHandler) onChangeTextHandler(text)
                        }}
                        value={value} />
                </View>

                <View style={{ flexGrow: 0 }}>
                    <CustomButton
                        backgroundColor='transparent'
                        onClick={() => {
                            if (!value){
                                // clickSearchHandler()
                            }
                            onPress(value)
                            setTitle('')
                        }}>
                        <FontAwesome
                            name={iconName}
                            size={iconSize}
                            color={colorIcon}
                        />
                    </CustomButton>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
    },
})

export default CreateEditForm
