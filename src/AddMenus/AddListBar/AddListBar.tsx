import React, {useEffect, useRef, useState} from 'react';
import s from './style.module.css'
import {addList} from "../../Store/listReducer";
import {useDispatch} from "react-redux";
// @ts-ignore
import {useHistory} from "react-router-dom";

export const AddListMenu = ({setAddMode}: any) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [values, setValues] = useState<{title: string}>({
        title: ''
    })

    const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setValues({
            ...values, title: e.target.value
        })
    }

    const submitList = () => {
        dispatch(addList(values))
        setValues({
            ...values, title: ''
        })
        closeMenu()
    }

    const closeMenu = () => {
        setAddMode(false)
        history.push('/lists')
    }

    return <div className={s.addWindow}>
        <div >
            <div className={s.banner}>
                Create a new list
            </div>
            <div className={s.form}>
                <input className={s.title} placeholder='Todo Name' onChange={changeValueHandler} value={values.title}/>
                <button className={s.submitButton} onClick={submitList}>Create Todo</button>
            </div>
            <div className={s.closeBar}>
                <div className={s.closeButton} onClick={closeMenu}></div>
            </div>

        </div>
    </div>
}