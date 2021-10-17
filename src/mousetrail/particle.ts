
export class Particle {

    #ctx: CanvasRenderingContext2D;
    #canvas: HTMLCanvasElement;
    #x: number;
    #y: number;
    #size: number;
    #speedX: number;
    #speedY: number;
    IsExpired = false;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.#ctx = ctx;
        this.#canvas = canvas;
        this.#x = x;
        this.#y = y;
        this.#size = Math.random() * 15 + 1;
        this.#speedX = Math.random() * 3 - 1.5;
        this.#speedY = Math.random() * 3 - 1.5;
    }

    Draw(): void {
        this.#x += this.#speedX;
        this.#y += this.#speedY;
        if (this.#size > 0.5) {
            this.#size -= 0.4;
            this.#ctx.fillStyle = "red";
            this.#ctx.beginPath();
            this.#ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2);
            this.#ctx.fill();
            this.#ctx.closePath();
        }
        else
            this.IsExpired = true;
    }

}