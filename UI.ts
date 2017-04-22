import {Autowired} from "./Autowired";
//http://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
export class UI {
    autowired: Autowired;
    scoreDiv: HTMLDivElement;
    worldBlockDIV: HTMLDivElement;

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
        let gold : string = "TOTAL GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.gold);
        let goldPerTurn : String = "RATE OF GOLD: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalGold());
        let units: string = "UNITS ALIVE: " + this.nf.format(this.autowired.simulator.playerCharacter.playerStats.totalUnits());
        let kills: string = "TOTAL KILLS: " + this.nf.format(this.autowired.simulator.playerCharacter.kills);
        let deaths: string = "TOTAL DEATHS: " + this.nf.format(this.autowired.simulator.playerCharacter.deaths);
        this.scoreDiv.innerText =  [gold, goldPerTurn, units, kills, deaths].join('\n');

        let selected = this.autowired.world.selectedWorldBlock;
        if(selected) {
            let selectedOwner = selected.owningPlayer;
            let tileType: string = "TYPE: " + selected.tileType.name;
            let player: string = "OWNER: " + ((!!selectedOwner) ? selectedOwner.name : "NONE");
            let rateOfGold: string = "GOLD GENERATED: " + selected.tileType.goldPerTurn;
            this.worldBlockDIV.innerText = [tileType, player, rateOfGold].join('\n');
        } else {
            this.worldBlockDIV.innerText = "";
        }

    }
}