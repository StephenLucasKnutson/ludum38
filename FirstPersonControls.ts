/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */
//Modified by Lucas Knutson

class FirstPersonControls {
    camera: THREE.Camera;
    target: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    domElement: any;
    movementSpeed: number = 1.0;
    lookSpeed: number = 0.05;
    autoForward: boolean = false;
    autoSpeedFactor: number = 0.0;
    moveForward: boolean = false;
    moveBackward: boolean = false;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    moveUp: boolean = false;
    moveDown: boolean = false;
    freeze: boolean = false;

    pitchObject: THREE.Object3D;
    yawObject: THREE.Object3D;


    constructor(camera: THREE.Camera, domElement: any) {
        this.camera = camera;
        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(this.camera);
        this.yawObject = new THREE.Object3D();
        this.yawObject.add(this.pitchObject);

        this.domElement = ( domElement !== undefined ) ? domElement : document;

        this.domElement.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        }, false);

        this.domElement.addEventListener('mousemove', bind(this, this.onMouseMove), false);
        this.domElement.addEventListener('mousedown', bind(this, this.onMouseDown), false);
        this.domElement.addEventListener('mouseup', bind(this, this.onMouseUp), false);
        this.domElement.addEventListener('keydown', bind(this, this.onKeyDown), false);
        this.domElement.addEventListener('keyup', bind(this, this.onKeyUp), false);

        function bind(scope, fn) {
            return function () {
                fn.apply(scope, arguments);
            };
        };
    }

    onMouseDown = (event) => {
        if (this.domElement !== document) {
            this.domElement.focus();
        }
        event.preventDefault();
        event.stopPropagation();
    };
    onMouseUp = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    shouldUpdate = (): boolean => {
        let element = document.body;
        let havePointerLock: boolean = ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element )
        return havePointerLock && !this.freeze;
    };
    onMouseMove = (event) => {
        if (this.shouldUpdate()) {
            let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            let PI_2 = Math.PI / 2;

            this.yawObject.rotation.y -= movementX * 0.002;
            this.pitchObject.rotation.x -= movementY * 0.002;

            this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, this.pitchObject.rotation.x));
        }
    };

    onKeyDown = (event) => {
        switch (event.keyCode) {
            case 38: /*up*/
            case 87: /*W*/
                this.moveForward = true;
                break;
            case 37: /*left*/
            case 65: /*A*/
                this.moveLeft = true;
                break;
            case 40: /*down*/
            case 83: /*S*/
                this.moveBackward = true;
                break;
            case 39: /*right*/
            case 68: /*D*/
                this.moveRight = true;
                break;
            case 82: /*R*/
                this.moveUp = true;
                break;
            case 70: /*F*/
                this.moveDown = true;
                break;
            case 81: /*Q*/
                this.freeze = !this.freeze;
                break;
        }
    };

    onKeyUp = (event) => {
        switch (event.keyCode) {
            case 38: /*up*/
            case 87: /*W*/
                this.moveForward = false;
                break;
            case 37: /*left*/
            case 65: /*A*/
                this.moveLeft = false;
                break;
            case 40: /*down*/
            case 83: /*S*/
                this.moveBackward = false;
                break;
            case 39: /*right*/
            case 68: /*D*/
                this.moveRight = false;
                break;
            case 82: /*R*/
                this.moveUp = false;
                break;
            case 70: /*F*/
                this.moveDown = false;
                break;
        }
    };

    update = (delta) => {
        var actualMoveSpeed = 0;
        if (this.shouldUpdate()) {

                this.autoSpeedFactor = 0.0;

            actualMoveSpeed = delta * this.movementSpeed;

            if (this.moveForward || ( this.autoForward && !this.moveBackward )) this.camera.translateZ(-( actualMoveSpeed + this.autoSpeedFactor ));
            if (this.moveBackward) this.camera.translateZ(actualMoveSpeed);

            if (this.moveLeft) this.camera.translateX(-actualMoveSpeed);
            if (this.moveRight) this.camera.translateX(actualMoveSpeed);

            if (this.moveUp) this.camera.translateY(actualMoveSpeed);
            if (this.moveDown) this.camera.translateY(-actualMoveSpeed);
        }
    };

    getObject(): THREE.Object3D {
        return this.yawObject;
    };
}