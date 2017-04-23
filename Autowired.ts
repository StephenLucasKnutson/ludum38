import {World} from "./World";
import {Simulator} from "./Simulator";
import {UI} from "./UI";
import {UserControls} from "./UserControls";

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import Side = THREE.Side;
import Vector2 = THREE.Vector2;
import Vector3 = THREE.Vector3;

export class Autowired {
    isGameOver: boolean;

    camera: THREE.OrthographicCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;

    canvasElement: JQuery;

    world: World;
    simulator: Simulator;
    userControls: UserControls;
    ui: UI;
    WIDTH: number = 100;
    HEIGHT: number = 60;

    resetCameraAndRenderer() {
        let width = $(window).innerWidth() - 40;
        let height = $(window).innerHeight() - 40;
        let aspectRatio = width / height;
        this.renderer.setSize(width, height);

        let size: number = 300;
        this.camera = new THREE.OrthographicCamera(-size, size, size / aspectRatio, -size / aspectRatio, 0, 10);
        this.camera.position.set(0, 0, 1);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.position.set(355, 300, 5);
        this.camera.updateProjectionMatrix();

        let geometry = new THREE.PlaneGeometry(size * 0.8, size / aspectRatio * 200);
        let material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial(
            {
                color: "blue",
                side: THREE.BackSide
            });

        let sidePanelPlane: THREE.Mesh = new THREE.Mesh(geometry, material);

        sidePanelPlane.rotateX(Math.PI);

        this.camera.add(sidePanelPlane);
        sidePanelPlane.position.set(-300, 0, -2);

        this.scene.add(this.camera);
    }

    constructor() {
        this.isGameOver = false;
        this.canvasElement = $("#myCanvas");

        this.renderer = new THREE.WebGLRenderer({
            canvas: <HTMLCanvasElement>this.canvasElement.get(0),
            antialias: true,
            precision: "highp",
        });

        this.scene = new THREE.Scene();
        this.resetCameraAndRenderer();

        this.scene.add(new THREE.AmbientLight(0x404040));

        this.world = new World(this);
        this.simulator = new Simulator(this);
        this.ui = new UI(this);
        this.userControls = new UserControls(this);

        window.addEventListener('resize', (event) => {
            this.resetCameraAndRenderer();
        });
    }
}