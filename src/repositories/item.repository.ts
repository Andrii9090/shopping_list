import IRepository from "./contracts/repository.contract";
import Repository from "./repository";

class ItemRepository extends Repository implements IRepository<ListItemType, ResponseBodyType> {
    async create(item: ListItemType): Promise<ResponseBodyType> {
        return this.apiClient.post<ResponseBodyType>('/item', item)
            .then(res => res.data)
            .catch((error) => error.response.data)
    }
    async update(item: ListItemType): Promise<ResponseBodyType> {
        const postItem = {
            title: item.title,
            list_id: item.list_id,
            is_active: item.is_active,
            is_delete: item.is_delete
        }
        return this.apiClient.post<ResponseBodyType>(`/item/${item.id}`, postItem)
            .then(res => res.data)
            .catch((error) => error.response.data)
    }

    async remove(id: number): Promise<ResponseBodyType | null> {
        return this.apiClient.delete<ResponseBodyType>(`/item/${id}`)
            .then(res => res.data)
            .catch((error) => error.response.data)

    }

    async getAll(listId: number, query?: string): Promise<ResponseBodyType | null> {
        let url = `/item/${listId}?is_delete=false`
        if(query) {
            url= `/item/${listId}?q=${query}&is_delete=true`
        }

        return this.apiClient.get<ResponseBodyType>(url)
            .then(res => res.data)
            .catch((error) => error.response.data)
    }

}

export default new ItemRepository()