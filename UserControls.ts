import ShadowMapType = THREE.ShadowMapType;
import PCFSoftShadowMap = THREE.PCFSoftShadowMap;
import Side = THREE.Side;
import Vector2 = THREE.Vector2;
import {Autowired} from "./Autowired";
import Vector3 = THREE.Vector3;

export class UserControls {
    autowired: Autowired;

    constructor(autowired: Autowired) {
        this.autowired = autowired;

        document.onkeydown = (e) => {
            this.onKeyPress(e, true)
        };
        document.onkeyup = (e) => {
            this.onKeyPress(e, false)
        };
    };

    isKeyPressed: {[key: number]: boolean;} = {};

    update() {
        let keyToDirection: {[key: number]: Vector3;} = {
            37: new Vector3(-1, 0, 0), //left
            65: new Vector3(-1, 0, 0), //a
            39: new Vector3(1, 0, 0),  //right
            68: new Vector3(1, 0, 0),  //d
            38: new Vector3(0, 1, 0),  //up
            87: new Vector3(0, 1, 0),  //w
            40: new Vector3(0, -1, 0),  //down
            83: new Vector3(0, -1, 0),  //s
        };
        for (let key in keyToDirection) {
            if (this.isKeyPressed[key]) {
                let direction = keyToDirection[key];
                this.autowired.camera.translateOnAxis(direction, 10);
            }
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