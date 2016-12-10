/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/three.d.ts" />
import {Room} from "./Room";
import {Autowired} from "./Autowired";
export class Cube {
    autowired: Autowired;
    threeCube: THREE.Mesh;
    physicsBody: CANNON.Body;

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        this.threeCube = this.createCubeThree();
        this.physicsBody = this.createCubePhysics();

        this.autowired.scene.add(this.threeCube);
        this.autowired.world.addBody(this.physicsBody);
    }

    createCubeThree(width = 1, height = 1, depth = 1) {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshPhongMaterial();
        return new THREE.Mesh(geometry, material);
    }

    createCubePhysics(width = 1, height = 1, depth = 1): CANNON.Body {
        let x: number = (Math.random() - 0.5) * Room.blockSize;
        let z: number = (Math.random() - 0.5) * Room.blockSize;
        let sphereBody = new CANNON.Body({
            mass: 5,
            position: new CANNON.Vec3(x, Room.blockSize / 2 - 1, z),
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
            material: this.autowired.myMaterials.cubeMaterial,
            linearDamping: 0.3
        });
        return sphereBody;
    }

    update() {
        Util.copyPhysicsTo(this.physicsBody, this.threeCube);
    }
}