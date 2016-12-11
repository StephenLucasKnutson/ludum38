import {Room} from "./Room";
import {Autowired} from "./Autowired";
export class Cube {
    autowired: Autowired;
    threeCube: THREE.Mesh;
    physicsBody: CANNON.Body;

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        let width: number = (Math.random() * 0.3 + 0.2);
        let height: number = (Math.random() * 0.3 + 0.2);
        let depth: number = (Math.random() * 0.3 + 0.2);
        this.threeCube = this.createCubeThree(width, height, depth);
        this.physicsBody = this.createCubePhysics(width, height, depth);

        this.autowired.scene.add(this.threeCube);
        this.autowired.world.addBody(this.physicsBody);
    }

    createCubeThree(width: number, height: number, depth: number): THREE.Mesh {
        let geometry = new THREE.BoxGeometry(width, height, depth);
        let material = new THREE.MeshPhongMaterial({
            color: 0x839CA5,
            specular: 0xFFFFFF,
            shininess: 200
        });
        let mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
        mesh.receiveShadow = true;
        return mesh;
    }

    createCubePhysics(width: number, height: number, depth: number): CANNON.Body {
        let x: number = (Math.random() - 0.5) * Room.blockSize;
        let z: number = (Math.random() - 0.5) * Room.blockSize;
        let density: number = 10.0;
        let mass: number = width * height * depth * density;
        let sphereBody = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(x, Room.blockSize / 2 - 1 - height, z),
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
            material: this.autowired.myMaterials.cubeMaterial,
            linearDamping: 0.3,
            angularDamping: 0.6
        });
        return sphereBody;
    }

    update(cubeOrder: CubeOrder) {
        let direction: CANNON.Vec3;
        if (cubeOrder == CubeOrder.randomDirection) {
            direction = new CANNON.Vec3(Math.random(), Math.random(), Math.random()).unit();
        } else if (cubeOrder == CubeOrder.hitPlayer) {
            direction = this.autowired.firstPersonControls.physics.position.clone().vsub(this.physicsBody.position).unit();
        } else if (cubeOrder == CubeOrder.posX) {
            direction = new CANNON.Vec3(1, 0, 0).unit();
        } else if (cubeOrder == CubeOrder.negX) {
            direction = new CANNON.Vec3(-1, 0, 0).unit();
        } else if (cubeOrder == CubeOrder.posZ) {
            direction = new CANNON.Vec3(0, 0, 1).unit();
        } else if (cubeOrder == CubeOrder.negZ) {
            direction = new CANNON.Vec3(0, 0, -1).unit();
        }
        this.physicsBody.applyImpulse(direction.scale(0.01), new CANNON.Vec3());
        Util.copyPhysicsTo(this.physicsBody, this.threeCube);
    }

    destroy() {
        this.autowired.scene.remove(this.threeCube);
        this.autowired.world.remove(this.physicsBody);
    }
}