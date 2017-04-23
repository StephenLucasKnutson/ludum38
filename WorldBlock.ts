import {TileType} from "./TileType";
import {Player} from "./Player";
import {World} from "./World";
import Vector2 = THREE.Vector2;


// https://i.stack.imgur.com/4laaY.jpg
export class WorldBlock {
    tileType: TileType;
    lastNatureState: TileType;
    tileMesh: THREE.Mesh;
    backgroundMesh: THREE.Mesh;
    owningPlayer: Player;
    isSelected: boolean;

    constructor() {

    }

    setOwningPlayer(newOwningPlayer: Player) {
        this.owningPlayer = newOwningPlayer;
        if (!this.isSelected) {
            if (newOwningPlayer) {
                this.backgroundMesh.material = newOwningPlayer.material;
            } else {
                this.backgroundMesh.material = World.backgroundMaterial;
            }
        }
    }

    setTileType(newTileType: TileType) {
        if(newTileType.isNatureState){
            this.lastNatureState = newTileType;
        }

        this.tileType = newTileType;
        if (this.tileMesh != null) {
            this.tileMesh.material = newTileType.material;
        }
    }

    resetToNature() {
        this.setTileType(this.lastNatureState);
    }

    setSelected(isSelected: boolean) {
        if (isSelected == this.isSelected) {
            return;
        }
        this.isSelected = isSelected;
        if (isSelected) {
            this.backgroundMesh.material = World.backgroundSelectedMaterial;
        } else {
            this.setOwningPlayer(this.owningPlayer)
        }

    }
}
