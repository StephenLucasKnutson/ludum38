import {Autowired} from "./Autowired";
import {WorldBlock} from "./WorldBlock";
import {Graph} from "./ShortestPath";
import {TileType} from "./TileType";
import Vector2 = THREE.Vector2;

export class Pathfinder {
    autowired: Autowired;
    resolution = 4;

    largeToLargeShortestPath: {[key: string]: {[key: string]: any[]};} = {};

    largeBucketKey(point: Vector2): string {
        let bucketCorner = new Vector2(Math.round(point.x / this.resolution), Math.round(point.y / this.resolution));
        return bucketCorner.x + " " + bucketCorner.y;
    }

    fromLargeBucketKey(key: string): Vector2 {
        let pieces = key.split(' ');
        let unscaledX = parseInt(pieces[0]);
        let unscaledY = parseInt(pieces[1]);
        let x = unscaledX * this.resolution;
        let y = unscaledY * this.resolution;
        if (x >= this.autowired.WIDTH) {
            x = (unscaledX - 1) * this.resolution;
        }
        if (y >= this.autowired.HEIGHT - 1) {
            y = (unscaledY - 1) * this.resolution;
        }
        return new Vector2(x, y)
    }

    smallBucketKey(point: Vector2): string {
        return point.x + " " + point.y;
    }

    generateSubGraph(buckets: WorldBlock[][]): Graph {
        let graph = new Graph();
        let allPoints = _(buckets).flatten();
        for (let worldblock of allPoints) {
            let neighborMap = {};
            for (let neighbor of this.autowired.world.neighborBlocks(worldblock.position)) {
                //todo: exclude sea earlier
                if (
                    worldblock.tileType != TileType.sea
                    && neighbor.tileType != TileType.sea
                    && worldblock.tileType != TileType.desert
                    && neighbor.tileType != TileType.desert
                ) {
                    neighborMap[this.smallBucketKey(neighbor.position)] = 1;
                }
            }
            graph.addVertex(this.smallBucketKey(worldblock.position), neighborMap);
        }
        return graph;
    }

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        let buckets: {[key: string]: WorldBlock[]} = {};
        for (let i = 0; i < this.autowired.WIDTH; i++) {
            for (let j = 0; j < this.autowired.HEIGHT; j++) {
                let point = new Vector2(i, j);
                let worldBlock = this.autowired.world.map[i][j];
                let key = this.largeBucketKey(point);
                let largeBucketCenter = this.fromLargeBucketKey(key);
                let largeBucketWorldblock = this.autowired.world.getMap(largeBucketCenter);
                if (largeBucketWorldblock.tileType == TileType.sea || largeBucketWorldblock.tileType == TileType.desert) {
                    continue;
                }
                if (buckets[key] == null) {
                    buckets[key] = [];
                }
                buckets[key].push(worldBlock);
            }
        }

        let localLargeToLarge: {[key: string]: {[key: string]: any[]};} = {};
        let hasBeenCalculated: {[key: string]: {[key: string]: boolean};} = {};
        for (let a in buckets) {
            hasBeenCalculated[a] = {};
            for (let b in buckets) {
                hasBeenCalculated[a][b] = false;
            }
        }
        var values = Object.keys(buckets).map(function (key) {
            return buckets[key];
        });
        let graph = this.generateSubGraph(values);
        for (let a in buckets) {
            localLargeToLarge[a] = {};
            for (let b in buckets) {
                if (a == b) {
                    localLargeToLarge[a][b] = [];
                    continue;
                }
                if (hasBeenCalculated[b][a]) {
                    localLargeToLarge[a][b] = localLargeToLarge[b][a];
                }
                hasBeenCalculated[a][b] = true;

                let aPosition = this.fromLargeBucketKey(a);
                let bPosition = this.fromLargeBucketKey(b);

                if (aPosition.distanceToManhattan(bPosition) > this.resolution) {
                    localLargeToLarge[a][b] = null;
                } else {
                    let aSmall = this.smallBucketKey(aPosition);
                    let bSmall = this.smallBucketKey(bPosition);
                    let path: any[] = graph.shortestPath(aSmall, bSmall);
                    if (path.length == 0) {
                        localLargeToLarge[a][b] = null;
                    }
                    localLargeToLarge[a][b] = path;
                }
            }
        }
        let globalGraph = new Graph();
        for (let a in buckets) {
            let neighborMap = {};
            for (let b in buckets) {
                if (localLargeToLarge[a][b] != null) {
                    neighborMap[b] = localLargeToLarge[a][b].length;
                }
            }
            globalGraph.addVertex(a, neighborMap)
        }
        for (let a in buckets) {
            this.largeToLargeShortestPath[a] = {};
            for (let b in buckets) {
                let shortestPath = globalGraph.shortestPath(a, b);
                if (shortestPath.length == 0) {
                    this.largeToLargeShortestPath[a][b] = null;
                } else {
                    shortestPath.push(a);
                    shortestPath.reverse();
                    this.largeToLargeShortestPath[a][b] = shortestPath;
                }
            }
        }
    }

    isReachable(currentPosition: Vector2, desiredPosition: Vector2): boolean {
        return (this.nextPositionNullable(currentPosition, desiredPosition) != null);
    }

    nextPositionNullable(currentPosition: Vector2, desiredPosition: Vector2): Vector2 {
        let currentKey = this.largeBucketKey(currentPosition);
        let desiredKey = this.largeBucketKey(desiredPosition);
        if (currentKey == desiredKey) {
            //local pathfinding
            return desiredPosition;
        } else {
            //global pathfinding
            let largeShortestPath = null;
            if (this.largeToLargeShortestPath[currentKey] && this.largeToLargeShortestPath[desiredKey]) {
                largeShortestPath = this.largeToLargeShortestPath[currentKey][desiredKey];
            }
            if (largeShortestPath == null) {
                //no way there
                return null;
            }
            return this.fromLargeBucketKey(largeShortestPath[1]);
        }
    }

    nextPosition(currentPosition: Vector2, desiredPosition: Vector2): Vector2 {
        let result = this.nextPositionNullable(currentPosition, desiredPosition);
        if (result == null) {
            return desiredPosition
        }
        return result;
    }
}
