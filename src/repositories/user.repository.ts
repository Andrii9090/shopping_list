import { getAuthToken } from "../helpers";
import Repository from "./repository";

class UserRopository extends Repository {

    async login(email: string, password: string) {
        return this.apiClient.post<ResponseBodyType>('/user/login', { email, password })
            .then(res => res.data)
            .catch(e => e.response.data)
    }

    async registration(email: string, password: string, repeatPassword: string): Promise<ResponseBodyType | null> {
        try {
            const res = await this.apiClient.post<ResponseBodyType>('/user', { email, password, repeatPassword })
            return res.data
        } catch (e: any) {
            if (e.response.data.isError) return await e.response.data
            return null
        }
    }

    async getUserData(token: string): Promise<UserType | null> {
        try {
            const res = await this.apiClient.get<ResponseBodyType>('/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return res.data.data
        } catch (e) {
            return null
        }
    }

    async getAccessCode(): Promise<ResponseBodyType> {
        return this.apiClient.get<ResponseBodyType>('/user/access-code')
            .then(res => res.data)
            .catch(e => e.response.data)
    }

    async changeEmail(email: string, password: string) {
        try {
            const res = await this.apiClient.put<ResponseBodyType>('/user', { email, password }, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            })
            if (!res.data.isError) {
                return email
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }
}

export default new UserRopository()