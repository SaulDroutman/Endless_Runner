//modified from paddle parkour
class Evil extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        if( 1+Math.floor((Math.random()*100) %2)==2){
            super(scene, 600, Phaser.Math.Between(100, 350), 'evil1')
        }
        else{
            super(scene, 600, Phaser.Math.Between(100, 350), 'evil2')
        }
        
        this.parentScene = scene               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this)    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this)    // add to physics system
        this.setVelocityX(velocity) 
        this.body.allowGravity = false         // make it go!
        this.newEnemy = true 
        this.body.setSize(this.width/2, this.height )
                
    }

    update() {
        // add new barrier when existing barrier hits center X
        if(this.newEnemy && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addEnemy(this.parent, this.velocity)
            this.newEnemy = false
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy()
        }
    }
}