import { Dispatch, SetStateAction, createContext } from "react";

type ItemContextType = {
    items: ListItemType[]
    setItems: Dispatch<SetStateAction<ListItemType[]>>
    editingId: number
    setEditingId: Dispatch<SetStateAction<number>>
    imageUrl: string
    setImageUrl: Dispatch<SetStateAction<string>>
}

const ListItemsContext = createContext<ItemContextType>({ } as ItemContextType);

export default ListItemsContext