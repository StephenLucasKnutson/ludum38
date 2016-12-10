import {Room} from "./Room";
import {Autowired} from "./Autowired";
export class Cube {
    autowired: Autowired;
    threeCube: THREE.Mesh;
    physicsBody: CANNON.Body;

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        let width: number = (Math.random() * 2 + 0.5);
        let height: number = (Math.random() * 2 + 0.5);
        let depth: number = (Math.random() * 2 + 0.5);
        this.threeCube = this.createCubeThree(width, height, depth);
        this.physicsBody = this.createCubePhysics(width, height, depth);

        this.autowired.scene.add(this.threeCube);
        this.autowired.world.addBody(this.physicsBody);
    }

    createCubeThree(width: number, height: number, depth: number): THREE.Mesh {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshPhongMaterial();
        return new THREE.Mesh(geometry, material);
    }

    createCubePhysics(width: number, height: number, depth: number): CANNON.Body {
        let x: number = (Math.random() - 0.5) * Room.blockSize;
        let z: number = (Math.random() - 0.5) * Room.blockSize;
        let density: number = 1.0;
        let mass: number = width * height * depth * density;
        let sphereBody = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(x, Room.blockSize / 2 - 1 - height, z),
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
            material: this.autowired.myMaterials.cubeMaterial,
            linearDamping: 0.3
        });
        return sphereBody;
    }

    update() {
        Util.copyPhysicsTo(this.physicsBody, this.threeCube);
    }

    destroy() {
        this.autowired.scene.remove(this.threeCube);
        this.autowired.world.remove(this.physicsBody);
    }
}