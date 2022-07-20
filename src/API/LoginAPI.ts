import {instance} from "./API";
import {FormType} from "../Login/Login";



export const LoginAPI = {
    sendLogin(formData: FormType){
        return instance.post('auth/login', formData).then(res => res.data)
    },
    exit(){
        return instance.delete('/auth/login').then(res => res.data)
    },
    getProfile(){
        return instance.get('/auth/me').then(res => res.data)
    }
}

