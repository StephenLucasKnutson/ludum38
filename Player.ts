import Vector2 = THREE.Vector2;
import nextPowerOfTwo = THREE.Math.nextPowerOfTwo;
import {PlayerStats} from "./PlayerStats";

export class Player {
    color: number;
    colorAsString: string;
    name: string;
    material: THREE.Material;
    gold: number = 0;

    kills: number = 0;
    deaths: number = 0;

    playerStats: PlayerStats;

    constructor() {
        if (Player.nextPlayerColorIndex == Player.allPlayerColors.length) {
            throw new Error('Ran out of colors');
        }
        this.color = Player.allPlayerColors[Player.nextPlayerColorIndex];
        this.colorAsString = Player.allPlayerColorsAsString[Player.nextPlayerColorIndex];
        this.name = Player.allPlayersName[Player.nextPlayerColorIndex];
        Player.nextPlayerColorIndex++;
        this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.BackSide});
    }

    resetStats() {
        this.playerStats = new PlayerStats()
    }

    static nextPlayerColorIndex: number = 0;
    static allPlayerColors = [0xFF0000, 0x0000FF, 0xFFA500, 0x00FF00, 0xFF69B4];
    static allPlayerColorsAsString = ['#FF0000', '#0000FF', '#FFA500', '#00FF00', '#FF69B4'];
    static allPlayersName = ['YOU', 'BLUE', 'ORANGE', 'GREEN', 'PINK'];
}
