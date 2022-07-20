import React, {useEffect, useState} from 'react';
import s from './style.module.css';
import {Preloader} from "../../Preloader/Preloader";
// @ts-ignore
import {useHistory, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadingTasks, reorderTask, requestTasks} from "../../Store/listReducer";
import "react-datepicker/dist/react-datepicker.css";
import {AddTaskForm} from "../../AddMenus/AddTaskBar/AddTaskForm";
import {Tasks} from "../Tasks";

type TasksPropsType = {
    tasks: Array<ItemsPropsType>
    dateTime: (e: string) => string
    count: number
};

export type ItemsPropsType = {
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
};

export const TaskPage: React.FC<TasksPropsType> = ({tasks, dateTime, count}) => {
    const [taskLoaded, setTaskLoaded] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [currentPage, setCurrentPage]  = useState(1);
    const [addMode, setAddMode] = useState(false)
    const [taskId, setTaskId] = useState({
        listId: '',
        taskId: '',
        putAfterItemId: ''
    });
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const id = history.location.search;
        if(fetching){
            setCurrentPage(prev => prev + 1);
            dispatch(loadingTasks(id.substring(1), 5, currentPage));
        };
    }, [fetching]);

    useEffect(()=> {
        if(tasks.length < count){
            setFetching(false);
        };
        if(tasks){
            setTaskLoaded(true);
        }
    },[tasks]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {document.removeEventListener('scroll', scrollHandler)};
    }, []);

    const scrollHandler = (e: any) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
            setFetching(true);
        };
    };

    const openAddTaskMenu = () => {
        const paramURI = history.location;
        history.push({...paramURI, pathname: '/tasks/addTask/'});
    };

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: ItemsPropsType) => {
        setTaskId({
            ...taskId, listId: card.todoListId, taskId: card.id
        });
    };

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        const isDropDefined =taskId.taskId !== taskId.putAfterItemId;
        const isDropPresent = taskId.putAfterItemId !== "";
        if(isDropDefined && isDropPresent){
            dispatch(reorderTask(taskId.listId,
                taskId.taskId,
                {putAfterItemId: taskId.putAfterItemId},
                currentPage))

        };
        setTaskId({
            ...taskId, taskId: '', listId: '', putAfterItemId: ''
        });
        const style = e.currentTarget.style;
        style.boxShadow = 'none';
    };

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        const style = e.currentTarget.style;
        style.boxShadow = 'none';
    }

    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const style = e.currentTarget.style;
        style.boxShadow = '0 5px 5px grey';
    };

    const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: ItemsPropsType) => {
        e.preventDefault();
        setTaskId({
            ...taskId, putAfterItemId: card.id
        });
    };

    return <div className={s.body}>
        <Route path='/tasks/addTask/' render={() => <AddTaskForm
            setAddMode={setAddMode}/>}
        />
        {addMode ? null : <div className={s.addBar} onClick={openAddTaskMenu}>+</div>}
        {
            taskLoaded ? tasks.map((card: ItemsPropsType) => <div className={s.task} draggable={true}
                                                            onDragStart={(e) => dragStartHandler(e, card)}
                                                            onDragEnd={(e) => dragEndHandler(e)}
                                                            onDragLeave={(e)=> dragLeaveHandler(e)}
                                                            onDragOver={(e) => dragOverHandler(e)}
                                                            onDrop={(e) => dropHandler(e, card)}
            >
            <Tasks task={card} dateTime={dateTime} currentPage={currentPage}/>
        </div>) :
            <Preloader/>}
    </div>
};
