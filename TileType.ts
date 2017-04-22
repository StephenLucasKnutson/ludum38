export class TileType {
    name: string;
    color: number;
    goldPerTurn: number;
    tendencyToEnter: number;
    tendencyToLeave: number;
    chanceToSpawn: number;

    material: THREE.Material;

    public constructor(
        name: string,
        color: number,
        goldPerTurn: number,
        tendencyToEnter: number,
        tendencyToLeave: number,
        chanceToSpawn: number
    ) {
        this.name = name;
        this.color = color;
        this.goldPerTurn = goldPerTurn;
        this.tendencyToEnter = tendencyToEnter;
        this.tendencyToLeave = tendencyToLeave;
        this.chanceToSpawn = chanceToSpawn;

        this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.BackSide});
    }

    static plains: TileType = new TileType("plains", 0xC0FF6D, 1, 0.5, 0.2, 0);
    static woods: TileType = new TileType("woods", 0x228B22, 2, 0.25, 0.21, 0);
    static mountains: TileType = new TileType("mountains", 0x968D99, 3, 0.1, 0.1, 0);
    static sea: TileType = new TileType("sea", 0x006994, 1, 0.01, 0.1, 0);
    static desert: TileType = new TileType("desert", 0xEDC9AF, 0, 0.01, 0.1, 0);

    static gold: TileType = new TileType("gold", 0xFFDF00, 10, 0.01, 0.0, 0);
    static diamond: TileType = new TileType("diamond", 0x9AC5DB, 20, 0.01, 0.0, 0);

    static townHall1: TileType = new TileType("townHall1", 0x000000, 10, 0.01, 0.0, 0.01);

    static allTileTypes: TileType[] = [
        TileType.plains,
        TileType.woods,
        TileType.mountains,
        TileType.sea,
        TileType.desert,
        TileType.gold,
        TileType.diamond,
        TileType.townHall1
    ];

    static tileTypeNameToGold()  {
        let tileTypeToGold: {[key: string]: number;} = {};
        for( let tileType of TileType.allTileTypes) {
            tileTypeToGold[tileType.name] = tileType.goldPerTurn;
        }
        return tileTypeToGold;
    }

}