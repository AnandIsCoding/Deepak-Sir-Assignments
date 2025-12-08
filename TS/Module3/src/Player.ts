import { GameObject } from "./GameObject.js";


//Player class extending gameObject class

export class Player extends GameObject {
  constructor(x: number, y: number, health: number) {
    super(x, y, health);
  }
}
