import {MyMaterials} from "./MyMaterials";
import {CubeManager} from "./CubeManager";
import {FirstPersonControls} from "./FirstPersonControls";
import {Room} from "./Room";
import {CrossHair} from "./CrossHair";
import {Scoreboard} from "./Scoreboard";
export class Autowired {
    isGameOver: boolean;

    camera: THREE.Camera;
    scene: THREE.Scene;
    world: CANNON.World;
    myMaterials: MyMaterials;
    cubeManager: CubeManager;
    firstPersonControls: FirstPersonControls;
    room: Room;
    crossHair: CrossHair;
    scoreboard: Scoreboard;

    constructor() {
        this.isGameOver = false;
    }

}