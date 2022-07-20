import React from 'react';
import s from './style.module.css'
import LoadGif from '../Assets/30.gif'

export const Preloader: React.FC = () => {
    return <div className={s.preloaderBlock}>
        <img className={s.loadGif} src={LoadGif}/>
    </div>
}
