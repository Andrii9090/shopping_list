type RootStackParamList = {
    Lists: undefined
    Profile: undefined
    ListItems: { listId: number }
    Registration: undefined
    ForgotPassword: undefined
    Login: undefined
    UserProfile: undefined
    Splash: undefined
}

type MainItemType = {
    id: number 
    title: string
    is_active?: boolean
    is_delete?: boolean
    createdAt?: string
    updatedAt: string
}

type ListItemType = MainItemType & {
    list_id: number 
    image: string | null
    imageData?: string
}

type UserType = {
    email: string
    token?: string
    password?: string
}

type LoginType = {
    email: string
    password: string
}

type Errors = {
    email: string
    password: string
}

type ErrorsRegistrtion = Errors & {
    repeatPassword: string
}

type RegistrationType = {
    email: string
    password: string
    repeatPassword: string
}

type TokenResponse= {
    token: string
}
type ResponseBodyType = {
    isError: any
    data:Token | UserType | MainItemType
    msg:string
}
