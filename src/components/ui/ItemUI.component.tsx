import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, GestureResponderEvent } from 'react-native'

type Props = {
    title: string,
    is_active?: boolean
    onPress: Function
    onLongPressHandler?: (event: GestureResponderEvent) => void
}


export const ItemUI = ({ title, onLongPressHandler, is_active = true, onPress, }: Props) => {
    let notIsActive = {}

    if (!is_active) {
        notIsActive = {
            textDecorationLine: 'line-through',
            color: 'rgba(0, 0, 0, .2)',
        }
    }

    return (
        <TouchableHighlight
            onLongPress={onLongPressHandler}
            onPress={() => onPress()}
            underlayColor={'rgba(250, 250, 250, 0.79)'}
        >
            <View style={styles.view}>
                <Text style={[styles.title, notIsActive]}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    title: {
        padding: 10,
        fontSize: 16,
        // fontFamily: 'exo2-regular',
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    btnMore: {
        padding: 10,
    }
})
