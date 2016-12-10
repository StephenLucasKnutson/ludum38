import {Autowired} from "./Autowired";
import {Room} from "./Room";
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */
//Modified by Lucas Knutson

export class FirstPersonControls {
    mass: number = 2;
    autowired: Autowired;
    radius: number = 0.6;
    target: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    domElement: any;
    movementSpeed: number = 1.0;
    lookSpeed: number = 0.05;
    autoForward: boolean = false;
    moveForward: boolean = false;
    moveBackward: boolean = false;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    jump: boolean = false;

    pitchObject: THREE.Object3D;
    yawObject: THREE.Object3D;

    physics: CANNON.Body;


    constructor(autowired: Autowired, domElement: any) {
        this.autowired = autowired;
        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(this.autowired.camera);
        this.yawObject = new THREE.Object3D();
        this.yawObject.add(this.pitchObject);

        this.physics = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(0, 5, 0),
            shape: new CANNON.Sphere(this.radius),
            material: this.autowired.myMaterials.slipperyMaterial,
            linearDamping: 0.9
        });

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
        if (!this.autowired.isGameOver) {
            this.shoot();
        }
    };

    private shoot() {
        let raycaster: THREE.Raycaster = new THREE.Raycaster();
        raycaster.set(this.autowired.camera.getWorldPosition(), this.autowired.camera.getWorldDirection());
        let intersections: THREE.Intersection[] = raycaster.intersectObjects(this.autowired.scene.children);
        if (intersections.length == 0) {
            return;
        }
        let nearest: THREE.Intersection = intersections[0];
        for (let intersection of intersections) {
            if (intersection.distance < nearest.distance) {
                nearest = intersection;
            }
        }
        this.autowired.cubeManager.removeCube(nearest.object)
    }

    private canJump() {
        let tolerance: number = 0.1;
        let mustBeCloserThan = this.radius + tolerance;

        let raycaster: THREE.Raycaster = new THREE.Raycaster();
        raycaster.set(this.autowired.camera.getWorldPosition(), new THREE.Vector3(0, -1, 0));
        let intersections: THREE.Intersection[] = raycaster.intersectObjects(this.autowired.scene.children);
        for (let intersection of intersections) {
            if (intersection.distance < mustBeCloserThan) {
                return true;
            }
        }
        return false;
    }

    onMouseUp = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    shouldUpdate = (): boolean => {
        let element = document.body;
        let havePointerLock: boolean = ( document.pointerLockElement === element );
        return havePointerLock && !this.autowired.isGameOver;
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
            case 32: /*space*/
                this.jump = true;
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
            case 32: /*space*/
                this.jump = false;
                break;
        }
    };

    update = (delta) => {
        let actualMoveSpeed: number = 0;
        if (this.shouldUpdate()) {
            actualMoveSpeed = delta * this.movementSpeed * 50;
            let movementImpulse: THREE.Vector3 = new THREE.Vector3();

            if (this.moveForward) movementImpulse.z -= actualMoveSpeed;
            if (this.moveBackward) movementImpulse.z += actualMoveSpeed;

            if (this.moveLeft) movementImpulse.x -= actualMoveSpeed;
            if (this.moveRight) movementImpulse.x += actualMoveSpeed;

            if (this.canJump() && this.jump) movementImpulse.y += actualMoveSpeed * 2;
            movementImpulse = movementImpulse.multiplyScalar(this.mass * 0.2)

            let quat: THREE.Quaternion = new THREE.Quaternion();
            quat.setFromEuler(new THREE.Euler(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0, "XYZ"));
            movementImpulse.applyQuaternion(quat);
            this.physics.applyImpulse(new CANNON.Vec3(movementImpulse.x, movementImpulse.y, movementImpulse.z), new CANNON.Vec3());
        }
        this.yawObject.position.set(this.physics.position.x, this.physics.position.y, this.physics.position.z);
    };

    getDistanceToWall(): number {
        let returnValue = 1000;
        let roomExtent = Room.blockSize / 2;
        let myRadius: number = this.radius;
        let position: THREE.Vector3 = this.yawObject.position;
        let x: number = Math.abs(position.x);
        let z: number = Math.abs(position.z);
        returnValue = Math.min(returnValue, roomExtent - (x + myRadius));
        returnValue = Math.min(returnValue, roomExtent - (z + myRadius));
        return returnValue;
    }

    getObject(): THREE.Object3D {
        return this.yawObject;
    };
}