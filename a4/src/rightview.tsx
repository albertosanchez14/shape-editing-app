import { useEffect, useRef } from "react";
import "./rightview.css"

import ShapeItem from "./shapeitem";
import * as State from "./state";
import { Drawing } from "./drawing";


export default function RightView() {
  return (
    <div id="right-view">
        <EditorView />
    </div>
  );
}

function EditorView() {
  const editorRef = useRef<HTMLDivElement>(null);
  // Case 1: No shape is selected
  if (State.editShape.value !== undefined) {
    const shape = State.editShape.value;
    return (
      <div id="editor">
        <div id="shape-display">
          <ShapeItem shape={shape} />
        </div>
        <div id="color-form">

        </div>
      </div>
    );
  }

  return (
    <div id="editor" ref={editorRef}></div>
  );
}