export class TileType {
    name: string;
    color: number;

    public constructor(name: string, color: number) {
        this.name = name;
        this.color = color;
    }

    static plains: TileType = new TileType("plains", 0xC0FF6D);
    static woods: TileType = new TileType("woods", 0x228B22);
    static mountains: TileType = new TileType("mountains", 0x968D99);
    static sea: TileType = new TileType("sea", 0x006994);
    static desert: TileType = new TileType("desert", 0xEDC9AF);

    static allTileTypes = [TileType.plains, TileType.woods, TileType.mountains, TileType.sea, TileType.desert]
}