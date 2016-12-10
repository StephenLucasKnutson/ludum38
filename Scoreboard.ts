import {Autowired} from "./Autowired";
//http://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
export class Scoreboard {
    autowired: Autowired;
    score: number = 0;
    scoreDiv: HTMLDivElement;
    distanceToWallDiv: HTMLDivElement;

    constructor(autowired: Autowired, element: any) {
        this.autowired = autowired;

        this.scoreDiv = document.createElement('div');
        this.scoreDiv.style.position = 'absolute';
        this.scoreDiv.style.color = "#3E00FF";
        this.scoreDiv.innerHTML = "";
        this.scoreDiv.style.top = '50px';
        this.scoreDiv.style.left = '50px';
        this.scoreDiv.style.fontSize = "100px";
        element.appendChild(this.scoreDiv);

        this.distanceToWallDiv = document.createElement('div');
        this.distanceToWallDiv.style.position = 'absolute';
        this.distanceToWallDiv.style.color = "black";
        this.distanceToWallDiv.innerHTML = "";
        this.distanceToWallDiv.style.top = '150px';
        this.distanceToWallDiv.style.left = '50px';
        this.distanceToWallDiv.style.fontSize = "25px";
        element.appendChild(this.distanceToWallDiv);
    }

    public addScore() {
        this.score++;
    }

    public update() {
        this.scoreDiv.innerText = this.score.toFixed();
        this.distanceToWallDiv.innerText = "Distance to wall: " + this.autowired.firstPersonControls.getDistanceToWall().toFixed(2);
    }
}