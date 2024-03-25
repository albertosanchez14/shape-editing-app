import { Ref } from "preact";

import { Shape, StarProps } from "./state";

/**
 * Drawing class to draw shapes on a canvas
 */
export class Drawing {
    private canvas: HTMLCanvasElement = document.createElement("canvas");
    /**
     * Draw a star on a 100x100 canvas element
     * @param shape The shape to draw
     * @returns The canvas with the star drawn on it
     */
    drawStar(shape: Shape) {
        const prop = shape.props as StarProps;        
        this.canvas.width = 100;
        this.canvas.height = 100;
        const ctx = this.canvas.getContext("2d");
        if (ctx === null) {
            throw new Error("2d context not supported");
        }
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
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
        return this.canvas;
    }
}