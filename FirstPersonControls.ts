import {MyMaterials} from "./MyMaterials";
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */
//Modified by Lucas Knutson

export class FirstPersonControls {
    camera: THREE.Camera;
    target: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    domElement: any;
    movementSpeed: number = 1.0;
    lookSpeed: number = 0.05;
    autoForward: boolean = false;
    moveForward: boolean = false;
    moveBackward: boolean = false;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    moveUp: boolean = false;
    moveDown: boolean = false;
    freeze: boolean = false;

    pitchObject: THREE.Object3D;
    yawObject: THREE.Object3D;

    physics: CANNON.Body;
    myMaterials: MyMaterials;


    constructor(camera: THREE.Camera, domElement: any, myMaterials: MyMaterials) {
        this.camera = camera;
        this.pitchObject = new THREE.Object3D();
        this.pitchObject.add(this.camera);
        this.yawObject = new THREE.Object3D();
        this.yawObject.add(this.pitchObject);

        this.physics = new CANNON.Body({
            mass: 20,
            position: new CANNON.Vec3(0, 0, 0),
            shape: new CANNON.Sphere(1.3),
            material: myMaterials.slipperyMaterial,
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
    };
    onMouseUp = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    shouldUpdate = (): boolean => {
        let element = document.body;
        let havePointerLock: boolean = ( document.pointerLockElement === element );
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
        let actualMoveSpeed: number = 0;
        if (this.shouldUpdate()) {
            actualMoveSpeed = delta * this.movementSpeed * 50;
            let movementImpulse: THREE.Vector3 = new THREE.Vector3();

            if (this.moveForward) movementImpulse.z -= actualMoveSpeed;
            if (this.moveBackward) movementImpulse.z += actualMoveSpeed;

            if (this.moveLeft) movementImpulse.x -= actualMoveSpeed;
            if (this.moveRight) movementImpulse.x += actualMoveSpeed;

            if (this.moveUp) movementImpulse.y += actualMoveSpeed;
            if (this.moveDown) movementImpulse.y -= actualMoveSpeed;

            let quat: THREE.Quaternion = new THREE.Quaternion();
            quat.setFromEuler(new THREE.Euler(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0, "XYZ"));
            movementImpulse.applyQuaternion(quat);
            this.physics.applyImpulse(new CANNON.Vec3(movementImpulse.x, movementImpulse.y, movementImpulse.z), new CANNON.Vec3());
            this.yawObject.position.set(this.physics.position.x, this.physics.position.y, this.physics.position.z);
            //this.physics.position.set(this.yawObject.position.x, this.yawObject.position.y, this.yawObject.position.z);
            //let relativeToCameraThree: THREE.Vector3 = this.camera.localToWorld(new THREE.Vector3(movementImpulse.x, movementImpulse.y, movementImpulse.z));
            //this.physics.applyLocalImpulse(new CANNON.Vec3(relativeToCameraThree.x, relativeToCameraThree.y, relativeToCameraThree.z), new CANNON.Vec3());
            //this.physics.velocity.vadd(new CANNON.Vec3(movementImpulse.x, movementImpulse.y));
            //this.physics.position.copy(new CANNON.Vec3(this.yawObject.position.x, this.yawObject.position.y, this.yawObject.position.z));
            //this.physics.applyImpulse(movementImpulse, new CANNON.Vec3());
            //this.physics.applyImpulse(new CANNON.Vec3(movementImpulse.x, movementImpulse.y, movementImpulse.z), new CANNON.Vec3());

        }

        //this.physics.angularVelocity.set(0,0,0);
        //this.physics.applyImpulse(new CANNON.Vec3(0, 10, 0), new CANNON.Vec3(0, 1, 0));
        //this.physics.applyImpulse(new CANNON.Vec3(0, -10, 0), new CANNON.Vec3(0, -1, 0));
        //this.yawObject.position.set(this.physics.position.x, this.physics.position.y, this.physics.position.z);
        //Util.copyPhysicsTo(this.physics, this.camera)
    };

    getObject(): THREE.Object3D {
        return this.yawObject;
    };
}