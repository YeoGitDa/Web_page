import { useEffect, useRef } from 'react';

const Squares = ({
    speed = 0.5,
    squareSize = 50,
    direction = 'diagonal',
    borderColor = '#fff',
    hoverFillColor = '#222'
}) => {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let offset = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e) => {
            mousePos.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        const drawSquares = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / squareSize) + 2;
            const rows = Math.ceil(canvas.height / squareSize) + 2;

            for (let i = -1; i < rows; i++) {
                for (let j = -1; j < cols; j++) {
                    let x = j * squareSize;
                    let y = i * squareSize;

                    switch (direction) {
                        case 'up':
                            y -= offset;
                            break;
                        case 'down':
                            y += offset;
                            break;
                        case 'left':
                            x -= offset;
                            break;
                        case 'right':
                            x += offset;
                            break;
                        case 'diagonal':
                            x -= offset;
                            y -= offset;
                            break;
                    }

                    if (direction === 'up' || direction === 'diagonal') {
                        y = y % squareSize === 0 ? y : y % squareSize + Math.floor(y / squareSize) * squareSize;
                        if (y < -squareSize) y += (rows + 1) * squareSize;
                    }
                    if (direction === 'down') {
                        if (y > canvas.height) y -= (rows + 1) * squareSize;
                    }
                    if (direction === 'left' || direction === 'diagonal') {
                        x = x % squareSize === 0 ? x : x % squareSize + Math.floor(x / squareSize) * squareSize;
                        if (x < -squareSize) x += (cols + 1) * squareSize;
                    }
                    if (direction === 'right') {
                        if (x > canvas.width) x -= (cols + 1) * squareSize;
                    }

                    const isMouseOver = mousePos.current.x >= x &&
                        mousePos.current.x <= x + squareSize &&
                        mousePos.current.y >= y &&
                        mousePos.current.y <= y + squareSize;

                    if (isMouseOver) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(x, y, squareSize, squareSize);
                    }

                    ctx.strokeStyle = borderColor;
                    ctx.lineWidth = 0.4;
                    ctx.strokeRect(x, y, squareSize, squareSize);
                }
            }

            offset += speed;
            if (offset > squareSize) offset = 0;

            animationFrameId = requestAnimationFrame(drawSquares);
        };

        window.addEventListener('mousemove', handleMouseMove);
        drawSquares();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [speed, squareSize, direction, borderColor, hoverFillColor]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default Squares;