// Local imports
import View from "./view";
import { Model } from "./model";

import "./shapeList.css";


export class ShapeListView implements View {
    //#region observer pattern
    update(): void {
        this._clear_shapes();
        this._fill_shapes();
    }
    //#endregion

    // the view root container
    private container: HTMLDivElement;
    get root(): HTMLDivElement {
        return this.container;
    }

    constructor(private model: Model) {
        this.container = document.createElement("div");
        this.container.id = "shapelist";

        // Add event listener to the container
        this.container.addEventListener("click", () => {
            this.model.unselect_all();
        });

        // Add shapes
        this._fill_shapes();
       
        // Register with the model when we're ready
        this.model.addObserver(this);
    }

    private _clear_shapes(){
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
    private _fill_shapes(){
        this.model.colors_hl.forEach((color_hl, i) => {
            let shape: HTMLDivElement;
            if (color_hl.type === "square") { shape = this._create_colorbox(i); }
            else if (color_hl.type === "star") { shape = this._create_star(i); }
            else if (color_hl.type === "bullseye") { shape = this._create_bullseye(i); }
            else { shape = this._create_cat(i); };
            shape.addEventListener("click", (event) => {
                this.model.multiSelect = event.shiftKey;
                this.model.select_color(shape.id);
            });
            shape.addEventListener("mouseenter", () => {
                this.model.un_all = false;        
            });
            shape.addEventListener("mouseleave", () => {
                this.model.un_all = true;
            });
            if (color_hl.selected) {
                shape.style.outline = "1px solid blue";
                shape.style.outlineOffset = "2px";
            }
            this.container.appendChild(shape);
        });
    }
    private _create_colorbox(i: number): HTMLDivElement{
        const colorbox = document.createElement("div");
        colorbox.id = `colorbox_${i}`;
        colorbox.className = "shape";
        colorbox.style.backgroundColor = this.model.hue_to_color(this.model.colors_hl[i]);
        return colorbox;
    }
    private _create_star(i: number): HTMLDivElement{
        // Draw the star on a canvas of 100 x 100
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (ctx === null) { throw new Error("2d context not supported"); }
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.fillStyle = this.model.hue_to_color(this.model.colors_hl[i]);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        const inner_rad = 15;
        const outer_rad = this.model.colors_hl[i].radius as number;
        const points = this.model.colors_hl[i].points as number;
        ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outer_rad : inner_rad;
            const angle = (Math.PI / points) * i;
            const xCoordinate = centerX + radius * Math.cos(angle);
            const yCoordinate = centerY + radius * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(xCoordinate, yCoordinate);
            } else {
                ctx.lineTo(xCoordinate, yCoordinate);
            }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        // Get the scaled star image
        const scaledStar = document.createElement('canvas');
        scaledStar.width = 50;
        scaledStar.height = 50;
        const scaledCtx = scaledStar.getContext('2d');
        if (scaledCtx === null) { throw new Error("2d context not supported"); }
        scaledCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 50, 50);
        // Create the star div
        const star = document.createElement("div");
        star.id = `star_${i}`;
        star.className = "shape";
        star.appendChild(scaledStar);
        return star;
    }
    private _create_bullseye(i: number): HTMLDivElement{
        // Draw the bullseye on a canvas of 100 x 100
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (ctx === null) { throw new Error("2d context not supported"); }
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const hue = this.model.colors_hl[i].hue as number;
        const element = this.model.colors_hl[i];
        const hue2 = this.model.colors_hl[i].hue2 as number;
        const radius = this.model.colors_hl[i].radius as number;
        const rings = this.model.colors_hl[i].rings as number;
        const ringWidth = radius / rings;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        for (let i = 0; i < rings; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius - (i * ringWidth), 0, 2 * Math.PI);
            ctx.fillStyle = i % 2 === 0 ? `hsl(${hue}, ${element.saturation}%, ${element.luminance}%)` 
            : `hsl(${hue2}, ${element.saturation}%, ${element.luminance}%)`;       
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
        this.model.colors_hl[i].hue = hue;
        // Get the scaled bullseye image
        const scaledBullseye = document.createElement('canvas');
        scaledBullseye.width = 50;
        scaledBullseye.height = 50;
        const scaledCtx = scaledBullseye.getContext('2d');
        if (scaledCtx === null) { throw new Error("2d context not supported"); }
        scaledCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 50, 50);
        // Create the bullseye div
        const bullseye = document.createElement("div");
        bullseye.id = `bullseye_${i}`;
        bullseye.className = "shape";
        bullseye.appendChild(scaledBullseye);
        return bullseye;
    }
    private _create_cat(i: number): HTMLDivElement{
        // Draw the cat on a canvas of 100 x 100
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const gc = canvas.getContext('2d');
        if (gc === null) { throw new Error("2d context not supported"); }
        gc.fillStyle = this.model.hue_to_color(this.model.colors_hl[i]);
		gc.strokeStyle = "black";
		gc.lineWidth = 2;
        gc.save();
		gc.translate(canvas.width/2, canvas.height/2);
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
        let x: number;
        if (this.model.colors_hl[i].look === "left") {
            x = -3;
        } else if (this.model.colors_hl[i].look === "centre") {
            x = 0;
        } else {
            x = 3;
        }
		gc.beginPath();
		// left
		gc.arc(-16 + x, -9, 5, 0, Math.PI * 2);
		gc.fill();
		// right
		gc.beginPath();
		gc.arc(16 + x, -9, 5, 0, Math.PI * 2);
		gc.fill();
		gc.restore();        
        // Get the scaled cat image
        const scaledCat = document.createElement('canvas');
        scaledCat.width = 50;
        scaledCat.height = 50;
        const scaledCtx = scaledCat.getContext('2d');
        if (scaledCtx === null) { throw new Error("2d context not supported"); }
        scaledCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 50, 50);
        // Create the cat div
        const cat = document.createElement("div");
        cat.id = `cat_${i}`;
        cat.className = "shape";
        cat.appendChild(scaledCat);
        return cat;
    }
}
