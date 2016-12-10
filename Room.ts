/// <reference path="definitions/three.d.ts" />
let blockSize: number = 5;
export class Room {
    bottom: THREE.Mesh;
    top: THREE.Mesh;
    left: THREE.Mesh;
    right: THREE.Mesh;
    forward: THREE.Mesh;
    backward: THREE.Mesh;

    constructor() {
        this.bottom = Room.createCube();
        this.top = Room.createCube();
        this.left = Room.createCube();
        this.right = Room.createCube();
        this.forward = Room.createCube();
        this.backward = Room.createCube();

        this.bottom.position.set(0, -blockSize, 0);
        this.top.position.set(0, blockSize, 0);
        this.left.position.set(blockSize, 0, 0);
        this.right.position.set(-blockSize, 0, 0);
        this.forward.position.set(0, 0, blockSize);
        this.backward.position.set(0, 0, -blockSize);
    }

    static createCube(width = blockSize, height = blockSize, depth = blockSize) {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshNormalMaterial();
        return new THREE.Mesh(geometry, material);
    }

    meshes(): THREE.Mesh[] {
        return [this.bottom, this.top, this.left, this.right, this.forward, this.backward];
    }
}