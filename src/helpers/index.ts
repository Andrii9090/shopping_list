import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'token'

export const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
}

export const formatTitle = (title: string) => {
    return title.slice(0, 1).toUpperCase() + title.slice(1, title.length)
}

export const validateEmail = (email: string) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(String(email).toLowerCase());
}

export const getAuthToken = () => {
    return SecureStore.getItem(TOKEN_KEY)
}

export const setAuthToken = (token: string) => {
    SecureStore.setItem(TOKEN_KEY, token)
}

export const sortHelper = (items: ListItemType[]) => {
    const actives = items.filter((i: ListItemType) => i.is_active)
    const inactives = items.filter((i: ListItemType) => !i.is_active)

    actives.sort((a: ListItemType, b: ListItemType) => {
        if (a.updatedAt > b.updatedAt) {
            return -1
        }
        if (a.updatedAt < b.updatedAt) {
            return 1
        }
        return 0
    })

    inactives.sort((a: ListItemType, b: ListItemType) => {
        if (a.updatedAt > b.updatedAt) {
            return -1
        }
        if (a.updatedAt < b.updatedAt) {
            return 1
        }
        return 0
    })

    return [...actives, ...inactives]
}