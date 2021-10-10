import React, { useEffect } from 'react';
import s from './canvas.module.css';

const Canvas = () => {
    useEffect(() => {
        // canvasState=> set(State)
    }, []);

    return (
        <div className={s.canvas}>
            <canvas width={650} height={450} />
        </div>
    );
};

export default Canvas;
