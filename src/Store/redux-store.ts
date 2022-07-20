import {Action, applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import authReducer from "./authReducer";
import listReducer from "./listReducer";

const rootReducers = combineReducers({
    auth: authReducer,
    list: listReducer
})

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware))



type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[])=> infer U} ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

export default store;