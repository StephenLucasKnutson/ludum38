import {TileType} from "./TileType";
import {Player} from "./Player";
import {World} from "./World";
import Vector2 = THREE.Vector2;

export class WorldBlock {
    tileType: TileType;
    tileMesh: THREE.Mesh;
    backgroundMesh: THREE.Mesh;
    owningPlayer: Player;

    constructor() {

    }

    setOwningPlayer(newOwningPlayer: Player) {
        this.owningPlayer = newOwningPlayer;
        if (newOwningPlayer) {
            this.backgroundMesh.material = newOwningPlayer.material;
        } else {
            this.backgroundMesh.material = World.backgroundMaterial;
        }

    }

    setTileType(newTileType: TileType) {
        this.tileType = newTileType;
        this.tileMesh.material = newTileType.material;
    }
}
