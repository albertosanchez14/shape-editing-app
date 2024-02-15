import {
    SKContainer,
} from "simplekit/imperative-mode";
import { makeFillColumnLayout } from "./fillColumn";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { ToolBarView } from "./toolBar";
import { ShapeListView } from "./shapeList";
import { StatusBarView } from "./statusBar";


export class LeftView extends SKContainer implements Observer {
	//#region observer pattern
    update(): void {
		
    }
    //#endregion
    
    toolbar: ToolBarView;
    shapeList: ShapeListView;
    statusbar: StatusBarView;

    constructor(private model: Model) {
        super();
		
        // setup the view
        this.id = "left";
        this.fill = "white";
        this.fillWidth = 2/3;
        this.fillHeight = 1;
        this.layoutMethod = makeFillColumnLayout();

        // add a toolbar to the view
		this.toolbar = new ToolBarView(this.model);
        this.addChild(this.toolbar);

        // add shape list to the view
		this.shapeList = new ShapeListView(this.model);
        this.addChild(this.shapeList);

        // add statusbar to the view
		this.statusbar = new StatusBarView(this.model);
        this.addChild(this.statusbar);

        // register with the model when we're ready
        this.model.addObserver(this);
    }
}
