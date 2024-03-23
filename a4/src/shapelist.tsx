import ShapeItem from "./shapeitem";

// Styles
import "./shapelist.css";


import * as State from "./state";


// Component
export default function ShapeListView() {
  return (
    <div id="shape-list">
      {State.shapes.value.map((shape: State.Shape) => (
        <div className={shape.selected ? "selected" : "unselected"} id="shape"
        onClick={() => State.addShape(shape.props.type)}>
          <ShapeItem shape={shape} />
        </div>
      ))}
    </div>
  );
}
