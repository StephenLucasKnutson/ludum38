import {MyMaterials} from "./MyMaterials";
import {CubeManager} from "./CubeManager";
import {FirstPersonControls} from "./FirstPersonControls";
import {Room} from "./Room";
import {CrossHair} from "./CrossHair";
export class Autowired {
    camera: THREE.Camera;
    scene: THREE.Scene;
    world: CANNON.World;
    myMaterials: MyMaterials;
    cubeManager: CubeManager;
    firstPersonControls: FirstPersonControls;
    room: Room;
    crossHair: CrossHair;

    constructor() {
    }
}