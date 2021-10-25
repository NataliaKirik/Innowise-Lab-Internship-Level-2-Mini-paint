import React from 'react';

export function calculateWidthAndHeight(
    event: React.MouseEvent,
    target: HTMLCanvasElement,
    startX: number,
    startY: number,
) {
    const currentX = event.pageX - target.offsetLeft;
    const currentY = event.pageY - target.offsetTop;
    const width = currentX - startX;
    const height = currentY - startY;
    return {
        width,
        height,
    };
}

export function drawByCoordinates(
    context: CanvasRenderingContext2D,
    event: React.MouseEvent,
    target: HTMLCanvasElement,
) {
    let currentX = event.pageX - target.offsetLeft;
    let currentY = event.pageY - target.offsetTop;
    context.lineTo(currentX, currentY);
    context.stroke();
}

export function clearCanvasAndDrawImageData(
    context: CanvasRenderingContext2D,
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    canvasData: ImageData | undefined,
) {
    context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    if (canvasData) {
        context.putImageData(canvasData, 0, 0);
    }
    context.beginPath();
}
