import axios from "axios";
import { getAuthToken } from "../helpers";
import Repository from "./repository";

class UserRopository extends Repository {

    async login(email: string, password: string) {
        return axios.post<ResponseBodyType>(this.baseUrl + '/user/login', { email, password })
            .then(res => res.data)
            .catch(e => {
                console.log(e.response.data);

                return e.response.data
            })
    }

    async registration(email: string, password: string, repeatPassword: string): Promise<ResponseBodyType> {
        return axios.post<ResponseBodyType>(this.baseUrl + '/user', { email, password, repeatPassword })
            .then(res => res.data)
            .catch(e => e.response.data)
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

    async resetPassword(email: string) {
        try {
            const res = await axios.post<ResponseBodyType>('/user/reset-password', { email })
            if (!res.data.isError) {
                return true
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }
}

export default new UserRopository()