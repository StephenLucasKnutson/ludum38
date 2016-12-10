export class MyMaterials {
    world: CANNON.World;
    wallMaterial: CANNON.Material;
    playerMaterial: CANNON.Material;
    cubeMaterial: CANNON.Material;

    slipperyMaterial: CANNON.Material;

    constructor(world: CANNON.World) {
        this.world = world;
        this.wallMaterial = new CANNON.Material("wallMaterial");
        this.playerMaterial = new CANNON.Material("playerMaterial");
        this.cubeMaterial = new CANNON.Material("cubeMaterial");
        this.slipperyMaterial = new CANNON.Material("slipperyMaterial");

        /*this.world.addContactMaterial(
         new CANNON.ContactMaterial(
         this.slipperyMaterial,
         this.slipperyMaterial,
         {
         friction: 0.4,
         restitution: 0.3,
         contactEquationStiffness: 1e8,
         contactEquationRelaxation: 3,
         frictionEquationStiffness: 1e8,
         frictionEquationRelaxation: 3
         }
         )
         );

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