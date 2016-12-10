/// <reference path="definitions/three.d.ts" />
import {Autowired} from "./Autowired";

export class Room {
    static blockSize: number = 10;

    autowired: Autowired;

    bottomMesh: THREE.Mesh;
    topMesh: THREE.Mesh;
    leftMesh: THREE.Mesh;
    rightMesh: THREE.Mesh;
    forwardMesh: THREE.Mesh;
    backwardMesh: THREE.Mesh;

    bottomPhysics: CANNON.Body;
    topPhysics: CANNON.Body;
    leftPhysics: CANNON.Body;
    rightPhysics: CANNON.Body;
    forwardPhysics: CANNON.Body;
    backwardPhysics: CANNON.Body;

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        this.bottomMesh = this.createCubeThree();
        this.topMesh = this.createCubeThree();
        this.leftMesh = this.createCubeThree();
        this.rightMesh = this.createCubeThree();
        this.forwardMesh = this.createCubeThree();
        this.backwardMesh = this.createCubeThree();

        this.bottomPhysics = this.createCubePhysics();
        this.topPhysics = this.createCubePhysics();
        this.leftPhysics = this.createCubePhysics();
        this.rightPhysics = this.createCubePhysics();
        this.forwardPhysics = this.createCubePhysics();
        this.backwardPhysics = this.createCubePhysics();

        this.bottomPhysics.position.set(0, -Room.blockSize, 0);
        this.topPhysics.position.set(0, Room.blockSize, 0);
        this.leftPhysics.position.set(Room.blockSize, 0, 0);
        this.rightPhysics.position.set(-Room.blockSize, 0, 0);
        this.forwardPhysics.position.set(0, 0, Room.blockSize);
        this.backwardPhysics.position.set(0, 0, -Room.blockSize);

        for (let mesh of this.meshes()) {
            this.autowired.scene.add(mesh)
        }
        for (let physicBody of this.physics()) {
            this.autowired.world.addBody(physicBody)
        }
    }

    createCubeThree(width = Room.blockSize, height = Room.blockSize, depth = Room.blockSize) {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshNormalMaterial();
        return new THREE.Mesh(geometry, material);
    }

    createCubePhysics(width = Room.blockSize, height = Room.blockSize, depth = Room.blockSize): CANNON.Body {
        let sphereBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
            material: this.autowired.myMaterials.slipperyMaterial
        });
        return sphereBody;
    }

    update() {
        Util.copyPhysicsTo(this.bottomPhysics, this.bottomMesh);
        Util.copyPhysicsTo(this.topPhysics, this.topMesh);
        Util.copyPhysicsTo(this.leftPhysics, this.leftMesh);
        Util.copyPhysicsTo(this.rightPhysics, this.rightMesh);
        Util.copyPhysicsTo(this.forwardPhysics, this.forwardMesh);
        Util.copyPhysicsTo(this.backwardPhysics, this.backwardMesh);
    }

    meshes(): THREE.Mesh[] {
        return [this.bottomMesh, this.topMesh, this.leftMesh, this.rightMesh, this.forwardMesh, this.backwardMesh];
    }

    physics(): CANNON.Body[] {
        return [this.bottomPhysics, this.topPhysics, this.leftPhysics, this.rightPhysics, this.forwardPhysics, this.backwardPhysics];
    }
}