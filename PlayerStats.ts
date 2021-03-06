import Vector2 = THREE.Vector2;
import nextPowerOfTwo = THREE.Math.nextPowerOfTwo;
import {TileType} from "./TileType";

export class PlayerStats {
    tileTypeToNumberOwned: {[key: string]: number;} = {};

    constructor() {
    }

    incrementTileType(tileType: TileType) {
        let tileTypeName: string = tileType.name;
        if (this.tileTypeToNumberOwned[tileTypeName] == null) {
            this.tileTypeToNumberOwned[tileTypeName] = 0;
        }
        this.tileTypeToNumberOwned[tileTypeName]++;
    }

    totalGoldPerTurn() {
        let returnValue: number = 0;
        for (let tileTypeName in this.tileTypeToNumberOwned) {
            let numberOwned = this.tileTypeToNumberOwned[tileTypeName];
            let goldPer = TileType.tileTypeToGold[tileTypeName];
            returnValue += numberOwned * goldPer;
        }
        return returnValue;
    }

    totalUnits() {
        let returnValue: number = 0;
        for (let tileTypeName in this.tileTypeToNumberOwned) {
            returnValue += this.tileTypeToNumberOwned[tileTypeName];
        }
        return returnValue;
    }
}
