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

        for (let i: number = 0; i < 5; i++) {
            let newPlayer: Player = new Player();
            this.players.push(newPlayer);

            let startingPosition: THREE.Vector2 = this.autowired.world.randomSpotOnPlains();
            let startingWorldBlock: WorldBlock = this.autowired.world.map[startingPosition.x][startingPosition.y];
            startingWorldBlock.setOwningPlayer(newPlayer);
            startingWorldBlock.setTileType(TileType.village);
            if(i == 0) {
                this.playerCharacter = newPlayer;
                this.autowired.camera.position.x = startingPosition.x * 10;
                this.autowired.camera.position.y = startingPosition.y * 10;
            }
        }
    }

    nonPlayerCharacters() {
        let returnValue: Player[] = [];
        for (let player of this.players) {
            if (player != this.playerCharacter) {
                returnValue.push(player);
            }
        }
        return returnValue;
    }


    openNeighborBlocks(point: THREE.Vector2): WorldBlock[] {
        let neighborBlocks: WorldBlock[] = this.autowired.world.neighborBlocks(point);
        let returnValue: WorldBlock[] = [];
        for (let neighborBlock of neighborBlocks) {
            let neighborTileIsEmpty = !neighborBlock.owningPlayer;
            if (neighborTileIsEmpty) {
                returnValue.push(neighborBlock);
            }
        }
        return returnValue;
    }

    enemyNeighborBlocks(point: THREE.Vector2): WorldBlock[] {
        let neighborBlocks: WorldBlock[] = this.autowired.world.neighborBlocks(point);
        let block: WorldBlock = this.autowired.world.getMap(point);
        let returnValue: WorldBlock[] = [];
        for (let neighborBlock of neighborBlocks) {
            let isEnemyTile: boolean = neighborBlock.owningPlayer != null && neighborBlock.owningPlayer != block.owningPlayer;
            if (isEnemyTile) {
                returnValue.push(neighborBlock);
            }
        }
        return returnValue;
    }

    worldBlocksForPlayer(player: Player): WorldBlock[] {
        let returnValue: WorldBlock[] = [];
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                if (worldBlock.owningPlayer == player) {
                    returnValue.push(worldBlock)
                }
            }
        }
        return returnValue
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
                            neighborBlock.owningPlayer.deaths++;
                            worldBlock.owningPlayer.kills++;
                            neighborBlock.setOwningPlayer(null);
                            neighborBlock.resetToNature()
                        }
                    }
                    let openNeighbors: WorldBlock[] = this.openNeighborBlocks(point);
                    if (openNeighbors.length > 0) {
                        let possibleNewPosition = openNeighbors[0];
                        let probabilityToMove = possibleNewPosition.tileType.tendencyToEnter * tileType.tendencyToLeave;
                        if (probabilityToMove > Math.random()) {
                            possibleNewPosition.setOwningPlayer(worldBlock.owningPlayer);
                            worldBlock.setOwningPlayer(null);
                        }
                    }

                }
            }
        }
        for (let player of this.players) {
            player.resetStats()
        }
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let point: THREE.Vector2 = new THREE.Vector2(i, j);
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                let tileType: TileType = worldBlock.tileType;
                if (worldBlock.owningPlayer) {
                    let player: Player = worldBlock.owningPlayer;
                    player.playerStats.incrementTileType(tileType);
                }
            }
        }
        for (let player of this.players) {
            player.gold += player.playerStats.totalGoldPerTurn();
        }
    }
}
