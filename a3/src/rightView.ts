// local imports
import { Model } from "./model";
import { ColorForm } from "./model";
import View from "./view";

// styles
import "./rightView.css";


export class RightView implements View {
    //#region observer pattern
    update(): void {
        console.log("right view update", this.model.selected);
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
    document.createElement("div"), document.createElement("div")];
    
    label: HTMLLabelElement[] = [document.createElement("label"), 
    document.createElement("label"), document.createElement("label")];
    
    hue: HTMLInputElement;
    radius: HTMLInputElement;
    points: HTMLInputElement;

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
        this.label[0].innerText = "Hue";
        this.color_charact[0].appendChild(this.label[0]);
        this.color_charact[0].appendChild(this.hue);
        this.color_form.appendChild(this.color_charact[0]);
        // Radius
        this.radius = document.createElement("input");
        this.radius.id = "radius";
        this.radius.type = "number";
        this.radius.min = "0";
        this.radius.max = "100";
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
        this.label[2].innerText = "Points";
        this.color_charact[2].appendChild(this.label[2]);
        this.color_charact[2].appendChild(this.points);
        this.color_form.appendChild(this.color_charact[2]);

        // start with no color selected
        this._no_color_select();

        // controller
        this.hue.addEventListener("textchanged", () => {
            this.model.change_shape(0, this.hue.value);
        });
        this.radius.addEventListener("textchanged", () => {
            this.model.change_shape(1, this.radius.value);
        });
        this.points.addEventListener("textchanged", () => {
            this.model.change_shape(2, this.points.value);
        });

        // register with the model when we're ready
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
        // Add the color display to the color selector
        const color_selected: ColorForm | undefined = this.model.colors_hl.find((color) => color.selected === true);
        if (!color_selected) { return; }
        // Display star
        // if (color_selected.radius !== undefined && color_selected.points !== undefined) {
        //     const star = new SKStar();
        //     star.fill = this.model.hue_to_color(color_selected);
        //     star.outer_rad = color_selected.radius;
        //     star.points = color_selected.points;
        //     star.scale = 2;
        //     this.color_display.addChild(star);
        //     this.textfields[1].text = color_selected.radius.toString();
        //     this.textfields[2].text = color_selected.points.toString();
        //     const labels = ["Hue", "Radius", "Points"];
        //     for (let i = 0; i < 3; i++) {
        //         const label = new SKLabel();
        //         label.text = labels[i];
        //         label.width = 60;
        //         label.align = "right";

        //         this.textfields[i].width = 50;

        //         const help_cointainer = new SKContainer();
        //         help_cointainer.width = 120;
        //         help_cointainer.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });
        //         help_cointainer.addChild(label);
        //         help_cointainer.addChild(this.textfields[i]);

        //         const help_cointainer2 = new SKContainer();
        //         help_cointainer2.fillWidth = 1;
        //         help_cointainer2.layoutMethod = Layout.makeCentredLayout();
        //         help_cointainer2.addChild(help_cointainer);
                
        //         this.color_form.addChild(help_cointainer2);
        //     }
        // // Display colorbox
        // } else {
        //     const container = new SKContainer();
        //     container.fill = this.model.hue_to_color(color_selected);
        //     container.fillWidth = 1;
        //     container.fillHeight = 1;
        //     container.border = "10px black";
        //     this.color_display.addChild(container);
            
        //     const label = new SKLabel();
        //     label.text = "Hue";
        //     label.width = 60;
        //     label.align = "right";

        //     this.textfields[0].width = 50;

        //     const help_cointainer = new SKContainer();
        //     help_cointainer.width = 120;
        //     help_cointainer.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });
        //     help_cointainer.addChild(label);
        //     help_cointainer.addChild(this.textfields[0]);

        //     const help_cointainer2 = new SKContainer();
        //     help_cointainer2.fillWidth = 1;
        //     help_cointainer2.layoutMethod = Layout.makeCentredLayout();
        //     help_cointainer2.addChild(help_cointainer);
            
        //     this.color_form.addChild(help_cointainer2);
        // }

        // Display colorbox
        const color_box : HTMLDivElement = document.createElement("div");
        color_box.style.backgroundColor = this.model.hue_to_color(color_selected);
        color_box.style.flex = "1";
        color_box.style.aspectRatio = "1/1";
        color_box.style.border = "2px solid black";
        // Style of the color display
        this.color_display.style.display = "flex";
        this.color_display.style.flex = "2";
        this.color_display.style.width = "100%";
        this.color_display.style.backgroundColor = "whitesmoke";
        this.color_display.style.alignItems = "center";
        this.color_display.style.justifyContent = "center";
        this.color_display.replaceChildren(color_box);
        this.container.appendChild(this.color_display);
        // add the color form to the color selector
        // update the textfields
        this.hue.innerText = color_selected.hue.toString();
        // Style of the color form
        this.color_form.style.display = "flex";
        this.color_form.style.flex = "1";
        this.color_form.style.width = "100%";
        this.color_form.style.flexDirection = "column";
        this.color_form.style.backgroundColor = "whitesmoke";
        this.color_form.style.border = "1px solid grey";
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
