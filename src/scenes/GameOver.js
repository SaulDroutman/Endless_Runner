//loading scene from paddle parkour
class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create(){
        this.select = this.sound.add('select');
        

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
                left:10
            },
            }
        this.add.image(0,0,'GameOver').setOrigin(0)
        console.log("you died your score was %d",10)
        this.add.text(292,292,score,scoreConfig)
        cursors = this.input.keyboard.createCursorKeys()  
    }


    
    

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.select.play();
            this.scene.start('playScene')
            
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.select.play();
            this.scene.start('MenuScene')
        }
      

    }

}