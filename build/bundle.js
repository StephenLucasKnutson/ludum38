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
                TileType.tileTypeNameToGold = function () {
                    var tileTypeToGold = {};
                    for (var _i = 0, _a = TileType.allTileTypes; _i < _a.length; _i++) {
                        var tileType = _a[_i];
                        tileTypeToGold[tileType.name] = tileType.goldPerTurn;
                    }
                    return tileTypeToGold;
                };
                TileType.plains = new TileType("PLAINS", 0xC0FF6D, 1, 0.5, 0.2, 0);
                TileType.forest = new TileType("FOREST", 0x228B22, 2, 0.25, 0.21, 0);
                TileType.mountains = new TileType("MOUNTAINS", 0x968D99, 3, 0.1, 0.1, 0);
                TileType.sea = new TileType("SEA", 0x006994, 1, 0.01, 0.1, 0);
                TileType.desert = new TileType("DESERT", 0xEDC9AF, 0, 0.01, 0.1, 0);
                TileType.gold = new TileType("GOLD", 0xFFDF00, 10, 0.01, 0.0, 0);
                TileType.diamond = new TileType("DIAMOND", 0x9AC5DB, 20, 0.01, 0.0, 0);
                TileType.village = new TileType("VILLAGE", 0x000000, 10, 0.01, 0.0, 0.01);
                TileType.allTileTypes = [
                    TileType.plains,
                    TileType.forest,
                    TileType.mountains,
                    TileType.sea,
                    TileType.desert,
                    TileType.gold,
                    TileType.diamond,
                    TileType.village
                ];
                return TileType;
            }());
            exports_1("TileType", TileType);
        }
    }
});
System.register("PlayerStats", ["TileType"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var TileType_1;
    var Vector2, nextPowerOfTwo, PlayerStats;
    return {
        setters:[
            function (TileType_1_1) {
                TileType_1 = TileType_1_1;
            }],
        execute: function() {
            PlayerStats = (function () {
                function PlayerStats() {
                    this.tileTypeToNumberOwned = {};
                }
                PlayerStats.prototype.incrementTileType = function (tileType) {
                    var tileTypeName = tileType.name;
                    if (this.tileTypeToNumberOwned[tileTypeName] == null) {
                        this.tileTypeToNumberOwned[tileTypeName] = 0;
                    }
                    this.tileTypeToNumberOwned[tileTypeName]++;
                };
                PlayerStats.prototype.totalGold = function () {
                    var tileTypeToGold = TileType_1.TileType.tileTypeNameToGold();
                    var returnValue = 0;
                    for (var tileTypeName in this.tileTypeToNumberOwned) {
                        var numberOwned = this.tileTypeToNumberOwned[tileTypeName];
                        var goldPer = tileTypeToGold[tileTypeName];
                        returnValue += numberOwned * goldPer;
                    }
                    return returnValue;
                };
                PlayerStats.prototype.totalUnits = function () {
                    var returnValue = 0;
                    for (var tileTypeName in this.tileTypeToNumberOwned) {
                        var numberOwned = this.tileTypeToNumberOwned[tileTypeName];
                        returnValue += numberOwned;
                    }
                    return returnValue;
                };
                return PlayerStats;
            }());
            exports_2("PlayerStats", PlayerStats);
        }
    }
});
System.register("Player", ["PlayerStats"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var PlayerStats_1;
    var Vector2, nextPowerOfTwo, Player;
    return {
        setters:[
            function (PlayerStats_1_1) {
                PlayerStats_1 = PlayerStats_1_1;
            }],
        execute: function() {
            Player = (function () {
                function Player() {
                    this.gold = 0;
                    this.attack = 0.01;
                    this.defense = 1.0;
                    this.kills = 0;
                    this.deaths = 0;
                    if (Player.nextPlayerColorIndex == Player.allPlayerColors.length) {
                        throw new Error('Ran out of colors');
                    }
                    this.color = Player.allPlayerColors[Player.nextPlayerColorIndex];
                    this.colorAsString = Player.allPlayerColorsAsString[Player.nextPlayerColorIndex];
                    this.name = Player.allPlayersName[Player.nextPlayerColorIndex];
                    Player.nextPlayerColorIndex++;
                    this.material = new THREE.MeshBasicMaterial({ color: this.color, side: THREE.BackSide });
                }
                Player.prototype.resetStats = function () {
                    this.playerStats = new PlayerStats_1.PlayerStats();
                };
                Player.nextPlayerColorIndex = 0;
                Player.allPlayerColors = [0xFF0000, 0x0000FF, 0xFFA500, 0x00FF00, 0xD2691E];
                Player.allPlayerColorsAsString = ['#FF0000', '#0000FF', '#FFA500', '#00FF00', '#D2691E'];
                Player.allPlayersName = ['YOU', 'BLUE', 'ORANGE', 'GREEN', 'BROWN'];
                return Player;
            }());
            exports_3("Player", Player);
        }
    }
});
System.register("WorldBlock", ["World"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
                WorldBlock.prototype.setSelected = function (isSelected) {
                    if (isSelected == this.isSelected) {
                        return;
                    }
                    this.isSelected = isSelected;
                    if (isSelected) {
                        this.backgroundMesh.material = World_1.World.backgroundSelectedMaterial;
                    }
                    else {
                        this.setOwningPlayer(this.owningPlayer);
                    }
                };
                return WorldBlock;
            }());
            exports_4("WorldBlock", WorldBlock);
        }
    }
});
System.register("World", ["TileType", "WorldBlock"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var TileType_2, WorldBlock_1;
    var Vector2, World;
    return {
        setters:[
            function (TileType_2_1) {
                TileType_2 = TileType_2_1;
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
                        if (_this.isWithinBounds(new Vector2(x, y))) {
                            var existingType = _this.map[x][y].tileType;
                            var canBeApplied = _.contains(canApplyTo, existingType);
                            if (canBeApplied) {
                                _this.map[x][y].tileType = t;
                            }
                        }
                    };
                    this.generatePlane = function () {
                        for (var i = 0; i < _this.autowired.WIDTH; i++) {
                            _this.map[i] = {};
                            for (var j = 0; j < _this.autowired.HEIGHT; j++) {
                                _this.map[i][j] = new WorldBlock_1.WorldBlock();
                                _this.map[i][j].tileType = TileType_2.TileType.plains;
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
                    this.generate(500, 7, 2, 0.5, 50, 0.25, 1.0, TileType_2.TileType.forest, [TileType_2.TileType.plains]);
                    this.generate(700, 3, 2, 1.0, 150, 0.25, 1.0, TileType_2.TileType.sea, [TileType_2.TileType.plains]);
                    this.generate(500, 3, 2, 0.0, 250, 0.0, 0.3, TileType_2.TileType.desert, [TileType_2.TileType.plains]);
                    this.generate(500, 4, 4, 0.0, 100, 0.0, 0.3, TileType_2.TileType.mountains, [TileType_2.TileType.forest]);
                    this.generate(500, 1, 1, 0.0, 40, 0.0, 0.0, TileType_2.TileType.gold, [TileType_2.TileType.plains, TileType_2.TileType.forest]);
                    this.generate(500, 1, 1, 0.0, 80, 0.0, 0.0, TileType_2.TileType.diamond, [TileType_2.TileType.plains, TileType_2.TileType.forest]);
                    var geometry = new THREE.PlaneGeometry(7, 7);
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
                    var $this = this;
                    $(this.autowired.canvasElement).click(function (event) {
                        var vector = new THREE.Vector3((event.clientX / $this.autowired.canvasElement.innerWidth()) * 2 - 1, -(event.clientY / $this.autowired.canvasElement.innerHeight()) * 2 + 1, 0.5);
                        vector.unproject($this.autowired.camera);
                        var mapPosition = new THREE.Vector2(Math.round(vector.x / 10), Math.round(vector.y / 10));
                        if (_this.isWithinBounds(mapPosition)) {
                            for (var i = 0; i < _this.autowired.WIDTH; i++) {
                                for (var j = 0; j < _this.autowired.HEIGHT; j++) {
                                    _this.map[i][j].setSelected(false);
                                }
                            }
                            var selectedWorldBlock = _this.getMap(mapPosition);
                            _this.selectedWorldBlock = selectedWorldBlock;
                            selectedWorldBlock.setSelected(true);
                        }
                        //console.log(pos);
                    });
                }
                World.prototype.isWithinBounds = function (position) {
                    return position.x >= 0 && position.x < this.autowired.WIDTH && position.y >= 0 && position.y < this.autowired.HEIGHT;
                };
                ;
                World.prototype.getMap = function (position) {
                    return this.map[position.x][position.y];
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
                World.backgroundMaterial = new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    side: THREE.BackSide
                });
                World.backgroundSelectedMaterial = new THREE.MeshBasicMaterial({
                    color: 0xFFFFFF,
                    side: THREE.BackSide
                });
                return World;
            }());
            exports_5("World", World);
        }
    }
});
System.register("Simulator", ["Player", "TileType"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Player_1, TileType_3;
    var Vector2, nextPowerOfTwo, Simulator;
    return {
        setters:[
            function (Player_1_1) {
                Player_1 = Player_1_1;
            },
            function (TileType_3_1) {
                TileType_3 = TileType_3_1;
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
                        startingWorldBlock.setTileType(TileType_3.TileType.village);
                    }
                    this.playerCharacter = this.players[0];
                }
                Simulator.prototype.withNeighborOffsets = function (point) {
                    var returnValue = [];
                    for (var _i = 0, _a = this.neighborOffsets; _i < _a.length; _i++) {
                        var neighborOffset = _a[_i];
                        var neighborPoint = point.clone().add(neighborOffset);
                        if (this.autowired.world.isWithinBounds(new Vector2(neighborPoint.x, neighborPoint.y))) {
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
                                        neighborBlock.owningPlayer.deaths++;
                                        worldBlock.owningPlayer.kills++;
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
                    for (var _c = 0, _d = this.players; _c < _d.length; _c++) {
                        var player = _d[_c];
                        player.resetStats();
                    }
                    for (var i = 0; i < this.autowired.WIDTH; i++) {
                        for (var j = 0; j < this.autowired.HEIGHT; j++) {
                            var point = new THREE.Vector2(i, j);
                            var worldBlock = this.autowired.world.map[i][j];
                            var tileType = worldBlock.tileType;
                            if (worldBlock.owningPlayer) {
                                var player = worldBlock.owningPlayer;
                                player.playerStats.incrementTileType(tileType);
                            }
                        }
                    }
                    for (var _e = 0, _f = this.players; _e < _f.length; _e++) {
                        var player = _f[_e];
                        player.gold += player.playerStats.totalGold();
                    }
                };
                return Simulator;
            }());
            exports_6("Simulator", Simulator);
        }
    }
});
System.register("UI", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var UI;
    return {
        setters:[],
        execute: function() {
            //http://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
            UI = (function () {
                function UI(autowired) {
                    this.nf = new Intl.NumberFormat();
                    this.autowired = autowired;
                    var element = document.body;
                    this.scoreDiv = document.createElement('div');
                    this.scoreDiv.style.position = 'absolute';
                    this.scoreDiv.style.color = this.autowired.simulator.playerCharacter.colorAsString;
                    this.scoreDiv.innerHTML = "";
                    this.scoreDiv.style.top = '25px';
                    this.scoreDiv.style.left = '25px';
                    this.scoreDiv.style.fontSize = "25px";
                    element.appendChild(this.scoreDiv);
                    this.worldBlockDIV = document.createElement('div');
                    this.worldBlockDIV.style.position = 'absolute';
                    this.worldBlockDIV.style.color = this.autowired.simulator.playerCharacter.colorAsString;
                    this.worldBlockDIV.innerHTML = "";
                    this.worldBlockDIV.style.top = '50%';
                    this.worldBlockDIV.style.left = '25px';
                    this.worldBlockDIV.style.fontSize = "25px";
                    element.appendChild(this.worldBlockDIV);
                }
                UI.prototype.update = function () {
                    var gold = "TOTAL GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.gold);
                    var goldPerTurn = "RATE OF GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalGold());
                    var units = "UNITS ALIVE: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalUnits());
                    var kills = "TOTAL KILLS: " + this.nf.format(this.autowired.simulator.playerCharacter.kills);
                    var deaths = "TOTAL DEATHS: " + this.nf.format(this.autowired.simulator.playerCharacter.deaths);
                    this.scoreDiv.innerText = [gold, goldPerTurn, units, kills, deaths].join('\n');
                    var selected = this.autowired.world.selectedWorldBlock;
                    if (selected) {
                        var selectedOwner = selected.owningPlayer;
                        var tileType = "TYPE: " + selected.tileType.name;
                        var player = "OWNER: " + ((!!selectedOwner) ? selectedOwner.name : "NONE");
                        var rateOfGold = "GOLD GENERATED: " + selected.tileType.goldPerTurn;
                        this.worldBlockDIV.innerText = [tileType, player, rateOfGold].join('\n');
                    }
                    else {
                        this.worldBlockDIV.innerText = "";
                    }
                };
                return UI;
            }());
            exports_7("UI", UI);
        }
    }
});
System.register("Autowired", ["World", "Simulator", "UI"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var World_2, Simulator_1, UI_1;
    var ShadowMapType, PCFSoftShadowMap, Autowired;
    return {
        setters:[
            function (World_2_1) {
                World_2 = World_2_1;
            },
            function (Simulator_1_1) {
                Simulator_1 = Simulator_1_1;
            },
            function (UI_1_1) {
                UI_1 = UI_1_1;
            }],
        execute: function() {
            Autowired = (function () {
                function Autowired() {
                    this.WIDTH = 120;
                    this.HEIGHT = 80;
                    this.isGameOver = false;
                    this.canvasElement = $("#myCanvas");
                    this.renderer = new THREE.WebGLRenderer({
                        canvas: this.canvasElement.get(0),
                        antialias: true,
                        precision: "highp"
                    });
                    var width = $(document).innerWidth() - 50;
                    var height = $(document).innerHeight() - 70;
                    var aspectRatio = width / height;
                    this.renderer.setSize(width, height);
                    var size = 900;
                    this.camera = new THREE.OrthographicCamera(-size, size, size / aspectRatio, -size / aspectRatio, 0, 10);
                    this.camera.position.set(0, 0, 1);
                    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                    this.camera.position.set(400, 400, 5);
                    this.scene = new THREE.Scene();
                    var light = new THREE.PointLight(0xFFFFFF, 0.5, 10000);
                    light.position.set(0, 0, 0);
                    this.scene.add(light);
                    this.scene.add(new THREE.AmbientLight(0x404040));
                    this.world = new World_2.World(this);
                    this.simulator = new Simulator_1.Simulator(this);
                    this.ui = new UI_1.UI(this);
                }
                return Autowired;
            }());
            exports_8("Autowired", Autowired);
        }
    }
});
/// <reference path="definitions/underscore.d.ts" />
System.register("Main", ["Autowired"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
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
                        _this.autowired.ui.update();
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