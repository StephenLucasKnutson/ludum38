/// <reference path="definitions/underscore.d.ts" />
import {Autowired} from "./Autowired";


class Main {
    autowired: Autowired;

    constructor() {
        this.autowired = new Autowired();
        setInterval(() => {
            this.autowired.ui.update()
        }, 400);
    }

    render = () => {
        this.autowired.userControls.update();
        this.autowired.simulator.update();

        this.autowired.renderer.render(this.autowired.scene, this.autowired.camera);
        requestAnimationFrame(this.render);
    };
}
let main: Main = new Main();
main.render();