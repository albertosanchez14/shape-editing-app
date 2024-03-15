// Local imports
import View from "./view";
import { Model } from "./model";

import "./toolBar.css";

export class ToolBarView implements View {
    //#region observer pattern
    update(): void {
        this.addButton.disabled = this.model.colors_hl.length >= 25;
        this.options.disabled = this.model.colors_hl.length >= 25;
        this.deleteButton.disabled = this.model.selected === 0;
        this.clearButton.disabled = this.model.colors_hl.length === 0;
    }
    //#endregion

    // the view root container
    private container: HTMLDivElement;
    get root(): HTMLDivElement {
        return this.container;
    }

    private addButton: HTMLButtonElement;
    private options: HTMLSelectElement;
    private _forms: string[] = ["Square", "Star", "Bullseye", "Cat"];
    private deleteButton: HTMLButtonElement;
    private clearButton: HTMLButtonElement;
    
    constructor(private model: Model) {
        this.container = document.createElement("div");
        this.container.id = "toolbar";

        // Add button of the toolbar
        this.addButton = document.createElement("button");
        this.addButton.className = "button";
        this.addButton.id = "add-button";
        this.addButton.innerText = "Add";
        this.addButton.addEventListener("click", () => {
            this.model.add_shape(this.options.value);
        });
        this.container.appendChild(this.addButton);

        // Dropdown menu of the toolbar
        this.options = document.createElement("select");
        this.options.className = "button";
        this.options.id = "options"
        this._forms.forEach((form) => {
            this.options.options.add(new Option(form, form.toLowerCase()));
        });
        this.container.appendChild(this.options);

        // Delete button of the toolbar
        this.deleteButton = document.createElement("button");
        this.deleteButton.className = "button";
        this.deleteButton.id = "delete-button";
        this.deleteButton.innerText = "Delete";
        this.deleteButton.addEventListener("click", () => {
            this.model.delete_shape();
        });
        this.container.appendChild(this.deleteButton);

        // Clear button of the toolbar
        this.clearButton = document.createElement("button");
        this.clearButton.className = "button";
        this.clearButton.id = "clear-button";
        this.clearButton.innerText = "Clear";
        this.clearButton.addEventListener("click", () => {
            this.model.clear_shapes();
        });
        this.container.appendChild(this.clearButton);

        // register with the model when we're ready
        this.model.addObserver(this);
    }
}
