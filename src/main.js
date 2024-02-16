let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
     scale: {
       autoCenter: Phaser.Scale.CENTER_BOTH
     },
     render:{
      pixelArt: true
  },
    physics: {
      default: 'arcade',
      arcade: {
          debug: true,
          gravity: {
              x: 0,
              y: 0
          }
      }
  },
    scene:[Load,Menu,Play,GameOver]
  }
let game = new Phaser.Game(config)

//setting global variables
// define globals
let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
const textSpacer = 64

let run_speed=8
let enemySpeed=200
let cursors
let highScore=0
let score

//Creatve tilt
//Let the player create music by playing random notes in key
//to create a lead for the drum beat in the background