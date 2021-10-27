import React from 'react';
import style from './preloader.module.scss';
import LoaderGif from '../../assets/img/loader.gif';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../redux/reducers/rootReducer';
import { statusType } from '../../redux/types/types';

const Preloader = () => {
    const status = useSelector<RootStateType, statusType>((state) => state.app.status);
    if (status === 'loading') {
        return (
            <div className={style.loaderContainer}>
                <div>
                    <img src={LoaderGif} alt="preloader" />
                </div>
            </div>
        );
    }
    return <></>;
};

export default Preloader;
