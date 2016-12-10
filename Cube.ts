/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/three.d.ts" />
import {MyMaterials} from "./MyMaterials";
export class Cube {
    threeCube: THREE.Mesh;
    physicsBody: CANNON.Body;

    scene: THREE.Scene;
    world: CANNON.World;
    myMaterials: MyMaterials;

    constructor(scene: THREE.Scene, world: CANNON.World, myMaterials: MyMaterials) {
        this.scene = scene;
        this.world = world;
        this.myMaterials = myMaterials;

        this.threeCube = this.createCubeThree();
        this.physicsBody = this.createCubePhysics();

        this.scene.add(this.threeCube);
        this.world.addBody(this.physicsBody);
    }

    createCubeThree(width = 1, height = 1, depth = 1) {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshPhongMaterial();
        return new THREE.Mesh(geometry, material);
    }

    createCubePhysics(width = 1, height = 1, depth = 1): CANNON.Body {
        let sphereBody = new CANNON.Body({
            mass: 5,
            position: new CANNON.Vec3(0, 0, 0),
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
            material: this.myMaterials.cubeMaterial,
            linearDamping: 0.3
        });
        return sphereBody;
    }

    update() {
        Util.copyPhysicsTo(this.physicsBody, this.threeCube);
    }
}