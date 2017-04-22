import Vector2 = THREE.Vector2;
import nextPowerOfTwo = THREE.Math.nextPowerOfTwo;
import {Autowired} from "./Autowired";
import {Player} from "./Player";
import {WorldBlock} from "./WorldBlock";
import {TileType} from "./TileType";

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
            let startingWorldBlock: WorldBlock = this.autowired.world.map[startingPosition.x][startingPosition.y];
            startingWorldBlock.setOwningPlayer(newPlayer);
            startingWorldBlock.setTileType(TileType.townHall1)
        }
        this.playerCharacter = this.players[0];

    }

    neighborOffsets: THREE.Vector2[] = [new Vector2(1, 0), new Vector2(-1, 0), new Vector2(0, 1), new Vector2(0, -1)];

    withNeighborOffsets(point: THREE.Vector2): THREE.Vector2[] {
        let returnValue: THREE.Vector2[] = [];
        for (let neighborOffset of this.neighborOffsets) {
            let neighborPoint = point.clone().add(neighborOffset);
            if (this.autowired.world.isWithinBounds(neighborPoint.x, neighborPoint.y)) {
                returnValue.push(neighborPoint)
            }
        }
        return _.shuffle(returnValue) as THREE.Vector2[];
    }

    openNeighborBlocks(point: THREE.Vector2): WorldBlock[] {
        let neighborPoints: Vector2[] = this.withNeighborOffsets(point);
        let returnValue: WorldBlock[] = [];
        for (let neighbor of neighborPoints) {
            let neighborBlock = this.autowired.world.map[neighbor.x][neighbor.y];
            let neighborTileIsEmpty = !neighborBlock.owningPlayer;
            if (neighborTileIsEmpty) {
                returnValue.push(neighborBlock);
            }
        }
        return returnValue;
    }

    enemyNeighborBlocks(point: THREE.Vector2): WorldBlock[] {
        let neighborPoints: Vector2[] = this.withNeighborOffsets(point);
        let block: WorldBlock = this.autowired.world.map[point.x][point.y];
        let returnValue: WorldBlock[] = [];
        for (let neighbor of neighborPoints) {
            let neighborBlock: WorldBlock = this.autowired.world.map[neighbor.x][neighbor.y];
            let isEnemyTile: boolean = neighborBlock.owningPlayer != null && neighborBlock.owningPlayer != block.owningPlayer
            if (isEnemyTile) {
                returnValue.push(neighborBlock);
            }
        }
        return returnValue;
    }

    update(): void {
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let point: THREE.Vector2 = new THREE.Vector2(i, j);
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                let tileType: TileType = worldBlock.tileType;
                if (worldBlock.owningPlayer) {
                    for (let neighborBlock of this.openNeighborBlocks(point)) {
                        let shouldSpawn = tileType.chanceToSpawn > Math.random();
                        if (shouldSpawn) {
                            neighborBlock.setOwningPlayer(worldBlock.owningPlayer);
                        }
                    }
                    let enemyNeighbors: WorldBlock[] = this.enemyNeighborBlocks(point);
                    for (let neighborBlock of enemyNeighbors) {
                        let shouldKill = worldBlock.owningPlayer.attack / neighborBlock.owningPlayer.defense > Math.random();
                        if (shouldKill) {
                            neighborBlock.setOwningPlayer(null);
                        }
                    }
                    let openNeighbors: WorldBlock[] = this.openNeighborBlocks(point);
                    if (openNeighbors.length > 0) {
                        let possibleNewPosition = openNeighbors[0];
                        let probabilityToMove = tileType.tendencyToLeave / possibleNewPosition.tileType.tendencyToEnter;
                        if (probabilityToMove > Math.random()) {
                            possibleNewPosition.setOwningPlayer(worldBlock.owningPlayer);
                            worldBlock.setOwningPlayer(null);
                        }
                    }

                }
            }
        }
        for(let player of this.players) {
            player.resetStats()
        }
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let point: THREE.Vector2 = new THREE.Vector2(i, j);
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                let tileType: TileType = worldBlock.tileType;
                if (worldBlock.owningPlayer) {
                    let player : Player = worldBlock.owningPlayer;
                    player.playerStats.incrementTileType(tileType);
                }
            }
        }
        for(let player of this.players) {
            player.gold += player.playerStats.totalGold();
        }
    }
}
