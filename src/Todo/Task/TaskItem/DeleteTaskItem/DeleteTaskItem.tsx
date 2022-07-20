import React from 'react';
import s from "./style.module.css";

export const DeleteTask: React.FC<any> = ({deleteThisTask, confirmDeletionList}) => {
    return <div className={s.task}>
        <div className={s.confirmDelete}>
            <h1>Delete this task?</h1>
            <div className={s.buttonsBlock}>
                <button className={s.button + ' ' + s.buttonRed} onClick={deleteThisTask}>Yes</button>
                <button className={s.button + ' ' + s.buttonBlue} onClick={confirmDeletionList}>No</button>
            </div>
        </div>

    </div>
}