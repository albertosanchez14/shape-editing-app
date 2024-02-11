import { SKContainer, 
    Layout, 
    SKLabel 
} from "simplekit/imperative-mode";

// Local imports
import { Model } from "./model";
import { Observer } from "./observer";


export class StatusBarView extends SKContainer implements Observer{
    //#region observer pattern
    update(): void {
        this.shapeLabel.text = `Shapes: ${this.model.colors_hl.length}`;
        this.selectedLabel.text = `Selected: ${this.model.selected}`;
    }
    //#endregion

    shapeLabel: SKLabel = new SKLabel();
    selectedLabel: SKLabel = new SKLabel();
    
    constructor(private model: Model) {
        super();
    
        this.id = "statusbar";
        this.fillWidth = 1;
        this.height = 50;
        this.fill = "lightgrey";
        this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

        // Add shape label to the statusbar
        this.shapeLabel.fillWidth = 1;
        this.shapeLabel.fillHeight = 1;
        this.shapeLabel.align = "left";
        this.shapeLabel.text = "Shapes: 0";
        this.addChild(this.shapeLabel);

        // Add selected label to the statusbar
        this.selectedLabel.fillWidth = 1;
        this.selectedLabel.fillHeight = 1;
        this.selectedLabel.align = "right";
        this.selectedLabel.text = "Selected: 0";
        this.addChild(this.selectedLabel);

        // register with the model when we're ready
        this.model.addObserver(this);
    }
}
