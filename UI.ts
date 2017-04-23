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
        this.scoreDiv.innerHTML = "";
        this.scoreDiv.style.top = '25px';
        this.scoreDiv.style.left = '25px';
        this.scoreDiv.style.fontSize = "20px";
        element.appendChild(this.scoreDiv);

        this.worldBlockDIV = document.createElement('div');
        this.worldBlockDIV.style.position = 'absolute';
        this.worldBlockDIV.innerHTML = "";
        this.worldBlockDIV.style.top = '30%';
        this.worldBlockDIV.style.left = '25px';
        this.worldBlockDIV.style.fontSize = "20px";
        element.appendChild(this.worldBlockDIV);

        this.upgradesDIV = document.createElement('div');
        this.upgradesDIV.style.position = 'absolute';
        this.upgradesDIV.innerHTML = "";
        this.upgradesDIV.style.top = '60%';
        this.upgradesDIV.style.left = '25px';
        this.upgradesDIV.style.fontSize = "20px";
        element.appendChild(this.upgradesDIV);
    }

    nf = new Intl.NumberFormat();

    public update() {
        let self = this;
        let gold: string = "TOTAL GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.gold);
        let goldPerTurn: String = "RATE OF GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalGoldPerTurn());
        let units: string = "UNITS ALIVE: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalUnits());
        let kills: string = "TOTAL KILLS: " + this.nf.format(this.autowired.simulator.playerCharacter.kills);
        let deaths: string = "TOTAL DEATHS: " + this.nf.format(this.autowired.simulator.playerCharacter.deaths);
        this.scoreDiv.innerText = [gold, goldPerTurn, units, kills, deaths].join('\n');

        let selected = this.autowired.world.selectedWorldBlock;
        if (selected) {
            let selectedOwner = selected.getOwningPlayer();
            let tileTypeString: string = "TYPE: " + selected.tileType.name;
            let player: string = "OWNER: " + ((!!selectedOwner) ? selectedOwner.name : "NONE");
            let rateOfGold: string = "GOLD GENERATED: " + this.nf.format(selected.tileType.goldPerTurn);
            let rateOfUnits: string = "UNITS GENERATED: " + this.nf.format(selected.tileType.chanceToSpawn);
            this.worldBlockDIV.innerText = [tileTypeString, player, rateOfGold, rateOfUnits].join('\n');

            let tileType = selected.tileType;
            let user = self.autowired.simulator.playerCharacter;

            self.upgradesDIV.innerHTML = '';
            $('<div>POSSIBLE UPGRADES: </div>').appendTo(self.upgradesDIV);
            _(tileType.possibleUpgrades).each(function (possibleUpgrade: TileType) {
                let button: HTMLButtonElement = document.createElement('button');
                button.classList.add('btn');
                button.classList.add('btn-secondary');
                button.classList.add('btn-sm');
                button.disabled = user.gold < possibleUpgrade.upgradeCost;
                button.innerText = possibleUpgrade.name + ' for ' + self.nf.format(possibleUpgrade.upgradeCost) + ' gold';
                self.upgradesDIV.appendChild(button);
                self.upgradesDIV.appendChild(document.createElement('br'));
                button.onmousedown = (event) => {
                    //alert();
                    if (user.gold >= possibleUpgrade.upgradeCost) {
                        selected.setTileType(possibleUpgrade);
                        user.gold -= possibleUpgrade.upgradeCost;
                    }
                };

            });
        } else {
            this.worldBlockDIV.innerText = "";
            this.upgradesDIV.innerHTML = '';
        }
    }
}