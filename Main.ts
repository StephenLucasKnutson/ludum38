/// <reference path="definitions/underscore.d.ts" />

import {Autowired} from "./Autowired";
import Vector2 = THREE.Vector2;


class Main {
    autowired: Autowired;

    constructor() {
        this.autowired = new Autowired();
    }

    render = () => {
        this.autowired.userControls.update();
        this.autowired.simulator.update();
        this.autowired.ai.update();
        this.autowired.ui.update();

        let winning: boolean = true;
        let defeated: boolean = true;
        let player = this.autowired.simulator.playerCharacter;
        for (let i = 0; i < this.autowired.WIDTH; i++) {
            for (let j = 0; j < this.autowired.HEIGHT; j++) {
                let worldBlock = this.autowired.world.getMap(new Vector2(i, j));
                let owner = worldBlock.getOwningPlayer();
                winning = winning && (owner == null || owner == player);
                defeated = defeated && (owner != player);
            }
        }
        if(winning) {
            alert('You defeated all enemies to win. Congratulations! Thanks for playing! Refresh the page to play again!')
        }
        if(defeated) {
            alert('You have been defeated. Sorry! Thanks for playing! Refresh the page to play again!')
        }

        this.autowired.renderer.render(this.autowired.scene, this.autowired.camera);
        if(!winning && !defeated){
            requestAnimationFrame(this.render);
        }
    };
}
let main: Main = new Main();
main.render();