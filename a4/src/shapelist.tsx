// Components imports
import ShapeItem from "./shapeitem";

// Styles
import "./shapelist.css";

// State
import * as State from "./state";

// Component
export default function ShapeListView() {
  return (
    <div id="shape-list">
      {State.shapes.value.map((shape: State.Shape) => (
        <div
          className={shape.selected ? "selected" : "unselected"}
          id="shape"
          onClick={() => State.selectShape(shape.id)}
        >
          <ShapeItem shape={shape} />
        </div>
      ))}
    </div>
  );
}
