/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/three.d.ts" />

export class Cube {
    threeCube: THREE.Mesh;

    rotVelocities = {
        x: 0.01,
        y: 0.01,
        z: 0.01
    };

    constructor() {
        this.threeCube = Cube.createCube();
    }

    static createCube(width = 1, height = 1, depth = 1) {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshNormalMaterial();
        return new THREE.Mesh(geometry, material);
    }

    /**
     * gets threeCube rotation velocity on x axis
     */
    get rotX() {
        return this.rotVelocities.x;
    }

    /**
     * sets threeCube rotation velocity on x axis
     */
    set rotX(velocity: number) {
        this.rotVelocities.x = velocity;
    }

    /**
     * gets threeCube rotation velocity on y axis
     */
    get rotY() {
        return this.rotVelocities.y;
    }

    /**
     * sets threeCube rotation velocity on y axis
     */
    set rotY(velocity: number) {
        this.rotVelocities.y = velocity;
    }

    /**
     * gets threeCube rotation velocity on z axis
     */
    get rotZ() {
        return this.rotVelocities.z;
    }

    /**
     * sets threeCube rotation velocity on z axis
     */
    set rotZ(velocity: number) {
        this.rotVelocities.z = velocity;
    }
}