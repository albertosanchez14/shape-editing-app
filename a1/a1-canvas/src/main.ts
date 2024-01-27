import {
  SKEvent,
  SKMouseEvent,
  SKKeyboardEvent,
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
} from "simplekit/canvas-mode";
import { Board } from "./board";


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
          board.checkMatch();
          if (board.checkWin()) {
            board.unhover_card(x, y);
            gameMode = board.win();
          }
        }
      }
      break;
    case "keyup":
      // Key released
      const { key: keyup } = e as SKKeyboardEvent;
      switch (keyup) {
        case "x":
          // X key
          if (gameMode == "play") {
            board.uncheat();
          }
        break;
      }
      break;
    case "keydown":
      const { key: keydown } = e as SKKeyboardEvent;
      switch (keydown) {
        case "x":
          // X key
          if (gameMode == "play") {
            board.cheat();
          }
        break;
      }
      break;
    case "keypress":
      // Key pressed
      const { key } = e as SKKeyboardEvent;
      switch (key) {
        case " ":
          // Space key
          if (gameMode == "start") {
            gameMode = board.play();
          } else if (gameMode == "win") {
            gameMode = board.start();
            board.addPair();
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
  // clear the canvas
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  gc.fillStyle = "darkgrey";
  gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);
  // we just draw the current state of the square
  board.draw(gc);
});

// start SimpleKit
startSimpleKit();
