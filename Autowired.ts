import {MyMaterials} from "./MyMaterials";
import {CubeManager} from "./CubeManager";
import {FirstPersonControls} from "./FirstPersonControls";
import {Room} from "./Room";
export class Autowired {
    camera: THREE.Camera;
    scene: THREE.Scene;
    world: CANNON.World;
    myMaterials: MyMaterials;
    cubeManager: CubeManager;
    firstPersonControls: FirstPersonControls;
    room: Room;

    constructor() {
    }
}