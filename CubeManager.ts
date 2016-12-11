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
        let badCubeIndex: number = -1;
        for (let i = 0; i < this.cubes.length; i++) {
            if (mesh == this.cubes[i].threeCube) {
                badCubeIndex = i;
            }
        }
        if (badCubeIndex != -1) {
            this.autowired.scoreboard.addScore();
            this.cubes[badCubeIndex].destroy();
            this.cubes.splice(badCubeIndex, 1);
            this.playDestroySound();
        }
    }

    private playDestroySound() {
        beeplay().play(['C#4', 'C#5', 'C#6', 'C#7'], 1 / 2);
    }
}