import {
  SKContainer,
  SKLabel,
  Layout,
  SKTextfield,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { ColorForm } from "./model";
import { makeFillColumnLayout } from "./fillColumn";
import { makeSquareCentredLayout } from "./centered_square";
import { SKStar } from "./star";


export class RightView extends SKContainer implements Observer {
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
    
    color_selector: SKContainer = new SKContainer();
    color_display_helper: SKContainer = new SKContainer();
    color_display: SKContainer = new SKContainer();
    color_form: SKContainer = new SKContainer();
	// Text fields for the color form: hue, radius and points
	textfields: SKTextfield[] = [new SKTextfield(), new SKTextfield(), new SKTextfield()];

    constructor(private model: Model) {
        super();

        // setup the view
        this.id = "right";
        this.fill = "whitesmoke";
        this.fillWidth = 1/3;
        this.fillHeight = 1;
        this.padding = 10;
        this.layoutMethod = Layout.makeCentredLayout();

        // add a color selector to the view
        this.color_selector.fillWidth = 1;
        this.color_selector.fillHeight = 1;
        this.color_selector.fill = "whitesmoke";
        this.color_selector.border = "1px lightgrey";
        this.color_selector.padding = 10;
        this.color_selector.layoutMethod = makeFillColumnLayout({ gap: 10 });
        this.addChild(this.color_selector);

        // set the color display
        this.color_display.fillHeight = 2/3;
        this.color_display.fillWidth = 1;

        // set the color properties form
        this.color_form.fillWidth = 1;
        this.color_form.fillHeight = 1/3;
        this.color_form.fill = "whitesmoke";
        this.color_form.border = "1px grey";
		this.color_form.padding = 10;
		this.color_form.layoutMethod = makeFillColumnLayout({ gap: 40 });

        // start with no color selected
        this._no_color_select();

        // controller
        this.textfields[0].addEventListener("textchanged", () => {
            this.model.change_shape(0, this.textfields[0].text);
        });
        this.textfields[1].addEventListener("textchanged", () => {
            this.model.change_shape(1, this.textfields[1].text);
        });
        this.textfields[2].addEventListener("textchanged", () => {
            this.model.change_shape(2, this.textfields[2].text);
        });

        // register with the model when we're ready
        this.model.addObserver(this);
    }

    private _no_color_select(){
        // clear the color selector
        this.color_selector.clearChildren();
        this.color_selector.layoutMethod = Layout.makeCentredLayout();
        // add the 'Select One' label to the color selector
        const label = new SKLabel();
        label.text = "Select One";
        label.align = "centre";
        this.color_selector.addChild(label);
    }

    private _color_select(){
        // clear the color selector
        this.color_selector.clearChildren();
        this.color_selector.layoutMethod = makeFillColumnLayout({ gap: 10 });
        // add the color display to the color selector
        const color_selected: ColorForm | undefined = this.model.colors_hl.find((color) => color.selected === true);
        if (!color_selected) { return; }
        this.color_display.clearChildren();
        this.color_display.layoutMethod = makeSquareCentredLayout();
        // Display star
        this.color_form.clearChildren();
        if (color_selected.radius !== undefined && color_selected.points !== undefined) {
            const star = new SKStar();
            star.fill = this.model.hue_to_color(color_selected);
            star.outer_rad = color_selected.radius;
            star.points = color_selected.points;
            star.scale = 2;
            this.color_display.addChild(star);
            this.textfields[1].text = color_selected.radius.toString();
            this.textfields[2].text = color_selected.points.toString();
            const labels = ["Hue", "Radius", "Points"];
            for (let i = 0; i < 3; i++) {
                const label = new SKLabel();
                label.text = labels[i];
                label.width = 60;
                label.align = "right";

                this.textfields[i].width = 50;

                const help_cointainer = new SKContainer();
                help_cointainer.width = 120;
                help_cointainer.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });
                help_cointainer.addChild(label);
                help_cointainer.addChild(this.textfields[i]);

                const help_cointainer2 = new SKContainer();
                help_cointainer2.fillWidth = 1;
                help_cointainer2.layoutMethod = Layout.makeCentredLayout();
                help_cointainer2.addChild(help_cointainer);
                
                this.color_form.addChild(help_cointainer2);
            }
        // Display colorbox
        } else {
            const container = new SKContainer();
            container.fill = this.model.hue_to_color(color_selected);
            container.fillWidth = 1;
            container.fillHeight = 1;
            container.border = "10px black";
            this.color_display.addChild(container);
            
            const label = new SKLabel();
            label.text = "Hue";
            label.width = 60;
            label.align = "right";

            this.textfields[0].width = 50;

            const help_cointainer = new SKContainer();
            help_cointainer.width = 120;
            help_cointainer.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });
            help_cointainer.addChild(label);
            help_cointainer.addChild(this.textfields[0]);

            const help_cointainer2 = new SKContainer();
            help_cointainer2.fillWidth = 1;
            help_cointainer2.layoutMethod = Layout.makeCentredLayout();
            help_cointainer2.addChild(help_cointainer);
            
            this.color_form.addChild(help_cointainer2);
        }
        this.color_selector.addChild(this.color_display);
        // add the color form to the color selector
        // update the textfields
        this.textfields[0].text = color_selected.hue.toString();
        this.color_selector.addChild(this.color_form);
    }

    private _mult_color_select(){
        // clear the color selector
        this.color_selector.clearChildren();
        this.color_selector.layoutMethod = Layout.makeCentredLayout();
        // add the 'Too Many Selected' label to the color selector
        const label = new SKLabel();
        label.text = "Too Many Selected";
        label.align = "centre";
        this.color_selector.addChild(label);
    }
}
