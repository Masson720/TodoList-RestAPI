import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editList} from "../../../Store/listReducer";
import s from "./style.module.css";

type EditModeType = {
    title: string
    setEditMode: (e: boolean) => void
    listID: string
}

export const EditListMode: React.FC<EditModeType> = ({title, setEditMode, listID}) => {
    const dispatch = useDispatch()
    const [editValues, setEditValues] = useState<{title: string}>({
        title: title
    })

    const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setEditValues({
            ...editValues, title: e.target.value
        })
    }

    const submitList = () => {
        dispatch(editList(editValues, listID))
        setEditValues({
            ...editValues, title: ''
        })
        closeMenu()
    }

    const closeMenu = () => {
        setEditMode(false)
    }

    return <div className={s.addWindow}>
        <div >
            <div className={s.banner}>
                Edit list
            </div>
            <div className={s.form}>
                <input className={s.title} placeholder='Todo Name' onChange={changeValueHandler} value={editValues.title}/>
                <button className={s.submitButton} onClick={submitList}>Edit List</button>
            </div>
            <div className={s.closeBar}>
                <div className={s.closeButton} onClick={closeMenu}></div>
            </div>
        </div>
    </div>
}