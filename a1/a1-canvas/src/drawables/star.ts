// Star Picture
import { Picture, PictureConfiguration } from "./picture";


interface StarConfiguration extends PictureConfiguration {
    colors: string[];
    stroke: string;
    spikes: number;
    outerRadius: number;
    innerRadius: number;
};


export class Star extends Picture {
    configuration: Array<StarConfiguration>;
    constructor(public x: number, public y: number, public index: number, public scale: number = 0.7) {
        super(x, y, index, scale);
        this.configuration = [
            {
                colors: ["#fdff04"],
                stroke: "black",
                spikes: 5,
                outerRadius: 40,
                innerRadius: 15
            },
            {
                colors: ["#fdff04"],
                stroke: "black",
                spikes: 7,
                outerRadius: 40,
                innerRadius: 15
            },
            {
                colors: ["#f58904"],
                stroke: "black",
                spikes: 6,
                outerRadius: 40,
                innerRadius: 15
            },
            {
                colors: ["#fdff04"],
                stroke: "black",
                spikes: 10,
                outerRadius: 40,
                innerRadius: 15
            },
            {
                colors: ["#ffd700"],
                stroke: "black",
                spikes: 4,
                outerRadius: 40,
                innerRadius: 15
            }
        ];
    }
    draw(gc: CanvasRenderingContext2D, light:boolean): void {
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
        gc.fillStyle = element.colors[0];
		gc.strokeStyle = element.stroke;
		gc.lineWidth = 5;

        let outerRadius = this.configuration[index].outerRadius;
        let innerRadius = this.configuration[index].innerRadius;
        let spikes = this.configuration[index].spikes;
        let rotation = Math.PI/2*3;
        let x = 0;
        let y = 0;
        let step = Math.PI/spikes;

        gc.beginPath();
        gc.moveTo(0, -outerRadius)
        for(let i = 0; i < spikes; i++){
            x = Math.cos(rotation)*outerRadius;
            y = Math.sin(rotation)*outerRadius;
            gc.lineTo(x,y)
            rotation += step

            x = Math.cos(rotation)*innerRadius;
            y = Math.sin(rotation)*innerRadius;
            gc.lineTo(x, y)
            rotation += step
        }
        gc.lineTo(0, -outerRadius);
        gc.closePath();
        gc.stroke();
        gc.fill();

        gc.restore();
    }
}
