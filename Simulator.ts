import Vector2 = THREE.Vector2;
import nextPowerOfTwo = THREE.Math.nextPowerOfTwo;
import {Autowired} from "./Autowired";
import {Player} from "./Player";
import {WorldBlock} from "./WorldBlock";
import {TileType} from "./TileType";
import {Minion} from "./Minion";

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
            startingWorldBlock.setMinion(new Minion(newPlayer));
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
            if (this.isEmptyBlock(neighborBlock)) {
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
            if (this.isEnemyBlock(neighborBlock, block)) {
                returnValue.push(neighborBlock);
            }
        }
        return returnValue;
    }

    isEmptyBlock(a: WorldBlock) {
        return (a.getOwningPlayer() == null)
    }

    isEnemyBlock(a: WorldBlock, b: WorldBlock): boolean {
        let player1 = a.getOwningPlayer();
        let player2 = b.getOwningPlayer();
        return (!!player1 && !!player2 && player1 != player2)
    }

    isFriendlyBlock(a: WorldBlock, b: WorldBlock): boolean {
        let player1 = a.getOwningPlayer();
        let player2 = b.getOwningPlayer();
        return (!!player1 && player1 == player2)
    }

    worldBlocksAndEmptyNeighborsBlocksForPlayer(player: Player): WorldBlock[] {
        let returnValue: WorldBlock[] = [];
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                if (worldBlock.getOwningPlayer() != player) {
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

    playerColorToPoorSucker(): {[key: string]: Vector2;} {
        let playerColorToPositions: {[key: string]: Vector2[];} = {};
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                let player = (worldBlock.minion) ? worldBlock.minion.owningPlayer : null;
                if (player) {
                    let playerColor = player.colorAsString;
                    if (!playerColorToPositions[playerColor]) {
                        playerColorToPositions[playerColor] = [];
                    }
                    playerColorToPositions[playerColor].push(new Vector2(i, j));
                }
            }
        }
        let returnValue: {[key: string]: Vector2;} = {};
        let centerOfMap = new Vector2(this.autowired.WIDTH / 2, this.autowired.HEIGHT / 2);
        for (let color in playerColorToPositions) {
            let tiles: Vector2[] = playerColorToPositions[color];
            let sortedTiles = _(tiles).sortBy(function (tile) {
                return tile.distanceTo(centerOfMap);
            });
            returnValue[color] = sortedTiles[0];
        }
        return returnValue
    }

    update(): void {
        let playerColorToPoorSucker: {[key: string]: Vector2;} = this.playerColorToPoorSucker();
        for (let i: number = 0; i < this.autowired.WIDTH; i++) {
            for (let j: number = 0; j < this.autowired.HEIGHT; j++) {
                let point: THREE.Vector2 = new THREE.Vector2(i, j);
                let worldBlock: WorldBlock = this.autowired.world.map[i][j];
                let tileType: TileType = worldBlock.tileType;
                let minion = worldBlock.minion;
                if (!!minion) {
                    for (let neighborBlock of this.openNeighborBlocks(point)) {
                        let shouldSpawn = tileType.chanceToSpawn > Math.random();
                        if (shouldSpawn) {
                            neighborBlock.setMinion(new Minion(minion.owningPlayer));
                        }
                    }
                    let enemyNeighbors: WorldBlock[] = this.enemyNeighborBlocks(point);
                    for (let neighborBlock of enemyNeighbors) {
                        let shouldKill = minion.attack / minion.defense > Math.random();
                        if (shouldKill) {
                            neighborBlock.minion.owningPlayer.deaths++;
                            minion.owningPlayer.kills++;
                            neighborBlock.setMinion(null);
                            neighborBlock.resetToNature()
                        }
                    }
                    let colors = Object.keys(playerColorToPoorSucker);
                    if (!!minion.targetColor) {
                        if (colors.indexOf(minion.targetColor) == -1) {
                            minion.targetColor = null;
                        }
                    }

                    if (minion.targetColor == null) {
                        colors = _(colors).shuffle();
                        minion.targetColor = colors[0];
                    }
                    let target: Vector2 = playerColorToPoorSucker[minion.targetColor];

                    let mustMoveTowardsTarget = (0.9 > Math.random());
                    for (let possibleNewPosition of  this.openNeighborBlocks(point)) {
                        let probabilityToMove = possibleNewPosition.tileType.tendencyToEnter * tileType.tendencyToLeave;
                        let shouldMove = probabilityToMove > Math.random();
                        let isMovingTowardsTarget = possibleNewPosition.position.distanceTo(target) < point.distanceTo(target);
                        if (target && shouldMove && (!mustMoveTowardsTarget || isMovingTowardsTarget)) {
                            possibleNewPosition.setMinion(minion);
                            worldBlock.setMinion(null);
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
                let minion = worldBlock.minion;
                if (!!minion && minion.owningPlayer) {
                    let player: Player = minion.owningPlayer;
                    player.playerStats.incrementTileType(tileType);
                }
            }
        }
        for (let player of this.players) {
            player.gold += player.playerStats.totalGoldPerTurn();
        }
    }
}
