// Local imports
import View from "./view";
import { Model } from "./model";

import "./toolBar.css";

export class ToolBarView implements View {
    //#region observer pattern
    update(): void {
        // this.addButton.enabled = this.model.colors_hl.length < 20;
        // this.addStarButton.enabled = this.model.colors_hl.length < 20;
        // this.deleteButton.enabled = this.model.selected !== 0;
        // this.clearButton.enabled = this.model.colors_hl.length > 0;
    }
    //#endregion

    // the view root container
    private container: HTMLDivElement;
    get root(): HTMLDivElement {
        return this.container;
    }

    private addButton: HTMLButtonElement;
    private addStarButton: HTMLButtonElement;
    private deleteButton: HTMLButtonElement;
    private clearButton: HTMLButtonElement;
    
    constructor(private model: Model) {
        this.container = document.createElement("div");
        this.container.id = "toolbar";

        // Add button of the toolbar
        this.addButton = document.createElement("button");
        this.addButton.id = "button";
        this.addButton.innerText = "Add";
        this.addButton.addEventListener("click", () => {
            console.log("action");
            this.model.add_shape();
        });
        this.container.appendChild(this.addButton);

        // Add-Star button of the toolbar
        this.addStarButton = document.createElement("button");
        this.addStarButton.id = "button";
        this.addStarButton.innerText = "Add Star";
        this.addStarButton.addEventListener("click", () => {
            this.model.add_star();
        });
        this.container.appendChild(this.addStarButton);

        // Delete button of the toolbar
        this.deleteButton = document.createElement("button");
        this.deleteButton.id = "button";
        this.deleteButton.innerText = "Delete";
        this.deleteButton.addEventListener("click", () => {
            this.model.delete_shape();
        });
        this.container.appendChild(this.deleteButton);

        // Clear button of the toolbar
        this.clearButton = document.createElement("button");
        this.clearButton.id = "button";
        this.clearButton.innerText = "Clear";
        this.clearButton.addEventListener("click", () => {
            this.model.clear_shapes();
        });
        this.container.appendChild(this.clearButton);

        // register with the model when we're ready
        this.model.addObserver(this);
    }
}
