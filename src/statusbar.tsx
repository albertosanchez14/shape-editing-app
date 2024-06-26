// Styles
import "./statusbar.css";

// State
import * as State from "./state";


// Component
export default function StatusBarView() {
  return (
    <div id="status-bar">
      <label id="shapes">Shapes: {State.shapes.value.length}</label>
      <label id="selected">Selected: {State.selectedShapes}</label>
    </div>
  );
}
