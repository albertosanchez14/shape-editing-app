import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Model } from "./model";
import { LeftView } from "./leftView";
import { RightView } from "./rightView";


// create model
const model = new Model();

// root container
const root = new SKContainer();
root.id = "root";
root.fill = "whitesmoke";
root.layoutMethod = Layout.makeCentredLayout();

// main panel
const panel = new SKContainer();
panel.fillWidth = 1;
panel.fillHeight = 1;
panel.layoutMethod = Layout.makeFillRowLayout();

// add main panel to root
root.addChild(panel);

// add views to main panel
panel.addChild(new LeftView(model));
panel.addChild(new RightView(model));

setSKRoot(root);

startSimpleKit();
