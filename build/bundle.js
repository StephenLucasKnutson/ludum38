System.register("TileType", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TileType;
    return {
        setters:[],
        execute: function() {
            TileType = (function () {
                function TileType(name, color, goldPerTurn, tendencyToEnter, tendencyToLeave, chanceToSpawn, upgradeCost) {
                    this.name = name;
                    this.color = color;
                    this.goldPerTurn = goldPerTurn;
                    this.tendencyToEnter = tendencyToEnter;
                    this.tendencyToLeave = tendencyToLeave;
                    this.chanceToSpawn = chanceToSpawn;
                    this.upgradeCost = upgradeCost;
                    var image = new Image();
                    image.src = 'data:image/jpeg;base64,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';
                    var texture = new THREE.Texture(image);
                    image.onload = function () {
                        texture.needsUpdate = true;
                    };
                    texture.repeat.set(3, 3);
                    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
                    this.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
                    //this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.BackSide});
                }
                TileType.initialize = function () {
                    TileType.destroyed = new TileType("DESTROYED", 0x000000, 0, 0, 1, 0, 1000000);
                    TileType.destroyedCheaply = new TileType("DESTROYED", 0x000000, 0, 0, 1, 0, 1000);
                    TileType.plains = new TileType("PLAINS", 0xC0FF6D, 1, 0.5, 0.2, 0, 100);
                    TileType.farm = new TileType("FARM", 0xC0FF6D, 5, 0.2, 0.0, 0, 1000);
                    TileType.factoryFarm = new TileType("FACTORY FARM", 0xC0FF6D, 50, 0.5, 0.0, 0, 10000);
                    TileType.forest = new TileType("FOREST", 0x228B22, 2, 0.5, 0.21, 0, 1000);
                    TileType.mountains = new TileType("MOUNTAINS", 0x968D99, 3, 0.25, 0.1, 0, 0);
                    TileType.sea = new TileType("SEA", 0x006994, 1, 0.00001, 0.1, 0, 0);
                    TileType.desert = new TileType("DESERT", 0xEDC9AF, 0, 0.01, 0.1, 0, 0);
                    TileType.goldMine = new TileType("GOLD MINE", 0xFFDF00, 100, 0.01, 0.0, 0, 10000);
                    TileType.gold = new TileType("GOLD", 0xFFDF00, 20, 0.01, 0.0, 0, 0);
                    TileType.diamondMine = new TileType("DIAMOND MINE", 0x9AC5DB, 200, 0.01, 0.0, 0, 20000);
                    TileType.diamond = new TileType("DIAMOND", 0x9AC5DB, 40, 0.01, 0.0, 0, 0);
                    TileType.megalopolis = new TileType("MEGALOPOLIS", 0x000000, 100000, 0.1, 0.0, 1.0, 1000000);
                    TileType.city = new TileType("CITY", 0x000000, 1000, 0.1, 0.0, 0.5, 500000);
                    TileType.town = new TileType("TOWN", 0x000000, 100, 0.1, 0.0, 0.1, 100000);
                    TileType.village = new TileType("VILLAGE", 0x000000, 10, 0.1, 0.0, 0.01, 10000);
                    TileType.militaryBase = new TileType("MILITARY BASE", 0x000000, -1000, 0.1, 0.0, 0.75, 100000);
                    TileType.barracks = new TileType("BARRACKS", 0x000000, -100, 0.1, 0.0, 0.1, 10000);
                    TileType.wall = new TileType("WALL", 0x000000, -1, 0.01, 0.0, 0.01, 1000);
                    TileType.destroyed.possibleUpgrades = [TileType.plains];
                    TileType.destroyedCheaply.possibleUpgrades = [TileType.plains];
                    TileType.plains.possibleUpgrades = [TileType.village, TileType.farm, TileType.barracks, TileType.wall, TileType.forest, TileType.destroyedCheaply];
                    TileType.farm.possibleUpgrades = [TileType.factoryFarm, TileType.destroyed];
                    TileType.factoryFarm.possibleUpgrades = [TileType.destroyed];
                    TileType.forest.possibleUpgrades = [TileType.plains, TileType.destroyedCheaply];
                    TileType.mountains.possibleUpgrades = [TileType.destroyedCheaply];
                    TileType.sea.possibleUpgrades = [TileType.plains, TileType.destroyedCheaply];
                    TileType.desert.possibleUpgrades = [TileType.destroyedCheaply];
                    TileType.goldMine.possibleUpgrades = [TileType.destroyed];
                    TileType.gold.possibleUpgrades = [TileType.goldMine, TileType.destroyed];
                    TileType.diamondMine.possibleUpgrades = [TileType.destroyed];
                    TileType.diamond.possibleUpgrades = [TileType.diamondMine, TileType.destroyed];
                    TileType.megalopolis.possibleUpgrades = [TileType.destroyed];
                    TileType.city.possibleUpgrades = [TileType.megalopolis, TileType.destroyed];
                    TileType.town.possibleUpgrades = [TileType.city, TileType.destroyed];
                    TileType.village.possibleUpgrades = [TileType.town, TileType.destroyed];
                    TileType.militaryBase.possibleUpgrades = [TileType.destroyed];
                    TileType.barracks.possibleUpgrades = [TileType.militaryBase, TileType.destroyed];
                    TileType.wall.possibleUpgrades = [TileType.destroyedCheaply];
                    TileType.allTileTypes = [
                        TileType.destroyed,
                        TileType.destroyedCheaply,
                        TileType.plains,
                        TileType.farm,
                        TileType.factoryFarm,
                        TileType.forest,
                        TileType.mountains,
                        TileType.sea,
                        TileType.desert,
                        TileType.goldMine,
                        TileType.gold,
                        TileType.diamondMine,
                        TileType.diamond,
                        TileType.megalopolis,
                        TileType.city,
                        TileType.town,
                        TileType.village,
                        TileType.militaryBase,
                        TileType.barracks,
                        TileType.wall
                    ];
                    for (var _i = 0, _a = TileType.allTileTypes; _i < _a.length; _i++) {
                        var tileType = _a[_i];
                        TileType.tileTypeToGold[tileType.name] = tileType.goldPerTurn;
                    }
                };
                TileType.tileTypeToGold = {};
                return TileType;
            }());
            exports_1("TileType", TileType);
            TileType.initialize();
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
                    var returnValue = 0;
                    for (var tileTypeName in this.tileTypeToNumberOwned) {
                        var numberOwned = this.tileTypeToNumberOwned[tileTypeName];
                        var goldPer = TileType_1.TileType.tileTypeToGold[tileTypeName];
                        returnValue += numberOwned * goldPer;
                    }
                    return returnValue;
                };
                PlayerStats.prototype.totalUnits = function () {
                    var returnValue = 0;
                    for (var tileTypeName in this.tileTypeToNumberOwned) {
                        returnValue += this.tileTypeToNumberOwned[tileTypeName];
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
                    this.neighborOffsets = [new Vector2(1, 0), new Vector2(-1, 0), new Vector2(0, 1), new Vector2(0, -1)];
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
                    return new THREE.Vector2(Math.floor(Math.random() * this.autowired.WIDTH), Math.floor(Math.random() * this.autowired.HEIGHT));
                };
                ;
                World.prototype.randomSpotOnPlains = function () {
                    var position;
                    do {
                        position = this.randomSpot();
                    } while (!this.isInMiddleOfPlains(position));
                    return position;
                };
                World.prototype.isInMiddleOfPlains = function (point) {
                    var blocksToCheck = [this.getMap(point)];
                    blocksToCheck = blocksToCheck.concat(this.neighborBlocks(point));
                    var good = true;
                    good = good && (blocksToCheck.length == 5);
                    for (var _i = 0, blocksToCheck_1 = blocksToCheck; _i < blocksToCheck_1.length; _i++) {
                        var block = blocksToCheck_1[_i];
                        good = good && (block.tileType == TileType_2.TileType.plains);
                    }
                    return good;
                };
                ;
                World.prototype.withNeighborOffsets = function (point) {
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
                World.prototype.neighborBlocks = function (point) {
                    var neighborPoints = this.withNeighborOffsets(point);
                    var returnValue = [];
                    for (var _i = 0, neighborPoints_1 = neighborPoints; _i < neighborPoints_1.length; _i++) {
                        var neighbor = neighborPoints_1[_i];
                        var neighborBlock = this.autowired.world.getMap(neighbor);
                        returnValue.push(neighborBlock);
                    }
                    return returnValue;
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
            Simulator = (function () {
                function Simulator(autowired) {
                    this.players = [];
                    this.autowired = autowired;
                    for (var i = 0; i < 4; i++) {
                        var newPlayer = new Player_1.Player();
                        this.players.push(newPlayer);
                        var startingPosition = this.autowired.world.randomSpotOnPlains();
                        var startingWorldBlock = this.autowired.world.map[startingPosition.x][startingPosition.y];
                        startingWorldBlock.setOwningPlayer(newPlayer);
                        startingWorldBlock.setTileType(TileType_3.TileType.village);
                    }
                    this.playerCharacter = this.players[0];
                }
                Simulator.prototype.openNeighborBlocks = function (point) {
                    var neighborBlocks = this.autowired.world.neighborBlocks(point);
                    var returnValue = [];
                    for (var _i = 0, neighborBlocks_1 = neighborBlocks; _i < neighborBlocks_1.length; _i++) {
                        var neighborBlock = neighborBlocks_1[_i];
                        var neighborTileIsEmpty = !neighborBlock.owningPlayer;
                        if (neighborTileIsEmpty) {
                            returnValue.push(neighborBlock);
                        }
                    }
                    return returnValue;
                };
                Simulator.prototype.enemyNeighborBlocks = function (point) {
                    var neighborBlocks = this.autowired.world.neighborBlocks(point);
                    var block = this.autowired.world.getMap(point);
                    var returnValue = [];
                    for (var _i = 0, neighborBlocks_2 = neighborBlocks; _i < neighborBlocks_2.length; _i++) {
                        var neighborBlock = neighborBlocks_2[_i];
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
                                    var probabilityToMove = possibleNewPosition.tileType.tendencyToEnter * tileType.tendencyToLeave;
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
                    var self = this;
                    var gold = "TOTAL GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.gold);
                    var goldPerTurn = "RATE OF GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalGold());
                    var units = "UNITS ALIVE: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalUnits());
                    var kills = "TOTAL KILLS: " + this.nf.format(this.autowired.simulator.playerCharacter.kills);
                    var deaths = "TOTAL DEATHS: " + this.nf.format(this.autowired.simulator.playerCharacter.deaths);
                    this.scoreDiv.innerText = [gold, goldPerTurn, units, kills, deaths].join('\n');
                    var selected = this.autowired.world.selectedWorldBlock;
                    if (selected) {
                        var selectedOwner = selected.owningPlayer;
                        var tileTypeString = "TYPE: " + selected.tileType.name;
                        var player = "OWNER: " + ((!!selectedOwner) ? selectedOwner.name : "NONE");
                        var rateOfGold = "GOLD GENERATED: " + this.nf.format(selected.tileType.goldPerTurn);
                        var rateOfUnits = "UNITS GENERATED: " + this.nf.format(selected.tileType.chanceToSpawn);
                        var possibleUpgrades = "POSSIBLE UPGRADES: ";
                        this.worldBlockDIV.innerText = [tileTypeString, player, rateOfGold, possibleUpgrades, rateOfUnits].join('\n');
                        var tileType = selected.tileType;
                        this.upgradesDIV = document.createElement('div');
                        var user_1 = self.autowired.simulator.playerCharacter;
                        _(tileType.possibleUpgrades).each(function (possibleUpgrade) {
                            var button = document.createElement('button');
                            button.classList.add('upgrade-button');
                            button.disabled = user_1.gold < possibleUpgrade.upgradeCost;
                            button.innerText = possibleUpgrade.name + ' for ' + self.nf.format(possibleUpgrade.upgradeCost) + ' gold';
                            self.upgradesDIV.appendChild(button);
                            self.upgradesDIV.appendChild(document.createElement('br'));
                            $(button).click(function (event) {
                                alert();
                                if (user_1.gold >= possibleUpgrade.upgradeCost) {
                                    selected.setTileType(possibleUpgrade);
                                    console.log(user_1.gold);
                                    user_1.gold -= possibleUpgrade.upgradeCost;
                                    console.log(user_1.gold);
                                }
                            });
                        });
                        this.worldBlockDIV.appendChild(this.upgradesDIV);
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
System.register("UserControls", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var ShadowMapType, PCFSoftShadowMap, Side, Vector2, Vector3, UserControls;
    return {
        setters:[],
        execute: function() {
            Vector2 = THREE.Vector2;
            Vector3 = THREE.Vector3;
            UserControls = (function () {
                function UserControls(autowired) {
                    var _this = this;
                    this.mousePosition = new Vector2(0.5, 0.5);
                    this.isKeyPressed = {};
                    this.autowired = autowired;
                    var self = this;
                    $(document).keydown(function (e) {
                        self.onKeyPress(e, true);
                    });
                    $(document).keyup(function (e) {
                        self.onKeyPress(e, false);
                    });
                    var canvas = this.autowired.canvasElement;
                    $(canvas).mousemove(function (event) {
                        var mousePosition = new Vector2(event.clientX, event.clientY);
                        var screenSize = new Vector2(canvas.innerWidth(), canvas.innerHeight());
                        _this.mousePosition = mousePosition.divide(screenSize);
                    });
                }
                ;
                UserControls.prototype.update = function () {
                    var left = new Vector3(-1, 0, 0);
                    var right = new Vector3(1, 0, 0);
                    var up = new Vector3(0, 1, 0);
                    var down = new Vector3(0, -1, 0);
                    var keyToDirection = {
                        37: left,
                        65: left,
                        39: right,
                        68: right,
                        38: up,
                        87: up,
                        40: down,
                        83: down,
                    };
                    var translationScalar = 10;
                    for (var key in keyToDirection) {
                        if (this.isKeyPressed[key]) {
                            var direction = keyToDirection[key];
                            this.autowired.camera.translateOnAxis(direction, translationScalar);
                        }
                    }
                    var margin = 0.05;
                    if (this.mousePosition.x < margin) {
                        this.autowired.camera.translateOnAxis(left, translationScalar);
                    }
                    if (this.mousePosition.x > (1.0 - margin)) {
                        this.autowired.camera.translateOnAxis(right, translationScalar);
                    }
                    if (this.mousePosition.y < margin) {
                        this.autowired.camera.translateOnAxis(up, translationScalar);
                    }
                    if (this.mousePosition.y > (1.0 - margin)) {
                        this.autowired.camera.translateOnAxis(down, translationScalar);
                    }
                    var keyToScreenScalar = {
                        16: 0.97,
                        32: 1.03,
                    };
                    for (var key in keyToScreenScalar) {
                        if (this.isKeyPressed[key]) {
                        }
                    }
                };
                ;
                UserControls.prototype.onKeyPress = function (event, isKeyDown) {
                    this.isKeyPressed[event.keyCode] = isKeyDown;
                };
                ;
                return UserControls;
            }());
            exports_8("UserControls", UserControls);
        }
    }
});
System.register("Autowired", ["World", "Simulator", "UI", "UserControls"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var World_2, Simulator_1, UI_1, UserControls_1;
    var ShadowMapType, PCFSoftShadowMap, Side, Vector2, Vector3, Autowired;
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
            },
            function (UserControls_1_1) {
                UserControls_1 = UserControls_1_1;
            }],
        execute: function() {
            Autowired = (function () {
                function Autowired() {
                    var _this = this;
                    this.WIDTH = 100;
                    this.HEIGHT = 60;
                    this.isGameOver = false;
                    this.canvasElement = $("#myCanvas");
                    this.renderer = new THREE.WebGLRenderer({
                        canvas: this.canvasElement.get(0),
                        antialias: true,
                        precision: "highp",
                    });
                    this.scene = new THREE.Scene();
                    this.resetCameraAndRenderer();
                    this.scene.add(new THREE.AmbientLight(0x404040));
                    this.world = new World_2.World(this);
                    this.simulator = new Simulator_1.Simulator(this);
                    this.ui = new UI_1.UI(this);
                    this.userControls = new UserControls_1.UserControls(this);
                    window.addEventListener('resize', function (event) {
                        _this.resetCameraAndRenderer();
                    });
                }
                Autowired.prototype.resetCameraAndRenderer = function () {
                    var width = $(window).innerWidth() - 40;
                    var height = $(window).innerHeight() - 40;
                    var aspectRatio = width / height;
                    this.renderer.setSize(width, height);
                    var size = 650;
                    this.camera = new THREE.OrthographicCamera(-size, size, size / aspectRatio, -size / aspectRatio, 0, 10);
                    this.camera.position.set(0, 0, 1);
                    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                    this.camera.position.set(355, 300, 5);
                    this.camera.updateProjectionMatrix();
                    var geometry = new THREE.PlaneGeometry(size * 0.8, size / aspectRatio * 200);
                    var material = new THREE.MeshStandardMaterial({
                        color: "blue",
                        side: THREE.BackSide
                    });
                    var sidePanelPlane = new THREE.Mesh(geometry, material);
                    sidePanelPlane.rotateX(Math.PI);
                    this.camera.add(sidePanelPlane);
                    sidePanelPlane.position.set(-650, 0, -2);
                    this.scene.add(this.camera);
                };
                return Autowired;
            }());
            exports_9("Autowired", Autowired);
        }
    }
});
System.register("Main", ["Autowired"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
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
                        _this.autowired.userControls.update();
                        _this.autowired.simulator.update();
                        _this.autowired.renderer.render(_this.autowired.scene, _this.autowired.camera);
                        requestAnimationFrame(_this.render);
                    };
                    this.autowired = new Autowired_1.Autowired();
                    setInterval(function () {
                        _this.autowired.ui.update();
                    }, 400);
                }
                return Main;
            }());
            main = new Main();
            main.render();
        }
    }
});
//# sourceMappingURL=bundle.js.map