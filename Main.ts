/// <reference path="Cube.ts" />

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import {Cube} from "./Cube";

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
    geometry: THREE.BoxGeometry;
    material: THREE.MeshNormalMaterial;

    cube: Cube;

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
        // create a threeCube and add it to the scene
        this.scene.add(this.cube.threeCube);
        // add the camera to the scene
        this.scene.add(this.camera);
        // move camera back so we can see the threeCube
        this.camera.position.z = 2;
        // set the renderer size
        this.renderer.setSize(WIDTH, HEIGHT);
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}
let main: Main = new Main();
main.render();