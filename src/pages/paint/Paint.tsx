import React, { useState } from 'react';
import Canvas from '../../components/canvas/Canvas';
import style from './toolbar.module.scss';

export const Paint = () => {
    const toolsLeftBlock: string[] = ['brush', 'rect', 'circle', 'line', 'eraser', 'clear'];
    const [activeTool, setActiveTool] = useState<string>('brush');
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [outlineColor, setOutlineColor] = useState<string>('#000000');
    const [fillColor, setFillColor] = useState<string>('#FFFFFF');

    return (
        <>
            <div className={style.toolbar}>
                {toolsLeftBlock.map((name) => {
                    return (
                        <button
                            key={name}
                            className={`${style[name]}  ${activeTool === name ? style.activeBtn : ''}`}
                            onClick={() => setActiveTool(name)}
                        />
                    );
                })}

                <div className={style.colorContainer}>
                    <div className={style.text}>Line color</div>
                    <input type="color" value={outlineColor} onChange={(e) => setOutlineColor(e.target.value)} />
                </div>
                <div className={style.colorContainer}>
                    <div className={style.text}>Fill color</div>
                    <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
                </div>

                <div className={style.lineWidthContainer}>
                    <div className={style.text}>Line width</div>
                    <input
                        type="number"
                        value={lineWidth}
                        min={1}
                        max={50}
                        onChange={(e) => setLineWidth(+e.target.value)}
                    />
                </div>
            </div>
            <Canvas activeTool={activeTool} lineWidth={lineWidth} outlineColor={outlineColor} fillColor={fillColor} />
        </>
    );
};
