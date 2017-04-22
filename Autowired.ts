import {World} from "./World";
import {Simulator} from "./Simulator";
import {UI} from "./UI";

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;

export class Autowired {
    isGameOver: boolean;

    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;

    canvasElement: JQuery;

    world: World;
    simulator: Simulator;
    ui: UI;
    WIDTH: number = 100;
    HEIGHT: number = 60;

    resetCameraAndRenderer() {
        let width = $(window).innerWidth() - 40;
        let height = $(window).innerHeight() - 40;
        let aspectRatio = width / height;
        this.renderer.setSize(width, height);

        let size: number = 650;
        this.camera = new THREE.OrthographicCamera(-size, size, size / aspectRatio, -size / aspectRatio, 0, 10);
        this.camera.position.set(0, 0, 1);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(355, 300, 5);
    }

    constructor() {
        this.isGameOver = false;
        this.canvasElement = $("#myCanvas");

        this.renderer = new THREE.WebGLRenderer({
            canvas: <HTMLCanvasElement>this.canvasElement.get(0),
            antialias: true,
            precision: "highp"
        });

        this.resetCameraAndRenderer();

        this.scene = new THREE.Scene();

        let light = new THREE.PointLight(0xFFFFFF, 0.5, 10000);
        light.position.set(0, 0, 0);
        this.scene.add(light);

        this.scene.add(new THREE.AmbientLight(0x404040));

        this.world = new World(this);
        this.simulator = new Simulator(this);
        this.ui = new UI(this);

        window.addEventListener('resize', (event) => {
            this.resetCameraAndRenderer();
        });
    }
}