class Menu extends Phaser.Scene {
    constructor() {
        super('MenuScene')
    }

    create() {
        console.log("MENU.js || CREATE")
        this.backG=this.add.image(0,0,'Menu').setOrigin(0,0)


      
       
        

        cursors = this.input.keyboard.createCursorKeys()  
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start('playScene')
        }
    }
}