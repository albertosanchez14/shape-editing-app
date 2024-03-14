import { Subject } from "./observer";


export interface ColorForm {
	selected: boolean; 
	hue: number; 
	luminance: number; 
	saturation: number;
	radius?: number;
	points?: number;
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
			this.add_shape();
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
	add_shape() {
		if (this._colors_hl.length >= 20) { return; }
		const hue = Math.floor(Math.random() * 360);
		const luminance = 50;
		const saturation = 100;
		const selected = false;
		this._colors_hl.push({ selected, hue, luminance, saturation });
		this.notifyObservers();
	}
	add_star() {
		if (this._colors_hl.length >= 20) { return; }
		const hue = Math.floor(Math.random() * 360);
		const luminance = 50;
		const saturation = 100;
		const selected = false;
		const radius = Math.floor(Math.random() * (45 - 20) + 20);
		const points = Math.floor(Math.random() * (10 - 3) + 3);
		this._colors_hl.push({ selected, hue, luminance, saturation, radius, points });
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
		console.log(this._colors_hl);
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
				if (Number(value) <= 360 && Number(value) >= 0) {
					this._colors_hl[pos].hue = Number(value); 
				} 
			}
			if (index === 1) {
				if (Number(value) <= 45 && Number(value) >= 20) {
					this._colors_hl[pos].radius = Number(value); 
				} else if (Number(value) < 20) {
					this._colors_hl[pos].radius = Number(value);
				}
			}
			if (index === 2) { 
				if (Number(value) <= 10 && Number(value) >= 3) {
					this._colors_hl[pos].points = Number(value); 
				} else if (Number(value) < 3) {
					this._colors_hl[pos].points = Number(value);
				}
			}
		}
		this.notifyObservers();
	}

	hue_to_color(element: ColorForm) {
		return `hsl(${element.hue}, ${element.saturation}%, ${element.luminance}%)`;
	}
}
