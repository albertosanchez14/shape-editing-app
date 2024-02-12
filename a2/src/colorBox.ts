import {
  SKElement,
  SKElementProps,
  SKEvent,
  SKMouseEvent,
  Style,
} from "simplekit/imperative-mode";

export type SKColorboxProps = SKElementProps & { checked?: boolean };

export class SKColorbox extends SKElement {
  constructor({
    checked = false,
    ...elementProps
  }: SKColorboxProps = {}) {
    super(elementProps);
    this.checked = checked;
    this.height = Style.minElementSize - 10;
    this.width = Style.minElementSize - 10;
    this.calculateBasis();
    this.doLayout();
  }

  state: "idle" | "hover" | "down" = "idle";

  checked: boolean;

  handleMouseEvent(me: SKMouseEvent) {
    switch (me.type) {
      case "mousedown":
        this.state = "down";
        this.checked = true;
        return true;
        break;
      case "mouseup":
        this.state = "hover";
        //this.checked = !this.checked;
        // return true if a listener was registered
        return this.sendEvent({
          source: this,
          timeStamp: me.timeStamp,
          type: "action",
        } as SKEvent);
        break;
      case "mouseenter":
        this.state = "hover";
        return true;
        break;
      case "mouseexit":
        this.state = "idle";
        return true;
        break;
    }
    return false;
  }

  draw(gc: CanvasRenderingContext2D) {
    // to save typing "this" so much

    gc.save();

    const w = this.paddingBox.width;
    const h = this.paddingBox.height;

    gc.translate(this.margin, this.margin);

    // thick highlight rect, hover state
    if (this.state == "hover") {
      gc.beginPath();
      gc.rect(this.x, this.y, w, h);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // thin highlight rect, down state
    if (this.checked || this.state == "down") {
      gc.beginPath();
      gc.rect(this.x - 3, this.y - 3, w + 6, h + 6);
      gc.strokeStyle = Style.focusColour;
      gc.lineWidth = 2;
      gc.stroke();
    }

    // normal background
    gc.beginPath();
    gc.rect(this.x, this.y, w, h);
    gc.strokeStyle = "black";
    gc.lineWidth = 2;
    gc.fillStyle = this.fill;
    gc.fill();
    gc.stroke();
    gc.clip(); // clip text if it's wider than text area

    gc.restore();

    // element draws debug viz if flag is set
    super.draw(gc);
  }

  public toString(): string {
    return `SKColorbox`;
  }
}
