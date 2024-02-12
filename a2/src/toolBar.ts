import { SKContainer, 
    SKButton,
    Layout } from "simplekit/imperative-mode";

// Local imports
import { Observer } from "./observer";
import { Model } from "./model";


export class ToolBarView extends SKContainer implements Observer{
    //#region observer pattern
    update(): void {

    }
    //#endregion
    
    addButton: SKButton = new SKButton();
    addStarButton: SKButton = new SKButton();
    deleteButton: SKButton = new SKButton();
    clearButton: SKButton = new SKButton();
    
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

        this.deleteButton.addEventListener("action", () => {
            this.model.delete_shape();
        });
        this.clearButton.addEventListener("action", () => {
            console.log("clear");
            this.model.clear_shapes();
        });

        // register with the model when we're ready
        this.model.addObserver(this);
    }
}
