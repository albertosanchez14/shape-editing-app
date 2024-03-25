import { signal } from "@preact/signals";

// Components imports
import ShapeItem from "./shapeitem";

// Styles
import "./shapelist.css";

// State
import * as State from "./state";

// Component
export default function ShapeListView() {
  const un_all = signal(false);

  return (
    <div id="shape-list" onClick={() => State.unSelectAll(un_all.value)}>
      {State.shapes.value.map((shape: State.Shape) => (
        <div
          className={shape.selected ? "selected" : "unselected"}
          id="shape"
          onClick={() => State.selectShape(shape.id)}
          onMouseEnter={() => (un_all.value = false)}
          onMouseLeave={() => (un_all.value = true)}
        >
          <ShapeItem shape={shape} />
        </div>
      ))}
    </div>
  );
}
