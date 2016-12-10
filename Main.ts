/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="definitions/cannon.d.ts" />

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import {CubeManager} from "./CubeManager";
import {Room} from "./Room";
import {MyMaterials} from "./MyMaterials";
import {FirstPersonControls} from "./FirstPersonControls";
import {Autowired} from "./Autowired";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let VIEW_ANGLE = 75;
let ASPECT = WIDTH / HEIGHT;
let NEAR = 0.1;
let FAR = 1000;

let fixedTimeStep = 1.0 / 60.0; // seconds
let maxSubSteps = 3;

class Main {
    selector: string;
    canvasElement: JQuery;
    renderer: THREE.WebGLRenderer;
    autowired: Autowired;


    constructor() {
        this.autowired = new Autowired();
        this.selector = "#myCanvas";
        this.canvasElement = $(this.selector);


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

        this.autowired.scene = new THREE.Scene();
        this.autowired.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);


        this.autowired.world = new CANNON.World();
        this.autowired.world.gravity.set(0, -10, 0); // m/s²

        this.autowired.myMaterials = new MyMaterials(this.autowired);

        this.autowired.cubeManager = new CubeManager(this.autowired);
        this.autowired.room = new Room(this.autowired);


        this.autowired.firstPersonControls = new FirstPersonControls(this.autowired, document);
        this.autowired.scene.add(this.autowired.firstPersonControls.getObject());
        this.autowired.world.addBody(this.autowired.firstPersonControls.physics);
    }

    render = () => {
        requestAnimationFrame(this.render);

        let subdivision = 10;
        for (let i = 0; i < subdivision; i++) {
            this.autowired.world.step(fixedTimeStep / subdivision);
        }


        this.autowired.cubeManager.update();
        this.autowired.room.update();
        this.autowired.firstPersonControls.update(fixedTimeStep);

        this.renderer.render(this.autowired.scene, this.autowired.camera);
    }
}
let main: Main = new Main();
main.render();