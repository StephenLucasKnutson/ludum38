import {TileType} from "./TileType";
import {Autowired} from "./Autowired";
import Vector2 = THREE.Vector2;

export class World {
    autowired: Autowired;
    map: {[key: number]: {[key: number]: TileType;};} = {};

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        this.generatePlane();
        this.generate(500, 7, 2, 0.5, 50, 0.25, 1.0, TileType.woods, [TileType.plains]);
        this.generate(500, 3, 2, 1.0, 150, 0.5, 1.0, TileType.sea, [TileType.plains]);
        this.generate(500, 3, 2, 0.0, 250, 0.0, 0.3, TileType.desert, [TileType.plains]);
        this.generate(500, 4, 4, 0.0, 100, 0.0, 0.3, TileType.mountains, [TileType.woods]);

        this.generate(500, 1, 1, 0.0, 40, 0.0, 0.0, TileType.gold, [TileType.plains, TileType.woods]);
        this.generate(500, 1, 1, 0.0, 80, 0.0, 0.0, TileType.diamond, [TileType.plains, TileType.woods]);

        for (var i = 0; i < this.autowired.WIDTH; i++) {
            for (var j = 0; j < this.autowired.HEIGHT; j++) {
                let tileType = this.map[i][j];
                var geometry = new THREE.PlaneGeometry(8, 8);
                var material = new THREE.MeshBasicMaterial({color: tileType.color, side: THREE.DoubleSide});
                var plane = new THREE.Mesh(geometry, material);
                plane.receiveShadow = true;
                plane.rotateX(Math.PI);
                plane.position.set(i * 10, j * 10, 0);
                this.autowired.scene.add(plane);
            }
        }
    }

    setMap = (xUnrounded: number, yUnrounded: number, t: TileType, canApplyTo: TileType[]) => {
        let x: number = Math.round(xUnrounded);
        let y: number = Math.round(yUnrounded);
        let withinBounds = x >= 0 && x < this.autowired.WIDTH && y >= 0 && y < this.autowired.HEIGHT;
        if (withinBounds) {
            let existingType: TileType = this.map[x][y];
            let canBeApplied: boolean = _.contains(canApplyTo, existingType);
            if (canBeApplied) {
                this.map[x][y] = t;
            }
        }
    };

    generatePlane = () => {
        for (let i = 0; i < this.autowired.WIDTH; i++) {
            this.map[i] = {};
            for (let j = 0; j < this.autowired.HEIGHT; j++) {
                this.map[i][j] = TileType.plains;
            }
        }
    };

    randomSpot(): THREE.Vector2 {
        return new THREE.Vector2(Math.random() * this.autowired.WIDTH, Math.random() * this.autowired.HEIGHT);
    };

    randomSpotAlongEdge(): THREE.Vector2 {
        if (Math.random() < 0.5) {
            let xEdge = Math.round(Math.random()) * this.autowired.WIDTH;
            return new THREE.Vector2(xEdge, Math.random() * this.autowired.HEIGHT);
        } else {
            let yEdge = Math.round(Math.random()) * this.autowired.HEIGHT;
            return new THREE.Vector2(Math.random() * this.autowired.WIDTH, yEdge);
        }
    };

    randomDirection(scalar: number): THREE.Vector2 {
        return new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(scalar);
    };

    generate = (numberOfIterations: number,
                radiusMax: number,
                radiusMin: number,
                directionScalar: number,
                shuffleIterations: number,
                edgeTendancy: number,
                movementScalar: number,
                t: TileType,
                canApplyTo: TileType[]) => {

        let position: THREE.Vector2 = this.randomSpotAlongEdge();
        let radius: number;
        let direction: THREE.Vector2 = this.randomDirection(directionScalar);

        for (let zzz: number = 0; zzz < numberOfIterations; zzz++) {
            if (zzz % shuffleIterations == 0) {
                direction = this.randomDirection(directionScalar);
                let diff = radiusMax - radiusMin;
                radius = Math.random() * diff + radiusMin;
                if (Math.random() < (1 - edgeTendancy)) {
                    position = this.randomSpot();
                } else {
                    position = this.randomSpotAlongEdge();
                }
            }
            position.x += (Math.random() * 5 - 2.5 + direction.x) * movementScalar;
            position.y += (Math.random() * 5 - 2.5 + direction.y) * movementScalar;
            if (position.y < 0 || position.y >= this.autowired.HEIGHT || position.x < 0 || position.x >= this.autowired.WIDTH) {
                if (Math.random() < (1 - edgeTendancy)) {
                    position = this.randomSpot();
                } else {
                    position = this.randomSpotAlongEdge();
                }
            }

            for (let i: number = 0; i < radius * 2; i++) {
                for (let j: number = 0; j < radius * 2; j++) {
                    let iCentered = i - radius;
                    let jCentered = j - radius;
                    let point: Vector2 = new Vector2(iCentered + position.x, jCentered + position.y);
                    if (new Vector2(iCentered, jCentered).length() < radius) {
                        this.setMap(point.x, point.y, t, canApplyTo);
                    }
                }
            }
        }
    };
}
