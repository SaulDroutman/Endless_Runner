class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.enemySpawnDelay = 2500
        console.log("PLAY.js || INIT")
        this.JUMP_VELOCITY = -700
        this.MAX_JUMPS = 2
       // this.physics.world.gravity.y = 2500
        this.low=100
        this.high =350
        this.score=0
        this.gameDone=false;
    
    }

    create() {
        // display score
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

        

        this.backgroundMusic = this.sound.add('beat');
        this.backgroundMusic.loop = true; 
        this.backgroundMusic.play();
        this.add.image(0,0,'background').setOrigin(0)
        this.colors=this.add.tileSprite(0, 0, 640, 640, 'colors').setOrigin(0, 0)
        this.keys = this.physics.add.sprite(0,-80,'keys').setOrigin(0)
        this.keys.body.setSize(this.keys.width, this.keys.height/4 )
        this.keys.setOffset(0, 450)
        this.keys.setImmovable()
        this.keys.body.allowGravity = false
        this.keyTop=this.add.tileSprite(0, -80, 640, 640, 'keyTop').setOrigin(0, 0)


        this.player = new Wizard (this,100,100,'wizard').setOrigin(0.5, 0).setScale(3)

        this.physics.add.collider(this.player,this.keys, (player,keys)=> {
            if(!this.touching){
                this.num= 1+Math.floor((Math.random()*100) %8 )
                
                this.sound.play('note'+this.num)
            }
            this.touching =true
        });

        this.scoreLeft = this.add.text(10, 20, this.score, scoreConfig)
        cursors = this.input.keyboard.createCursorKeys() 


        //from paddle parkour
        this.Enemygroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        })
        // wait a few seconds before spawning barriers
        this.time.delayedCall(this.enemySpawnDelay, () => { 
            this.addEnemy() 
        })

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        })

        this.physics.add.collider(this.player,this.Enemygroup, (player,enemy)=> {
            console.log("your dead")
            this.gameOver()
        });

    }


    update() {
        if(!this.gameDone){
            this.score++;
        }
        this.scoreLeft.tint = Math.random() * 0xFFFFFF
        this.scoreLeft.text = this.score
        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        this.colors.tilePositionX += run_speed/6
        this.keyTop.tilePositionX += run_speed/3


        //from movement studies 

        // check if player is grounded
	    this.player.isGrounded = this.player.body.touching.down
	    // if so, we have jumps to spare
	    if(this.player.isGrounded) {
            this.player.anims.play('run', true)
	    	this.jumps = this.MAX_JUMPS
	    	this.jumping = false
	    } else {
	    	this.player.anims.play('jump')
	    }

        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	     if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
	         this.player.body.velocity.y = this.JUMP_VELOCITY
	         this.jumping = true
             this.touching =false
	       
	     } 
        // // finally, letting go of the UP key subtracts a jump
        // // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	     if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	     	this.jumps--
	     	this.jumping = false
	     }

       
    }

  // create new barriers and add them to existing barrier group
  addEnemy() {
    let speedVariance =  Phaser.Math.Between(0, 50)
    let enemy = new Evil(this, -enemySpeed -speedVariance).setScale(2)
    //enemy.setGravityY(0);
    this.Enemygroup.add(enemy)
}

gameOver(){
    this.backgroundMusic.stop();
    this.player.anims.stop
    this.touching =true
    

}

}

