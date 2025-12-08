export class GameObject{
    constructor(public x:number, public y:number, public health: number){}
  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
    console.log(`${this.constructor.name} moved to (${this.x}, ${this.y})`);
  }

  takeDamage(amount: number) {
    this.health -= amount;
    console.log(`${this.constructor.name} health: ${this.health}`);
  }

}


