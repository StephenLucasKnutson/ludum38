import {Autowired} from "./Autowired";
//http://stackoverflow.com/questions/15248872/dynamically-create-2d-text-in-three-js
export class Scoreboard {
    autowired: Autowired;
    score: number = 0;
    highscore: number = 0;
    scoreDiv: HTMLDivElement;
    distanceToWallDiv: HTMLDivElement;
    highscoreDiv: HTMLDivElement;
    helpTextDiv: HTMLDivElement;

    constructor() {
        let element = document.body;

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

        this.highscoreDiv = document.createElement('div');
        this.highscoreDiv.style.position = 'absolute';
        this.highscoreDiv.style.color = "black";
        this.highscoreDiv.innerHTML = "";
        this.highscoreDiv.style.top = '175px';
        this.highscoreDiv.style.left = '50px';
        this.highscoreDiv.style.fontSize = "25px";
        element.appendChild(this.highscoreDiv);

        this.helpTextDiv = document.createElement('div');
        this.helpTextDiv.style.position = 'absolute';
        this.helpTextDiv.style.color = "black";
        this.helpTextDiv.innerHTML = "Press R to try again";
        this.helpTextDiv.style.display = "none";
        this.helpTextDiv.style.fontSize = "50px";
        this.helpTextDiv.style.top = "50%";
        this.helpTextDiv.style.left = "50%";
        this.helpTextDiv.style.marginTop = "-50px";
        this.helpTextDiv.style.marginLeft = "-200px";
        this.helpTextDiv.style.width = "400px";
        this.helpTextDiv.style.height = "100px";
        this.helpTextDiv.style.textAlign = "center";
        this.helpTextDiv.style.verticalAlign = "middle";
        element.appendChild(this.helpTextDiv);
    }

    public addScore() {
        this.score++;
        this.highscore = Math.max(this.score, this.highscore);
    }

    public reset() {
        this.score = 0;
    }

    public update() {
        this.scoreDiv.innerText = this.score.toFixed(0);
        let distanceToWall: number = Math.max(this.autowired.firstPersonControls.getDistanceToWall(), 0.0001);
        distanceToWall = (this.autowired.isGameOver) ? 0 : distanceToWall;
        this.distanceToWallDiv.innerText = "Distance to wall: " + distanceToWall.toFixed(2);
        this.highscoreDiv.innerText = "Highscore: " + this.highscore.toFixed(0);

        this.helpTextDiv.style.display = (this.autowired.isGameOver) ? "initial" : "none";
    }
}