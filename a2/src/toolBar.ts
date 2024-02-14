import { SKContainer,
    Layout } from "simplekit/imperative-mode";

// Local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { SKButtonCustom } from "./button";


export class ToolBarView extends SKContainer implements Observer{
    //#region observer pattern
    update(): void {
        this.addButton.enabled = this.model.colors_hl.length < 20;
        this.addStarButton.enabled = this.model.colors_hl.length < 20;
        this.deleteButton.enabled = this.model.selected !== 0;
        this.clearButton.enabled = this.model.colors_hl.length > 0;
    }
    //#endregion
    
    addButton: SKButtonCustom = new SKButtonCustom();
    addStarButton: SKButtonCustom = new SKButtonCustom();
    deleteButton: SKButtonCustom = new SKButtonCustom();
    clearButton: SKButtonCustom = new SKButtonCustom();
    
    constructor(private model: Model) {
        super();
        this.id = "toolbar";
        this.fillWidth = 1;
        this.height = 50;
        this.padding = 10;
        this.fill = "lightgrey";
        this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

        // Add button of the toolbar
        this.addButton.text = "Add";
        this.addButton.width = 80;
        this.addChild(this.addButton);

        // Add-Star button of the toolbar
        this.addStarButton.text = "Add Star";
        this.addStarButton.width = 80;
        this.addChild(this.addStarButton);

        // Delete button of the toolbar
        this.deleteButton.text = "Delete";
        this.deleteButton.width = 80;
        this.addChild(this.deleteButton);

        // Clear button of the toolbar
        this.clearButton.text = "Clear";
        this.clearButton.width = 80;
        this.addChild(this.clearButton);

        // ControLLer
        this.addButton.addEventListener("action", () => {
            this.model.add_shape();
        });
        this.addStarButton.addEventListener("action", () => {
            this.model.add_star();
        });
        this.deleteButton.addEventListener("action", () => {
            this.model.delete_shape();
        });
        this.clearButton.addEventListener("action", () => {
            this.model.clear_shapes();
        });

        // register with the model when we're ready
        this.model.addObserver(this);
    }
}
