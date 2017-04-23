export class TileType {
    name: string;
    color: number;
    goldPerTurn: number;
    tendencyToEnter: number;
    tendencyToLeave: number;
    chanceToSpawn: number;
    upgradeCost: number;
    possibleUpgrades: TileType[];

    material: THREE.Material;

    public constructor(name: string,
                       color: number,
                       goldPerTurn: number,
                       tendencyToEnter: number,
                       tendencyToLeave: number,
                       chanceToSpawn: number,
                       upgradeCost: number) {
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
        image.onload = function() {
            texture.needsUpdate = true;
        };


        texture.repeat.set(3, 3);
        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
        this.material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.BackSide } );
        //this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.BackSide});
    }
    static destroyed: TileType;
    static destroyedCheaply: TileType;
    static plains: TileType;
    static farm: TileType;
    static factoryFarm: TileType;
    static forest: TileType;
    static mountains: TileType;
    static sea: TileType;
    static desert: TileType;
    static goldMine: TileType;
    static gold: TileType;
    static diamondMine: TileType;
    static diamond: TileType;
    static megalopolis: TileType;
    static city: TileType;
    static town: TileType;
    static village: TileType;
    static militaryBase: TileType;
    static barracks: TileType;
    static wall: TileType;

    static allTileTypes: TileType[];

    static tileTypeToGold: {[key: string]: number;} = {};

    static initialize() {
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

        for (let tileType of TileType.allTileTypes) {
            TileType.tileTypeToGold[tileType.name] = tileType.goldPerTurn;
        }

    }
}
TileType.initialize();