import {TileType} from "./TileType";
import {Autowired} from "./Autowired";
import Vector2 = THREE.Vector2;
import {Player} from "./Player";

export class WorldBlock {
    tileType: TileType;
    tileMesh: THREE.Mesh;
    backgroundMesh: THREE.Mesh;
    owningPlayer: Player;

    constructor() {

    }

    setOwningPlayer(newOwningPlayer: Player) {
        this.owningPlayer = newOwningPlayer;
        this.backgroundMesh.material = newOwningPlayer.material;
    }
}
