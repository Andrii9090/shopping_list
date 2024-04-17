import { createContext } from "react";

type ListContextType = {
    lists: MainItemType[]
    setLists: Function
}

const ListContext = createContext<ListContextType|null>(null);

export default ListContext