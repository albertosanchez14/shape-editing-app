import './style.css'

// Local imports
import { Model } from './model'
import { ToolBarView } from './toolBar';
import { ShapeListView } from './shapeList';
import { StatusBarView } from './statusBar';
import { RightView } from './rightView';

// Create the model
const model = new Model();

// Root container
const root = document.getElementById('app') as HTMLDivElement;

// Create div to hold the left and right views
const left: HTMLDivElement = document.createElement('div');
left.id = 'left';

const right: HTMLDivElement = document.createElement('div');
right.id = 'right';

// Add views to the left and right divs
left.appendChild(new ToolBarView(model).root);
left.appendChild(new ShapeListView(model).root);
left.appendChild(new StatusBarView(model).root);

right.appendChild(new RightView(model).root);

// Add views to the root
root.appendChild(left);
root.appendChild(right);
