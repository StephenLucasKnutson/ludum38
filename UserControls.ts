import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import Side = THREE.Side;
import Vector2 = THREE.Vector2;
import {Autowired} from "./Autowired";
import Vector3 = THREE.Vector3;

export class UserControls {
    autowired: Autowired;

    mousePosition: THREE.Vector2 = new Vector2(0.5, 0.5);

    constructor(autowired: Autowired) {
        this.autowired = autowired;
        let self = this;

        $(document).keydown((e) => {
            self.onKeyPress(e, true)
        });
        $(document).keyup((e) => {
            self.onKeyPress(e, false)
        });

        let canvas = this.autowired.canvasElement;
        $(canvas).mousemove((event) => {
            let mousePosition = new Vector2(event.clientX, event.clientY);
            let screenSize = new Vector2(canvas.innerWidth(), canvas.innerHeight());
            this.mousePosition = mousePosition.divide(screenSize);
            console.log(this.mousePosition);
        })
    };

    isKeyPressed: {[key: number]: boolean;} = {};

    update() {
        let left: Vector3 = new Vector3(-1, 0, 0);
        let right: Vector3 = new Vector3(1, 0, 0);
        let up: Vector3 = new Vector3(0, 1, 0);
        let down: Vector3 = new Vector3(0, -1, 0);
        let keyToDirection: {[key: number]: Vector3;} = {
            37: left, //left arrow
            65: left, //a
            39: right,  //right arrow
            68: right,  //d
            38: up,  //up arrow
            87: up,  //w
            40: down,  //down arrow
            83: down,  //s
        };
        let translationScalar = 10;
        for (let key in keyToDirection) {
            if (this.isKeyPressed[key]) {
                let direction = keyToDirection[key];
                this.autowired.camera.translateOnAxis(direction, translationScalar);
            }
        }
        let margin = 0.05;
        if(this.mousePosition.x < margin){
            this.autowired.camera.translateOnAxis(left, translationScalar);
        }
        if(this.mousePosition.x > (1.0 - margin)) {
            this.autowired.camera.translateOnAxis(right, translationScalar);
        }
        if(this.mousePosition.y < margin){
            this.autowired.camera.translateOnAxis(up, translationScalar);
        }
        if(this.mousePosition.y > (1.0 - margin)) {
            this.autowired.camera.translateOnAxis(down, translationScalar);
        }

        let keyToScreenScalar: {[key: number]: number;} = {
            16: 0.97, //shift -> out
            32: 1.03, //space -> in
        };
        for (let key in keyToScreenScalar) {
            if (this.isKeyPressed[key]) {
                //this.autowired.camera.zoom *= keyToScreenScalar[key];
                //this.autowired.camera.updateProjectionMatrix();
            }
        }
    };

    onKeyPress(event, isKeyDown: boolean) {
        this.isKeyPressed[event.keyCode] = isKeyDown;
    };
}