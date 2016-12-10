import {Cube} from "./Cube";
import {MyMaterials} from "./MyMaterials";

export class CubeManager {
    cubes: Cube[] = [];
    scene: THREE.Scene;
    world: CANNON.World;
    myMaterials: MyMaterials;
    a: number = 200000;
    numberOfUpdates: number = 2000;


    public constructor(scene: THREE.Scene, world: CANNON.World, myMaterials: MyMaterials) {
        this.scene = scene;
        this.world = world;
        this.myMaterials = myMaterials;
    }

    private createCube() {
        let cube: Cube = new Cube(this.scene, this.world, this.myMaterials);
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
}