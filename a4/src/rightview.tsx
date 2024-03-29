import { useRef, useEffect } from "preact/hooks";

// Components imports
import ShapeItem from "./shapeitem";

// Styles
import "./rightview.css";

// State
import * as State from "./state";

export default function EditorView() {
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
  const shape = State.editShape.value as State.Shape;
  const keys = Object.keys(props).filter((key) => key !== "type");
  const values = Object.values(props).slice(1);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (inputRef.current === null) return;
  //   console.log("ref.current");
  //   State.updateShape(
  //     Number(inputRef.current.id),
  //     inputRef.current.className,
  //     Number(inputRef.current.value)
  //   );
  //   inputRef.current.value = values.toString();
  //   inputRef.current.max = "360";
  //   inputRef.current.min = "0";
  // }, [props]);
  
  console.log("render");
  console.log(shape);
  
  const handleChange = (e: Event) => {
    if (inputRef.current === null) return;
    console.log("ref.current");
    console.log(shape);
    console.log(State.shapes.value);
    State.updateShape(
      Number(inputRef.current.id),
      inputRef.current.className,
      Number(inputRef.current.value)
    );
    inputRef.current.max = "360";
    inputRef.current.min = "0";
  };

  return (
    <div id="shape-form">
      {keys.map((key, index) => (
        <div className="shape-input">
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input
            type="number"
            id={shape.id.toString()}
            class={key}
            ref={inputRef}
            value={values[index]}
            onChange={handleChange}
          />
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
