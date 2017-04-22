System.register("TileType", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TileType;
    return {
        setters:[],
        execute: function() {
            TileType = (function () {
                function TileType(name, color) {
                    this.name = name;
                    this.color = color;
                }
                TileType.plains = new TileType("plains", 0xC0FF6D);
                TileType.woods = new TileType("woods", 0x228B22);
                TileType.mountains = new TileType("mountains", 0x968D99);
                TileType.sea = new TileType("sea", 0x006994);
                TileType.desert = new TileType("desert", 0xEDC9AF);
                TileType.gold = new TileType("gold", 0xFFDF00);
                TileType.diamond = new TileType("diamond", 0x9AC5DB);
                TileType.allTileTypes = [TileType.plains, TileType.woods, TileType.mountains, TileType.sea, TileType.desert];
                return TileType;
            }());
            exports_1("TileType", TileType);
        }
    }
});
System.register("World", ["TileType"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var TileType_1;
    var Vector2, World;
    return {
        setters:[
            function (TileType_1_1) {
                TileType_1 = TileType_1_1;
            }],
        execute: function() {
            Vector2 = THREE.Vector2;
            World = (function () {
                function World(autowired) {
                    var _this = this;
                    this.map = {};
                    this.setMap = function (xUnrounded, yUnrounded, t, canApplyTo) {
                        var x = Math.round(xUnrounded);
                        var y = Math.round(yUnrounded);
                        var withinBounds = x >= 0 && x < _this.autowired.WIDTH && y >= 0 && y < _this.autowired.HEIGHT;
                        if (withinBounds) {
                            var existingType = _this.map[x][y];
                            var canBeApplied = _.contains(canApplyTo, existingType);
                            if (canBeApplied) {
                                _this.map[x][y] = t;
                            }
                        }
                    };
                    this.generatePlane = function () {
                        for (var i = 0; i < _this.autowired.WIDTH; i++) {
                            _this.map[i] = {};
                            for (var j = 0; j < _this.autowired.HEIGHT; j++) {
                                _this.map[i][j] = TileType_1.TileType.plains;
                            }
                        }
                    };
                    this.generate = function (numberOfIterations, radiusMax, radiusMin, directionScalar, shuffleIterations, edgeTendancy, movementScalar, t, canApplyTo) {
                        var position = _this.randomSpotAlongEdge();
                        var radius;
                        var direction = _this.randomDirection(directionScalar);
                        for (var zzz = 0; zzz < numberOfIterations; zzz++) {
                            if (zzz % shuffleIterations == 0) {
                                direction = _this.randomDirection(directionScalar);
                                var diff = radiusMax - radiusMin;
                                radius = Math.random() * diff + radiusMin;
                                if (Math.random() < (1 - edgeTendancy)) {
                                    position = _this.randomSpot();
                                }
                                else {
                                    position = _this.randomSpotAlongEdge();
                                }
                            }
                            position.x += (Math.random() * 5 - 2.5 + direction.x) * movementScalar;
                            position.y += (Math.random() * 5 - 2.5 + direction.y) * movementScalar;
                            if (position.y < 0 || position.y >= _this.autowired.HEIGHT || position.x < 0 || position.x >= _this.autowired.WIDTH) {
                                if (Math.random() < (1 - edgeTendancy)) {
                                    position = _this.randomSpot();
                                }
                                else {
                                    position = _this.randomSpotAlongEdge();
                                }
                            }
                            for (var i = 0; i < radius * 2; i++) {
                                for (var j = 0; j < radius * 2; j++) {
                                    var iCentered = i - radius;
                                    var jCentered = j - radius;
                                    var point = new Vector2(iCentered + position.x, jCentered + position.y);
                                    if (new Vector2(iCentered, jCentered).length() < radius) {
                                        _this.setMap(point.x, point.y, t, canApplyTo);
                                    }
                                }
                            }
                        }
                    };
                    this.autowired = autowired;
                    this.generatePlane();
                    this.generate(500, 7, 2, 0.5, 50, 0.25, 1.0, TileType_1.TileType.woods, [TileType_1.TileType.plains]);
                    this.generate(500, 3, 2, 1.0, 150, 0.5, 1.0, TileType_1.TileType.sea, [TileType_1.TileType.plains]);
                    this.generate(500, 3, 2, 0.0, 250, 0.0, 0.3, TileType_1.TileType.desert, [TileType_1.TileType.plains]);
                    this.generate(500, 4, 4, 0.0, 100, 0.0, 0.3, TileType_1.TileType.mountains, [TileType_1.TileType.woods]);
                    this.generate(500, 1, 1, 0.0, 40, 0.0, 0.0, TileType_1.TileType.gold, [TileType_1.TileType.plains, TileType_1.TileType.woods]);
                    this.generate(500, 1, 1, 0.0, 80, 0.0, 0.0, TileType_1.TileType.diamond, [TileType_1.TileType.plains, TileType_1.TileType.woods]);
                    for (var i = 0; i < this.autowired.WIDTH; i++) {
                        for (var j = 0; j < this.autowired.HEIGHT; j++) {
                            var tileType = this.map[i][j];
                            var geometry = new THREE.PlaneGeometry(8, 8);
                            var material = new THREE.MeshBasicMaterial({ color: tileType.color, side: THREE.DoubleSide });
                            var plane = new THREE.Mesh(geometry, material);
                            plane.receiveShadow = true;
                            plane.rotateX(Math.PI);
                            plane.position.set(i * 10, j * 10, 0);
                            this.autowired.scene.add(plane);
                        }
                    }
                }
                World.prototype.randomSpot = function () {
                    return new THREE.Vector2(Math.random() * this.autowired.WIDTH, Math.random() * this.autowired.HEIGHT);
                };
                ;
                World.prototype.randomSpotAlongEdge = function () {
                    if (Math.random() < 0.5) {
                        var xEdge = Math.round(Math.random()) * this.autowired.WIDTH;
                        return new THREE.Vector2(xEdge, Math.random() * this.autowired.HEIGHT);
                    }
                    else {
                        var yEdge = Math.round(Math.random()) * this.autowired.HEIGHT;
                        return new THREE.Vector2(Math.random() * this.autowired.WIDTH, yEdge);
                    }
                };
                ;
                World.prototype.randomDirection = function (scalar) {
                    return new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(scalar);
                };
                ;
                return World;
            }());
            exports_2("World", World);
        }
    }
});
System.register("Autowired", ["World"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var World_1;
    var ShadowMapType, PCFSoftShadowMap, Autowired;
    return {
        setters:[
            function (World_1_1) {
                World_1 = World_1_1;
            }],
        execute: function() {
            PCFSoftShadowMap = THREE.PCFSoftShadowMap;
            Autowired = (function () {
                function Autowired() {
                    this.WIDTH = 100;
                    this.HEIGHT = 100;
                    this.isGameOver = false;
                    this.canvasElement = $("#myCanvas");
                    var VIEW_ANGLE = 75;
                    var NEAR = 0.1;
                    var FAR = 1000;
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
                    this.camera.position.set(0, 0, 500);
                    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                    this.camera.position.set(500, 500, 700);
                    this.scene = new THREE.Scene();
                    var light = new THREE.PointLight(0xFFFFFF, 0.5, 10000);
                    light.position.set(0, 0, 0);
                    this.scene.add(light);
                    this.scene.add(new THREE.AmbientLight(0x404040));
                    this.glowScene = new THREE.Scene();
                    this.glowScene.add(new THREE.AmbientLight(0xFFFFFF));
                    var dirLight = new THREE.PointLight(0xffffff, 1);
                    this.camera.add(dirLight);
                    this.glowScene.add(dirLight);
                    this.world = new World_1.World(this);
                }
                return Autowired;
            }());
            exports_3("Autowired", Autowired);
        }
    }
});
System.register("Cube", ["./Room"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Room_1;
    var Cube;
    return {
        setters:[
            function (Room_1_1) {
                Room_1 = Room_1_1;
            }],
        execute: function() {
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
            exports_4("Cube", Cube);
        }
    }
});
System.register("Room", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Room;
    return {
        setters:[],
        execute: function() {
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
                    if (width === void 0) { width = Room.blockSize; }
                    if (height === void 0) { height = Room.blockSize; }
                    if (depth === void 0) { depth = Room.blockSize; }
                    var geometry = new THREE.BoxGeometry(width, height, depth);
                    var material = new THREE.MeshStandardMaterial({
                        color: "blue"
                    });
                    var mesh = new THREE.Mesh(geometry, material);
                    return mesh;
                };
                Room.prototype.createCubeThreeFloor = function (width, height, depth) {
                    if (width === void 0) { width = Room.blockSize; }
                    if (height === void 0) { height = Room.blockSize; }
                    if (depth === void 0) { depth = Room.blockSize; }
                    var geometry = new THREE.BoxGeometry(width, height, depth);
                    var material = new THREE.MeshBasicMaterial({
                        color: "gray"
                    });
                    var mesh = new THREE.Mesh(geometry, material);
                    return mesh;
                };
                Room.prototype.createCubePhysics = function (width, height, depth) {
                    if (width === void 0) { width = Room.blockSize; }
                    if (height === void 0) { height = Room.blockSize; }
                    if (depth === void 0) { depth = Room.blockSize; }
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
            exports_5("Room", Room);
        }
    }
});
/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="definitions/underscore.d.ts" />
System.register("Main", ["Autowired"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Autowired_1;
    var Main, main;
    return {
        setters:[
            function (Autowired_1_1) {
                Autowired_1 = Autowired_1_1;
            }],
        execute: function() {
            Main = (function () {
                function Main() {
                    var _this = this;
                    this.render = function () {
                        requestAnimationFrame(_this.render);
                        _this.autowired.renderer.clear();
                        _this.autowired.renderer.render(_this.autowired.scene, _this.autowired.camera);
                        //this.autowired.renderer.clearDepth();
                        //this.autowired.renderer.render(this.autowired.glowScene, this.autowired.camera);
                    };
                    this.autowired = new Autowired_1.Autowired();
                }
                return Main;
            }());
            main = new Main();
            main.render();
        }
    }
});
//# sourceMappingURL=bundle.js.map