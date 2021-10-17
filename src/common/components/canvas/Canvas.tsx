import React, { useEffect, useRef, useState } from 'react';
import s from './canvas.module.css';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from '../../../app/store';
import { setDataURLCanvas } from '../../../features/canvasSlice';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>();
    const tool = useSelector<AppRootStateType, string>((state) => state.toolBar.activeTool);
    const outlineColor = useSelector<AppRootStateType, string>((state) => state.toolBar.outlineColor);
    const fillColor = useSelector<AppRootStateType, string>((state) => state.toolBar.fillColor);
    const width = useSelector<AppRootStateType, number>((state) => state.toolBar.lineWidth);
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [canvasData, setCanvasData] = useState<ImageData | undefined>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
            dispatch(setDataURLCanvas({ dataURL: canvasRef.current.toDataURL() }));
        }
    }, []);

    const onMouseDownHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLCanvasElement;
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
            setStartX(e.pageX - target.offsetLeft);
            setStartY(e.pageY - target.offsetTop);
            setIsPainting(true);
            setCanvasData(ctx.getImageData(0, 0, 850, 550));
            if (tool === 'clear') {
                ctx.clearRect(0, 0, 850, 550);
            }
        }
    };

    const onMouseMoveHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLCanvasElement;
        if (isPainting && ctx && startX && startY && canvasRef.current) {
            ctx.strokeStyle = outlineColor;
            ctx.fillStyle = fillColor;
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
                    ctx.beginPath();
                    ctx.fillRect(startX, startY, width, height);
                    ctx.strokeRect(startX, startY, width, height);

                    break;
                case 'circle': {
                    let currentX = e.pageX - target.offsetLeft;
                    let currentY = e.pageY - target.offsetTop;
                    let width = currentX - startX;
                    let height = currentY - startY;
                    let r = Math.sqrt(width ** 2 + height ** 2);
                    ctx.clearRect(0, 0, 850, 550);
                    if (canvasData) {
                        ctx.putImageData(canvasData, 0, 0);
                    }
                    ctx.beginPath();
                    ctx.arc(startX, startY, r, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.stroke();
                    break;
                }
                case 'eraser':
                    ctx.strokeStyle = 'white';
                    ctx.lineTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
                    ctx.stroke();
                    break;
                case 'line': {
                    let currentX = e.pageX - target.offsetLeft;
                    let currentY = e.pageY - target.offsetTop;
                    ctx.clearRect(0, 0, 850, 550);
                    if (canvasData) {
                        ctx.putImageData(canvasData, 0, 0);
                    }
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(currentX, currentY);
                    ctx.stroke();
                    break;
                }
                default:
                    break;
            }
        }
    };

    const onMouseUpHandler = () => {
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
