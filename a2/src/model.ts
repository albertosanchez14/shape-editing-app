import { Subject } from "./observer";


type ColorSquare = { 
	hue: number; 
	luminance: number; 
	saturation: number;
}


export class Model extends Subject {
	// model data
	private _colors_hl: ColorSquare[] = [];
	private _selected = 0;
	
	// model constructor
	constructor() {
		super();

		// Add 8 initial shapes
		for (let i = 0; i < 8; i++) {
			this.add_shape();
		}
	}
	get selected() {
		return this._selected;
	}
	set selected(index: number) {
		if (index > 0 || index <= this._colors_hl.length) {
		  this._selected = index;
		}
		this.notifyObservers();
	}
	get colors_hl() {
		return this._colors_hl;
	}

	// model "business logic"
	add_shape() {
		const hue = Math.floor(Math.random() * 360);
		const luminance = 50;
		const saturation = 100;
		this._colors_hl.push({ hue, luminance, saturation });
		this.notifyObservers();
	}
	delete_shape() {
		this._colors_hl.pop();
		this.notifyObservers();
	}
	clear_shapes() {
		this._colors_hl = [];
		this.notifyObservers();
	}


	hue_to_color(element: ColorSquare) {
		return `hsl(${element.hue}, ${element.saturation}%, ${element.luminance}%)`;
	}
}
