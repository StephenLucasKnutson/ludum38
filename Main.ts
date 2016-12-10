/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="definitions/cannon.d.ts" />

import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import {Autowired} from "./Autowired";
import {Scoreboard} from "./Scoreboard";

class Main {
    autowired: Autowired;

    scoreboard: Scoreboard;

    fixedTimeStep: number = 1.0 / 60.0; // seconds
    timeStepSubdivisions: number = 10;

    constructor() {
        document.addEventListener('keydown',
            (event) => {
                if (event.keyCode == 82) {   //R
                    this.reset()
                }
            },
            false);
        this.reset();
    }

    reset = () => {
        this.scoreboard = (this.scoreboard == null) ? new Scoreboard() : this.scoreboard;
        this.scoreboard.reset();
        this.autowired = new Autowired(this.scoreboard);
    };

    render = () => {
        requestAnimationFrame(this.render);

        if (!this.autowired.isGameOver) {
            for (let i = 0; i < this.timeStepSubdivisions; i++) {
                this.autowired.world.step(this.fixedTimeStep / this.timeStepSubdivisions);
            }

            this.autowired.cubeManager.update();
            this.autowired.room.update();
            this.autowired.firstPersonControls.update(this.fixedTimeStep);

            if (this.autowired.firstPersonControls.getDistanceToWall() < 0.045) {
                this.autowired.isGameOver = true;
            }
        }

        this.autowired.scoreboard.update();

        this.autowired.renderer.render(this.autowired.scene, this.autowired.camera);
    }
}
let main: Main = new Main();
main.render();