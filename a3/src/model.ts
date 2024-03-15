import { Subject } from "./observer";


export interface ColorForm {
	selected: boolean; 
	hue: number; 
	luminance: number; 
	saturation: number;
	type: string;
	radius?: number;
	points?: number;
	hue2?: number;
	rings?: number;
	look?: "left" | "centre" | "right";
}


export class Model extends Subject {
	// model data
	private _colors_hl: ColorForm[] = [];
	private _selected = 0;
	private _multiSelect = false;
	private _un_all = false;
	
	// model constructor
	constructor() {
		super();

		// Add 8 initial shapes
		for (let i = 0; i < 8; i++) {
			this.add_shape("square");
		}
	}
	get selected() {
		return this._selected;
	}
	get colors_hl() {
		return this._colors_hl;
	}
	get multiSelect() {
		return this._multiSelect;
	}
	set multiSelect(m: boolean) {
		this._multiSelect = m;
	}
	get un_all() {
		return this._un_all;
	}
	set un_all(u: boolean) {
		this._un_all = u;
	}

	// model "business logic"
	add_shape(form: string) {
		if (this._colors_hl.length >= 25) { return; }
		const hue = Math.floor(Math.random() * 360);
		const luminance = 50;
		const saturation = 100;
		const selected = false;
		this._colors_hl.push({ selected, hue, luminance, saturation, type: form});	
		if (form === "star") {
			// Choose random radius and points
			const radius = Math.floor(Math.random() * (45 - 20) + 20);
			const points = Math.floor(Math.random() * (10 - 3) + 3);
			this._colors_hl[this._colors_hl.length - 1].radius = radius;
			this._colors_hl[this._colors_hl.length - 1].points = points;
		} else if (form === "bullseye") {
			// Choose random radius, hue2, and rings
			const radius = 45;
			const hue2 = Math.floor(Math.random() * 360);
			const rings = Math.floor(Math.random() * (5 - 2) + 2);
			this.colors_hl[this.colors_hl.length - 1].radius = radius;
			this.colors_hl[this.colors_hl.length - 1].hue2 = hue2;
			this.colors_hl[this.colors_hl.length - 1].rings = rings;
		} else if (form === "cat") {
			// Choose random look
			const look = Math.random() < 0.33 ? "left" : Math.random() < 0.66 ? "centre" : "right";
			this.colors_hl[this.colors_hl.length - 1].look = look;
		}
		this.notifyObservers();
	}
	delete_shape() {
		if (this._colors_hl.length === 0) { return; }
		for (let i = this._colors_hl.length - 1; i >= 0; i--) {
			this._colors_hl[i].selected ? this._colors_hl.splice(i, 1) : null;
		}
		this._selected = 0;
		this.notifyObservers();
	}
	clear_shapes() {
		this._colors_hl = [];
		this.notifyObservers();
	}
	select_color(id: string) {
		const index = parseInt(id.split("_")[1]);
		this._selected = this._colors_hl.length;
		this._colors_hl.forEach((color, i) => {
			// single select
			if (!this._multiSelect) {
				if (i === index) { color.selected = !color.selected; } 
				else { color.selected = false; }
			// multi select
			} else if (this._multiSelect) {
				if (i === index) { color.selected = !color.selected; }
			}
			// count the number of selected shapes
			if (!color.selected) { this._selected--; }
		});
		this.notifyObservers();
	}
	unselect_all() {
		if (!this._un_all) { return; }
		this._colors_hl.forEach((color) => {
			color.selected = false;
		});
		this._selected = 0;
		this.notifyObservers();
	}
	change_shape(index: number, value: string) {
		let pos = 0;
		this._colors_hl.forEach((color, i) => {
			if (color.selected) { pos = i; }
		});
		if (!isNaN(Number(value))) {
			// Hue
			if (index === 0) {
				this._colors_hl[pos].hue = Number(value);
			}
			// Radius
			if (index === 1) {
				this._colors_hl[pos].radius = Number(value);
			}
			// Points
			if (index === 2) {
				this._colors_hl[pos].points = Number(value);
			}
			// Hue2
			if (index === 3) {
				this._colors_hl[pos].hue2 = Number(value);
			}
			// Rings
			if (index === 4) {
				this._colors_hl[pos].rings = Number(value);
			}
			// Look
			if (index === 5) {
				if (value === "left" || value === "centre" || value === "right") { 
					this._colors_hl[pos].look = value;
				}
			}
		}
		this.notifyObservers();
	}

	hue_to_color(element: ColorForm) {
		return `hsl(${element.hue}, ${element.saturation}%, ${element.luminance}%)`;
	}
}


/*
 * Validator class
 */
export class Validator {
    constructor(private min: number, private max: number) { }  

    validate(value: number): boolean {
        this.isValid = value >= this.min && value <= this.max;
        return this.isValid;
    }

    isValid = true;
}
