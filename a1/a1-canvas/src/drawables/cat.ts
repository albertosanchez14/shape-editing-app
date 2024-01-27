import { Picture } from "./picture";


interface CatConfiguration {
	colors: string[];
}


export class Cat extends Picture {
	configuration: Array<CatConfiguration>;
	constructor(public x: number, public y: number, public index: number, public scale = 0.7) {
		super(x, y, index, scale);
		this.configuration = [
			{
				colors: ["#CEA242", "white"]
			},
			{
				colors: ["orange", "white"]
			},
			{
				colors: ["blue", "white"]
			},
			{
				colors: ["green", "white"]
			},
			{
				colors: ["grey", "white"]
			}
		]
	}
  	draw(gc: CanvasRenderingContext2D, light: boolean) {
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
		gc.strokeStyle = element.colors[1];
		gc.lineWidth = 8;

		// head white outline
		gc.beginPath();
		gc.arc(0, 0, 40, 0, 2 * Math.PI);
		gc.stroke();

		// ears
		gc.beginPath();
		// left
		gc.moveTo(-40, -48);
		gc.lineTo(-8, -36);
		gc.lineTo(-35, -14);
		gc.closePath();
		// right
		gc.moveTo(40, -48);
		gc.lineTo(8, -36);
		gc.lineTo(35, -14);
		gc.closePath();
		gc.stroke();
		gc.fill();

		// head
		gc.beginPath();
		gc.arc(0, 0, 40, 0, 2 * Math.PI);
		gc.fill();

		// whites of eyes
		gc.strokeStyle = "black";
		gc.fillStyle = "white";
		gc.lineWidth = 1;
		gc.beginPath();
		// left
		gc.ellipse(-16, -9, 8, 14, 0, 0, Math.PI * 2);
		gc.fill();
		gc.stroke();
		// right
		gc.beginPath();
		gc.ellipse(16, -9, 8, 14, 0, 0, Math.PI * 2);
		gc.fill();
		gc.stroke();

		// eyeballs
		gc.fillStyle = "black";
		gc.beginPath();
		// left
		gc.arc(-16, -9, 5, 0, Math.PI * 2);
		gc.fill();
		// right
		gc.beginPath();
		gc.arc(16, -9, 5, 0, Math.PI * 2);
		gc.fill();

		gc.restore();
  	}

}
