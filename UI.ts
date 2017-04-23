import {Autowired} from "./Autowired";
import {TileType} from "./TileType";
//http://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
export class UI {
    autowired: Autowired;
    scoreDiv: HTMLDivElement;
    worldBlockDIV: HTMLDivElement;
    upgradesDIV: HTMLDivElement;

    constructor(autowired: Autowired) {
        this.autowired = autowired;
        let element = document.body;

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

    nf = new Intl.NumberFormat();

    public update() {
        let self = this;
        let gold: string = "TOTAL GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.gold);
        let goldPerTurn: String = "RATE OF GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalGold());
        let units: string = "UNITS ALIVE: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalUnits());
        let kills: string = "TOTAL KILLS: " + this.nf.format(this.autowired.simulator.playerCharacter.kills);
        let deaths: string = "TOTAL DEATHS: " + this.nf.format(this.autowired.simulator.playerCharacter.deaths);
        this.scoreDiv.innerText = [gold, goldPerTurn, units, kills, deaths].join('\n');

        let selected = this.autowired.world.selectedWorldBlock;
        if (selected) {
            let selectedOwner = selected.owningPlayer;
            let tileTypeString: string = "TYPE: " + selected.tileType.name;
            let player: string = "OWNER: " + ((!!selectedOwner) ? selectedOwner.name : "NONE");
            let rateOfGold: string = "GOLD GENERATED: " + this.nf.format(selected.tileType.goldPerTurn);
            let rateOfUnits: string = "UNITS GENERATED: " + this.nf.format(selected.tileType.chanceToSpawn);
            let possibleUpgrades: String = "POSSIBLE UPGRADES: ";
            this.worldBlockDIV.innerText = [tileTypeString, player, rateOfGold, rateOfUnits, possibleUpgrades].join('\n');

            let tileType = selected.tileType;
            this.upgradesDIV = document.createElement('div');

            let user = self.autowired.simulator.playerCharacter;
            _(tileType.possibleUpgrades).each(function (possibleUpgrade: TileType) {
                let button: HTMLButtonElement = document.createElement('button');
                button.classList.add('upgrade-button');
                button.disabled = user.gold < possibleUpgrade.upgradeCost;
                button.innerText = possibleUpgrade.name + ' for ' + self.nf.format(possibleUpgrade.upgradeCost) + ' gold';
                self.upgradesDIV.appendChild(button);
                self.upgradesDIV.appendChild(document.createElement('br'));
                $(button).click(function (event) {
                    alert();
                    if (user.gold >= possibleUpgrade.upgradeCost) {
                        selected.setTileType(possibleUpgrade);
                        console.log(user.gold);
                        user.gold -= possibleUpgrade.upgradeCost;
                        console.log(user.gold)
                    }
                });
            });
            this.worldBlockDIV.appendChild(this.upgradesDIV);


        } else {
            this.worldBlockDIV.innerText = "";
        }
    }
}