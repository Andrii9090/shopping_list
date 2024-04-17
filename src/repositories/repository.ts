import axios, { AxiosInstance } from "axios"
import { getAuthToken } from "../helpers"

abstract class Repository {
    baseUrl = 'https://38cc-79-117-94-178.ngrok-free.app/api'
    apiClient:AxiosInstance

    constructor () {
        this.apiClient = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getAuthToken()
            },
            
        })
    }
}

export default Repository