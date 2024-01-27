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

// game mode
let gameMode: string = "start";

// set the event handler
setSKEventListener(handleEvent);

// event handler with switch statement dispatch
function handleEvent(e: SKEvent) {
  switch (e.type) {
    case "mousemove":
      if (gameMode == "play") {
        const { x, y } = e as SKMouseEvent;
        console.log(board.mouseInCard(x, y));
        if (board.mouseInCard(x, y)) {
          board.hover_card(x, y);
        } else {
          board.unhover_card(x, y);
        }
      }
      break;
    case "click":
      if (gameMode == "play") {
        const { x, y } = e as SKMouseEvent;
        if (board.mouseInCard(x, y)) {
          board.reveal_card(x, y);
          
        }
      }
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
          if (gameMode == "start") {
            gameMode = board.play();
          }
          break;
        case "q":
          // Q key
          if (gameMode == "play") {
            gameMode = board.start();
          }
          break;
        case "+":
          // + key
          if (gameMode == "start") {
            board.addPair();
          }
          break;
        case "-":
          // - key
          if (gameMode == "start") {
            board.removePair();
          }
          break;
      }
  }
}

// set the draw callback (using function expression)
setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  // clear the canvas
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  gc.fillStyle = "darkgrey";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);
  // we just draw the current state of the square
  board.draw(gc);
});

// start SimpleKit
startSimpleKit();
