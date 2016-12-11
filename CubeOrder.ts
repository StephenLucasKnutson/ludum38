class CubeOrder {
    name: string;
    probabilityOfChange: number;

    public constructor(name: string, probabilityOfChange: number) {
        this.name = name;
        this.probabilityOfChange = probabilityOfChange;
    }

    static randomDirection: CubeOrder = new CubeOrder("randomDirection", 0.005);
    static hitPlayer: CubeOrder = new CubeOrder("hitPlayer", 0.003);
    static posX: CubeOrder = new CubeOrder("posX", 0.005);
    static negX: CubeOrder = new CubeOrder("negX", 0.005);
    static posZ: CubeOrder = new CubeOrder("posZ", 0.005);
    static negZ: CubeOrder = new CubeOrder("negZ", 0.005);
}