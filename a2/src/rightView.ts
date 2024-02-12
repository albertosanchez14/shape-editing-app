import {
  SKContainer,
  SKLabel,
  Layout,
  SKTextfield,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { makeFillColumnLayout } from "./fillColumn";


export class RightView extends SKContainer implements Observer {
    //#region observer pattern
    update(): void {
        // Case 1: > 1 color in the list
        if (this.model.colors_hl.length > 0) {
            // update the color display
            this.color_display.fill = this.model.hue_to_color(this.model.colors_hl[this.model.selected]);
            // update the textfields
            this.textfields[0].text = this.model.colors_hl[this.model.selected].hue.toString();
            if (this.model.colors_hl[this.model.selected].radius) {
                this.textfields[1].text = this.model.colors_hl[this.model.selected].radius.toString();
            }
            if (this.model.colors_hl[this.model.selected].points) {
                this.textfields[2].text = this.model.colors_hl[this.model.selected].points.toString();
            }
        } else {
            // Case 2: 0 colors in the list
            this._no_color_select();
        }
	}
    //#endregion
    
    color_selector: SKContainer = new SKContainer();
    color_display_helper: SKContainer = new SKContainer();
    color_display: SKContainer = new SKContainer();
    color_form: SKContainer = new SKContainer();
	// Fields for the color form: hue, radius and points
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

        // add the color display helper container to the view
        this.color_display.fillHeight = 2/3;
        console.log(this.color_display.paddingBox);
        this.color_display.fillWidth = 1;
		//this.color_display.layoutMethod = this.model.hue_to_color(this.model.colors_hl[this.model.selected]);
        this.color_selector.addChild(this.color_display);

        // add the color form to the view
        this.color_form.fillWidth = 1;
        this.color_form.fillHeight = 1/3;
        this.color_form.fill = "whitesmoke";
        this.color_form.border = "1px grey";
		this.color_form.padding = 10;
		this.color_form.layoutMethod = makeFillColumnLayout({ gap: 40 });
        this.color_selector.addChild(this.color_form);

		// add the labels and textfields to the form
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

        // register with the model when we're ready
        this.model.addObserver(this);
    }

    private _no_color_select(){
        const label = new SKLabel();
        label.text = "Select One";
        label.align = "centre";
        this.color_selector.clearChildren();
        this.color_selector.layoutMethod = Layout.makeCentredLayout();
        this.color_selector.addChild(label);
    }
}
