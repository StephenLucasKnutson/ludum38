import {ImageWater} from "./images/ImageWater";
import {BaseImage} from "./images/ImageBase";
import {ImageForest} from "./images/ImageForest";
import {ImageDesert} from "./images/ImageDesert";
import {ImageMountain} from "./images/ImageMountain";
import {ImagePrairie} from "./images/ImagePrairie";
import {ImageFarm} from "./images/ImageFarm";
import {ImageFactoryFarm} from "./images/ImageFactoryFarm";
import {ImageVillage} from "./images/ImageVillage";
import {ImageCity} from "./images/ImageCity";
import {ImageTown} from "./images/ImageTown";
import {ImageMilitaryBase} from "./images/ImageMilitaryBase";
import {ImageBarracks} from "./images/ImageBarracks";
import {ImageWall} from "./images/ImageWall";
import {ImageGold} from "./images/ImageGold";
import {ImageGoldMine} from "./images/ImageGoldMine";
import {ImageDiamond} from "./images/ImageDiamond";
import {ImageDiamondMine} from "./images/ImageDiamondMine";
import {ImageMegalopolis} from "./images/ImageMegalopolis";
export class TileType {
    name: string;
    imageSource: BaseImage;
    color: number;
    goldPerTurn: number;
    tendencyToEnter: number;
    tendencyToLeave: number;
    chanceToSpawn: number;
    upgradeCost: number;
    possibleUpgrades: TileType[];

    material: THREE.Material;

    public constructor(name: string,
                       image: BaseImage,
                       color: number,
                       goldPerTurn: number,
                       tendencyToEnter: number,
                       tendencyToLeave: number,
                       chanceToSpawn: number,
                       upgradeCost: number) {
        this.name = name;
        this.imageSource = image;
        this.color = color;
        this.goldPerTurn = goldPerTurn;
        this.tendencyToEnter = tendencyToEnter;
        this.tendencyToLeave = tendencyToLeave;
        this.chanceToSpawn = chanceToSpawn;
        this.upgradeCost = upgradeCost;

        if (this.imageSource) {
            let image = new Image();
            image.src = this.imageSource.base64Encoding;
            var texture = new THREE.Texture(image);
            image.onload = function () {
                texture.needsUpdate = true;
            };


            texture.repeat.set(1, 1);
            texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
            this.material = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
        } else {
            this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.BackSide});
        }
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
        TileType.destroyed = new TileType("DESTROYED", null, 0x000000, 0, 0, 1, 0, 1000000);
        TileType.destroyedCheaply = new TileType("DESTROYED", null, 0x000000, 0, 0, 1, 0, 1000);
        TileType.plains = new TileType("PLAINS", new ImagePrairie(), 0xC0FF6D, 1, 0.5, 0.2, 0, 100);
        TileType.farm = new TileType("FARM", new ImageFarm(), 0xC0FF6D, 5, 0.2, 0.0, 0, 1000);
        TileType.factoryFarm = new TileType("FACTORY FARM", new ImageFactoryFarm, 0xC0FF6D, 50, 0.5, 0.0, 0, 10000);
        TileType.forest = new TileType("FOREST", new ImageForest(), 0x228B22, 2, 0.5, 0.21, 0, 1000);
        TileType.mountains = new TileType("MOUNTAINS", new ImageMountain(), 0x968D99, 3, 0.25, 0.1, 0, 0);
        TileType.sea = new TileType("SEA", new ImageWater(), 0x006994, 1, 0.00001, 0.1, 0, 0);
        TileType.desert = new TileType("DESERT", new ImageDesert(), 0xEDC9AF, 0, 0.01, 0.1, 0, 0);
        TileType.goldMine = new TileType("GOLD MINE", new ImageGoldMine(), 0xFFDF00, 100, 0.01, 0.0, 0, 10000);
        TileType.gold = new TileType("GOLD", new ImageGold(), 0xFFDF00, 20, 0.01, 0.0, 0, 0);
        TileType.diamondMine = new TileType("DIAMOND MINE", new ImageDiamondMine(), 0x9AC5DB, 200, 0.01, 0.0, 0, 20000);
        TileType.diamond = new TileType("DIAMOND", new ImageDiamond(), 0x9AC5DB, 40, 0.01, 0.0, 0, 0);
        TileType.megalopolis = new TileType("MEGALOPOLIS", new ImageMegalopolis(), 0x000000, 100000, 0.1, 0.0, 1.0, 1000000);
        TileType.city = new TileType("CITY", new ImageCity(), 0x000000, 1000, 0.1, 0.0, 0.5, 500000);
        TileType.town = new TileType("TOWN", new ImageTown(), 0x000000, 100, 0.1, 0.0, 0.1, 100000);
        TileType.village = new TileType("VILLAGE", new ImageVillage(), 0x000000, 10, 0.1, 0.0, 0.01, 10000);
        TileType.militaryBase = new TileType("MILITARY BASE", new ImageMilitaryBase(), 0x000000, -1000, 0.1, 0.0, 0.75, 100000);
        TileType.barracks = new TileType("BARRACKS", new ImageBarracks(), 0x000000, -100, 0.1, 0.0, 0.1, 10000);
        TileType.wall = new TileType("WALL", new ImageWall(), 0x000000, -1, 0.01, 0.0, 0.01, 1000);

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