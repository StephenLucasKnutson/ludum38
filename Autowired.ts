import {World} from "./World";
import {Simulator} from "./Simulator";

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import {UI} from "./UI";

export class Autowired {
    isGameOver: boolean;

    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;

    canvasElement: JQuery;

    world : World;
    simulator: Simulator;
    ui : UI;
    WIDTH: number = 120;
    HEIGHT: number = 80;

    constructor() {
        this.isGameOver = false;
        this.canvasElement = $("#myCanvas");


        let VIEW_ANGLE = 75;
        let NEAR = 0.1;
        let FAR = 750;

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
        this.camera.position.set(0, 0, 1);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.camera.position.set(600, 400, 600);

        this.scene = new THREE.Scene();

        let light = new THREE.PointLight(0xFFFFFF, 0.5, 10000);
        light.position.set(0, 0, 0);
        this.scene.add(light);

        this.scene.add(new THREE.AmbientLight(0x404040));

        this.world = new World(this);
        this.simulator = new Simulator(this);
        this.ui = new UI(this);
    }
}