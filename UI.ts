import {Autowired} from "./Autowired";
//http://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
export class UI {
    autowired: Autowired;
    scoreDiv: HTMLDivElement;

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


    }

    public update() {
        let gold : string = "total gold: " + this.autowired.simulator.playerCharacter.gold.toFixed(0);
        let goldPerTurn : String = "gold per turn: " + this.autowired.simulator.playerCharacter.playerStats.totalGold();
        let units: string = "total units: " + this.autowired.simulator.playerCharacter.playerStats.totalUnits();
        this.scoreDiv.innerText =  [gold, goldPerTurn, units].join('\n')
    }
}