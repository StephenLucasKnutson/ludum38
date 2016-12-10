/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="definitions/cannon.d.ts" />

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import {Cube} from "./Cube";
import {Room} from "./Room";
import {MyMaterials} from "./MyMaterials";
import {FirstPersonControls} from "./FirstPersonControls";

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
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    firstPersonControls: FirstPersonControls;

    cube: Cube;
    room: Room;
    myMaterials: MyMaterials;

    world: CANNON.World;

    constructor() {
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

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);

        this.world = new CANNON.World();
        this.world.gravity.set(0, -10, 0); // m/s²

        this.myMaterials = new MyMaterials(this.world);
        this.cube = new Cube(this.scene, this.world, this.myMaterials);
        this.room = new Room(this.scene, this.world, this.myMaterials);


        this.firstPersonControls = new FirstPersonControls(this.camera, document, this.myMaterials);
        this.scene.add(this.firstPersonControls.getObject());
        this.world.addBody(this.firstPersonControls.physics);
    }

    render = () => {
        requestAnimationFrame(this.render);

        let subdivision = 10;
        for (let i = 0; i < subdivision; i++) {
            this.world.step(fixedTimeStep / subdivision);
        }


        this.cube.update();
        this.room.update();
        this.firstPersonControls.update(fixedTimeStep);

        this.renderer.render(this.scene, this.camera);
    }
}
let main: Main = new Main();
main.render();