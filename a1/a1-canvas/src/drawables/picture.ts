// Abstract class for all drawable objects


export interface PictureConfiguration {
    circles?: number;
    width?: number;
    colors: string[];
    stroke?: string;
    spikes?: number;
    outerRadius?: number;
    innerRadius?: number;
}


export abstract class Picture {
	x: number;
	y: number;
    index: number;
    scale: number;
    configuration: Array<PictureConfiguration>;
	constructor(x: number, y: number, index: number, scale = 0.7) {
		this.x = x;
		this.y = y;
        this.index = index;
        this.scale = scale;
        this.configuration = [];
	}
    abstract draw(gc: CanvasRenderingContext2D, light: boolean):void;
}
