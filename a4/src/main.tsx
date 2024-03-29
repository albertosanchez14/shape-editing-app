import { render } from "preact";

// Import the views
import ToolBarView from "./toolbar";
import ShapeListView from "./shapelist";
import StatusBarView from "./statusbar";
import EditorView from "./rightview";

// Styles
import "./index.css";

// State
import * as State from "./state";

// Get the app element
const app = document.querySelector("div#app");
if (!app) throw new Error("No app element found");

// Initialize the app
State.init();

// Root component
function App() {
  // Enable multi-select with the shift key
  document.addEventListener("keydown", (e) => {
    e.key === "Shift" ? (State.multiSelect.value = true) : null;
  });
  document.addEventListener("keyup", (e) => {
    e.key === "Shift" ? (State.multiSelect.value = false) : null
  });
  // App layout
  return (
    <>
      <div id="left-view">
        <ToolBarView />
        <ShapeListView />
        <StatusBarView />
      </div>
      <div id="right-view">
        <EditorView />
      </div>
    </>
  );
}

// Render the app
render(<App />, app);
