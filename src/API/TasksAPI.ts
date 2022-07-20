import {instance} from "./API";
import {TaskEditType, TaskType} from "../Store/listReducer";

export const TasksAPI = {
    getTasks(listId: string, count: number, page: number){
        return instance.get(`/todo-lists/${listId}/tasks?count=${count}&page=${page}`).then(res => res.data)
    },
    addTask(taskTitle: TaskType, listId: string){
        return instance.post(`/todo-lists/${listId}/tasks`, taskTitle).then(res => res.data)
    },
    deleteTask(listId: string, taskId: string){
        return instance.delete(`/todo-lists/${listId}/tasks/${taskId}`).then(res => res.data)
    },
    editTask(taskValues: TaskEditType, listID: any, taskId: string){
        return instance.put(`/todo-lists/${listID}/tasks/${taskId}`, taskValues).then(res => res.data)
    },
    reorderTask(listId: string, taskId: string, putAfterItemId: any){
        return instance.put(`/todo-lists/${listId}/tasks/${taskId}/reorder`, putAfterItemId).then(res => res.data)
    }
}