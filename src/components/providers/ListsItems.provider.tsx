import React from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

type Props = {
    children: React.ReactNode
}

export const ListItemsProviderComponent = ({ children }: Props) => {

    return (
            <GestureHandlerRootView>
                {children}
            </GestureHandlerRootView>
    )
} 