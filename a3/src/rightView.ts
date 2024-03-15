// local imports
import { Model, ColorForm, Validator } from "./model";
import View from "./view";

// styles
import "./rightView.css";


export class RightView implements View {
    //#region observer pattern
    update(): void {
        // Case 1 : no color selected
        this.model.selected === 0 ? this._no_color_select() : null;
        // Case 2 : 1 color selected
        this.model.selected === 1 ? this._color_select() : null;
        // Case 3 : multiple colors selected
        this.model.selected > 1 ? this._mult_color_select() : null;
	}
    //#endregion

    // the view root container
    private container: HTMLDivElement;
    get root(): HTMLDivElement {
        return this.container;
    }
    
    color_display: HTMLDivElement;
    
    color_form: HTMLDivElement;
    
    color_charact: HTMLDivElement[] = [document.createElement("div"), 
    document.createElement("div"), document.createElement("div"),
    document.createElement("div"), document.createElement("div"),
    document.createElement("div")];
    
    label: HTMLLabelElement[] = [document.createElement("label"), 
    document.createElement("label"), document.createElement("label"),
    document.createElement("label"), document.createElement("label"),
    document.createElement("label")];
    
    hue: HTMLInputElement;
    radius: HTMLInputElement;
    points: HTMLInputElement;
    hue2: HTMLInputElement;
    rings: HTMLInputElement;
    look: HTMLSelectElement;

    constructor(private model: Model) {
        this.container = document.createElement("div");
        this.container.id = "editor";

        // Add the color display view
        this.color_display = document.createElement("div");
        this.color_display.id = "color-display";
        this.container.appendChild(this.color_display);

        // Addnthe color form view
        this.color_form = document.createElement("div");
        this.color_form.id = "color-form";
        this.container.appendChild(this.color_form);

        // Add the inputs to the color form
        this.hue = document.createElement("input");
        this.hue.id = "hue";
        this.hue.type = "number";
        this.hue.min = "0";
        this.hue.max = "360";
        this.hue.addEventListener("input", () => {
            const hue_validator = new Validator(Number(this.hue.min), Number(this.hue.max));
            if (hue_validator.validate(Number(this.hue.value))) {
                this.model.change_shape(0, this.hue.value);
            }
        });
        this.label[0].innerText = "Hue";
        this.color_charact[0].appendChild(this.label[0]);
        this.color_charact[0].appendChild(this.hue);
        this.color_form.appendChild(this.color_charact[0]);
        // Radius
        this.radius = document.createElement("input");
        this.radius.id = "radius";
        this.radius.type = "number";
        this.radius.min = "20";
        this.radius.max = "45";
        this.radius.addEventListener("input", () => {
            const radius_validator = new Validator(Number(this.radius.min), Number(this.radius.max));
            if (radius_validator.validate(Number(this.radius.value))) {
                this.model.change_shape(1, this.radius.value);
            }
        });
        this.label[1].innerText = "Radius";
        this.color_charact[1].appendChild(this.label[1]);
        this.color_charact[1].appendChild(this.radius);
        this.color_form.appendChild(this.color_charact[1]);
        // Points
        this.points = document.createElement("input");
        this.points.id = "points";
        this.points.type = "number";
        this.points.min = "3";
        this.points.max = "10";
        this.points.addEventListener("input", () => {
            const points_validator = new Validator(Number(this.points.min), Number(this.points.max));
            if (points_validator.validate(Number(this.points.value))) {
                this.model.change_shape(2, this.points.value);
            }
        });
        this.label[2].innerText = "Points";
        this.color_charact[2].appendChild(this.label[2]);
        this.color_charact[2].appendChild(this.points);
        this.color_form.appendChild(this.color_charact[2]);
        // Hue2
        this.hue2 = document.createElement("input");
        this.hue2.id = "hue2";
        this.hue2.type = "number";
        this.hue2.min = "0";
        this.hue2.max = "360";
        this.hue2.addEventListener("input", () => {
            const hue2_validator = new Validator(Number(this.hue2.min), Number(this.hue2.max));
            if (hue2_validator.validate(Number(this.hue2.value))) {
                this.model.change_shape(3, this.hue2.value);
            }
        });
        this.label[3].innerText = "Hue2";
        this.color_charact[3].appendChild(this.label[3]);
        this.color_charact[3].appendChild(this.hue2);
        this.color_form.appendChild(this.color_charact[3]);
        // Rings
        this.rings = document.createElement("input");
        this.rings.id = "rings";
        this.rings.type = "number";
        this.rings.min = "2";
        this.rings.max = "5";
        this.rings.addEventListener("input", () => {
            const rings_validator = new Validator(Number(this.rings.min), Number(this.rings.max));
            if (rings_validator.validate(Number(this.rings.value))) {
                this.model.change_shape(4, this.rings.value);
            }
        });
        this.label[4].innerText = "Rings";
        this.color_charact[4].appendChild(this.label[4]);
        this.color_charact[4].appendChild(this.rings);
        this.color_form.appendChild(this.color_charact[4]);
        // Look
        this.look = document.createElement("select");
        this.look.id = "look";
        this.look.options.add(new Option("Left", "left"));
        this.look.options.add(new Option("Centre", "centre"));
        this.look.options.add(new Option("Right", "right"));
        this.look.addEventListener("input", () => {
            this.model.change_shape(5, this.look.value);
        });
        this.label[5].innerText = "Look";
        this.color_charact[5].appendChild(this.label[5]);
        this.color_charact[5].appendChild(this.look);
        this.color_form.appendChild(this.color_charact[5]);

        // Start with no color selected
        this._no_color_select();

        // Register with the model when we're ready
        this.model.addObserver(this);
    }

