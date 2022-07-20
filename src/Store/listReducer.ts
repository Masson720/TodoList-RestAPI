import {ListAPI} from "../API/ListAPI";
import {ResultCodeEnum} from "../API/API";
import {TasksAPI} from "../API/TasksAPI";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {ListType} from "../Todo/ListBody";

let initialState = {
    lists: [],
    tasks: [],
    totalCount: null
}


const taskFilter = (prev: any, actual: any) => {
    if(prev.id === actual.id){
        return actual
    }else{
        return prev
    }
}

const taskTerminate = (prev: any, actual: any) => {
    if(prev.id === actual.id){
        return false
    }else{
        return true
    }
}

const listReducer = (state = initialState, action: ActionsTypes) => {
    switch(action.type){
        case 'GET_LIST':
            return {
                ...state, lists: action.list
            }
        case 'GET_TASKS':
            return {
                ...state,
                tasks: action.tasks.items,
                totalCount: action.tasks.totalCount
            }
        case 'GET_LOADING_TASKS':
            return {
                ...state,
                tasks: [...state.tasks, ...action.tasks.items],
                totalCount: action.tasks.totalCount
            }
        case 'EDIT_TASK':
            return {
                ...state, tasks: [...state.tasks.map((e: any) => taskFilter(e, action.task))]
            }
        case 'ADD_TASK':
            return {
                ...state, tasks: [action.task, ...state.tasks]
            }
        case 'DELETE_TASK':
            return {
                ...state, tasks: [...state.tasks.filter((e: any) => taskTerminate(e, action.task))]
            }
        case 'CLEAR_TASKS_LIST':
            return {
                ...state, tasks: [], totalCount: null
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    getList: (list: ListType) => ({type: 'GET_LIST', list} as const),
    getTasks: (tasks: any) => ({type: "GET_TASKS", tasks} as const),
    getLoadingTasks: (tasks: any) => ({type: 'GET_LOADING_TASKS', tasks} as const),
    editTask: (task: any) => ({type: 'EDIT_TASK', task} as const),
    addTask: (task: any) => ({type: 'ADD_TASK', task} as const),
    deleteTask: (task: any) => ({type: 'DELETE_TASK', task} as const),
    clearTasksList: () => ({type: 'CLEAR_TASKS_LIST'} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestList = (): ThunkType => async (dispatch) => {
    let listData = await ListAPI.getList()
    dispatch(actions.clearTasksList())
    dispatch(actions.getList(listData))
}

export const requestTasks = (listId: string, count: number, page: number): ThunkType => async (dispatch) => {
    let taskResponse = await TasksAPI.getTasks(listId, count, page)
    dispatch(actions.getTasks(taskResponse));
}

export const loadingTasks = (listId: string, count: number, page: number): ThunkType => async (dispatch) => {
    let taskResponse = await TasksAPI.getTasks(listId, count, page)
    dispatch(actions.getLoadingTasks(taskResponse));
}

export const addList = (title: {title: string}): ThunkType => async (dispatch) => {
    let listAdded: any = await ListAPI.addList(title)
    if(listAdded.resultCode === ResultCodeEnum.Success){
        dispatch(requestList())
    }
}

export const editList = (title: {title: string}, listID: string): ThunkType => async (dispatch) => {
    let listEdited = await ListAPI.editList(title, listID)
    // @ts-ignore
    if(listEdited.resultCode === ResultCodeEnum.Success){
        dispatch(requestList())
    }
}

export const deleteList = (list: string): ThunkType => async (dispatch) => {
    let listDeleted = await ListAPI.deleteList(list)
    // @ts-ignore
    if(listDeleted.resultCode === ResultCodeEnum.Success){
        dispatch(requestList())
    }
}

export const deleteTask = (listId: string, taskId: string, count: number, page: number): ThunkType => async (dispatch) => {
    let taskDeleted = await TasksAPI.deleteTask(listId, taskId)
    if(taskDeleted["resultCode"] === ResultCodeEnum.Success){
        dispatch(actions.clearTasksList())
        dispatch(requestTasks(listId, count, page))
    }
}

export type TaskType = {
    title: string
    description: string
    addedDate: Date
    startDate: Date
    deadline: Date
    priority: number
}

export const addNewTask = (task: TaskType, listId: string): ThunkType => async (dispatch) => {
    let addTaskResponse: any = await TasksAPI.addTask(task, listId);
    if(addTaskResponse["resultCode"] === ResultCodeEnum.Success){
        dispatch(actions.addTask(addTaskResponse.data.item));
    }
}

export const reorderTask = (listId: string, taskId: string, afterId: any, page: number): ThunkType => async (dispatch) => {
    let reorderTaskResponse: any = await TasksAPI.reorderTask(listId, taskId, afterId);
    if(reorderTaskResponse["resultCode"] === ResultCodeEnum.Success){
        dispatch(requestTasks(listId, 5 * page, 1));
    }
}

export type TaskEditType = {
    title: string
    description: string
    startDate: string
    deadline: string
    priority: number
    status: number
}

export const editTask = (taskValues: TaskEditType, listID: string, taskID: string, count: number, page: number): ThunkType => async (dispatch) => {
    let editTaskResponse: any = await TasksAPI.editTask(taskValues, listID, taskID)
    if(editTaskResponse["resultCode"] === ResultCodeEnum.Success){
        dispatch(actions.editTask(taskValues))
    }
}

export default listReducer