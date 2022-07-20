import {instance} from "./API";

export const ListAPI = {
    getList(){
        return instance.get('todo-lists').then(res => res.data)
    },
    addList(title: {title: string}){
        return instance.post('todo-lists', title).then(res => res.data)
    },
    deleteList(list: string){
        return instance.delete(`/todo-lists/${list}`).then(res => res.data)
    },
    editList(title: {title: string}, listID: string){
        return instance.put(`/todo-lists/${listID}`, title).then(res => res.data)
    }
}