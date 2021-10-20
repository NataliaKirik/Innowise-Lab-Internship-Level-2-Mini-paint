import React from 'react';
import s from './preloader.module.scss';
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
            <div>
                <img src={LoaderGif} alt="preloader" />
            </div>
        </div>
    );
};

export default Preloader;
