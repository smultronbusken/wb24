import { useEffect, useRef } from "react";
import { Track } from "../data/tracks";

type CanvasBackgroundProps = {
    track: Track;
};

export const CanvasBackground = ({ track }: CanvasBackgroundProps) => {
    const backgroundImage = useRef(new Image()); // Use a ref for the image

    useEffect(() => {
        
        const canvasElement = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
        if (!canvasElement) {
            throw new Error("Cannot find canvas element");
        }

        const context = canvasElement.getContext('2d');
        if (!context) {
            throw new Error("Failed to get canvas context");
        }

        const resizeCanvas = () => {
            canvasElement.width = window.innerWidth;
            canvasElement.height = window.innerHeight;
            drawBackground(canvasElement, context);
        };

        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    useEffect(() => {
        load(track);
    }, [track]);

    const load = async (track: Track) => {
        const img = backgroundImage.current;
        img.src = track.backgroundURL;
        img.onload = () => {
            const canvasElement = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
            const context = canvasElement?.getContext('2d');
            if (canvasElement && context) {
                drawBackground(canvasElement, context);
            }
        };
    };

    const drawBackground = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        if (!backgroundImage.current) return;

        const scale = Math.max(canvas.width / backgroundImage.current.width, canvas.height / backgroundImage.current.height);
        const x = (canvas.width - backgroundImage.current.width * scale) / 2;
        const y = (canvas.height - backgroundImage.current.height * scale) / 2;
        ctx.drawImage(backgroundImage.current, x, y, backgroundImage.current.width * scale, backgroundImage.current.height * scale);
    };

    return (
        <canvas id="backgroundCanvas" className="absolute w-full h-full"></canvas>
    );
};

export default CanvasBackground;
