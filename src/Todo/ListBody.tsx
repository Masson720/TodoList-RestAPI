import s from './style.module.css';
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
// @ts-ignore
import { Route, useHistory } from "react-router-dom";
import {AppStateType} from "../Store/redux-store";
import {Lists} from "./List/List";
import {TaskPage} from "./Task/TaskPage";


export type ListType = {
    id: string
    order: number
    title: string
    addedDate: string
    dateTime: (e: string) => string
}

export const TodoLists: React.FC = () => {
    const lists = useSelector((state: AppStateType) => state.list["lists"])
    const tasks = useSelector((state: AppStateType) => state.list["tasks"])
    const totalCount = useSelector((state: AppStateType) => state.list['totalCount'])

    let history = useHistory()

    useEffect(() => {
        if(history.location.pathname === '/'){
            history.push('/lists')
        }
    }, [history])

    const dateTime = (e: string) => {
        let date = e.substr(0, 10)
        let time = e.substr(11, 8)
        return date + ' ' + time
    }

    return <div className={s.body}>
        <Route path='/lists/:addList?' render={() => <Lists lists={lists} dateTime={dateTime}/>}/>
        <Route path='/tasks/:addTask?' render={() =>
            <TaskPage
                tasks={tasks}
                dateTime={dateTime}
                count={totalCount}/>}
        />
    </div>
}

