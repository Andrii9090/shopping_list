interface IRepository<T, K> {
    create(item: T): Promise<K | null>
    update(item: T): Promise<K | null>
    remove(id: number): Promise<K | null>
    getAll(listId?: number): Promise<K | null>
}

export default IRepository