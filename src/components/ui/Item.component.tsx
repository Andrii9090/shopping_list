import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, GestureResponderEvent } from 'react-native'

type Props = {
    title: string,
    is_active?: boolean
    contextMenu?: React.ReactElement
    onPress: Function
    onLongPressHandler?: (event: GestureResponderEvent)=>void
}


export const ItemUI = ({ title, contextMenu, onLongPressHandler, is_active = true, onPress, }: Props) => {
    let notIsActive = {}
    
    if (!is_active) {
        notIsActive = {
            textDecorationLine: 'line-through',
            color: 'rgba(0, 0, 0, .2)',
        }
    }

    return (
            <TouchableHighlight
                style={styles.touch}
                onLongPress={onLongPressHandler}
                onPress={() => onPress()}
                underlayColor={'rgba(237, 244, 247, 0.53)'}
            >
                <View style={styles.view}>
                    <Text style={[styles.title, notIsActive]}>{title}</Text>
                    {contextMenu}
                </View>
            </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    touch: {
        borderRadius: 5,
        borderColor: 'rgba(135, 135, 135, 0.5)',
        backgroundColor: 'white',
        borderWidth: 0.5,
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    title: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 10,
        fontSize: 18,
        marginEnd: 5,
        // fontFamily: 'exo2-regular',
    },
    view: {
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    btnMore: {
        padding: 10,
    },
    badge: {
        flex: 0.08,
        height: '100%',
        paddingVertical: 0,
    }
})
