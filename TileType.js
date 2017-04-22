"use strict";
var TileType = (function () {
    function TileType(name) {
        this.name = name;
    }
    TileType.plains = new TileType("plains");
    TileType.woods = new TileType("woods");
    TileType.mountains = new TileType("mountains");
    TileType.sea = new TileType("sea");
    TileType.desert = new TileType("desert");
    TileType.allTileTypes = [TileType.plains, TileType.woods, TileType.mountains, TileType.sea, TileType.desert];
    return TileType;
}());
exports.TileType = TileType;
