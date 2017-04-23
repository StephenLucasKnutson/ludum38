import {TileType} from "./TileType";
import {Player} from "./Player";
import {World} from "./World";
import Vector2 = THREE.Vector2;

export class Minion {
    owningPlayer: Player;
    attack: number = 0.1;
    defense: number = 0.5;
    targetColor: string;
    constructor(owningPlayer: Player) {
        this.owningPlayer = owningPlayer;
    }
}
