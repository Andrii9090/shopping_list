import axios, { AxiosInstance } from "axios"
import { getAuthToken } from "../helpers"

abstract class Repository {
    baseUrl = 'https://liston.ovh/api'
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