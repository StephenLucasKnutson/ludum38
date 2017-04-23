import {Autowired} from "./Autowired";
import {Player} from "./Player";
import {WorldBlock} from "./WorldBlock";
import {TileType} from "./TileType";
export class AI {
    autowired: Autowired;

    constructor(autowired: Autowired) {
        this.autowired = autowired;
    }

    public update() {
        let npcs: Player[] = this.autowired.simulator.nonPlayerCharacters();
        for (let npc of npcs) {
            this.playCharacter(npc);
        }
    }

    playCharacter(npc: Player) {
        let worldBlocks: WorldBlock[] = this.autowired.simulator.worldBlocksAndEmptyNeighborsBlocksForPlayer(npc);
        if(worldBlocks.length == 0){
            return;
        }
        let safteyBreak = 0;
        let isGainingMoney = npc.playerStats.totalGoldPerTurn() > 2000;
        console.log(worldBlocks);
        while(npc.gold > 10000 && safteyBreak++ < 100) {
            let randomBlock = worldBlocks[Math.floor(Math.random() * worldBlocks.length)];
            let possibleUpgrades = randomBlock.tileType.possibleUpgrades;
            let goodUpgrades = _(possibleUpgrades).filter(function(upgrade: TileType) {
                return (upgrade.desirableUpgrade && (isGainingMoney || upgrade.goldPerTurn > 0));
            });
            if(goodUpgrades.length > 0) {
                let randomUpgrade = goodUpgrades[Math.floor(Math.random() * goodUpgrades.length)];
                if(randomUpgrade.upgradeCost <= npc.gold) {
                    randomBlock.setTileType(randomUpgrade);
                    npc.gold -= randomUpgrade.upgradeCost;
                }
            }
        }
    }
}