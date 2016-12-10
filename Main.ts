/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="definitions/cannon.d.ts" />
/// <reference path="PointerLockControls.ts" />

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import {Cube} from "./Cube";
import {Room} from "./Room";

let WIDTH = 800;
let HEIGHT = 600;

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

    world: CANNON.World;

    constructor() {
        this.selector = "#myCanvas";
        this.canvasElement = $(this.selector);

        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if (havePointerLock) {

            var element = document.body;

            var pointerlockchange = function (event) {
            };

            var pointerlockerror = function (event) {
            };

            // Hook pointer lock state change events
            document.addEventListener('pointerlockchange', pointerlockchange, false);
            document.addEventListener('mozpointerlockchange', pointerlockchange, false);
            document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

            document.addEventListener('pointerlockerror', pointerlockerror, false);
            document.addEventListener('mozpointerlockerror', pointerlockerror, false);
            document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

            this.canvasElement.get(0).addEventListener('click', function (event) {
                element.requestPointerLock();
            }, false);

        }

        this.renderer = new THREE.WebGLRenderer({
            canvas: <HTMLCanvasElement>this.canvasElement.get(0),
            alpha: true,
            antialias: true,
            precision: "highp"
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);
        this.cube = new Cube();
        this.scene.add(this.cube.threeCube);

        this.room = new Room();
        for (let mesh of this.room.meshes()) {
            this.scene.add(mesh)
        }

        this.camera.position.z = 2;
        this.renderer.setSize(WIDTH, HEIGHT);

        this.firstPersonControls = new FirstPersonControls(this.camera, this.canvasElement.get(0));

        // Setup our world
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0); // m/s²

        this.world.addBody(this.cube.physicsBody);
        for (let physicBody of this.room.physics()) {
            this.world.addBody(physicBody)
        }
    }

    render = () => {
        requestAnimationFrame(this.render);

        this.world.step(fixedTimeStep / 10);

        this.cube.update();
        this.room.update();
        this.firstPersonControls.update(fixedTimeStep);

        this.renderer.render(this.scene, this.camera);
    }
}
let main: Main = new Main();
main.render();