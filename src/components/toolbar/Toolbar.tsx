import React from 'react';
import s from './toolbar.module.scss';
import { AppRootStateType, useAppDispatch } from '../../redux/store';
import { chooseFillColor, chooseLineWidth, chooseOutlineColor, chooseTool } from '../../redux/features/toolSlice';
import { useSelector } from 'react-redux';

const Toolbar = () => {
    const toolsLeftBlock: string[] = ['brush', 'rect', 'circle', 'line', 'eraser', 'clear'];
    const dispatch = useAppDispatch();
    const activeTool = useSelector<AppRootStateType, string>((state) => state.toolBar.activeTool);
    const lineWidth = useSelector<AppRootStateType, number>((state) => state.toolBar.lineWidth);
    const outlineColor = useSelector<AppRootStateType, string>((state) => state.toolBar.outlineColor);
    const fillColor = useSelector<AppRootStateType, string>((state) => state.toolBar.fillColor);

    return (
        <div className={s.toolbar}>
            {toolsLeftBlock.map((name) => {
                return (
                    <button
                        key={name}
                        className={`${s[name]}  ${activeTool === name ? s.activeBtn : ''}`}
                        onClick={() => dispatch(chooseTool({ activeTool: name }))}
                    />
                );
            })}

            <div className={s.colorContainer}>
                <div className={s.text}>Line color</div>
                <input
                    type="color"
                    value={outlineColor}
                    onChange={(e) => dispatch(chooseOutlineColor({ color: e.target.value }))}
                />
            </div>
            <div className={s.colorContainer}>
                <div className={s.text}>Fill color</div>
                <input
                    type="color"
                    value={fillColor}
                    onChange={(e) => dispatch(chooseFillColor({ color: e.target.value }))}
                />
            </div>

            <div className={s.lineWidthContainer}>
                <div className={s.text}>Line width</div>
                <input
                    type="number"
                    value={lineWidth}
                    min={1}
                    max={50}
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
    );
};

export default Toolbar;
