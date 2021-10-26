import React, { useEffect, useRef, useState } from 'react';
import s from './canvas.module.scss';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from '../../redux/store';
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import { calculateWidthAndHeight, clearCanvasAndDrawImageData, drawByCoordinates } from './draw';
import { saveArt } from '../../redux/features/gallerySlice';
import { canvasPropsType } from './types';

const Canvas = (props: canvasPropsType) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [startX, setStartX] = useState<number>(0);
    const [startY, setStartY] = useState<number>();
    const userEmail = useSelector<AppRootStateType, string | null>((state) => state.login.userEmail);
    const userId = useSelector<AppRootStateType, string | null>((state) => state.login.uid);
    const [isPainting, setIsPainting] = useState<boolean>(false);
    const [canvasData, setCanvasData] = useState<ImageData | undefined>();
    const dispatch = useAppDispatch();
    const [undoList, setUndoList] = useState<string[]>([]);
    const redoList: string[] = [];

    useEffect(() => {
        if (canvasRef.current) {
            setContext(canvasRef.current.getContext('2d'));
        }
    }, []);

    const onMouseDownHandler = (event: React.MouseEvent) => {
        const target = event.target as HTMLCanvasElement;
        if (context) {
            context.beginPath();
            setStartX(event.pageX - target.offsetLeft);
            setStartY(event.pageY - target.offsetTop);
            setIsPainting(true);
            setCanvasData(context.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height));
            if (props.activeTool === 'clear') {
                context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            }
        }
        if (canvasRef.current) {
            setUndoList([...undoList, canvasRef.current.toDataURL()]);
        }
    };

    const onMouseMoveHandler = (event: React.MouseEvent) => {
        const target = event.target as HTMLCanvasElement;
        if (isPainting && context && startX && startY && canvasRef.current) {
            context.strokeStyle = props.outlineColor;
            context.fillStyle = props.fillColor;
            context.lineWidth = props.lineWidth;
            switch (props.activeTool) {
                case 'rect':
                    const dimensions = calculateWidthAndHeight(event, target, startX, startY);
                    clearCanvasAndDrawImageData(context, canvasRef, canvasData);
                    context.fillRect(startX, startY, dimensions.width, dimensions.height);
                    context.strokeRect(startX, startY, dimensions.width, dimensions.height);
                    break;
                case 'circle': {
                    const dimensions = calculateWidthAndHeight(event, target, startX, startY);
                    clearCanvasAndDrawImageData(context, canvasRef, canvasData);
                    let r = Math.sqrt(dimensions.width ** 2 + dimensions.height ** 2);
                    context.arc(startX, startY, r, 0, 2 * Math.PI, false);
                    context.fill();
                    context.stroke();
                    break;
                }
                case 'line': {
                    clearCanvasAndDrawImageData(context, canvasRef, canvasData);
                    context.moveTo(startX, startY);
                    drawByCoordinates(context, event, target);
                    break;
                }
                case 'brush':
                    drawByCoordinates(context, event, target);
                    break;
                case 'eraser':
                    context.strokeStyle = 'white';
                    drawByCoordinates(context, event, target);
                    break;

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
                context!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                context!.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            };
        } else {
            context!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
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
                context!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                context!.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
            };
        }
    };
    const save = () => {
        dispatch(
            saveArt({
                userEmail,
                userId,
                canvasDataUrl: canvasRef.current!.toDataURL(),
            }),
        );
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
