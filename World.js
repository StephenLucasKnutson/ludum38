"use strict";
var TileType_1 = require("./TileType");
var World = (function () {
    function World() {
        this.WIDTH = 100;
        this.HEIGHT = 100;
        this.map = {};
        for (var i = 0; i < this.WIDTH; i++) {
            this.map[i] = {};
            for (var j = 0; j < this.HEIGHT; j++) {
                this.map[i][j] = TileType_1.TileType.allTileTypes[Math.floor(Math.random() * TileType_1.TileType.allTileTypes.length)];
            }
        }
        for (var i = 0; i < this.WIDTH; i++) {
            var row = '';
            for (var j = 0; j < this.HEIGHT; j++) {
                row += this.map[i][j].name;
            }
            console.log(row);
        }
    }
    return World;
}());
exports.World = World;
