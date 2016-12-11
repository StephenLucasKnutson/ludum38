import {Autowired} from "./Autowired";
export class MyMaterials {
    autowired: Autowired;
    wallMaterial: CANNON.Material;
    playerMaterial: CANNON.Material;
    cubeMaterial: CANNON.Material;

    slipperyMaterial: CANNON.Material;

    constructor(autowired: Autowired) {
        this.autowired = autowired;
        this.wallMaterial = new CANNON.Material("wallMaterial");
        this.playerMaterial = new CANNON.Material("playerMaterial");
        this.cubeMaterial = new CANNON.Material("cubeMaterial");
        this.slipperyMaterial = new CANNON.Material("slipperyMaterial");

        this.autowired.world.addContactMaterial(
            new CANNON.ContactMaterial(
                this.slipperyMaterial,
                this.playerMaterial,
                {
                    friction: 0.7,
                    restitution: 0.0
                }
            )
        );

        /*
         this.world.addContactMaterial(
         new CANNON.ContactMaterial(
         this.cubeMaterial,
         this.slipperyMaterial,
         {
         friction: 0.2,
         restitution: 0.0
         }
         )
         );*/

        //this.world.addContactMaterial(new CANNON.ContactMaterial(this.wallMaterial, this.playerMaterial, { friction: 0.0, restitution: 0.0 }));
        //this.world.addContactMaterial(new CANNON.ContactMaterial(this.wallMaterial, this.cubeMaterial, { friction: 0.0, restitution: 0.0 }));
        //this.world.addContactMaterial(new CANNON.ContactMaterial(this.playerMaterial, this.cubeMaterial, { friction: 0.0, restitution: 0.0 }));
    }
}