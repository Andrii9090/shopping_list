import axios from "axios";
import Repository from "./repository";
import { getAuthToken } from "../helpers";

class ImageRepository extends Repository {

    async saveImage(itemId: number, uri: string): Promise<ResponseBodyType> {
        const imageFormat = uri.split(".").pop()
        const formData = new FormData()
        formData.append('image', {
            name: `photo-${itemId}-${new Date().getTime()}.${imageFormat}`,
            type: `image/${imageFormat}`,
            uri
        })
        return this.apiClient.post<string>(`/image/${itemId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data)
            .catch((error) => error.response.data)
    }

    async deleteImage(itemId: number) {
        return this.apiClient.delete<ResponseBodyType>(`/image/${itemId}`)
            .then(res => res.data)
            .catch((error) => error.response.data)
    }


    async getImage(imageUrl: string, isFull = false): Promise<string> {
        try {
            if (isFull) {
                imageUrl += '?full=true'
            }
            const res = await axios.get<string>(imageUrl, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })

            return res.data
        } catch (error) {
            return ''
        }
    }
}

export default new ImageRepository()