// Local imports
import View from "./view";
import { Model } from "./model";

import "./statusBar.css";


export class StatusBarView implements View {
    //#region observer pattern
    update(): void {
        this.shapeLabel.innerText = `Shapes: ${this.model.colors_hl.length}`;
        this.selectedLabel.innerText = `Selected: ${this.model.selected}`;
    }
    //#endregion

    // the view root container
    private container: HTMLDivElement;
    get root(): HTMLDivElement {
        return this.container;
    }

    private shapeLabel: HTMLLabelElement;
    private selectedLabel: HTMLLabelElement;
    
    constructor(private model: Model) {
        this.container = document.createElement("div");
        this.container.id = "statusbar";

        // Add shape label to the statusbar
        this.shapeLabel = document.createElement("label");
        this.shapeLabel.id = "shapes";
        this.shapeLabel.innerText = "Shapes: 0";
        this.container.appendChild(this.shapeLabel);

        // Add selected label to the statusbar
        this.selectedLabel = document.createElement("label");
        this.selectedLabel.id = "selected";
        this.shapeLabel.innerText = "Selected: 0";
        this.container.appendChild(this.selectedLabel);

        // register with the model when we're ready
        this.model.addObserver(this);
    }
}
