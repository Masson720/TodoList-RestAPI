import {LoginAPI} from "../API/LoginAPI";
import {ResultCodeEnum} from "../API/API";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
};

let initialState = {
    isAuth: false,
    profile: {
        login: '',
        email: '',
        id: 0
    }
};


const authReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type){
        case 'AUTHORIZING':
            return {
            ...state, isAuth: action.status
        }
        case 'AUTHORIZING_ME':
            return {
                ...state, profile: action.profile
            }
        default:
            return state
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    authorizing: (status: boolean) => ({type: 'AUTHORIZING', status} as const),
    authorizingMe: (profile: {id: number, login: string, email: string}) => ({type: 'AUTHORIZING_ME', profile} as const)
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const login = (formData: FormDataType): ThunkType => async (dispatch) => {
    let loginForm: any = await LoginAPI.sendLogin(formData)
    if(loginForm['resultCode'] === ResultCodeEnum.Success){
        dispatch(actions.authorizing(true))
    };
};

export const logout = (): ThunkType => async (dispatch) => {
    let logoutResult = await LoginAPI.exit()
    if(logoutResult['resultCode'] === ResultCodeEnum.Success){
        dispatch(actions.authorizing(false))
    };
};

export const requestProfile = (): ThunkType => async (dispatch) => {
    let profileData = await LoginAPI.getProfile()
    if(profileData['resultCode'] === ResultCodeEnum.Success){
        dispatch(actions.authorizingMe(profileData["data"]))
        dispatch(actions.authorizing(true))
    };
};

export default authReducer;