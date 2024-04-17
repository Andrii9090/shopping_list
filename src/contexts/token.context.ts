import React from "react"
export type TokenContext = {
    token: string | null
    setToken: (token: string | null) => void
    isLoadingApp: boolean
    setIsLoadingApp: (isLoadingApp: boolean) => void
}
const TokenContext = React.createContext<TokenContext>({} as TokenContext)

export default TokenContext