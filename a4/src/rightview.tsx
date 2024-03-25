import { useEffect, useRef } from "react";
import "./rightview.css";

import ShapeItem from "./shapeitem";
import * as State from "./state";

export default function EditorView() {
  // TODO: Implement the EditorView component,
  // check why it does not change when the selected shape changes
  // let editorRef = useRef<HTMLCanvasElement>(null);
  // let shapeItem = null;
  // useEffect(() => {
  //   // if (editorRef.current === null) return;
  //   // if (State.editShape.value !== undefined) {
  //   //   shapeItem = <ShapeItem shape={State.editShape.value} />;
  //   // }
  // }, [State.shapes.value]);

  const shape = State.editShape.value;
  console.log(shape);

  // No shape selected
  if (State.editShape.value === undefined) {
    return <NoShape />;
  }
  // Multiple shapes selected
  if (State.editShape.value === "multiple") {
    return <MultipleShapes />;
  }
  // Single shape selected
  return (
    <div id="editor">
      <div id="shape-display">
        <ShapeItem shape={State.editShape.value} />
      </div>
      <ColorForm props={State.editShape.value.props} />
    </div>
  );
}

type ColorFormProps = {
  props:
    | State.SquareProps
    | State.StarProps
    | State.BullseyeProps
    | State.CatProps;
};

function ColorForm({ props }: ColorFormProps) {
  const keys = Object.keys(props).filter((key) => key !== "type");
  const values = Object.values(props).slice(1);
  return (
    <div id="shape-form">
      {keys.map((key, index) => (
        <div className="shape-input">
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input type="number" value={values[index]} />
        </div>
      ))}
    </div>
  );
}
function NoShape() {
  return (
    <div id="no-shape">
      <p>Select One</p>
    </div>
  );
}
function MultipleShapes() {
  return (
    <div id="mult-shapes">
      <p>Too Many Selected</p>
    </div>
  );
}
