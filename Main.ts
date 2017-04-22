/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="definitions/cannon.d.ts" />

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
//import {Autowired} from "./Autowired";
//import {Scoreboard} from "./Scoreboard";

class Main {
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    glowScene: THREE.Scene;

    canvasElement: JQuery;


    constructor() {
        let VIEW_ANGLE = 75;
        let NEAR = 0.1;
        let FAR = 100;

        this.canvasElement = $("#myCanvas");

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
    }



    render = () => {
        requestAnimationFrame(this.render);


    };
}
let main: Main = new Main();
main.render();