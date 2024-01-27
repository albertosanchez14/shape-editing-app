// BullsEye Drawable
import { Picture, PictureConfiguration } from "./picture";


interface CircleConfiguration extends PictureConfiguration {
    circles: number;
    width: number;
    colors: string[];
    stroke: string;
};


export class BullsEye extends Picture {
    configuration: Array<CircleConfiguration>;
    constructor(public x: number, public y: number, public index: number, public scale = 0.7) {
        super(x, y, index);
        this.configuration = [
            {
                circles: 3,
                width: 13,
                colors: ["red", "blue"],
                stroke: "black",
            },
            {
                circles: 4,
                width: 10,
                colors: ["black", "black"],
                stroke: "white",
            },
            {
                circles: 5,
                width: 8,
                colors: ["blue", "red"],
                stroke: "black",
            },
            {
                circles: 4,
                width: 10,
                colors: ["orange", "yellow"],
                stroke: "black",
            },
            {
                circles: 3,
                width: 13,
                colors: ["green", "yellow"],
                stroke: "black",
            }
        ];
    }
    
    draw(gc: CanvasRenderingContext2D, light: boolean): void {
        const index = this.index;
        const element = this.configuration[index];
        
        gc.save();
		gc.translate(this.x, this.y);
		gc.scale(this.scale, this.scale);

        if (light) {
			gc.globalAlpha = 0.5;
		} else {
			gc.globalAlpha = 1;
		}
		gc.fillStyle = this.configuration[index].colors[0];
		gc.strokeStyle = this.configuration[index].stroke;
		gc.lineWidth = 8;

		// Outer circle
		gc.beginPath();
		gc.arc(0, 0, 40, 0, 2 * Math.PI);
		gc.stroke();
        gc.fill();
        
        if (this.configuration[index].circles == 3) {
            // Middle circle
            gc.fillStyle = this.configuration[index].colors[1];
            gc.beginPath();
            gc.arc(0, 0, 40 - element.width, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();

            // Inner circle
            gc.fillStyle = this.configuration[index].colors[0];
            gc.beginPath();
            gc.arc(0, 0, 40 - 2*element.width, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();
        } else if (this.configuration[index].circles == 4) {
            // Middle circle
            gc.fillStyle = this.configuration[index].colors[1];
            gc.beginPath();
            gc.arc(0, 0, 40 - element.width, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();

            // Inner circle
            gc.fillStyle = this.configuration[index].colors[0];
            gc.beginPath();
            gc.arc(0, 0, 20, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();

            // Center circle
            gc.fillStyle = this.configuration[index].colors[1];
            gc.beginPath();
            gc.arc(0, 0, 10, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();
        } else if (this.configuration[index].circles == 5) {
            // Middle circle
            gc.fillStyle = this.configuration[index].colors[1];
            gc.beginPath();
            gc.arc(0, 0, 40 - element.width, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();

            // Inner circle
            gc.fillStyle = this.configuration[index].colors[0];
            gc.beginPath();
            gc.arc(0, 0, 40 - 2*element.width, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();

            // Center circle
            gc.fillStyle = this.configuration[index].colors[1];
            gc.beginPath();
            gc.arc(0, 0, 40 - 3*element.width, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();

            // Center circle
            gc.fillStyle = this.configuration[index].colors[0];
            gc.beginPath();
            gc.arc(0, 0, 40 - 4*element.width, 0, 2 * Math.PI);
            gc.stroke();
            gc.fill();
        }
        gc.restore();
    }
}
