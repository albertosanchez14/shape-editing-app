import {
  SKEvent,
  SKMouseEvent,
  SKKeyboardEvent,
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
} from "simplekit/canvas-mode";
import { Card } from "./drawables/card";
import { Board } from "./board";

export let HEIGHT = window.innerHeight;
export let WIDTH = window.innerWidth;

// create a new board
const board: Board = new Board();

// event handler with switch statement dispatch
function handleEvent(e: SKEvent) {
  switch (e.type) {
    case "mousemove":
      break;
    case "click":
      break;
    case "drag":
      break;
    case "dblclick":
      break;
    case "keydown":
      break;
    case "keyup":
      break;
    case "keypress":
      // Key pressed
      const { key } = e as SKKeyboardEvent;
      switch (key) {
        case " ":
          // Space key
          board.play();
          break;
      }
  }
}

// set the event handler
setSKEventListener(handleEvent);

// set the draw callback (using function expression)
setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  // clear the canvas
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  gc.fillStyle = "darkgrey";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);
  // we just draw the current state of the square
  board.positionCards(gc);
  board.draw(gc);
});

// start SimpleKit
startSimpleKit();
