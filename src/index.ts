
window.onload = () => {
    

};

import AudioPlayer from './AudioPlayer';

const audioPlayer = new AudioPlayer();
const audioUrl = 'https://weeklybeats.s3.amazonaws.com/music/2024/smultron_weeklybeats-2024_3_captain-of-the-sky-[2].mp3'; 
audioPlayer.playAudio(audioUrl).then(() => {
    console.log('Audio is playing');
}).catch((error) => {
    console.error('Error occurred:', error);
});


document.addEventListener('DOMContentLoaded', () => {
    let c: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    const canvasElement = document.getElementById('backgroundCanvas');
    if (!canvasElement) return;
    // Assert that canvasElement is an HTMLCanvasElement
    if (canvasElement instanceof HTMLCanvasElement) {
        const aaa = canvasElement.getContext('2d');
        if (aaa)
            ctx = aaa;

        c = canvasElement;
        // Function to resize the canvas
        const resizeCanvas =  () => {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
            drawBackground();
        }

        // Function to draw the background image
        const drawBackground =  () => {
            const img = new Image();
            img.src = '../media/bg.png'; // Replace with your image path
            img.onload = () => {
                // Resize and draw image to cover canvas
                const scale = Math.max(c.width / img.width, c.height / img.height);
                const x = (c.width / 2) - (img.width / 2) * scale;
                const y = (c.height / 2) - (img.height / 2) * scale;
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                console.log("hejj");
            };
        }

        // Resize the canvas to fill browser window dynamically
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
    } else {
        console.error('Element is not a canvas');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const controlButton = document.getElementById('audioControl');
    if (controlButton) {
        controlButton.addEventListener('click', () => {
            if (audioPlayer.isPlaying) {
                audioPlayer.pause();
                controlButton.textContent = 'Play';
            } else {
                audioPlayer.playAudio(audioUrl).catch(console.error);
                controlButton.textContent = 'Pause';
            }
        });
    }
});