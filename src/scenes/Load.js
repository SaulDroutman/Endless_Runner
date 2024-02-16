//loading scene from paddle parkour
class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.path = './assets/'
        // load graphics assets
        this.load.spritesheet('wizard', 'img/Wizard.png', {
            frameWidth: 24,
            frameHeight: 24,
        })
        this.load.spritesheet('wizardJump', 'img/wizard_jump.png', {
            frameWidth: 24,
            frameHeight: 24,
        })

        this.load.image('colors', 'img/colors.png')
        this.load.image('background', 'img/background.png')
        this.load.image('keys', 'img/keys.png')
        this.load.image('blkKeys', 'img/blackKeys.png')
        this.load.image('keyTop', 'img/keyTop.png')
        this.load.image('Menu', 'img/MenuScreen.png')
        this.load.image('Title', 'img/Name.png')
        this.load.image('evil1', 'img/evilNote1.png')
        this.load.image('evil2', 'img/evilNote2.png')
        
        // load audio assets
        this.load.audio('beat', 'sound/drumLoop.mp3')
        this.load.audio('note1', 'sound/note_1.mp3')
        this.load.audio('note2', 'sound/note_2.mp3')
        this.load.audio('note3', 'sound/note_3.mp3')
        this.load.audio('note4', 'sound/note_4.mp3')
        this.load.audio('note5', 'sound/note_5.mp3')
        this.load.audio('note6', 'sound/note_6.mp3')
        this.load.audio('note7', 'sound/note_7.mp3')
        this.load.audio('note8', 'sound/note_8.mp3')

        console.log("LOAD.js || PRELOAD")
    }

    create() {
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('wizard', { frames: [ 0, 1, 2, 3 ] }),
            frameRate: run_speed,
            repeat: -1
        })
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('wizardJump', { frames: [ 0]}),
            frameRate: run_speed,
            repeat: -1
        })
        
        this.scene.start('MenuScene')
    }
}