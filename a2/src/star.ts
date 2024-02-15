import {
  SKElement,
  SKElementProps,
  SKEvent,
  SKKeyboardEvent,
  SKMouseEvent,
  Style,
  requestKeyboardFocus,
} from "simplekit/imperative-mode";


type SKStarProps = SKElementProps & { 
  checked?: boolean,
  inner_rad?: number
  outer_rad?: number
  points?: number}; 


  export class SKStar extends SKElement {
  constructor({
    checked = false,
    inner_rad = 15, 
    ...elementProps }: SKStarProps = {}) {
    super(elementProps);
    this.checked = checked;
    this.inner_rad = inner_rad;
    this.height = Style.minElementSize - 10;
    this.width = Style.minElementSize - 10;
    this.calculateBasis();
    this.doLayout();
  }

  state: "idle" | "hover" | "down" = "idle";
  checked: boolean;
  multiSelect: boolean = false;
  scale: number = 0.5;

  // inner radius of the star
  inner_rad: number;
  // outer radius of the star
  outer_rad: number = 0;
  // number of points on the star
  points: number = 0;

  handleMouseEvent(me: SKMouseEvent) {
    switch (me.type) {
      case "mousedown":
        this.state = "down";
        return true;
        break;
      case "mouseup":
        this.state = "hover";
        // Case 1: if multiSelect is true, then toggle the checked state
        this.checked = !this.checked;
        // return true if a listener was registered
        return this.sendEvent({
          source: this,
          timeStamp: me.timeStamp,
          type: "color_clicked",
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
    gc.save();

    const w = this.paddingBox.width;
    const h = this.paddingBox.height;

    gc.translate(this.margin, this.margin);

    // hover state
    if (this.state == "hover") {
      gc.beginPath();
      gc.rect(this.x, this.y, w, h);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // focus form
    if (this.checked === true || this.state == "down") {
      gc.beginPath();
      gc.rect(this.x - 3, this.y - 3, w + 6, h + 6);
      gc.strokeStyle = Style.focusColour;
      gc.lineWidth = 2;
      gc.stroke();
    }

    let rotation = Math.PI/2*3;
    let x = 0;
    let y = 0;
    let step = Math.PI/this.points;

    // normal background
    gc.beginPath();
    gc.rect(this.x, this.y, w, h);
    gc.strokeStyle = "grey";
    gc.lineWidth = 1;
    gc.fillStyle = "white";
    gc.fill();
    gc.stroke();

	  gc.translate(this.x + w/2, this.y + h/2);
	  gc.scale(this.scale, this.scale);

    gc.beginPath();
    gc.fillStyle = this.fill;
    gc.strokeStyle = "black";
    gc.lineWidth = 2;
    gc.moveTo(0, -this.outer_rad)
    for(let i = 0; i < this.points; i++){
        x = Math.cos(rotation)*this.outer_rad;
        y = Math.sin(rotation)*this.outer_rad;
        gc.lineTo(x,y)
        rotation += step

        x = Math.cos(rotation)*this.inner_rad;
        y = Math.sin(rotation)*this.inner_rad;
        gc.lineTo(x, y)
        rotation += step
    }
    gc.lineTo(0, -this.outer_rad);
    gc.closePath();
    gc.stroke();
    gc.fill();

    gc.restore();

    // element draws debug viz if flag is set
    super.draw(gc);
  }

  public toString(): string {
    return `SKStar `;
  }
}
