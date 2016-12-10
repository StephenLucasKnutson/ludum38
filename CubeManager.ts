import {Cube} from "./Cube";
import {Autowired} from "./Autowired";

export class CubeManager {
    cubes: Cube[] = [];
    autowired: Autowired;
    a: number = 200000;
    numberOfUpdates: number = 2000;


    public constructor(autowired: Autowired) {
        this.autowired = autowired;
    }

    private createCube() {
        let cube: Cube = new Cube(this.autowired);
        this.cubes.push(cube)
    }

    public update() {
        //probability approaches 1 as this.numberOfUpdates approaches a
        let probability: number = this.numberOfUpdates / (this.numberOfUpdates + this.a);
        if (Math.random() < probability) {
            this.createCube();
        }
        for (let cube of this.cubes) {
            cube.update();
        }
        this.numberOfUpdates++;
    }

    public removeCube(mesh: THREE.Object3D) {
        //todo: do
    }
}