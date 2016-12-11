import {MyMaterials} from "./MyMaterials";
import {CubeManager} from "./CubeManager";
import {FirstPersonControls} from "./FirstPersonControls";
import {Room} from "./Room";
import {CrossHair} from "./CrossHair";
import {Scoreboard} from "./Scoreboard";
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
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

    canvasElement: JQuery;
    renderer: THREE.WebGLRenderer;

    constructor(scoreboard: Scoreboard) {
        this.scoreboard = scoreboard;
        this.scoreboard.autowired = this;
        this.isGameOver = false;
        this.canvasElement = $("#myCanvas");
        let WIDTH = window.innerWidth;
        let HEIGHT = window.innerHeight;

        let VIEW_ANGLE = 75;
        let ASPECT = WIDTH / HEIGHT;
        let NEAR = 0.1;
        let FAR = 100;


        this.canvasElement.get(0).addEventListener('click', function (event) {
            document.body.requestPointerLock();
        }, false);


        this.renderer = new THREE.WebGLRenderer({
            canvas: <HTMLCanvasElement>this.canvasElement.get(0),
            alpha: true,
            antialias: true,
            precision: "highp"
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.setSize(WIDTH, HEIGHT);

        this.scene = new THREE.Scene();

        //let dirLight = new THREE.DirectionalLight(0xffffff, 1);
        //dirLight.position.set(30, 30, 30);
        // dirLight.castShadow = true;
        //this.scene.add(dirLight);

        let light = new THREE.PointLight(0xFFFFFF, 0.5, 30);
        light.position.set(0, 0, 0);
        this.scene.add(light);

        this.scene.add(new THREE.AmbientLight(0x404040));


        this.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);


        this.world = new CANNON.World();
        this.world.gravity.set(0, -10, 0); // m/s²

        this.myMaterials = new MyMaterials(this);

        this.cubeManager = new CubeManager(this);
        this.room = new Room(this);


        this.firstPersonControls = new FirstPersonControls(this, document);
        this.scene.add(this.firstPersonControls.getObject());
        this.world.addBody(this.firstPersonControls.physics);

        this.crossHair = new CrossHair(this);
    }
}