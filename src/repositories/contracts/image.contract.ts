interface IRepositoryImage {
    saveImage(uri: string): Promise<boolean>
}