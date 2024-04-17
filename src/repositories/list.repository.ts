import IRepository from "./contracts/repository.contract"
import Repository from "./repository"

class ListRepository extends Repository implements IRepository<MainItemType, ResponseBodyType> {
    async create(item: MainItemType): Promise<ResponseBodyType | null> {
        const itemData = {
            title: item.title,
            is_active: item.is_active
        }
        return this.apiClient.post<ResponseBodyType>('/list', itemData)
            .then(res => res.data)
            .catch((error) => error.response.data)
    }
    async update(item: MainItemType): Promise<ResponseBodyType | null> {
        const listId = item.id
        const itemData = {
            title: item.title,
            is_active: item.is_active,
            is_delete: item.is_delete
        }
        return await this.apiClient.put<MainItemType>(`/list/${listId}`, itemData)
            .then(res => res.data)
            .catch((error) => error.response.data)
    }
    async remove(id: number): Promise<ResponseBodyType | null> {
        return await this.apiClient.delete<ResponseBodyType>(`/list/${id}`)
            .then(res => res.data)
            .catch((error) => error.response.data)
    }
    async getAll(): Promise<ResponseBodyType> {
        return this.apiClient.get<ResponseBodyType>('/list')
            .then(res => res.data)
            .catch((error) => error.response.data)
    }

    async clearItems(id: number): Promise<ResponseBodyType> {
        return this.apiClient.get<ResponseBodyType>(`/list/${id}/clear`)
            .then(res => res.data)
            .catch((error) => error.response.data)
    }

    async addUserToList(id: number, code: string): Promise<ResponseBodyType> {
        return this.apiClient.post<ResponseBodyType>(`/list/${id}/add-user`, { code })
            .then(res => res.data)
            .catch((error) => error.response.data)
    }
}

export default new ListRepository()