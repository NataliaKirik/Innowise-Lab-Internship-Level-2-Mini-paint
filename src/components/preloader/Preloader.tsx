import React from 'react';
import s from './preloader.module.scss';
import LoaderGif from '../../assets/img/loader.gif';
import { useSelector } from 'react-redux';
import { statusType } from '../../redux/features/appSlice';
import { RootStateType } from '../../redux/reducers/rootReducer';

const Preloader = () => {
    // @ts-ignore
    const status = useSelector<RootStateType, statusType>((state) => state.app.status);

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
