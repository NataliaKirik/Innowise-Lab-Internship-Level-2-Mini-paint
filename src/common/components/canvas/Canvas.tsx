import React, { useEffect, useRef, useState } from 'react';
import s from './canvas.module.scss';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from '../../../app/store';
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import { startLoading, stopLoading } from '../../../features/appSlice';
import { saveArt } from '../../../firebase/db';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>();
    const userEmail = useSelector<AppRootStateType, string | null>((state) => state.login.userEmail);
    const userId = useSelector<AppRootStateType, string | null>((state) => state.login.uid);
    const tool = useSelector<AppRootStateType, string>((state) => state.toolBar.activeTool);
    const outlineColor = useSelector<AppRootStateType, string>((state) => state.toolBar.outlineColor);
    const fillColor = useSelector<AppRootStateType, string>((state) => state.toolBar.fillColor);
    const width = useSelector<AppRootStateType, number>((state) => state.toolBar.lineWidth);
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [canvasData, setCanvasData] = useState<ImageData | undefined>();
    const dispatch = useAppDispatch();
    const [undoList, setUndoList] = useState<string[]>([]);
    const redoList: string[] = [];

    useEffect(() => {
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
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
            setCanvasData(ctx.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height));
            if (tool === 'clear') {
                ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            }
        }
        if (canvasRef.current) {
            setUndoList([...undoList, canvasRef.current.toDataURL()]);
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
                    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
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
                    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
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
                    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
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

    const undo = () => {
        if (undoList.length > 0) {
            let dataUrl = undoList.pop();
            redoList.push(canvasRef.current!.toDataURL());
            let img = new Image();
            if (typeof dataUrl === 'string') {
                img.src = dataUrl;
            }
            img.onload = () => {
                ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                ctx!.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            };
        } else {
            ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        }
    };
    const redo = () => {
        if (redoList.length > 0) {
            let dataUrl = redoList.pop();
            undoList.push(canvasRef.current!.toDataURL());
            let img = new Image();
            if (typeof dataUrl === 'string') {
                img.src = dataUrl;
            }
            img.onload = () => {
                ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                ctx!.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            };
        }
    };
    const save = () => {
        dispatch(startLoading('loading'));
        saveArt(userEmail, userId, canvasRef.current!.toDataURL()).then(() => {
            dispatch(stopLoading('idle'));
        });
    };

    return (
        <div className={s.mainWrapper}>
            <canvas
                ref={canvasRef}
                onMouseDown={onMouseDownHandler}
                onMouseMove={onMouseMoveHandler}
                onMouseUp={onMouseUpHandler}
                width="950px"
                height="570px"
            />
            <div className={s.buttonsContainer}>
                <IconButton color="primary" className={s.button} onClick={undo}>
                    <UndoIcon fontSize={'large'} />
                </IconButton>
                <IconButton color="primary" className={s.button} onClick={redo}>
                    <RedoIcon fontSize={'large'} />
                </IconButton>
                <IconButton color="primary" className={s.button} onClick={save}>
                    <SaveIcon fontSize={'large'} />
                </IconButton>
            </div>
        </div>
    );
};

export default Canvas;
