import {
  SKContainer,
  SKLabel,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { makeFillColumnLayout } from "./fillColumn";


export class RightView extends SKContainer implements Observer {
    //#region observer pattern
    update(): void {

    }
    //#endregion
    
    color_selector: SKContainer = new SKContainer();
    color_display: SKContainer = new SKContainer();
    color_form: SKContainer = new SKContainer();

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

        // add the color dysplay to the view
        this.color_display.fillWidth = 2/3;
        this.color_display.fillHeight = 2/3;
        this.color_display.fill = this.model.hue_to_color(this.model.colors_hl[this.model.selected]);
        this.color_display.border = "1px lightgrey";
        this.color_selector.addChild(this.color_display);

        // add the color form to the view
        this.color_form.fillWidth = 1;
        this.color_form.fillHeight = 1/3;
        let width = this.color_selector.width;
        console.log("Adbkabskd", width);
        this.color_form.fill = "whitesmoke";
        this.color_form.border = "1px grey";
        this.color_selector.addChild(this.color_form);

        // register with the model when we're ready
        this.model.addObserver(this);
    }
}
