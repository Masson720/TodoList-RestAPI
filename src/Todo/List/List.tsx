import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addList, deleteList, editList, requestList} from "../../Store/listReducer";
import {Preloader} from "../../Preloader/Preloader";
import {ListType} from "../ListBody";
// @ts-ignore
import {useHistory, Route} from "react-router-dom";
import s from "./style.module.css";
import {AddListMenu} from "../../AddMenus/AddListBar/AddListBar";
import {EditListMode} from "./ListItem/ListEditMode";

type ListsPropsType = {
    lists: Array<ListType>
    dateTime: (e: string) => string
}

export const Lists: React.FC<ListsPropsType> = ({lists, dateTime}) => {
    const history = useHistory()
    const [loaded, setLoaded] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestList())
    }, [])

    useEffect(() => {
        if(lists.length > 0){
            setLoaded(true)
        }else{
            setLoaded(false)
        }
    }, [lists])

    const addListMenu = () => {
        setAddMode(true)
        history.push('/lists/addList')
    }

    return <div className={s.body}>
        <Route path='/lists/addList' render={() => <AddListMenu setAddMode={setAddMode}/>}/>
        {addMode ? null : <div className={s.addBar} onClick={addListMenu}>+</div>}

        {loaded ? lists.map((e: ListType) => <TodoItem
            dateTime={dateTime} id={e.id} order={e.order}
            title={e.title}
            addedDate={e.addedDate} />) :
                <Preloader
            />}
    </div>
}



export const TodoItem: React.FC<ListType> = ({id, order, title, dateTime, addedDate} ) => {
    const dispatch = useDispatch()
    const [deleteMode, setDeleteMode] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const history = useHistory()

    const confirmDeletionList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if(deleteMode){
            setDeleteMode(false)
        }else {
            setDeleteMode(true)
        }
    }

    const deleteTodoList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setDeleteMode(false)
        dispatch(deleteList(id))
    }

    const openList = () => {
        history.push({
            pathname: '/tasks/',
            search: `${id}`
        })
    }

    const editList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setEditMode(true)
    }


    if(deleteMode){
        return <div className={s.list}>
            <h1 className={s.deleteMode}>Delete this list?</h1>
            <div className={s.deleteButtons}>
                <button className={s.confirmDeleteButton + ' ' + s.buttonRed} onClick={deleteTodoList}>Yes</button>
                <button className={s.confirmDeleteButton + ' ' + s.buttonBlue} onClick={confirmDeletionList}>No</button>
            </div>
        </div>
    } else if(editMode){
        return <div className={s.list}>
            <EditListMode title={title} setEditMode={setEditMode} listID={id}/>
        </div>
    } else {
        return <div className={s.list} onClick={openList}>
            <div className={s.editBar}>
                <b className={s.editListButton} onClick={editList}>&#9998;</b>
                <b className={s.deleteButton} onClick={confirmDeletionList}>✖</b>
            </div>
            <div className={s.description}>
                <h1 className={s.title}>{title}</h1>
                <b className={s.date}>{dateTime(addedDate)}</b>
            </div>

        </div>
    }

}
