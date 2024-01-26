// Card Drawable 
import { Drawable } from "./drawable";
import { Picture } from "./picture";
import { Cat } from "./cat";
import { Star } from "./star";
import { BullsEye } from "./bullseye";


export class Card implements Drawable{
    x: number;
    y: number;
    private _side: string;
    private _element: string;
    size: number = 80;
    picture: Picture;
    
    constructor(side: string, element: string) {
        // TODO: fails because it is initializes to 0,0
        this.x = 0;
        this.y = 0;
        this._side = side;
        this._element = element.slice(0, element.length - 1);
        if (this._element == "cat") {
            this.picture = new Cat(this.x + (this.size)/2, this.y + (this.size)/2, parseInt(element[element.length - 1], 0.7));
        } else if (this._element == "star") {
            this.picture = new Star(this.x + (this.size)/2, this.y + (this.size)/2, parseInt(element[element.length - 1], 0.7));
        } else if (this._element == "bullseye") {
            this.picture = new BullsEye(this.x + (this.size)/2, this.y + (this.size)/2, parseInt(element[element.length - 1], 0.7));
        } else {
            throw new Error("Invalid card element: " + element);
        }
    }

    get side() {
        return this._side;
    }
    set side(side: string) {
        if (side == "front" || side == "back") {
            this._side = side;
        } else {          
            throw new Error("Invalid card side: " + side);
        }
    }

    get element() {
        return this._element;
    }
    set element(element: string) {
        if (element == "cat") {
            this._element = element;
            this.picture = new Cat(this.x + (this.size)/2, this.y + (this.size)/2, 0.7);
        } else if (element == "star") {
            this._element = element;
            this.picture = new Star(this.x + (this.size)/2, this.y + (this.size)/2, 0.7);
        } else if (element == "bullseye") {
            this._element = element;
            this.picture = new BullsEye(this.x + (this.size)/2, this.y + (this.size)/2, 0.7);
        } else {
            throw new Error("Invalid card element: " + element);
        }
    }

    draw(gc: CanvasRenderingContext2D) {
        gc.save();
        gc.translate(this.x, this.y);
        
        gc.fillStyle = "white";
        gc.fillRect(0, 0, this.size, this.size);
        gc.strokeStyle = "black";
        gc.lineWidth = 1;
        gc.strokeRect(0, 0, this.size, this.size);
        gc.restore();
        if (this._side == "front") {
            this.picture.x = this.x + 40;
            this.picture.y = this.y + 40;
            this.picture.draw(gc);
        } else if (this._side == "back") {
            gc.save();
            gc.translate(this.x + 5, this.y + 5);
            gc.fillStyle = "lightblue";
            gc.fillRect(0, 0, this.size - 10, this.size - 10);
            gc.restore();
        }
    }

    flip() {
        if (this.side == "front") {
            this.side = "back";
        } else {
            this.side = "front";
        }
    }
}
