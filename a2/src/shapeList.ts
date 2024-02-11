import { SKContainer, 
    SKButton,
    Layout } from "simplekit/imperative-mode";

// Local imports
import { Observer } from "./observer";
import { Model } from "./model";


export class ShapeListView extends SKContainer implements Observer{
    //#region observer pattern
    update(): void {
        this._clear_shapes();
        this._fill_shapes();
    }
    //#endregion

    constructor(private model: Model) {
        super();

        this.id = "shapelist";
        this.fillWidth = 2/3;
        this.fillHeight = 1;
        this.fill = "lightblue";
        this.padding = 20;
        this.layoutMethod = Layout.makeWrapRowLayout({ gap: 20 });

        // Add shapes
        this._fill_shapes();
       
        // Register with the model when we're ready
        this.model.addObserver(this);
    }

    private _clear_shapes(){
        this.children.forEach((shape) => {
            this.removeChild(shape);
        });
    }
    private _fill_shapes(){
        for (let i = 0; i < this.model.colors_hl.length; i++) {
            const shape = new SKContainer();
            shape.width = 50;
            shape.height = 50;
            shape.border = "black";
            shape.fill = this.model.hue_to_color(this.model.colors_hl[i]);
            // Sele
            shape.addEventListener("action", () => {
                this.model.selected = i;
            });

            this.addChild(shape);
        }
    }
}
