/// <reference path="definitions/jquery.d.ts" />
/// <reference path="definitions/three.d.ts" />

export class Cube {
    threeCube: THREE.Mesh;
    physicsBody: CANNON.Body;

    constructor() {
        this.threeCube = Cube.createCubeThree();
        this.physicsBody = Cube.createCubePhysics();
    }

    static createCubeThree(width = 1, height = 1, depth = 1) {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshPhongMaterial();
        return new THREE.Mesh(geometry, material);
    }

    static createCubePhysics(width = 1, height = 1, depth = 1): CANNON.Body {
        let sphereBody = new CANNON.Body({
            mass: 5,
            position: new CANNON.Vec3(0, 0, 0),
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
        });
        return sphereBody;
    }

    update() {
        Util.copyPhysicsTo(this.physicsBody, this.threeCube);
    }
}