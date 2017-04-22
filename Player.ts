import Vector2 = THREE.Vector2;
import nextPowerOfTwo = THREE.Math.nextPowerOfTwo;

export class Player {
    color: number;
    material: THREE.Material;

    constructor() {
        if(Player.nextPlayerColorIndex == Player.allPlayerColors.length) {
            throw new Error('Ran out of colors');
        }
        this.color = Player.allPlayerColors[Player.nextPlayerColorIndex++];
        this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.BackSide});
    }

    static nextPlayerColorIndex: number = 0;
    static allPlayerColors = [ 0xFF0000, 0x0000FF, 0x000000, 0xFFA500, 0x00FF00, 0xD2691E]
}
