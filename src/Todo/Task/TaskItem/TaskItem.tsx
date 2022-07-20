import React from 'react';
import s from './style.module.css';
import "react-datepicker/dist/react-datepicker.css";
import {editTask} from "../../../Store/listReducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    order: number
    title: string
    addedDate: string
    deadline: string
    id: string
    priority: number
    startDate: string
    status: number
    todoListId: string
    description: string
}

type TaskItemPropsType = {
    task: TaskPropsType
    dateTime: (e:string) => string
    confirmDeletionList: (e: React.MouseEvent<HTMLButtonElement>) => void
    editTaskMode: (e: React.MouseEvent<HTMLButtonElement>) => void
    currentPage: number
}


export const TaskItem: React.FC<TaskItemPropsType> = ({task,
                                                          dateTime,
                                                          confirmDeletionList,
                                                          editTaskMode,
                                                          currentPage}) => {
    const {title, addedDate, deadline, id, priority, startDate, status, todoListId, description} = task;
    const dispatch = useDispatch();

    const priorityTask = (e: number) => {
        switch(e){
            case 0:
                return <div className={s.low}>LOW</div>
            case 1:
                return <div className={s.med}>MEDIUM</div>
            case 2:
                return <div className={s.high}>HIGH</div>
            case 3:
                return <div className={s.veryHigh}>VERY HIGH</div>
            default:
                return <div className={s.lov}>LOW</div>
        }
    }

    const completeTask = () => {
        let value = {...task}
        if(task.status === 0){
            value.status = 1
        }else{
            value.status = 0
        }
        dispatch(editTask(value, todoListId, id, 5, currentPage))
    }

    return <div className={s.task}>
        <div className={s.editBar}>
            <b className={s.editButton} onClick={editTaskMode}>&#9998;</b>
            <b className={s.deleteTask} onClick={confirmDeletionList}>✖</b>
        </div>
        <div className={s.taskBody}>
            <div className={s.titleBlock}>
                <div onClick={completeTask}>
                    {status === 1 ?
                        <div className={s.completeTrue}>✔</div>
                        :
                        <div className={s.completeFalse}>✔</div>
                    }
                </div>
                <h1 className={s.title}>{title}</h1>
            </div>

            <p className={s.description}>{description}</p>
            <div>
                <div className={s.dateBlock}>
                    <div className={s.date}>
                        <span className={s.howDate}>Start date:</span>  {dateTime(startDate)}
                    </div>
                    <div className={s.date}>
                        <span className={s.howDate}>Deadline:</span>  {dateTime(deadline)}
                    </div>
                </div>
                <div className={s.rightDate}>
                    <div className={s.priority}>
                        Priority:
                        <span className={s.priorityLevel}>
                            {priorityTask(priority)}
                        </span>
                    </div>
                    <div className={s.howDate}>{dateTime(addedDate)}</div>
                </div>
            </div>
        </div>
    </div>
}