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
        this.container.addEventListener("unselect_all", () => {
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
            // TODO: add star shape, square shape, etc.
            const shape = this._create_colorbox(i);
            shape.addEventListener("click", (event) => {
                this.model.multiSelect = event.ctrlKey;
                this.model.select_color(shape.id);
            });
            shape.addEventListener("mouseenter", () => {
                console.log("mouse enter");
                this.model.un_all = false;        
            });
            shape.addEventListener("mouseexit", () => {
                this.model.un_all = true;
            });
            if (color_hl.selected) {
                shape.style.border = "solid 2px black";
            }
            this.container.appendChild(shape);
        });
    }
    private _create_colorbox(i: number): HTMLButtonElement{
        const colorbox = document.createElement("button");
        colorbox.id = `colorbox_${i}`;
        colorbox.style.backgroundColor = this.model.hue_to_color(this.model.colors_hl[i]);
        return colorbox;
    }
    // private _create_star(i: number): SKContainer{
    //     const star = new SKStar();
    //     star.id = `star_${i}`;
    //     star.height = 50;
    //     star.width = 50;
    //     star.fill = this.model.hue_to_color(this.model.colors_hl[i]);
    //     star.outer_rad = this.model.colors_hl[i].radius as number;
    //     star.points = this.model.colors_hl[i].points as number;
    //     const container = new SKContainer();
    //     container.width = 50;
    //     container.height = 50;
    //     container.addChild(star);
    //     return container;
    // }

    // handleMouseEvent(me: MouseEvent): boolean {
    //     switch (me.type) {
    //         case "mouseenter":
    //             requestKeyboardFocus(this);
    //         break;
    //         case "click":
    //             return this.sendEvent({
    //                 source: this,
    //                 timeStamp: me.timeStamp,
    //                 type: "unselect_all",
    //             });
    //         break;
    //     }
    //     return false;
    // }
    
    // handleKeyboardEvent(ke: KeyboardEvent): boolean {
    //     switch (ke.type) {
    //         case "keydown":
    //             if (ke.key === "Shift") {
    //                 this.model.multiSelect = true;
    //             }
    //         break;
    //         case "keyup":
    //             if (ke.key === "Shift") {
    //                 this.model.multiSelect = false;
    //             }
    //         break;
    //     }    
    //     return false;
    // }
}
