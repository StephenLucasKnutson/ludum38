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
    noFly: boolean = false;
    lookVertical: boolean = true;
    autoForward: boolean = false;
    activeLook: boolean = true;
    heightSpeed: boolean = false;
    heightCoef: number = 1.0;
    heightMin: number = 0;
    heightMax: number = 10;
    constrainVertical: boolean = false;
    verticalMin: number = 0;
    verticalMax: number = Math.PI;
    autoSpeedFactor: number = 0.0;
    mouseX: number = 0;
    mouseY: number = 0;
    lat: number = 0;
    lon: number = 0;
    phi: number = 0;
    theta: number = 0;
    moveForward: boolean = false;
    moveBackward: boolean = false;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    moveUp: boolean = false;
    moveDown: boolean = false;
    freeze: boolean = false;
    mouseDragOn: boolean = false;

    viewHalfX: number;
    viewHalfY: number;

    constructor(camera: THREE.Camera, domElement: Element) {
        this.camera = camera;
        this.domElement = ( domElement !== undefined ) ? domElement : document;
        if (this.domElement === document) {
            this.viewHalfX = window.innerWidth / 2;
            this.viewHalfY = window.innerHeight / 2;
        } else {
            this.viewHalfX = this.domElement.offsetWidth / 2;
            this.viewHalfY = this.domElement.offsetHeight / 2;
            this.domElement.setAttribute('tabindex', -1);
        }

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
        if (this.activeLook) {
            switch (event.button) {
                case 0:
                    this.moveForward = true;
                    break;
                case 2:
                    this.moveBackward = true;
                    break;
            }
        }
        this.mouseDragOn = true;
    };
    onMouseUp = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.activeLook) {
            switch (event.button) {
                case 0:
                    this.moveForward = false;
                    break;
                case 2:
                    this.moveBackward = false;
                    break;
            }
        }
        this.mouseDragOn = false;
    };

    onMouseMove = (event) => {
        if (this.domElement === document) {
            this.mouseX = event.pageX - this.viewHalfX;
            this.mouseY = event.pageY - this.viewHalfY;
        } else {
            this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
            this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

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
        if (!this.freeze) {

            if (this.heightSpeed) {

                var y = THREE.Math.clamp(this.camera.position.y, this.heightMin, this.heightMax);
                var heightDelta = y - this.heightMin;

                this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

            } else {

                this.autoSpeedFactor = 0.0;

            }

            actualMoveSpeed = delta * this.movementSpeed;

            if (this.moveForward || ( this.autoForward && !this.moveBackward )) this.camera.translateZ(-( actualMoveSpeed + this.autoSpeedFactor ));
            if (this.moveBackward) this.camera.translateZ(actualMoveSpeed);

            if (this.moveLeft) this.camera.translateX(-actualMoveSpeed);
            if (this.moveRight) this.camera.translateX(actualMoveSpeed);

            if (this.moveUp) this.camera.translateY(actualMoveSpeed);
            if (this.moveDown) this.camera.translateY(-actualMoveSpeed);

            var actualLookSpeed = delta * this.lookSpeed;

            if (!this.activeLook) {

                actualLookSpeed = 0;

            }

            this.lon += this.mouseX * actualLookSpeed;
            if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed;

            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = ( 90 - this.lat ) * Math.PI / 180;
            this.theta = this.lon * Math.PI / 180;

            var targetPosition = this.target,
                position = this.camera.position;

            targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
            targetPosition.y = position.y + 100 * Math.cos(this.phi);
            targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);

        }

        var verticalLookRatio = 1;

        if (this.constrainVertical) {

            verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

        }

        this.lon += this.mouseX * actualLookSpeed;
        if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = ( 90 - this.lat ) * Math.PI / 180;

        this.theta = this.lon * Math.PI / 180;

        if (this.constrainVertical) {

            this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);

        }

        var targetPosition = this.target,
            position = this.camera.position;

        targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        targetPosition.y = position.y + 100 * Math.cos(this.phi);
        targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);

        this.camera.lookAt(targetPosition);

    };
}