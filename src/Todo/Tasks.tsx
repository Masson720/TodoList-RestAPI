import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteTask} from "../Store/listReducer";
import {DeleteTask} from "./Task/TaskItem/DeleteTaskItem/DeleteTaskItem";
import s from "./style.module.css";
import {TaskEditMode} from "./Task/TaskItem/EditTaskItem/EditTaskItem";
import {TaskItem} from "./Task/TaskItem/TaskItem";
import {ItemsPropsType} from "./Task/TaskPage";

export type TaskPropsType = {
    task: ItemsPropsType
    dateTime: (e: string) => string
    currentPage: number
};

export const Tasks: React.FC<TaskPropsType> = ({task, dateTime, currentPage}) => {
    const dispatch = useDispatch();
    const [deleteMode, setDeleteMode] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const confirmDeletionList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if(deleteMode){
            setDeleteMode(false)
        }else {
            setDeleteMode(true)
        };
    };

    const deleteThisTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setDeleteMode(false)
        dispatch(deleteTask(task.todoListId, task.id, 5 * (currentPage - 1), 1))
    };

    const editTaskMode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setEditMode(true)
    };

    if(deleteMode){
        return <DeleteTask deleteThisTask={deleteThisTask} confirmDeletionList={confirmDeletionList}/>
    }else if(editMode){
        return <div className={s.task}>
            <TaskEditMode task={task} setEditMode={setEditMode} currentPage={currentPage}/>
        </div>
    }else {
        return <TaskItem task={task} dateTime={dateTime} confirmDeletionList={confirmDeletionList}
                         editTaskMode={editTaskMode} currentPage={currentPage}

        />
    };

};