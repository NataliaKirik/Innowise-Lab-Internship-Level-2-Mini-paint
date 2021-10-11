import React, { useEffect, useRef } from 'react';
import s from './canvas.module.css';
import { useDispatch } from 'react-redux';
import { setStateCanvas } from '../../../features/paintSlice';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas!.getContext('2d');
        console.log(context);
    }, []);

    return (
        <div className={s.canvas}>
            <canvas ref={canvasRef} width={650} height={450} />
        </div>
    );
};

export default Canvas;