    private _no_color_select(){
        // Clear the color displayed
        while (this.container.firstChild) { this.container.removeChild(this.container.firstChild); }
        this.container.style.display = "flex";
        this.container.style.justifyContent = "center";
        this.container.style.alignItems = "center";
        // Add the 'Select One' label to the color selector
        const label : HTMLLabelElement = document.createElement("label");
        label.innerText = "Select One";
        this.container.appendChild(label);
    }

    private _color_select(){
        // Clear the color selector
        while (this.container.firstChild) { this.container.removeChild(this.container.firstChild); }
        this.container.style.display = "flex";
        this.container.style.flexDirection = "column";
        this.container.style.justifyContent = "flex-start";
        this.container.style.alignItems = "flex-start";
        // Add the color display to the ceditor
        const color_selected: ColorForm | undefined = this.model.colors_hl.find((color) => color.selected === true);
        if (!color_selected) { return; }
        const color_box : HTMLDivElement = document.createElement("div");
        color_box.style.flex = "1";
        color_box.style.aspectRatio = "1/1";
        if (color_selected.type === "square") { 
            color_box.style.backgroundColor = this.model.hue_to_color(color_selected); 
            color_box.style.border = "2px solid black";
        } else if (color_selected.type === "star") {
            // Draw the star on a canvas of 100 x 100
            const canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            if (ctx === null) { throw new Error("2d context not supported"); }
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            ctx.fillStyle = this.model.hue_to_color(color_selected);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            const inner_rad = 15;
            const outer_rad = color_selected.radius as number;
            const points = color_selected.points as number;
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
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.display = "block";
            color_box.appendChild(canvas);
        } else if (color_selected.type === "bullseye") {
            // Draw the bullseye on a canvas of 100 x 100
            const canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            if (ctx === null) { throw new Error("2d context not supported"); }
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const hue = color_selected.hue as number;
            const element = color_selected;
            const hue2 = color_selected.hue2 as number;
            const radius = color_selected.radius as number;
            const rings = color_selected.rings as number;
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
            color_selected.hue = hue;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.display = "block";
            color_box.appendChild(canvas);
        } else {
            // Draw the cat on a canvas of 100 x 100
            const canvas = document.createElement("canvas");
            canvas.width = 100;
            canvas.height = 100;
            const gc = canvas.getContext('2d');
            if (gc === null) { throw new Error("2d context not supported"); }
            gc.fillStyle = this.model.hue_to_color(color_selected);
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
            if (color_selected.look === "left") {
                x = -3;
            } else if (color_selected.look === "centre") {
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
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.display = "block";
            color_box.appendChild(canvas);        
        }
        // Style of the color display
        this.color_display.style.display = "flex";
        this.color_display.style.flex = "2";
        this.color_display.style.width = "100%";
        this.color_display.style.backgroundColor = "whitesmoke";
        this.color_display.style.alignItems = "center";
        this.color_display.style.justifyContent = "center";
        this.color_display.replaceChildren(color_box);
        this.container.appendChild(this.color_display);
        // Add the color form to the color selector
        while (this.color_form.firstChild) { this.color_form.removeChild(this.color_form.firstChild); }
        // Reset the label of the hue input
        this.label[0].innerText = "Hue";
        this.hue.value = color_selected.hue.toString();
        this.color_form.appendChild(this.color_charact[0]);
        if (color_selected.type === "star") {
            if (color_selected.radius !== undefined) { this.radius.value = color_selected.radius.toString(); }
            this.color_form.appendChild(this.color_charact[1]);
            if (color_selected.points !== undefined) { this.points.value = color_selected.points.toString(); }
            this.color_form.appendChild(this.color_charact[2]);
        } else if (color_selected.type === "bullseye") {
            // Change the label of the hue input
            this.label[0].innerText = "Hue1";
            if (color_selected.hue2 !== undefined) { this.hue2.value = color_selected.hue2.toString(); }
            this.color_form.appendChild(this.color_charact[3]);
            if (color_selected.rings !== undefined) { this.rings.value = color_selected.rings.toString(); }
            this.color_form.appendChild(this.color_charact[4]);
        } else if (color_selected.type === "cat") {
            if (color_selected.look !== undefined) { this.look.value = color_selected.look; }
            this.color_form.appendChild(this.color_charact[5]);
        }
        // Style of the color form
        this.color_form.style.display = "flex";
        this.color_form.style.flex = "1";
        this.color_form.style.width = "100%";
        this.color_form.style.flexDirection = "column";
        this.color_form.style.backgroundColor = "whitesmoke";
        this.color_form.style.border = "1px solid grey";
        this.color_form.style.paddingTop = "5px";
        // Style of the color form children
        this.color_charact.forEach((element) => {
            element.style.display = "flex";
            element.style.justifyContent = "center";
            element.style.alignItems = "center";
            element.style.padding = "5px";
            element.style.gap = "10px";
        });
        this.container.appendChild(this.color_form);
    }

    private _mult_color_select(){
        // clear the color selector
        while (this.container.firstChild) { this.container.removeChild(this.container.firstChild); }
        this.container.style.display = "flex";
        this.container.style.justifyContent = "center";
        this.container.style.alignItems = "center";
        // add the 'Too Many Selected' label to the color selector
        const label : HTMLLabelElement = document.createElement("label");
        label.innerText = "Too Many Selected";
        this.container.appendChild(label);
    }
}
