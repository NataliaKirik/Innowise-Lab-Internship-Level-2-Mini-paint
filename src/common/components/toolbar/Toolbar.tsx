import React from 'react';
import s from './toolbar.module.css';
import { AppRootStateType, useAppDispatch } from '../../../app/store';
import { chooseFillColor, chooseLineWidth, chooseOutlineColor, chooseTool } from '../../../features/toolSlice';
import { useSelector } from 'react-redux';
import { saveArt } from '../../../firebase/db';
import { startLoading, stopLoading } from '../../../features/appSlice';

const Toolbar = () => {
    const toolsLeftBlock: string[] = ['brush', 'rect', 'circle', 'line', 'eraser', 'clear'];

    const dispatch = useAppDispatch();
    const activeTool = useSelector<AppRootStateType, string>((state) => state.toolBar.activeTool);
    const lineWidth = useSelector<AppRootStateType, number>((state) => state.toolBar.lineWidth);
    const outlineColor = useSelector<AppRootStateType, string>((state) => state.toolBar.outlineColor);
    const fillColor = useSelector<AppRootStateType, string>((state) => state.toolBar.fillColor);
    const userEmail = useSelector<AppRootStateType, string | null>((state) => state.login.userEmail);
    const userId = useSelector<AppRootStateType, string | null>((state) => state.login.uid);
    const canvasDataUrl = useSelector<AppRootStateType, string>((state) => state.canvas.dataURL);

    const onBtnSaveClick = () => {
        dispatch(startLoading('loading'));
        saveArt(userEmail, userId, canvasDataUrl).then(() => {
            dispatch(stopLoading('idle'));
        });
    };

    return (
        <div className={s.toolbar}>
            <div className={s.toolbar_leftBlock}>
                {toolsLeftBlock.map((name) => {
                    return (
                        <button
                            key={name}
                            className={`${s.toolbar_btn} ${s[name]}  ${activeTool === name ? s.activeBtn : ''}`}
                            onClick={() => dispatch(chooseTool({ activeTool: name }))}
                        ></button>
                    );
                })}
                <div>
                    <div className={s.text_input}>Line color</div>
                    <input
                        className={s.color_input}
                        type="color"
                        value={outlineColor}
                        onChange={(e) => dispatch(chooseOutlineColor({ color: e.target.value }))}
                    />
                </div>
                <div>
                    <div className={s.text_input}>Fill color</div>
                    <input
                        className={s.color_input}
                        type="color"
                        value={fillColor}
                        onChange={(e) => dispatch(chooseFillColor({ color: e.target.value }))}
                    />
                </div>
                <div className={s.toolbar_lineWidth}>
                    <div className={s.text}>Line width :</div>
                    <input
                        type="number"
                        value={lineWidth}
                        min={1}
                        max={50}
                        className={s.lineWidth_input}
                        onChange={(e) =>
                            dispatch(
                                chooseLineWidth({
                                    lineWidth: e.target.value,
                                }),
                            )
                        }
                    />
                </div>
            </div>
            <div className={s.toolbar_rightBlock}>
                <button className={`${s.toolbar_btn} ${s.save}`} onClick={onBtnSaveClick}></button>
            </div>
        </div>
    );
};

export default Toolbar;
