import React, { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ItemUI } from './ItemUI.component'

type Props = {
    data: ListItemType[]
    onClick: (item: ListItemType) => void
}

export const SearchForm = ({ data, onClick }: Props) => {

    let fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const animation = Animated.timing(fadeAnim, {
            toValue: 1,
            easing: Easing.linear,
            duration: 300,
            useNativeDriver: true,
        })
        if (data.length > 0) {
                animation.start()
        } else {
            animation.reset()
        }
    }, [data])

    return (
        
        <Animated.View
            style={{
                borderColor: '#d3d3d3',
                borderRadius: 5,
                opacity: fadeAnim,
                width: '100%',
                position: 'absolute',
                backgroundColor: '#fff',
                top: 40,
                padding: 10,
                zIndex: 10,
                elevation: 10
            }}
        >
            <FlatList
                data={data}
                renderItem={(item) => (
                    <ItemUI
                        title={item.item.title}
                        onPress={() => {
                            onClick(item.item)
                        }}
                    />
                )}
                keyExtractor={(item) => item.id ? item.id.toString() : new Date().getTime().toString()}
            />
        </Animated.View>
    )
}
