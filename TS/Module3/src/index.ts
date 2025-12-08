import { Player } from "./Player.js";
import { Enemy } from "./Enemy.js";

const player = new Player(0, 0, 100);
const enemy = new Enemy(5, 5, 60);

player.move(1, 2);
enemy.move(-1, 0);

player.takeDamage(10);
enemy.takeDamage(25);
