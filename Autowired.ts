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
    renderer: THREE.WebGLRenderer;
    glowScene: THREE.Scene;
    world: CANNON.World;
    myMaterials: MyMaterials;
    cubeManager: CubeManager;
    firstPersonControls: FirstPersonControls;
    room: Room;
    crossHair: CrossHair;
    scoreboard: Scoreboard;

    canvasElement: JQuery;

    constructor(scoreboard: Scoreboard) {
        this.scoreboard = scoreboard;
        this.scoreboard.autowired = this;
        this.isGameOver = false;
        this.canvasElement = $("#myCanvas");

        let VIEW_ANGLE = 75;
        let NEAR = 0.1;
        let FAR = 100;


        this.canvasElement.get(0).addEventListener('click', (event) => {
            var el = document.documentElement;
            let rfs = document.body.requestFullscreen || document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen;
            rfs.call(el);

            let rpl = document.body.requestPointerLock || document.body.mozRequestPointerLock;
            rpl.call(el);
        }, false);

        window.addEventListener('resize', (event) => {
            (this.camera as THREE.PerspectiveCamera).aspect = window.innerWidth / window.innerHeight;
            this.camera.updateMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        document.addEventListener("fullscreenchange", (event) => {
            (this.camera as THREE.PerspectiveCamera).aspect = window.innerWidth / window.innerHeight;
            this.camera.updateMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });


        this.renderer = new THREE.WebGLRenderer({
            canvas: <HTMLCanvasElement>this.canvasElement.get(0),
            antialias: true,
            precision: "highp"
        });
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            window.innerWidth / window.innerHeight,
            NEAR,
            FAR);

        this.scene = new THREE.Scene();

        let light = new THREE.PointLight(0xFFFFFF, 0.5, 30);
        light.position.set(0, 0, 0);
        this.scene.add(light);

        this.scene.add(new THREE.AmbientLight(0x404040));

        this.glowScene = new THREE.Scene();
        this.glowScene.add(new THREE.AmbientLight(0xFFFFFF));

        let dirLight = new THREE.PointLight(0xffffff, 1);
        this.camera.add(dirLight);
        this.glowScene.add(dirLight);

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