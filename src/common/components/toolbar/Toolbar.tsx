import React from 'react';
import s from './toolbar.module.css';
import { AppRootStateType, useAppDispatch } from '../../../app/store';
import { chooseColor, chooseLineWidth, chooseTool } from '../../../features/toolSlice';
import { useSelector } from 'react-redux';

const Toolbar = () => {
    const toolsLeftBlock: string[] = ['brush', 'rect', 'circle', 'eraser', 'line'];
    const toolsRightBlock: string[] = ['undo', 'redo', 'save'];
    const dispatch = useAppDispatch();
    const activeTool = useSelector<AppRootStateType, string>((state) => state.toolBar.activeTool);
    const color = useSelector<AppRootStateType, string>((state) => state.toolBar.color);
    const lineWidth = useSelector<AppRootStateType, number>((state) => state.toolBar.lineWidth);

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
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => dispatch(chooseColor({ color: e.target.value }))}
                    />
                </div>
                <div className={s.toolbar_lineWidth}>
                    <div className={s.lineWidth_text}>Line width :</div>
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
                {toolsRightBlock.map((name) => {
                    return (
                        <button
                            key={name}
                            className={`${s.toolbar_btn} ${s[name]}`}
                            onClick={() => dispatch(chooseTool({ activeTool: name }))}
                        ></button>
                    );
                })}
            </div>
        </div>
    );
};

export default Toolbar;
