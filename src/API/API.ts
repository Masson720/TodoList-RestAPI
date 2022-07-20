import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": '0e85d029-5c9c-403b-8707-c3f13c704c33'
    }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}