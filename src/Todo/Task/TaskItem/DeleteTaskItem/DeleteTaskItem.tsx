import React from 'react';
import s from "./style.module.css";

type DeleteTaskPropsType = {
    deleteThisTask: (e: React.MouseEvent<HTMLButtonElement>) => void
    confirmDeletionTask: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const DeleteTask: React.FC<DeleteTaskPropsType> = ({deleteThisTask, confirmDeletionTask}) => {
    return <div className={s.task}>
        <div className={s.confirmDelete}>
            <h1>Delete this task?</h1>
            <div className={s.buttonsBlock}>
                <button className={s.button + ' ' + s.buttonRed} onClick={deleteThisTask}>Yes</button>
                <button className={s.button + ' ' + s.buttonBlue} onClick={confirmDeletionTask}>No</button>
            </div>
        </div>

    </div>
}