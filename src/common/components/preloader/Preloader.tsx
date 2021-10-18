import React from 'react';
import s from './preloader.module.css';
import LoaderGif from '../../../assets/img/loader.gif';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../app/store';
import { statusType } from '../../../features/appSlice';

const Preloader = () => {
    const status = useSelector<AppRootStateType, statusType>((state) => state.app.status);

    if (status === 'idle') {
        return null;
    }
    return (
        <div className={s.loaderContainer}>
            <div className={s.loader}>
                <img src={LoaderGif} alt="preloader" className={s.img} />
            </div>
        </div>
    );
};

export default Preloader;
