System.register("MyMaterials", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MyMaterials;
    return {
        setters: [],
        execute: function () {
            MyMaterials = (function () {
                function MyMaterials(autowired) {
                    this.autowired = autowired;
                    this.wallMaterial = new CANNON.Material("wallMaterial");
                    this.playerMaterial = new CANNON.Material("playerMaterial");
                    this.cubeMaterial = new CANNON.Material("cubeMaterial");
                    this.slipperyMaterial = new CANNON.Material("slipperyMaterial");
                    this.autowired.world.addContactMaterial(new CANNON.ContactMaterial(this.slipperyMaterial, this.playerMaterial, {
                        friction: 0.7,
                        restitution: 0.0
                    }));
                    /*
                     this.world.addContactMaterial(
                     new CANNON.ContactMaterial(
                     this.cubeMaterial,
                     this.slipperyMaterial,
                     {
                     friction: 0.2,
                     restitution: 0.0
                     }
                     )
                     );*/
                    //this.world.addContactMaterial(new CANNON.ContactMaterial(this.wallMaterial, this.playerMaterial, { friction: 0.0, restitution: 0.0 }));
                    //this.world.addContactMaterial(new CANNON.ContactMaterial(this.wallMaterial, this.cubeMaterial, { friction: 0.0, restitution: 0.0 }));
                    //this.world.addContactMaterial(new CANNON.ContactMaterial(this.playerMaterial, this.cubeMaterial, { friction: 0.0, restitution: 0.0 }));
                }
                return MyMaterials;
            }());
            exports_1("MyMaterials", MyMaterials);
        }
    }
});
System.register("Room", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Room;
    return {
        setters: [],
        execute: function () {
            Room = (function () {
                function Room(autowired) {
                    this.autowired = autowired;
                    this.bottomMesh = this.createCubeThreeFloor();
                    this.topMesh = this.createCubeThree();
                    this.leftMesh = this.createCubeThree();
                    this.rightMesh = this.createCubeThree();
                    this.forwardMesh = this.createCubeThree();
                    this.backwardMesh = this.createCubeThree();
                    this.bottomPhysics = this.createCubePhysics();
                    this.topPhysics = this.createCubePhysics();
                    this.leftPhysics = this.createCubePhysics();
                    this.rightPhysics = this.createCubePhysics();
                    this.forwardPhysics = this.createCubePhysics();
                    this.backwardPhysics = this.createCubePhysics();
                    this.bottomPhysics.position.set(0, -Room.blockSize, 0);
                    this.topPhysics.position.set(0, Room.blockSize, 0);
                    this.leftPhysics.position.set(Room.blockSize, 0, 0);
                    this.rightPhysics.position.set(-Room.blockSize, 0, 0);
                    this.forwardPhysics.position.set(0, 0, Room.blockSize);
                    this.backwardPhysics.position.set(0, 0, -Room.blockSize);
                    for (var _i = 0, _a = this.meshes(); _i < _a.length; _i++) {
                        var mesh = _a[_i];
                        this.autowired.scene.add(mesh);
                    }
                    for (var _b = 0, _c = this.physics(); _b < _c.length; _b++) {
                        var physicBody = _c[_b];
                        this.autowired.world.addBody(physicBody);
                    }
                }
                Room.prototype.createCubeThree = function (width, height, depth) {
                    if (width === void 0) {
                        width = Room.blockSize;
                    }
                    if (height === void 0) {
                        height = Room.blockSize;
                    }
                    if (depth === void 0) {
                        depth = Room.blockSize;
                    }
                    var geometry = new THREE.BoxGeometry(width, height, depth);
                    var material = new THREE.MeshStandardMaterial({
                        color: "blue"
                    });
                    var mesh = new THREE.Mesh(geometry, material);
                    return mesh;
                };
                Room.prototype.createCubeThreeFloor = function (width, height, depth) {
                    if (width === void 0) {
                        width = Room.blockSize;
                    }
                    if (height === void 0) {
                        height = Room.blockSize;
                    }
                    if (depth === void 0) {
                        depth = Room.blockSize;
                    }
                    var geometry = new THREE.BoxGeometry(width, height, depth);
                    var material = new THREE.MeshBasicMaterial({
                        color: "gray"
                    });
                    var mesh = new THREE.Mesh(geometry, material);
                    return mesh;
                };
                Room.prototype.createCubePhysics = function (width, height, depth) {
                    if (width === void 0) {
                        width = Room.blockSize;
                    }
                    if (height === void 0) {
                        height = Room.blockSize;
                    }
                    if (depth === void 0) {
                        depth = Room.blockSize;
                    }
                    var sphereBody = new CANNON.Body({
                        mass: 0,
                        shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
                        material: this.autowired.myMaterials.slipperyMaterial
                    });
                    return sphereBody;
                };
                Room.prototype.update = function () {
                    Util.copyPhysicsTo(this.bottomPhysics, this.bottomMesh);
                    Util.copyPhysicsTo(this.topPhysics, this.topMesh);
                    Util.copyPhysicsTo(this.leftPhysics, this.leftMesh);
                    Util.copyPhysicsTo(this.rightPhysics, this.rightMesh);
                    Util.copyPhysicsTo(this.forwardPhysics, this.forwardMesh);
                    Util.copyPhysicsTo(this.backwardPhysics, this.backwardMesh);
                };
                Room.prototype.meshes = function () {
                    return [this.bottomMesh, this.topMesh, this.leftMesh, this.rightMesh, this.forwardMesh, this.backwardMesh];
                };
                Room.prototype.physics = function () {
                    return [this.bottomPhysics, this.topPhysics, this.leftPhysics, this.rightPhysics, this.forwardPhysics, this.backwardPhysics];
                };
                Room.blockSize = 10;
                return Room;
            }());
            exports_2("Room", Room);
        }
    }
});
System.register("Cube", ["Room"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Room_1;
    var Cube;
    return {
        setters: [
            function (Room_1_1) {
                Room_1 = Room_1_1;
            }],
        execute: function () {
            Cube = (function () {
                function Cube(autowired) {
                    this.autowired = autowired;
                    var width = (Math.random() * 0.3 + 0.2);
                    var height = (Math.random() * 0.3 + 0.2);
                    var depth = (Math.random() * 0.3 + 0.2);
                    this.threeCube = this.createCubeThree(width, height, depth);
                    this.physicsBody = this.createCubePhysics(width, height, depth);
                    this.autowired.scene.add(this.threeCube);
                    this.autowired.world.addBody(this.physicsBody);
                }
                Cube.prototype.createCubeThree = function (width, height, depth) {
                    var geometry = new THREE.BoxGeometry(width, height, depth);
                    var material = new THREE.MeshPhongMaterial({
                        color: 0x839CA5,
                        specular: 0xFFFFFF,
                        shininess: 200
                    });
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.receiveShadow = true;
                    return mesh;
                };
                Cube.prototype.createCubePhysics = function (width, height, depth) {
                    var x = (Math.random() - 0.5) * Room_1.Room.blockSize;
                    var z = (Math.random() - 0.5) * Room_1.Room.blockSize;
                    var density = 15.0;
                    var mass = width * height * depth * density;
                    var sphereBody = new CANNON.Body({
                        mass: mass,
                        position: new CANNON.Vec3(x, Room_1.Room.blockSize / 2 - 1 - height, z),
                        shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
                        material: this.autowired.myMaterials.cubeMaterial,
                        linearDamping: 0.3,
                        angularDamping: 0.6
                    });
                    return sphereBody;
                };
                Cube.prototype.update = function (cubeOrder, delta) {
                    var direction;
                    if (cubeOrder == CubeOrder.randomDirection) {
                        direction = new CANNON.Vec3(Math.random(), Math.random(), Math.random()).unit();
                    }
                    else if (cubeOrder == CubeOrder.hitPlayer) {
                        direction = this.autowired.firstPersonControls.physics.position.clone().vsub(this.physicsBody.position).unit();
                    }
                    else if (cubeOrder == CubeOrder.posX) {
                        direction = new CANNON.Vec3(1, 0, 0).unit();
                    }
                    else if (cubeOrder == CubeOrder.negX) {
                        direction = new CANNON.Vec3(-1, 0, 0).unit();
                    }
                    else if (cubeOrder == CubeOrder.posZ) {
                        direction = new CANNON.Vec3(0, 0, 1).unit();
                    }
                    else if (cubeOrder == CubeOrder.negZ) {
                        direction = new CANNON.Vec3(0, 0, -1).unit();
                    }
                    this.physicsBody.applyImpulse(direction.scale(0.025 * delta), new CANNON.Vec3());
                    Util.copyPhysicsTo(this.physicsBody, this.threeCube);
                };
                Cube.prototype.destroy = function () {
                    this.autowired.scene.remove(this.threeCube);
                    this.autowired.world.remove(this.physicsBody);
                };
                return Cube;
            }());
            exports_3("Cube", Cube);
        }
    }
});
System.register("CubeManager", ["Cube"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Cube_1;
    var CubeManager;
    return {
        setters: [
            function (Cube_1_1) {
                Cube_1 = Cube_1_1;
            }],
        execute: function () {
            CubeManager = (function () {
                function CubeManager(autowired) {
                    this.cubes = [];
                    this.a = 2000000;
                    this.numberOfUpdates = 4000;
                    this.autowired = autowired;
                    this.currentOrder = CubeOrder.hitPlayer;
                }
                CubeManager.prototype.createCube = function () {
                    var cube = new Cube_1.Cube(this.autowired);
                    this.cubes.push(cube);
                };
                CubeManager.prototype.update = function (delta) {
                    //probability approaches 1 as this.numberOfUpdates approaches a
                    var probability = this.numberOfUpdates / (this.numberOfUpdates + this.a);
                    if (Math.random() < probability * delta) {
                        this.createCube();
                    }
                    if (Math.random() < this.currentOrder.probabilityOfChange * delta) {
                        this.currentOrder = this.randomCubeOrder();
                    }
                    for (var _i = 0, _a = this.cubes; _i < _a.length; _i++) {
                        var cube = _a[_i];
                        cube.update(this.currentOrder, delta);
                    }
                    this.numberOfUpdates++;
                };
                CubeManager.prototype.randomCubeOrder = function () {
                    var chosenNumber = Math.floor(Math.random() * 6);
                    var orderArray = [CubeOrder.randomDirection, CubeOrder.hitPlayer, CubeOrder.posX, CubeOrder.negX, CubeOrder.posZ, CubeOrder.negX];
                    return orderArray[chosenNumber];
                };
                CubeManager.prototype.removeCube = function (mesh) {
                    var badCubeIndex = -1;
                    for (var i = 0; i < this.cubes.length; i++) {
                        if (mesh == this.cubes[i].threeCube) {
                            badCubeIndex = i;
                        }
                    }
                    if (badCubeIndex != -1) {
                        this.autowired.scoreboard.addScore();
                        this.cubes[badCubeIndex].destroy();
                        this.cubes.splice(badCubeIndex, 1);
                        this.playDestroySound();
                    }
                };
                CubeManager.prototype.playDestroySound = function () {
                    beeplay().play(['C#4', 'C#5', 'C#6', 'C#7'], 1 / 2);
                };
                return CubeManager;
            }());
            exports_4("CubeManager", CubeManager);
        }
    }
});
System.register("FirstPersonControls", ["Room"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Room_2;
    var FirstPersonControls;
    return {
        setters: [
            function (Room_2_1) {
                Room_2 = Room_2_1;
            }],
        execute: function () {
            /**
             * @author mrdoob / http://mrdoob.com/
             * @author alteredq / http://alteredqualia.com/
             * @author paulirish / http://paulirish.com/
             */
            //Modified by Lucas Knutson
            FirstPersonControls = (function () {
                function FirstPersonControls(autowired, domElement) {
                    var _this = this;
                    this.mass = 1.5;
                    this.radius = 0.3;
                    this.target = new THREE.Vector3(0, 0, 0);
                    this.movementSpeed = 1.0;
                    this.lookSpeed = 0.05;
                    this.autoForward = false;
                    this.moveForward = false;
                    this.moveBackward = false;
                    this.moveLeft = false;
                    this.moveRight = false;
                    this.jump = false;
                    this.framesBeforeHideLazer = -100;
                    this.laserBeams = [];
                    this.onMouseDown = function (event) {
                        if (_this.domElement !== document) {
                            _this.domElement.focus();
                        }
                        event.preventDefault();
                        event.stopPropagation();
                        if (!_this.autowired.isGameOver) {
                            _this.shoot();
                        }
                    };
                    this.onMouseUp = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    };
                    this.shouldUpdate = function () {
                        return !_this.autowired.isGameOver;
                    };
                    this.onMouseMove = function (event) {
                        if (_this.shouldUpdate()) {
                            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
                            var PI_2 = Math.PI / 2;
                            _this.yawObject.rotation.y -= movementX * 0.002;
                            _this.pitchObject.rotation.x -= movementY * 0.002;
                            _this.pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, _this.pitchObject.rotation.x));
                        }
                    };
                    this.onKeyDown = function (event) {
                        switch (event.keyCode) {
                            case 38: /*up*/
                            case 87:
                                _this.moveForward = true;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case 37: /*left*/
                            case 65:
                                _this.moveLeft = true;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case 40: /*down*/
                            case 83:
                                _this.moveBackward = true;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case 39: /*right*/
                            case 68:
                                _this.moveRight = true;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case 32:
                                _this.jump = true;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                        }
                    };
                    this.onKeyUp = function (event) {
                        switch (event.keyCode) {
                            case 38: /*up*/
                            case 87:
                                _this.moveForward = false;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case 37: /*left*/
                            case 65:
                                _this.moveLeft = false;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case 40: /*down*/
                            case 83:
                                _this.moveBackward = false;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case 39: /*right*/
                            case 68:
                                _this.moveRight = false;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case 32:
                                _this.jump = false;
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                        }
                    };
                    this.update = function (delta) {
                        var actualMoveSpeed = 0;
                        if (_this.shouldUpdate()) {
                            for (var _i = 0, _a = _this.laserBeams; _i < _a.length; _i++) {
                                var laserbeam = _a[_i];
                                laserbeam.visible = (_this.framesBeforeHideLazer > 0);
                            }
                            _this.framesBeforeHideLazer--;
                            actualMoveSpeed = delta * _this.movementSpeed * 50;
                            var movementImpulse = new THREE.Vector3();
                            if (_this.moveForward)
                                movementImpulse.z -= actualMoveSpeed;
                            if (_this.moveBackward)
                                movementImpulse.z += actualMoveSpeed;
                            if (_this.moveLeft)
                                movementImpulse.x -= actualMoveSpeed;
                            if (_this.moveRight)
                                movementImpulse.x += actualMoveSpeed;
                            if (_this.canJump() && _this.jump)
                                movementImpulse.y += actualMoveSpeed * 2;
                            movementImpulse = movementImpulse.multiplyScalar(_this.mass * 0.2);
                            var quat = new THREE.Quaternion();
                            quat.setFromEuler(new THREE.Euler(_this.pitchObject.rotation.x, _this.yawObject.rotation.y, 0, "XYZ"));
                            movementImpulse.applyQuaternion(quat);
                            _this.physics.applyImpulse(new CANNON.Vec3(movementImpulse.x, movementImpulse.y, movementImpulse.z), new CANNON.Vec3());
                        }
                        _this.yawObject.position.set(_this.physics.position.x, _this.physics.position.y, _this.physics.position.z);
                        var cameraQuat = _this.autowired.camera.getWorldQuaternion();
                        var laserOffsetQuat = new THREE.Quaternion();
                        laserOffsetQuat.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
                        for (var _b = 0, _c = _this.laserBeams; _b < _c.length; _b++) {
                            var laserbeam = _c[_b];
                            var position = _this.pitchObject.localToWorld(new THREE.Vector3(0, -0.2, 0));
                            laserbeam.position.set(position.x, position.y, position.z);
                            laserbeam.setRotationFromQuaternion(cameraQuat.multiply(laserOffsetQuat));
                        }
                    };
                    this.autowired = autowired;
                    this.pitchObject = new THREE.Object3D();
                    this.pitchObject.add(this.autowired.camera);
                    this.yawObject = new THREE.Object3D();
                    this.yawObject.add(this.pitchObject);
                    this.physics = new CANNON.Body({
                        mass: this.mass,
                        position: new CANNON.Vec3(0, 5, 0),
                        shape: new CANNON.Sphere(this.radius),
                        material: this.autowired.myMaterials.playerMaterial,
                        linearDamping: 0.9,
                        angularDamping: 0.9
                    });
                    var levelsOfLazer = 40;
                    for (var i = 1; i <= levelsOfLazer; i++) {
                        //inner to outer
                        var radius = 0.0005 * i;
                        var geometry = new THREE.CylinderGeometry(radius, radius, 1000);
                        var material = new THREE.MeshLambertMaterial({
                            color: 0xFF0000,
                            transparent: true,
                            opacity: 0.1,
                        });
                        var laserBeam = new THREE.Mesh(geometry, material);
                        laserBeam.visible = false;
                        this.autowired.glowScene.add(laserBeam);
                        this.laserBeams.push(laserBeam);
                    }
                    this.domElement = (domElement !== undefined) ? domElement : document;
                    this.domElement.addEventListener('contextmenu', function (event) {
                        event.preventDefault();
                    }, false);
                    document.addEventListener('mousemove', bind(this, this.onMouseMove), false);
                    document.addEventListener('mousedown', bind(this, this.onMouseDown), false);
                    document.addEventListener('mouseup', bind(this, this.onMouseUp), false);
                    document.addEventListener('keydown', bind(this, this.onKeyDown), false);
                    document.addEventListener('keyup', bind(this, this.onKeyUp), false);
                    function bind(scope, fn) {
                        return function () {
                            fn.apply(scope, arguments);
                        };
                    }
                    ;
                }
                FirstPersonControls.prototype.shoot = function () {
                    if (this.framesBeforeHideLazer < -10) {
                        var raycaster = new THREE.Raycaster();
                        raycaster.set(this.autowired.camera.getWorldPosition(), this.autowired.camera.getWorldDirection());
                        var intersections = raycaster.intersectObjects(this.autowired.scene.children);
                        for (var _i = 0, intersections_1 = intersections; _i < intersections_1.length; _i++) {
                            var intersection = intersections_1[_i];
                            this.autowired.cubeManager.removeCube(intersection.object);
                        }
                        this.playShootSound();
                        this.framesBeforeHideLazer = 6;
                    }
                };
                FirstPersonControls.prototype.playShootSound = function () {
                    beeplay().play('C#4', 1 / 2);
                };
                FirstPersonControls.prototype.canJump = function () {
                    var tolerance = 0.1;
                    var mustBeCloserThan = this.radius + tolerance;
                    var raycaster = new THREE.Raycaster();
                    raycaster.set(this.autowired.camera.getWorldPosition(), new THREE.Vector3(0, -1, 0));
                    var intersections = raycaster.intersectObjects(this.autowired.scene.children);
                    for (var _i = 0, intersections_2 = intersections; _i < intersections_2.length; _i++) {
                        var intersection = intersections_2[_i];
                        if (intersection.distance < mustBeCloserThan) {
                            return true;
                        }
                    }
                    return false;
                };
                FirstPersonControls.prototype.getDistanceToWall = function () {
                    var returnValue = 1000;
                    var roomExtent = Room_2.Room.blockSize / 2;
                    var myRadius = this.radius;
                    var position = this.yawObject.position;
                    var x = Math.abs(position.x);
                    var z = Math.abs(position.z);
                    returnValue = Math.min(returnValue, roomExtent - (x + myRadius));
                    returnValue = Math.min(returnValue, roomExtent - (z + myRadius));
                    return returnValue;
                };
                FirstPersonControls.prototype.getMaxDistToWall = function () {
                    var myRadius = this.radius;
                    var roomExtent = Room_2.Room.blockSize / 2;
                    return roomExtent - myRadius;
                };
                FirstPersonControls.prototype.getObject = function () {
                    return this.yawObject;
                };
                ;
                return FirstPersonControls;
            }());
            exports_5("FirstPersonControls", FirstPersonControls);
        }
    }
});
System.register("CrossHair", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var CrossHair;
    return {
        setters: [],
        execute: function () {
            //http://stackoverflow.com/questions/31655888/how-to-cast-a-visible-ray-threejs
            CrossHair = (function () {
                function CrossHair(autowired) {
                    this.autowired = autowired;
                    var material = new THREE.LineBasicMaterial({color: 0xAAFFAA});
                    // crosshair size
                    var x = 0.01;
                    var y = 0.01;
                    var geometry = new THREE.Geometry();
                    // crosshair
                    geometry.vertices.push(new THREE.Vector3(0, y, 0));
                    geometry.vertices.push(new THREE.Vector3(0, -y, 0));
                    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
                    geometry.vertices.push(new THREE.Vector3(x, 0, 0));
                    geometry.vertices.push(new THREE.Vector3(-x, 0, 0));
                    var mesh = new THREE.Line(geometry, material);
                    // place it in the center
                    var crosshairPercentX = 50;
                    var crosshairPercentY = 50;
                    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
                    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
                    mesh.position.x = crosshairPositionX * (autowired.camera.aspect);
                    mesh.position.y = crosshairPositionY;
                    mesh.position.z = -0.5;
                    this.autowired.camera.add(mesh);
                }
                return CrossHair;
            }());
            exports_6("CrossHair", CrossHair);
        }
    }
});
System.register("Scoreboard", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Scoreboard;
    return {
        setters: [],
        execute: function () {
            //http://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
            Scoreboard = (function () {
                function Scoreboard() {
                    this.score = 0;
                    this.highscore = 0;
                    var element = document.body;
                    this.scoreDiv = document.createElement('div');
                    this.scoreDiv.style.position = 'absolute';
                    this.scoreDiv.style.color = "#ffa500";
                    this.scoreDiv.innerHTML = "";
                    this.scoreDiv.style.top = '50px';
                    this.scoreDiv.style.left = '50px';
                    this.scoreDiv.style.fontSize = "100px";
                    element.appendChild(this.scoreDiv);
                    this.distanceToWallDiv = document.createElement('div');
                    this.distanceToWallDiv.style.position = 'absolute';
                    this.distanceToWallDiv.style.color = "#ffa500";
                    this.distanceToWallDiv.innerHTML = "";
                    this.distanceToWallDiv.style.top = '150px';
                    this.distanceToWallDiv.style.left = '50px';
                    this.distanceToWallDiv.style.fontSize = "25px";
                    element.appendChild(this.distanceToWallDiv);
                    this.highscoreDiv = document.createElement('div');
                    this.highscoreDiv.style.position = 'absolute';
                    this.highscoreDiv.style.color = "#ffa500";
                    this.highscoreDiv.innerHTML = "";
                    this.highscoreDiv.style.top = '175px';
                    this.highscoreDiv.style.left = '50px';
                    this.highscoreDiv.style.fontSize = "25px";
                    element.appendChild(this.highscoreDiv);
                    this.helpTextDiv = document.createElement('div');
                    this.helpTextDiv.style.position = 'absolute';
                    this.helpTextDiv.style.color = "#ffa500";
                    this.helpTextDiv.innerHTML = 'Press R To Try Again';
                    this.helpTextDiv.style.display = "none";
                    this.helpTextDiv.style.fontSize = "50px";
                    this.helpTextDiv.style.top = "50%";
                    this.helpTextDiv.style.left = "50%";
                    this.helpTextDiv.style.marginTop = "-50px";
                    this.helpTextDiv.style.marginLeft = "-200px";
                    this.helpTextDiv.style.width = "400px";
                    this.helpTextDiv.style.height = "100px";
                    this.helpTextDiv.style.textAlign = "center";
                    this.helpTextDiv.style.verticalAlign = "middle";
                    element.appendChild(this.helpTextDiv);
                    this.distanceToWallProgressBar = document.createElement('div');
                    this.distanceToWallProgressBar.style.position = 'absolute';
                    this.distanceToWallProgressBar.innerText = "WALL PROXIMITY";
                    this.distanceToWallProgressBar.style.top = "80%";
                    this.distanceToWallProgressBar.style.left = "35%";
                    this.distanceToWallProgressBar.style.width = "30%";
                    this.distanceToWallProgressBar.style.fontSize = "30px";
                    this.distanceToWallProgressBar.style.textAlign = "center";
                    this.distanceToWallProgressBar.style.fontStyle = "bold";
                    element.appendChild(this.distanceToWallProgressBar);
                }
                Scoreboard.prototype.addScore = function () {
                    this.score++;
                    this.highscore = Math.max(this.score, this.highscore);
                };
                Scoreboard.prototype.reset = function () {
                    this.score = 0;
                };
                Scoreboard.prototype.update = function () {
                    this.scoreDiv.innerText = this.score.toFixed(0);
                    var distanceToWall = Math.max(this.autowired.firstPersonControls.getDistanceToWall(), 0.0001);
                    distanceToWall = (this.autowired.isGameOver) ? 0 : distanceToWall;
                    this.distanceToWallDiv.innerText = "DISTANCE TO WALL: " + distanceToWall.toFixed(2);
                    this.highscoreDiv.innerText = "HIGHSCORE: " + this.highscore.toFixed(0);
                    var progressBarValue = Math.round((1 - distanceToWall / this.autowired.firstPersonControls.getMaxDistToWall()) * 100);
                    var progressBarColor;
                    if (progressBarValue < 50) {
                        progressBarColor = "green";
                    }
                    else if (progressBarValue < 80) {
                        progressBarColor = "yellow";
                    }
                    else {
                        progressBarColor = "red";
                    }
                    this.distanceToWallProgressBar.style.color = progressBarColor;
                    this.helpTextDiv.style.display = (this.autowired.isGameOver) ? "initial" : "none";
                };
                return Scoreboard;
            }());
            exports_7("Scoreboard", Scoreboard);
        }
    }
});
System.register("Autowired", ["MyMaterials", "CubeManager", "FirstPersonControls", "Room", "CrossHair"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var MyMaterials_1, CubeManager_1, FirstPersonControls_1, Room_3, CrossHair_1;
    var PCFSoftShadowMap, Autowired;
    return {
        setters: [
            function (MyMaterials_1_1) {
                MyMaterials_1 = MyMaterials_1_1;
            },
            function (CubeManager_1_1) {
                CubeManager_1 = CubeManager_1_1;
            },
            function (FirstPersonControls_1_1) {
                FirstPersonControls_1 = FirstPersonControls_1_1;
            },
            function (Room_3_1) {
                Room_3 = Room_3_1;
            },
            function (CrossHair_1_1) {
                CrossHair_1 = CrossHair_1_1;
            }],
        execute: function () {
            PCFSoftShadowMap = THREE.PCFSoftShadowMap;
            Autowired = (function () {
                function Autowired(scoreboard) {
                    var _this = this;
                    this.scoreboard = scoreboard;
                    this.scoreboard.autowired = this;
                    this.isGameOver = false;
                    this.canvasElement = $("#myCanvas");
                    var VIEW_ANGLE = 75;
                    var NEAR = 0.1;
                    var FAR = 100;
                    this.canvasElement.get(0).addEventListener('click', function (event) {
                        var el = document.documentElement;
                        var rfs = document.body.requestFullscreen || document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen;
                        rfs.call(el);
                        var rpl = document.body.requestPointerLock || document.body.mozRequestPointerLock;
                        rpl.call(el);
                    }, false);
                    window.addEventListener('resize', function (event) {
                        _this.camera.aspect = window.innerWidth / window.innerHeight;
                        _this.camera.updateMatrix();
                        _this.renderer.setSize(window.innerWidth, window.innerHeight);
                    });
                    document.addEventListener("fullscreenchange", function (event) {
                        _this.camera.aspect = window.innerWidth / window.innerHeight;
                        _this.camera.updateMatrix();
                        _this.renderer.setSize(window.innerWidth, window.innerHeight);
                    });
                    this.renderer = new THREE.WebGLRenderer({
                        canvas: this.canvasElement.get(0),
                        antialias: true,
                        precision: "highp"
                    });
                    this.renderer.autoClear = false;
                    this.renderer.shadowMap.enabled = true;
                    this.renderer.shadowMap.type = PCFSoftShadowMap;
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, window.innerWidth / window.innerHeight, NEAR, FAR);
                    this.scene = new THREE.Scene();
                    var light = new THREE.PointLight(0xFFFFFF, 0.5, 30);
                    light.position.set(0, 0, 0);
                    this.scene.add(light);
                    this.scene.add(new THREE.AmbientLight(0x404040));
                    this.glowScene = new THREE.Scene();
                    this.glowScene.add(new THREE.AmbientLight(0xFFFFFF));
                    var dirLight = new THREE.PointLight(0xffffff, 1);
                    this.camera.add(dirLight);
                    this.glowScene.add(dirLight);
                    this.world = new CANNON.World();
                    this.world.gravity.set(0, -10, 0); // m/s²
                    this.myMaterials = new MyMaterials_1.MyMaterials(this);
                    this.cubeManager = new CubeManager_1.CubeManager(this);
                    this.room = new Room_3.Room(this);
                    this.firstPersonControls = new FirstPersonControls_1.FirstPersonControls(this, document);
                    this.scene.add(this.firstPersonControls.getObject());
                    this.world.addBody(this.firstPersonControls.physics);
                    this.crossHair = new CrossHair_1.CrossHair(this);
                }
                return Autowired;
            }());
            exports_8("Autowired", Autowired);
        }
    }
});
var CubeOrder = (function () {
    function CubeOrder(name, probabilityOfChange) {
        this.name = name;
        this.probabilityOfChange = probabilityOfChange;
    }
    CubeOrder.randomDirection = new CubeOrder("randomDirection", 0.005);
    CubeOrder.hitPlayer = new CubeOrder("hitPlayer", 0.0005);
    CubeOrder.posX = new CubeOrder("posX", 0.005);
    CubeOrder.negX = new CubeOrder("negX", 0.005);
    CubeOrder.posZ = new CubeOrder("posZ", 0.005);
    CubeOrder.negZ = new CubeOrder("negZ", 0.005);
    return CubeOrder;
}());
/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="definitions/cannon.d.ts" />
System.register("Main", ["Autowired", "Scoreboard"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Autowired_1, Scoreboard_1;
    var ShadowMapType, PCFSoftShadowMap, Main, main;
    return {
        setters: [
            function (Autowired_1_1) {
                Autowired_1 = Autowired_1_1;
            },
            function (Scoreboard_1_1) {
                Scoreboard_1 = Scoreboard_1_1;
            }],
        execute: function () {
            Main = (function () {
                function Main() {
                    var _this = this;
                    this.fixedTimeStep = 1.0 / 60.0; // seconds
                    this.timeStepSubdivisions = 10;
                    this.reset = function () {
                        _this.scoreboard = (_this.scoreboard == null) ? new Scoreboard_1.Scoreboard() : _this.scoreboard;
                        _this.scoreboard.reset();
                        _this.autowired = new Autowired_1.Autowired(_this.scoreboard);
                    };
                    this.render = function () {
                        requestAnimationFrame(_this.render);
                        if (!_this.autowired.isGameOver) {
                            for (var i = 0; i < _this.timeStepSubdivisions; i++) {
                                _this.autowired.world.step(_this.fixedTimeStep / _this.timeStepSubdivisions);
                                _this.autowired.cubeManager.update(1 / _this.timeStepSubdivisions);
                            }
                            _this.autowired.room.update();
                            _this.autowired.firstPersonControls.update(_this.fixedTimeStep);
                            if (!_this.autowired.isGameOver && _this.autowired.firstPersonControls.getDistanceToWall() < 0.045) {
                                _this.autowired.isGameOver = true;
                                _this.playGameOverSound();
                            }
                        }
                        _this.autowired.scoreboard.update();
                        _this.autowired.renderer.clear();
                        _this.autowired.renderer.render(_this.autowired.scene, _this.autowired.camera);
                        _this.autowired.renderer.clearDepth();
                        _this.autowired.renderer.render(_this.autowired.glowScene, _this.autowired.camera);
                    };
                    document.addEventListener('keydown', function (event) {
                        if (event.keyCode == 82) {
                            _this.reset();
                        }
                    }, false);
                    this.reset();
                }
                Main.prototype.playGameOverSound = function () {
                    beeplay()
                        .play(['C#7', 'E#7', 'G#7'], 2);
                };
                return Main;
            }());
            main = new Main();
            main.render();
        }
    }
});
var Util = (function () {
    function Util() {
    }
    Util.copyPhysicsTo = function (physics, mesh) {
        var position = physics.position;
        mesh.position.set(position.x, position.y, position.z);
        var quaternion = physics.quaternion;
        mesh.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    };
    return Util;
}());
//# sourceMappingURL=bundle.js.map