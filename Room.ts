/// <reference path="definitions/three.d.ts" />
let blockSize: number = 5;
export class Room {
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

    constructor() {
        this.bottomMesh = Room.createCubeThree();
        this.topMesh = Room.createCubeThree();
        this.leftMesh = Room.createCubeThree();
        this.rightMesh = Room.createCubeThree();
        this.forwardMesh = Room.createCubeThree();
        this.backwardMesh = Room.createCubeThree();

        this.bottomPhysics = Room.createCubePhysics();
        this.topPhysics = Room.createCubePhysics();
        this.leftPhysics = Room.createCubePhysics();
        this.rightPhysics = Room.createCubePhysics();
        this.forwardPhysics = Room.createCubePhysics();
        this.backwardPhysics = Room.createCubePhysics();

        this.bottomPhysics.position.set(0, -blockSize, 0);
        this.topPhysics.position.set(0, blockSize, 0);
        this.leftPhysics.position.set(blockSize, 0, 0);
        this.rightPhysics.position.set(-blockSize, 0, 0);
        this.forwardPhysics.position.set(0, 0, blockSize);
        this.backwardPhysics.position.set(0, 0, -blockSize);
    }

    static createCubeThree(width = blockSize, height = blockSize, depth = blockSize) {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshNormalMaterial();
        return new THREE.Mesh(geometry, material);
    }

    static createCubePhysics(width = blockSize, height = blockSize, depth = blockSize): CANNON.Body {
        let sphereBody = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
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