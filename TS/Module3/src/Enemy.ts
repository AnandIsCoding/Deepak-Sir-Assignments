import { GameObject } from "./GameObject.js";


// Enemy class extending GameObject class
export class Enemy extends GameObject {
  constructor(x: number, y: number, health: number) {
    super(x, y, health);
  }
}
