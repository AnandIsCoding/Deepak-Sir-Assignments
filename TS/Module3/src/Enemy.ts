import { GameObject } from "./GameObject.js";

export class Enemy extends GameObject {
  constructor(x: number, y: number, health: number) {
    super(x, y, health);
  }
}
