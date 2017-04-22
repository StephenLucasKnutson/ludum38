import Vector2 = THREE.Vector2;
import nextPowerOfTwo = THREE.Math.nextPowerOfTwo;
import {Autowired} from "./Autowired";
import {Player} from "./Player";
import {WorldBlock} from "./WorldBlock";

export class Simulator {
    autowired: Autowired;

    players: Player[] = [];
    playerCharacter: Player;

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        for (let i: number = 0; i < 4; i++) {
            let newPlayer: Player = new Player();
            this.players.push(newPlayer);

            let startingPosition: THREE.Vector2 = this.autowired.world.randomSpot();
            this.autowired.world.map[startingPosition.x][startingPosition.y].setOwningPlayer(newPlayer);
        }
        this.playerCharacter = this.players[0];

    }

    neighborOffsets: THREE.Vector2[] = [new Vector2(1, 0), new Vector2(-1, 0), new Vector2(0, 1), new Vector2(0, -1)];

    withNeighborOffsets(point: THREE.Vector2): THREE.Vector2[] {
        let returnValue = [];
        for (let neighborOffset of this.neighborOffsets) {
            let neighborPoint = point.clone().add(neighborOffset);
            if (this.autowired.world.isWithinBounds(neighborPoint.x, neighborPoint.y)) {
                returnValue.push(neighborPoint)
            }
        }
        return returnValue;
    }

    update(): void {
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let point: THREE.Vector2 = new THREE.Vector2(i, j);
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                if (worldBlock.owningPlayer) {
                    for (let neighbor of this.withNeighborOffsets(point)) {
                        let neighborBlock = this.autowired.world.map[neighbor.x][neighbor.y];
                        if (Math.random() < 0.1) {
                            neighborBlock.setOwningPlayer(worldBlock.owningPlayer);
                        }
                    }
                }
            }
        }
    }
}
