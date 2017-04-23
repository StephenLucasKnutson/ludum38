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

        let startingPositions = this.autowired.world.createWellDistributedStartingPositions(5);
        for (let i: number = 0; i < 5; i++) {
            let startingPosition: THREE.Vector2 = startingPositions[i];
            let newPlayer: Player = new Player();
            this.players.push(newPlayer);

            let startingWorldBlock: WorldBlock = this.autowired.world.map[startingPosition.x][startingPosition.y];
            startingWorldBlock.setOwningPlayer(newPlayer);
            startingWorldBlock.setTileType(TileType.village);
            if (i == 0) {
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

    worldBlocksAndEmptyNeighborsBlocksForPlayer(player: Player): WorldBlock[] {
        let returnValue: WorldBlock[] = [];
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                if (worldBlock.owningPlayer != player) {
                    continue;
                }
                returnValue.push(worldBlock);
                for (let neighbor of this.openNeighborBlocks(new Vector2(i, j))) {
                    returnValue.push(neighbor);
                }
            }
        }
        return returnValue
    }

    calculateCentersOfMass(): {[key: string]: Vector2;} {
        let playerColorToNumberOfTiles: {[key: string]: number;} = {};
        let playerColorToNetMassDistance: {[key: string]: Vector2;} = {};
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                let player = worldBlock.owningPlayer;
                if (player) {
                    let playerColor = player.colorAsString;
                    if (!playerColorToNumberOfTiles[playerColor]) {
                        playerColorToNumberOfTiles[playerColor] = 0;
                        playerColorToNetMassDistance[playerColor] = new Vector2();
                    }
                    playerColorToNumberOfTiles[playerColor]++;
                    playerColorToNetMassDistance[playerColor].add(new Vector2(i, j));
                }
            }
        }
        let returnValue: {[key: string]: Vector2;} = {};
        for (let color in playerColorToNumberOfTiles) {
            let numberOfTiles = playerColorToNumberOfTiles[color];
            let netMass = playerColorToNetMassDistance[color];
            returnValue[color] = netMass.divideScalar(numberOfTiles);
        }
        return returnValue
    }

    update(): void {
        let playerColorToCenterOfMass: {[key: string]: Vector2;} = this.calculateCentersOfMass();
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
                    let target: Vector2 = null;
                    let colors = Object.keys(playerColorToCenterOfMass);
                    _(colors).shuffle();
                    for (let color of colors) {
                        if (target == null && color != worldBlock.owningPlayer.colorAsString) {
                            target = playerColorToCenterOfMass[color]
                        }
                    }
                    let mustMoveTowardsTarget = (0.9 > Math.random());
                    for (let possibleNewPosition of  this.openNeighborBlocks(point)) {
                        let probabilityToMove = possibleNewPosition.tileType.tendencyToEnter * tileType.tendencyToLeave;
                        let shouldMove = probabilityToMove > Math.random();
                        let isMovingTowardsTarget = possibleNewPosition.position.distanceTo(target) < point.distanceTo(target);
                        if (target && shouldMove && (!mustMoveTowardsTarget || isMovingTowardsTarget)) {
                            possibleNewPosition.setOwningPlayer(worldBlock.owningPlayer);
                            worldBlock.setOwningPlayer(null);
                            break;
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
