import {TileType} from "./TileType";
import {Autowired} from "./Autowired";

export class World {
    autowired: Autowired;
    WIDTH: number = 100;
    HEIGHT: number = 100;
    map: {[key: number]: {[key: number]: TileType;};} = {};

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        for (var i = 0; i < this.WIDTH; i++) {
            this.map[i] = {};
            for (var j = 0; j < this.HEIGHT; j++) {
                this.map[i][j] = TileType.allTileTypes[Math.floor(Math.random() * TileType.allTileTypes.length)];
            }
        }

        for (var i = 0; i < this.WIDTH; i++) {
            for (var j = 0; j < this.HEIGHT; j++) {
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
}
