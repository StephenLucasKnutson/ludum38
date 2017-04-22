System.register("TileType", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TileType;
    return {
        setters:[],
        execute: function() {
            TileType = (function () {
                function TileType(name, color, goldPerTurn, tendencyToEnter, tendencyToLeave, chanceToSpawn) {
                    this.name = name;
                    this.color = color;
                    this.goldPerTurn = goldPerTurn;
                    this.tendencyToEnter = tendencyToEnter;
                    this.tendencyToLeave = tendencyToLeave;
                    this.chanceToSpawn = chanceToSpawn;
                    this.material = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.BackSide });
                }
                TileType.plains = new TileType("plains", 0xC0FF6D, 1, 0.5, 0.2, 0);
                TileType.woods = new TileType("woods", 0x228B22, 2, 0.25, 0.21, 0);
                TileType.mountains = new TileType("mountains", 0x968D99, 3, 0.1, 0.1, 0);
                TileType.sea = new TileType("sea", 0x006994, 1, 0.01, 0.01, 0);
                TileType.desert = new TileType("desert", 0xEDC9AF, 0, 0.01, 0.01, 0);
                TileType.gold = new TileType("gold", 0xFFDF00, 10, 0.01, 0.0, 0);
                TileType.diamond = new TileType("diamond", 0x9AC5DB, 20, 0.01, 0.0, 0);
                TileType.townHall1 = new TileType("townHall1", 0x000000, 10, 0.01, 0.0, 0.01);
                return TileType;
            }());
            exports_1("TileType", TileType);
        }
    }
});
System.register("Player", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Vector2, nextPowerOfTwo, Player;
    return {
        setters:[],
        execute: function() {
            Player = (function () {
                function Player() {
                    this.gold = 0;
                    this.attack = 0.01;
                    this.defense = 1.0;
                    if (Player.nextPlayerColorIndex == Player.allPlayerColors.length) {
                        throw new Error('Ran out of colors');
                    }
                    this.color = Player.allPlayerColors[Player.nextPlayerColorIndex++];
                    this.material = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.BackSide });
                }
                Player.nextPlayerColorIndex = 0;
                Player.allPlayerColors = [0xFF0000, 0x0000FF, 0xFFA500, 0x00FF00, 0xD2691E];
                return Player;
            }());
            exports_2("Player", Player);
        }
    }
});
System.register("WorldBlock", ["World"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var World_1;
    var Vector2, WorldBlock;
    return {
        setters:[
            function (World_1_1) {
                World_1 = World_1_1;
            }],
        execute: function() {
            WorldBlock = (function () {
                function WorldBlock() {
                }
                WorldBlock.prototype.setOwningPlayer = function (newOwningPlayer) {
                    this.owningPlayer = newOwningPlayer;
                    if (newOwningPlayer) {
                        this.backgroundMesh.material = newOwningPlayer.material;
                    }
                    else {
                        this.backgroundMesh.material = World_1.World.backgroundMaterial;
                    }
                };
                WorldBlock.prototype.setTileType = function (newTileType) {
                    this.tileType = newTileType;
                    this.tileMesh.material = newTileType.material;
                };
                return WorldBlock;
            }());
            exports_3("WorldBlock", WorldBlock);
        }
    }
});
System.register("World", ["TileType", "WorldBlock"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var TileType_1, WorldBlock_1;
    var Vector2, World;
    return {
        setters:[
            function (TileType_1_1) {
                TileType_1 = TileType_1_1;
            },
            function (WorldBlock_1_1) {
                WorldBlock_1 = WorldBlock_1_1;
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
                        if (_this.isWithinBounds(x, y)) {
                            var existingType = _this.map[x][y].tileType;
                            var canBeApplied = _.contains(canApplyTo, existingType);
                            if (canBeApplied) {
                                _this.map[x][y].tileType = t;
                            }
                        }
                    };
                    this.setMapOwner = function (xUnrounded, yUnrounded, player) {
                        var x = Math.round(xUnrounded);
                        var y = Math.round(yUnrounded);
                        if (_this.isWithinBounds(x, y)) {
                            var worldBlock = _this.map[x][y];
                        }
                    };
                    this.generatePlane = function () {
                        for (var i = 0; i < _this.autowired.WIDTH; i++) {
                            _this.map[i] = {};
                            for (var j = 0; j < _this.autowired.HEIGHT; j++) {
                                _this.map[i][j] = new WorldBlock_1.WorldBlock();
                                _this.map[i][j].tileType = TileType_1.TileType.plains;
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
                    this.generate(700, 3, 2, 1.0, 150, 0.25, 1.0, TileType_1.TileType.sea, [TileType_1.TileType.plains]);
                    this.generate(500, 3, 2, 0.0, 250, 0.0, 0.3, TileType_1.TileType.desert, [TileType_1.TileType.plains]);
                    this.generate(500, 4, 4, 0.0, 100, 0.0, 0.3, TileType_1.TileType.mountains, [TileType_1.TileType.woods]);
                    this.generate(500, 1, 1, 0.0, 40, 0.0, 0.0, TileType_1.TileType.gold, [TileType_1.TileType.plains, TileType_1.TileType.woods]);
                    this.generate(500, 1, 1, 0.0, 80, 0.0, 0.0, TileType_1.TileType.diamond, [TileType_1.TileType.plains, TileType_1.TileType.woods]);
                    var geometry = new THREE.PlaneGeometry(8, 8);
                    var backgroundGeometry = new THREE.PlaneGeometry(10, 10);
                    for (var i = 0; i < this.autowired.WIDTH; i++) {
                        for (var j = 0; j < this.autowired.HEIGHT; j++) {
                            var tileType = this.map[i][j].tileType;
                            var plane = new THREE.Mesh(geometry, tileType.material);
                            plane.rotateX(Math.PI);
                            plane.position.set(i * 10, j * 10, 0);
                            this.autowired.scene.add(plane);
                            this.map[i][j].tileMesh = plane;
                            var backgroundPlane = new THREE.Mesh(backgroundGeometry, World.backgroundMaterial);
                            backgroundPlane.rotateX(Math.PI);
                            backgroundPlane.position.set(i * 10, j * 10, -1);
                            this.autowired.scene.add(backgroundPlane);
                            this.map[i][j].backgroundMesh = backgroundPlane;
                        }
                    }
                }
                World.prototype.isWithinBounds = function (x, y) {
                    return x >= 0 && x < this.autowired.WIDTH && y >= 0 && y < this.autowired.HEIGHT;
                };
                World.prototype.randomSpot = function () {
                    return new THREE.Vector2(Math.round(Math.random() * this.autowired.WIDTH), Math.round(Math.random() * this.autowired.HEIGHT));
                };
                ;
                World.prototype.randomSpotAlongEdge = function () {
                    if (Math.random() < 0.5) {
                        var xEdge = Math.round(Math.random()) * this.autowired.WIDTH;
                        return new THREE.Vector2(xEdge, Math.round(Math.random() * this.autowired.HEIGHT));
                    }
                    else {
                        var yEdge = Math.round(Math.random()) * this.autowired.HEIGHT;
                        return new THREE.Vector2(Math.round(Math.random() * this.autowired.WIDTH), yEdge);
                    }
                };
                ;
                World.prototype.randomDirection = function (scalar) {
                    return new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(scalar);
                };
                ;
                World.backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
                return World;
            }());
            exports_4("World", World);
        }
    }
});
System.register("Simulator", ["Player", "TileType"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Player_1, TileType_2;
    var Vector2, nextPowerOfTwo, Simulator;
    return {
        setters:[
            function (Player_1_1) {
                Player_1 = Player_1_1;
            },
            function (TileType_2_1) {
                TileType_2 = TileType_2_1;
            }],
        execute: function() {
            Vector2 = THREE.Vector2;
            Simulator = (function () {
                function Simulator(autowired) {
                    this.players = [];
                    this.neighborOffsets = [new Vector2(1, 0), new Vector2(-1, 0), new Vector2(0, 1), new Vector2(0, -1)];
                    this.autowired = autowired;
                    for (var i = 0; i < 4; i++) {
                        var newPlayer = new Player_1.Player();
                        this.players.push(newPlayer);
                        var startingPosition = this.autowired.world.randomSpot();
                        var startingWorldBlock = this.autowired.world.map[startingPosition.x][startingPosition.y];
                        startingWorldBlock.setOwningPlayer(newPlayer);
                        startingWorldBlock.setTileType(TileType_2.TileType.townHall1);
                    }
                    this.playerCharacter = this.players[0];
                }
                Simulator.prototype.withNeighborOffsets = function (point) {
                    var returnValue = [];
                    for (var _i = 0, _a = this.neighborOffsets; _i < _a.length; _i++) {
                        var neighborOffset = _a[_i];
                        var neighborPoint = point.clone().add(neighborOffset);
                        if (this.autowired.world.isWithinBounds(neighborPoint.x, neighborPoint.y)) {
                            returnValue.push(neighborPoint);
                        }
                    }
                    return _.shuffle(returnValue);
                };
                Simulator.prototype.openNeighborBlocks = function (point) {
                    var neighborPoints = this.withNeighborOffsets(point);
                    var returnValue = [];
                    for (var _i = 0, neighborPoints_1 = neighborPoints; _i < neighborPoints_1.length; _i++) {
                        var neighbor = neighborPoints_1[_i];
                        var neighborBlock = this.autowired.world.map[neighbor.x][neighbor.y];
                        var neighborTileIsEmpty = !neighborBlock.owningPlayer;
                        if (neighborTileIsEmpty) {
                            returnValue.push(neighborBlock);
                        }
                    }
                    return returnValue;
                };
                Simulator.prototype.enemyNeighborBlocks = function (point) {
                    var neighborPoints = this.withNeighborOffsets(point);
                    var block = this.autowired.world.map[point.x][point.y];
                    var returnValue = [];
                    for (var _i = 0, neighborPoints_2 = neighborPoints; _i < neighborPoints_2.length; _i++) {
                        var neighbor = neighborPoints_2[_i];
                        var neighborBlock = this.autowired.world.map[neighbor.x][neighbor.y];
                        var isEnemyTile = neighborBlock.owningPlayer != null && neighborBlock.owningPlayer != block.owningPlayer;
                        if (isEnemyTile) {
                            returnValue.push(neighborBlock);
                        }
                    }
                    return returnValue;
                };
                Simulator.prototype.update = function () {
                    for (var i = 0; i < this.autowired.WIDTH; i++) {
                        for (var j = 0; j < this.autowired.HEIGHT; j++) {
                            var point = new THREE.Vector2(i, j);
                            var worldBlock = this.autowired.world.map[i][j];
                            var tileType = worldBlock.tileType;
                            if (worldBlock.owningPlayer) {
                                for (var _i = 0, _a = this.openNeighborBlocks(point); _i < _a.length; _i++) {
                                    var neighborBlock = _a[_i];
                                    var shouldSpawn = tileType.chanceToSpawn > Math.random();
                                    if (shouldSpawn) {
                                        neighborBlock.setOwningPlayer(worldBlock.owningPlayer);
                                    }
                                }
                                var enemyNeighbors = this.enemyNeighborBlocks(point);
                                for (var _b = 0, enemyNeighbors_1 = enemyNeighbors; _b < enemyNeighbors_1.length; _b++) {
                                    var neighborBlock = enemyNeighbors_1[_b];
                                    var shouldKill = worldBlock.owningPlayer.attack / neighborBlock.owningPlayer.defense > Math.random();
                                    if (shouldKill) {
                                        neighborBlock.setOwningPlayer(null);
                                    }
                                }
                                var openNeighbors = this.openNeighborBlocks(point);
                                if (openNeighbors.length > 0) {
                                    var possibleNewPosition = openNeighbors[0];
                                    var probabilityToMove = tileType.tendencyToLeave / possibleNewPosition.tileType.tendencyToEnter;
                                    if (probabilityToMove > Math.random()) {
                                        possibleNewPosition.setOwningPlayer(worldBlock.owningPlayer);
                                        worldBlock.setOwningPlayer(null);
                                    }
                                }
                            }
                        }
                    }
                    for (var i = 0; i < this.autowired.WIDTH; i++) {
                        for (var j = 0; j < this.autowired.HEIGHT; j++) {
                        }
                    }
                };
                return Simulator;
            }());
            exports_5("Simulator", Simulator);
        }
    }
});
System.register("Autowired", ["World", "Simulator"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var World_2, Simulator_1;
    var ShadowMapType, PCFSoftShadowMap, Autowired;
    return {
        setters:[
            function (World_2_1) {
                World_2 = World_2_1;
            },
            function (Simulator_1_1) {
                Simulator_1 = Simulator_1_1;
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
                    this.world = new World_2.World(this);
                    this.simulator = new Simulator_1.Simulator(this);
                }
                return Autowired;
            }());
            exports_6("Autowired", Autowired);
        }
    }
});
/// <reference path="Cube.ts" />
/// <reference path="Room.ts" />
/// <reference path="definitions/underscore.d.ts" />
System.register("Main", ["Autowired"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
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
                        _this.autowired.simulator.update();
                        _this.autowired.renderer.clear();
                        _this.autowired.renderer.render(_this.autowired.scene, _this.autowired.camera);
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