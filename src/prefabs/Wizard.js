class Wizard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Hero to existing scene
        scene.physics.add.existing(this)   // add physics body to scene
        this.setGravityY(2500);                   


        this.body.setSize(this.width/2, this.height )
        //this.body.setCollideWorldBounds(true)

     
        }   

        update(){

            
        }
}