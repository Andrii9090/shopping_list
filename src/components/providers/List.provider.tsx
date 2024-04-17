import React from "react"
import { MenuProvider } from "react-native-popup-menu"

type Props = {
    children: React.ReactNode
}

export const ListProviderComponent = ({ children }: Props) => {

    return (
        <MenuProvider>
                {children}
        </MenuProvider>
    )
} 