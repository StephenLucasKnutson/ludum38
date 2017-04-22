import {TileType} from "./TileType";
import {WorldBlock} from "./WorldBlock";
import {Autowired} from "./Autowired";
import Vector2 = THREE.Vector2;
import ThrottleSettings = _.ThrottleSettings;

export class World {
    autowired: Autowired;
    map: {[key: number]: {[key: number]: WorldBlock;};} = {};
    selectedWorldBlock: WorldBlock;
    static backgroundMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.BackSide
    });
    static backgroundSelectedMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        side: THREE.BackSide
    });

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        this.generatePlane();
        this.generate(500, 7, 2, 0.5, 50, 0.25, 1.0, TileType.forest, [TileType.plains]);
        this.generate(700, 3, 2, 1.0, 150, 0.25, 1.0, TileType.sea, [TileType.plains]);
        this.generate(500, 3, 2, 0.0, 250, 0.0, 0.3, TileType.desert, [TileType.plains]);
        this.generate(500, 4, 4, 0.0, 100, 0.0, 0.3, TileType.mountains, [TileType.forest]);

        this.generate(500, 1, 1, 0.0, 40, 0.0, 0.0, TileType.gold, [TileType.plains, TileType.forest]);
        this.generate(500, 1, 1, 0.0, 80, 0.0, 0.0, TileType.diamond, [TileType.plains, TileType.forest]);

        let geometry = new THREE.PlaneGeometry(7, 7);
        let backgroundGeometry = new THREE.PlaneGeometry(10, 10);


        for (let i = 0; i < this.autowired.WIDTH; i++) {
            for (let j = 0; j < this.autowired.HEIGHT; j++) {
                let tileType = this.map[i][j].tileType;

                let plane = new THREE.Mesh(geometry, tileType.material);
                plane.rotateX(Math.PI);
                plane.position.set(i * 10, j * 10, 0);
                this.autowired.scene.add(plane);
                this.map[i][j].tileMesh = plane;

                let backgroundPlane = new THREE.Mesh(backgroundGeometry, World.backgroundMaterial);
                backgroundPlane.rotateX(Math.PI);
                backgroundPlane.position.set(i * 10, j * 10, -1);
                this.autowired.scene.add(backgroundPlane);
                this.map[i][j].backgroundMesh = backgroundPlane;
            }
        }

        let $this = this;
        $(this.autowired.canvasElement).click((event) => {
            let vector = new THREE.Vector3 (
                ( event.clientX / $this.autowired.canvasElement.innerWidth() ) * 2 - 1,
                -( event.clientY / $this.autowired.canvasElement.innerHeight() ) * 2 + 1,
                0.5);

            vector.unproject($this.autowired.camera);
            let mapPosition : THREE.Vector2 = new THREE.Vector2(Math.round(vector.x / 10), Math.round(vector.y / 10));
            if(this.isWithinBounds(mapPosition)){
                for (let i = 0; i < this.autowired.WIDTH; i++) {
                    for (let j = 0; j < this.autowired.HEIGHT; j++) {
                        this.map[i][j].setSelected(false);
                    }
                }
                let selectedWorldBlock = this.getMap(mapPosition);
                this.selectedWorldBlock = selectedWorldBlock;
                selectedWorldBlock.setSelected(true);

            }
        })
    }

    isWithinBounds(position: Vector2) :boolean {
        return position.x >= 0 && position.x < this.autowired.WIDTH && position.y >= 0 && position.y < this.autowired.HEIGHT;
    };

    setMap = (xUnrounded: number, yUnrounded: number, t: TileType, canApplyTo: TileType[]) => {
        let x: number = Math.round(xUnrounded);
        let y: number = Math.round(yUnrounded);
        if (this.isWithinBounds(new Vector2(x, y))) {
            let existingType: TileType = this.map[x][y].tileType;
            let canBeApplied: boolean = _.contains(canApplyTo, existingType);
            if (canBeApplied) {
                this.map[x][y].tileType = t;
            }
        }
    };
    getMap (position: THREE.Vector2) {
        return this.map[position.x][position.y]
    }

    generatePlane = () => {
        for (let i = 0; i < this.autowired.WIDTH; i++) {
            this.map[i] = {};
            for (let j = 0; j < this.autowired.HEIGHT; j++) {
                this.map[i][j] = new WorldBlock();
                this.map[i][j].tileType = TileType.plains;
            }
        }
    };

    randomSpot(): THREE.Vector2 {
        return new THREE.Vector2(Math.floor(Math.random() * this.autowired.WIDTH), Math.floor(Math.random() * this.autowired.HEIGHT));
    };

    randomSpotOnPlains(): THREE.Vector2 {
        let position : THREE.Vector2;
        do {
            position = this.randomSpot()
        } while (!this.isInMiddleOfPlains(position));
        return position;
    }

    isInMiddleOfPlains(point: THREE.Vector2){
        let blocksToCheck : WorldBlock[] = [this.getMap(point)];
        blocksToCheck = blocksToCheck.concat(this.neighborBlocks(point));
        let good : boolean = true;
        good = good && (blocksToCheck.length == 5);
        for(let block of blocksToCheck) {
            good = good && (block.tileType == TileType.plains);
        }
        return good;
    };

    neighborOffsets: THREE.Vector2[] = [new Vector2(1, 0), new Vector2(-1, 0), new Vector2(0, 1), new Vector2(0, -1)];
    withNeighborOffsets(point: THREE.Vector2): THREE.Vector2[] {
        let returnValue: THREE.Vector2[] = [];
        for (let neighborOffset of this.neighborOffsets) {
            let neighborPoint = point.clone().add(neighborOffset);
            if (this.autowired.world.isWithinBounds(new Vector2(neighborPoint.x, neighborPoint.y))) {
                returnValue.push(neighborPoint)
            }
        }
        return _.shuffle(returnValue) as THREE.Vector2[];
    }

    neighborBlocks(point: THREE.Vector2): WorldBlock[] {
        let neighborPoints: Vector2[] = this.withNeighborOffsets(point);
        let returnValue: WorldBlock[] = [];
        for (let neighbor of neighborPoints) {
            let neighborBlock = this.autowired.world.getMap(neighbor);
            returnValue.push(neighborBlock);
        }
        return returnValue;
    };

    randomSpotAlongEdge(): THREE.Vector2 {
        if (Math.random() < 0.5) {
            let xEdge = Math.round(Math.random()) * this.autowired.WIDTH;
            return new THREE.Vector2(xEdge, Math.round(Math.random() * this.autowired.HEIGHT));
        } else {
            let yEdge = Math.round(Math.random()) * this.autowired.HEIGHT;
            return new THREE.Vector2(Math.round(Math.random() * this.autowired.WIDTH), yEdge);
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
