import { useRef } from "preact/hooks";

// Styles
import "./toolbar.css";

// State
import * as State from "./state";


// Component
export default function ToolBarView() {
  const selectRef = useRef<HTMLSelectElement>(null);

  function handleAdd() {
    if (selectRef === undefined) return;
    const selected = selectRef.current?.value as State.ShapeType;
    State.addShape(selected);
  }
  function handleRemove() {
    State.removeShape();
  }
  function handleClear() {
    State.clearShapes();
  }

  return (
    <div id="tool-bar">
      <button class="button" id="add-button" onClick={handleAdd}>Add</button>
      <select class="button" id="options" ref={selectRef}>
        <option value="square">Square</option>
        <option value="star">Star</option>
        <option value="bullseye">Bullseye</option>
        <option value="cat">Cat</option>
      </select>
      <button class="button" id="remove-button" onClick={handleRemove}>Remove</button>
      <button class="button" id="clear" onClick={handleClear}>Clear</button>
    </div>
  )
}
