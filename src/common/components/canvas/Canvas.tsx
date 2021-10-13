import React, { useEffect, useRef, useState } from 'react';
import s from './canvas.module.css';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../app/store';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>();
    const tool = useSelector<AppRootStateType, string>((state) => state.toolBar.activeTool);
    const color = useSelector<AppRootStateType, string>((state) => state.toolBar.color);
    const width = useSelector<AppRootStateType, number>((state) => state.toolBar.lineWidth);
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [canvasData, setCanvasData] = useState<ImageData | undefined>();

    useEffect(() => {
        canvasRef.current && setCtx(canvasRef.current.getContext('2d'));
    }, []);

    const clearCanvas = () => {
        ctx && ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    };

    const onMouseDownHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLCanvasElement;
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
            setStartX(e.pageX - target.offsetLeft);
            setStartY(e.pageY - target.offsetTop);
            setIsPainting(true);
            setCanvasData(ctx.getImageData(0, 0, 850, 550));
        }
    };

    const onMouseMoveHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLCanvasElement;
        if (isPainting && ctx && startX && startY && canvasRef.current) {
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            switch (tool) {
                case 'brush':
                    ctx.lineTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
                    ctx.stroke();
                    break;
                case 'rect':
                    let currentX = e.pageX - target.offsetLeft;
                    let currentY = e.pageY - target.offsetTop;
                    let width = currentX - startX;
                    let height = currentY - startY;
                    ctx.clearRect(0, 0, 850, 550);
                    if (canvasData) {
                        ctx.putImageData(canvasData, 0, 0);
                    }
                    ctx.strokeRect(startX, startY, width, height);
                    break;
                case 'circle':
                    break;
                case 'eraser':
                    break;
                case 'line':
                    break;
                default:
                    break;
            }
        }
    };

    const onMouseUpHandler = (e: React.MouseEvent) => {
        setIsPainting(false);
    };

    return (
        <div className={s.canvas}>
            <canvas
                ref={canvasRef}
                onMouseDown={onMouseDownHandler}
                onMouseMove={onMouseMoveHandler}
                onMouseUp={onMouseUpHandler}
                width="850px"
                height="550px"
            />
        </div>
    );
};

export default Canvas;
