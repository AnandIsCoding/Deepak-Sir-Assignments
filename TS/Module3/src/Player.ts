import { GameObject } from "./GameObject.js";

export class Player extends GameObject {
  constructor(x: number, y: number, health: number) {
    super(x, y, health);
  }
}
