import {TileType} from "./TileType";
import {Player} from "./Player";
import {World} from "./World";
import Vector2 = THREE.Vector2;
import {Minion} from "./Minion";


// https://i.stack.imgur.com/4laaY.jpg
export class WorldBlock {
    position: Vector2;
    tileType: TileType;
    lastNatureState: TileType;
    tileMesh: THREE.Mesh;
    backgroundMesh: THREE.Mesh;
    isSelected: boolean;
    minion: Minion;

    constructor(position: Vector2) {
        this.position = position;
    }

    setMinion(minion: Minion) {
        if (!this.isSelected) {
            if (!!minion) {
                this.backgroundMesh.material = minion.owningPlayer.material;
            } else {
                this.backgroundMesh.material = World.backgroundMaterial;
            }
            this.minion = minion;
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
            this.setMinion(this.minion)
        }
    }
    getOwningPlayer() : Player {
        return (!!this.minion) ? this.minion.owningPlayer : null;
    }
}
