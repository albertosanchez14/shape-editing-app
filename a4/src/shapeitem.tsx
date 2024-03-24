import { useRef, useEffect } from "preact/hooks";

// Props
import { SquareProps, StarProps, BullseyeProps, CatProps } from "./state";

// Styles
import "./shapeitem.css";

// State
import * as State from "./state";

type ShapeProp = { shape: State.Shape };

// Component
export default function ShapeItem({ shape }: ShapeProp) {
  switch (shape.props.type) {
    case "square":
      return <Square shape={shape} />;
    case "star":
      return <Star shape={shape} />;
    case "bullseye":
      return <Bullseye shape={shape} />;
    case "cat":
      return <Cat shape={shape} />;
    default:
      return null;
  }
}

// Sub-components
// TODO: Implement the Square, Star, Bullseye, and Cat components
// in other modules to reuse them in other parts of the application
function Square({ shape }: ShapeProp) {
  return (
    <div
      id={shape.id.toString()}
      style={{ backgroundColor: `hsl(${shape.props.hue}, 50%, 50%)` }}
    />
  );
}
function Star({ shape }: ShapeProp) {
  const prop = shape.props as StarProps;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current != null) {
      canvasRef.current.width = 100;
      canvasRef.current.height = 100;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx === null) {
        throw new Error("2d context not supported");
      }
      const centerX = canvasRef.current.width / 2;
      const centerY = canvasRef.current.height / 2;
      ctx.fillStyle = `hsl(${prop.hue}, 50%, 50%)`;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      const inner_rad = prop.r1;
      const outer_rad = prop.r2;
      const points = prop.points;
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outer_rad : inner_rad;
        const angle = (Math.PI / points) * i;
        const xCoordinate = centerX + radius * Math.cos(angle);
        const yCoordinate = centerY + radius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(xCoordinate, yCoordinate);
        } else {
          ctx.lineTo(xCoordinate, yCoordinate);
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      canvasRef.current.style.width = "100%";
      canvasRef.current.style.height = "100%";
      canvasRef.current.style.display = "block";
    }
  }, []);
  return <canvas ref={canvasRef} />;
}
function Bullseye({ shape }: ShapeProp) {
  const prop = shape.props as BullseyeProps;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current != null) {
      canvasRef.current.width = 100;
      canvasRef.current.height = 100;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx === null) {
        throw new Error("2d context not supported");
      }
      const centerX = canvasRef.current.width / 2;
      const centerY = canvasRef.current.height / 2;
      const hue = `hsl(${prop.hue}, 50%, 50%)`;
      const hue2 = `hsl(${prop.hue2}, 50%, 50%)`;
      const radius = prop.radius;
      const rings = prop.rings;
      const ringWidth = radius / rings;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      for (let i = 0; i < rings; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - i * ringWidth, 0, 2 * Math.PI);
        ctx.fillStyle = i % 2 === 0 ? hue : hue2;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
      canvasRef.current.style.width = "100%";
      canvasRef.current.style.height = "100%";
      canvasRef.current.style.display = "block";
    }
  }, []);
  return <canvas ref={canvasRef} />;
}
function Cat({ shape }: ShapeProp) {
  const prop = shape.props as CatProps;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      canvasRef.current.width = 100;
      canvasRef.current.height = 100;
      const gc = canvasRef.current.getContext("2d");
      if (gc === null) {
        throw new Error("2d context not supported");
      }
      gc.fillStyle = `hsl(${prop.hue}, 50%, 50%)`;
      gc.strokeStyle = "black";
      gc.lineWidth = 2;
      gc.save();
      gc.translate(canvasRef.current.width / 2, canvasRef.current.height / 2);
      // head white outline
      gc.beginPath();
      gc.arc(0, 0, 40, 0, 2 * Math.PI);
      gc.stroke();
      // ears
      gc.beginPath();
      // left
      gc.moveTo(-40, -48);
      gc.lineTo(-8, -36);
      gc.lineTo(-35, -14);
      gc.closePath();
      // right
      gc.moveTo(40, -48);
      gc.lineTo(8, -36);
      gc.lineTo(35, -14);
      gc.closePath();
      gc.stroke();
      gc.fill();
      // head
      gc.beginPath();
      gc.arc(0, 0, 40, 0, 2 * Math.PI);
      gc.fill();
      // whites of eyes
      gc.strokeStyle = "black";
      gc.fillStyle = "white";
      gc.lineWidth = 1;
      gc.beginPath();
      // left
      gc.ellipse(-16, -9, 8, 14, 0, 0, Math.PI * 2);
      gc.fill();
      gc.stroke();
      // right
      gc.beginPath();
      gc.ellipse(16, -9, 8, 14, 0, 0, Math.PI * 2);
      gc.fill();
      gc.stroke();
      // eyeballs
      gc.fillStyle = "black";
      let x: number;
      if (prop.look === "left") {
        x = -3;
      } else if (prop.look === "centre") {
        x = 0;
      } else {
        x = 3;
      }
      gc.beginPath();
      // left
      gc.arc(-16 + x, -9, 5, 0, Math.PI * 2);
      gc.fill();
      // right
      gc.beginPath();
      gc.arc(16 + x, -9, 5, 0, Math.PI * 2);
      gc.fill();
      gc.restore();
      canvasRef.current.style.width = "100%";
      canvasRef.current.style.height = "100%";
      canvasRef.current.style.display = "block";
    }
  }, []);
  return <canvas ref={canvasRef} />;
}
