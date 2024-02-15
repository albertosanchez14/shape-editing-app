import { SKElement,
    SKContainer, 
    SKMouseEvent,
    SKKeyboardEvent,
    requestKeyboardFocus,
    Layout } from "simplekit/imperative-mode";

// Local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { SKColorbox } from "./colorBox";
import { SKStar } from "./star";


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
        this.fill = "white";
        this.padding = 20;
        this.layoutMethod = Layout.makeWrapRowLayout({ gap: 20 });

        // TODO: Clicking on the white background of the shape list area, 
        // and outside of any square in the list, deselects all squares.
        this.addEventListener("action", () => {
            console.log("Action event received");
            this.model.unselect_all();
        });

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
            let shape: SKColorbox
            if (this.model.colors_hl[i].radius != undefined) {
                const container = this._create_star(i)
                shape = container.children[0] as SKStar;
            } else {
                shape = this._create_colorbox(i);
            }
            // Select a shape
            shape.addEventListener("color_clicked", () => {
                this.model.select_color(shape.id);
            });
            shape.checked = this.model.colors_hl[i].selected;
            this.addChild(shape);
        }
    }
    private _create_colorbox(i: number): SKColorbox{
        const colorbox = new SKColorbox();
        colorbox.id = `colorbox_${i}`;
        colorbox.height = 50;
        colorbox.width = 50;
        colorbox.border = "black";
        colorbox.fill = this.model.hue_to_color(this.model.colors_hl[i]);
        return colorbox;
    }
    private _create_star(i: number): SKContainer{
        const star = new SKStar();
        star.id = `star_${i}`;
        star.height = 50;
        star.width = 50;
        star.fill = this.model.hue_to_color(this.model.colors_hl[i]);
        star.outer_rad = this.model.colors_hl[i].radius as number;
        star.points = this.model.colors_hl[i].points as number;
        const container = new SKContainer();
        container.width = 50;
        container.height = 50;
        container.addChild(star);
        return container;
    }

    handleMouseEvent(me: SKMouseEvent): boolean {
        switch (me.type) {
            case "mouseenter":
                requestKeyboardFocus(this);
            break;
            case "click":
                this.model.unselect_all();
            break;
        }
        return false;
    }
    
    handleKeyboardEvent(ke: SKKeyboardEvent): boolean {
        switch (ke.type) {
            case "keydown":
                if (ke.key === "Shift") {
                    this.model.multiSelect = true;
                }
            break;
            case "keyup":
                if (ke.key === "Shift") {
                    this.model.multiSelect = false;
                }
            break;
        }    
        return false;
    }
}
