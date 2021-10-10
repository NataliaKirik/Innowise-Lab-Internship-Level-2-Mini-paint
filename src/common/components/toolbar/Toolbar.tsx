import React from 'react';
import s from './toolbar.module.css';

const Toolbar = () => {
    return (
        <div className={s.toolbar}>
            <div className={s.toolbar_leftBlock}>
                <button className={`${s.toolbar_btn} ${s.brush}`}></button>
                <button className={`${s.toolbar_btn} ${s.rect}`}></button>
                <button className={`${s.toolbar_btn} ${s.circle}`}></button>
                <button className={`${s.toolbar_btn} ${s.eraser}`}></button>
                <button className={`${s.toolbar_btn} ${s.line}`}></button>
                <div>
                    <input type="color" />
                </div>
            </div>
            <div className={s.toolbar_rightBlock}>
                <button className={`${s.toolbar_btn} ${s.undo}`}></button>
                <button className={`${s.toolbar_btn} ${s.redo}`}></button>
                <button className={`${s.toolbar_btn} ${s.save}`}></button>
            </div>
        </div>
    );
};

export default Toolbar;
