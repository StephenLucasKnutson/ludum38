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

        this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.BackSide});
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