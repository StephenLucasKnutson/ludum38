/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="PointerLockControls.ts" />

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import {Cube} from "./Cube";
import {Room} from "./Room";
import {PointerLockControls} from "./PointerLockControls";

let WIDTH = 800;
let HEIGHT = 600;

let VIEW_ANGLE = 75;
let ASPECT = WIDTH / HEIGHT;
let NEAR = 0.1;
let FAR = 1000;

class Main {
    selector: string;
    canvasElement: JQuery;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    pointerLockControls: PointerLockControls;

    cube: Cube;
    room: Room;

    constructor() {
        console.log("here");
        this.selector = "#myCanvas";
        this.canvasElement = $(this.selector);
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

        this.pointerLockControls = new PointerLockControls(this.camera);
        this.scene.add(this.pointerLockControls.getObject());

    }

    render = () => {
        console.log("rendering")
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}
let main: Main = new Main();
main.render();