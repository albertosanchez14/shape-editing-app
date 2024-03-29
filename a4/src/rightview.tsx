import { useRef } from "preact/hooks";

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
  const viewProp = () => {
    switch (props.type) {
      case "square":
        return { hue: props.hue };
      case "star":
        return {
          hue: props.hue,
          points: props.points,
          radius: props.r2,
        };
      case "bullseye":
        return {
          hue1: props.hue,
          hue2: props.hue2,
          rings: props.rings,
        };
      case "cat":
        return { hue: props.hue, look: props.look };
    }
  };
  const shape = State.editShape.value as State.Shape;
  const keys = Object.keys(viewProp());
  const keyUn = keys.map((key) => {
    if (key === "hue1") return "hue";
    if (key === "radius") return "r2";
    return key;
  });
  const values = Object.values(viewProp());
  const inputRefs = keys.map(() => useRef<HTMLInputElement>(null));
  const handleInput = (index: number) => (e: Event) => {
    const inputRef = inputRefs[index];
    if (inputRef.current === null) return;
    // Get the range values of the input
    const [min, max] = new State.Validator().getRange(
      inputRef.current.className
    );
    if (min === null || max === null) return;
    console.log(min, max);
    inputRef.current.min = min.toString();
    inputRef.current.max = max.toString();
    // Update the shape
    State.updateShape(
      Number(inputRef.current.id),
      inputRef.current.className,
      Number(inputRef.current.value)
    );
  };
  return (
    <div id="shape-form">
      {keys.map((key, index) => (
        <div className="shape-input">
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input
            type="number"
            id={shape.id.toString()}
            class={keyUn[index]}
            ref={inputRefs[index]}
            value={values[index]}
            onInput={handleInput(index)}
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
