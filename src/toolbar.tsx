import { useRef, useEffect } from "preact/hooks";

// Styles
import "./toolbar.css";

// State
import * as State from "./state";

// Component
export default function ToolBarView() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const delRef = useRef<HTMLButtonElement>(null);
  const clearRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (addRef.current === null) return;
    if (delRef.current === null) return;
    if (clearRef.current === null) return;
    // Disable the add button if the max is reached
    if (State.shapes.value.length >= 25) {
      addRef.current.className = "disabled";
      addRef.current.disabled = true;
    } else {
      addRef.current.className = "enabled";
      addRef.current.disabled = false;
    }
    // Disable the remove button if there are no selected shapes
    if (State.selectedShapes.value === 0) {
      delRef.current.className = "disabled";
      delRef.current.disabled = true;
    } else {
      delRef.current.className = "enabled";
      delRef.current.disabled = false;
    }
    // Disable the clear button if there are no shapes
    if (State.shapes.value.length === 0) {
      clearRef.current.className = "disabled";
      clearRef.current.disabled = true;
    } else {
      clearRef.current.className = "enabled";
      clearRef.current.disabled = false;
    }
  }, [State.shapes.value, State.selectedShapes.value]);

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
      <button class="enabled" id="add-button" ref={addRef} onClick={handleAdd}>
        Add
      </button>
      <select class="enabled" id="options" ref={selectRef}>
        <option value="square">Square</option>
        <option value="star">Star</option>
        <option value="bullseye">Bullseye</option>
        <option value="cat">Cat</option>
      </select>
      <button
        class="enabled"
        id="remove-button"
        ref={delRef}
        onClick={handleRemove}
      >
        Remove
      </button>
      <button class="enabled" id="clear" ref={clearRef} onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}
