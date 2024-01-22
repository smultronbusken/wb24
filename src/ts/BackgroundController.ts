class BackgroundController {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private backgroundImage?: HTMLImageElement;

    constructor() {
        const canvasElement = document.getElementById('backgroundCanvas');
        if (!(canvasElement instanceof HTMLCanvasElement)) {
            throw new Error("Cannot find canvas element");
        }

        const context = canvasElement.getContext('2d');
        if (!context) {
            throw new Error("Failed to get canvas context");
        }

        this.canvas = canvasElement;
        this.ctx = context;
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        this.resizeCanvas();
    }

    public load(backgroundURL: string) {
        const img = new Image();
        img.src = backgroundURL;

        img.onload = () => {
            this.backgroundImage = img; // Store the loaded image
            this.drawBackground();
        };
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawBackground();
    }

    private drawBackground() {
        if (!this.backgroundImage) {
            return;
        }

        const scale = Math.max(this.canvas.width / this.backgroundImage.width, this.canvas.height / this.backgroundImage.height);
        const x = (this.canvas.width - this.backgroundImage.width * scale) / 2;
        const y = (this.canvas.height - this.backgroundImage.height * scale) / 2;
        this.ctx.drawImage(this.backgroundImage, x, y, this.backgroundImage.width * scale, this.backgroundImage.height * scale);
    }
}

export default BackgroundController;
