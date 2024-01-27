import { random } from 'simplekit/utility';
import { Card } from './drawables/card.ts';


// set the card types
interface cardTypes {
    cat0: boolean, cat1: boolean, cat2: boolean, cat3: boolean, cat4: boolean,
    star0: boolean, star1: boolean, star2: boolean, star3: boolean, star4: boolean,
    bullseye0: boolean, bullseye1: boolean, bullseye2: boolean, bullseye3: boolean, bullseye4: boolean
}


export class Board {
    deck: Card[];
    private _pairs: number;
    private _message: string;
    private separation: number = 10;
    private _configuration: cardTypes;
    private _revealed_cards: number;
    constructor() {
        this.deck = [];
        this._pairs = 0;
        this._configuration = {
            cat0: false, cat1: false, cat2: false, cat3: false, cat4: false,
            star0: false, star1: false, star2: false, star3: false, star4: false,
            bullseye0: false, bullseye1: false, bullseye2: false, bullseye3: false, bullseye4: false
        };
        this.addPair();
        this._message = this._pairs + " pair: Press SPACE to play";
        this._revealed_cards = 0;
    }
    draw(gc: CanvasRenderingContext2D): void {
        for (let i = 0; i < this.deck.length; i++) {
            // Draw message
            gc.font = "24px sans-serif";
            gc.textAlign = "center";
            gc.textBaseline = "middle";
            gc.fillStyle = "white";
            gc.fillText(this._message, gc.canvas.width/2, this.deck[0].y/2);
            // Draw cards
            this.positionCards(gc);
            this.deck[i].draw(gc);
        }
    }
    addPair(): void {
        // Choose random card
        let available_key: string[] = [];
        for (const key in this._configuration) {
            if(this._configuration.hasOwnProperty(key)) {
                if (this._configuration[key as keyof cardTypes] == false) {
                    available_key.push(key);
                }
            }
        }
        let position = Math.floor(random(0, available_key.length));
        // Add card
        this.deck.push(new Card("front", available_key[position]));
        this.deck.push(new Card("front", available_key[position]));
        // Update configuration
        this._configuration[available_key[position] as keyof cardTypes] = true;
        this._pairs++
        // Update message
        this._message = this._pairs + " pairs: Press SPACE to play";
    }
    removePair(): void {
        // Choose random card
        console.log(this.deck);
        let available_key: string[] = [];
        for (const key in this._configuration) {
            if(this._configuration.hasOwnProperty(key)) {
                if (this._configuration[key as keyof cardTypes] == true) {
                    available_key.push(key);
                }
            }
        }
        let position = Math.floor(random(0, available_key.length));
        // Remove card
        for (let i = 0; i < this.deck.length; i++) {
            const element: string = available_key[position].slice(0, available_key[position].length - 1);
            if (this.deck[i].element == element) {
                const picture = this.deck[i].picture;
                if (picture.index == parseInt(available_key[position][available_key[position].length - 1])) {
                    this.deck.splice(i, 2);
                }
            }
        }
        // Update configuration
        this._configuration[available_key[position] as keyof cardTypes] = false;
        this._pairs--
        // Update message
        this._message = this._pairs + " pairs: Press SPACE to play";
    }
    private _shuffle(): void {
        // Shuffle the position of the cards
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(random(0, i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    play(): string {
        // Remove message
        this._message = "";
        // Flip cards
        for (let i = 0; i < this.deck.length; i++) {
            this.deck[i].flip();
        }
        // Randomize cards   
        this._shuffle();
        // Return game mode
        return "play";
    }
    start(): string {
        // Un flip cards
        for (let i = 0; i < this.deck.length; i++) {
            if (this.deck[i].side == "back") {
                this.deck[i].flip();
            }
        }
        // Update message
        this._message = this._pairs + " pairs: Press SPACE to play";
        // Return game mode
        return "start";
    }
    mouseInCard(x: number, y: number): boolean {
        for (let i = 0; i < this.deck.length; i++) {
            if (this.deck[i].mouseIn(x, y)) {
                return true;
            }
        }
        return false;
    }
    hover_card(x: number, y: number): void {
        for (let i = 0; i < this.deck.length; i++) {
            if (this.deck[i].mouseIn(x, y)) {
                this.deck[i].hover = true;
            } else {
                this.deck[i].hover = false;
            }
        }
    }
    unhover_card(x: number, y: number): void {
        for (let i = 0; i < this.deck.length; i++) {
            this.deck[i].hover = false;
        }
    }
    positionCards(gc: CanvasRenderingContext2D): void {
        const slots_x = Math.floor(gc.canvas.width/(this.separation + this.deck[0].size));
        let k_x_l = Math.min(this.deck.length/2, Math.floor(slots_x/2));
        let k_x_r = 1;
        let max_k_y = this.deck.length/(k_x_l*2);
        if (max_k_y%Math.floor(max_k_y) != 0) {
           max_k_y = Math.floor(max_k_y) + 1; 
        }
        let k_y_up = Math.ceil(max_k_y/2);
        let k_y_do = 0;
        for (let i = 0; i < this.deck.length; i++) {
            // Compute position x
            this.deck[i].x = gc.canvas.width/2
            // Case 1: cards left
            if (k_x_l >= 1) {
                this.deck[i].x -= (k_x_l-1)*this.separation + (this.separation/2) + k_x_l*this.deck[i].size;
                k_x_l--;
            // Case 2: cards right
            } else {
                this.deck[i].x += (k_x_r-1)*this.separation + (this.separation/2) + (k_x_r-1)*this.deck[i].size;
                k_x_r++;
            }
            
            // Compute position y
            this.deck[i].y = gc.canvas.height/2 
            // Case 1: even number of rows
            if (max_k_y%2 == 0) {
                if (k_y_up >= 1) {
                    this.deck[i].y -= k_y_up*this.deck[i].size + this.separation*(k_y_up-1/2);
                } else {
                    this.deck[i].y += (k_y_do-1)*this.deck[i].size + (k_y_do-1/2)*this.separation;
                }
            // Case 2: odd number of rows     
            } else {
                if (k_y_up >= 1) {
                    this.deck[i].y -=  this.deck[i].size*(k_y_up-1/2) + (k_y_up-1)*this.separation;
                } else {
                    this.deck[i].y +=  this.deck[i].size*(k_y_do-1/2) + k_y_do*this.separation;
                }
            }
            
            // Reset k_x_l and k_x_r if exceeding
            if (k_x_r > slots_x/2) {
                k_x_l = Math.min(this.deck.length/2, Math.floor(slots_x/2), Math.floor((this.deck.length - i)/2));
                k_x_r = 1;
                k_y_up--;
                if (k_y_up <= 0) {
                    k_y_do++;
                }
            }
        }
    }
    reveal_card(x: number, y: number): void {
        for (let i = 0; i < this.deck.length; i++) {
            if (this.deck[i].mouseIn(x, y)) {
                console.log(this.deck[i].element);
                console.log(this._revealed_cards)
                if (this.deck[i].side == "back" && this._revealed_cards < 2) {
                    this.deck[i].flip();
                    this._revealed_cards++;
                    break;
                } else if(this.deck[i].side == "front") {
                    this.deck[i].flip();
                    this._revealed_cards--;
                    break;
                }
            }
        }
    }
    
}
