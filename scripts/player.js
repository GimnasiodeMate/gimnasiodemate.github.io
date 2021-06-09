
class Player extends Entity {
	constructor(scene, x, y, textureKey, health){
		
		super(scene,x,y,textureKey,'Player')


		const animFrameRate = 10
		const anims = scene.anims
        this.health = health
        this.facing= 'down'
        this.speed = 200;



/// Izquierda
        anims.create({
                key: 'Izquierda',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 12,
                end: 17,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        })

/// Abajo
        anims.create({
                key: 'Abajo',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 18,
                end: 23,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        })      

/// Derecha
        anims.create({
                key: 'Derecha',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 6,
                end: 11,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        })

/// Arriba
        anims.create({
                key: 'Arriba',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 0,
                end: 5,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        }),
/// Arriba_stop
        anims.create({
                key: 'Arriba_stop',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 2,
                end: 2,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        }),
/// Abajo_stop
        anims.create({
                key: 'Abajo_stop',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 18,
                end: 18,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        }),
/// Izquierda_stop
        anims.create({
                key: 'Izquierda_stop',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 12,
                end: 12,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        }),
/// Derecha_stop
        anims.create({
                key: 'Derecha_stop',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 6,
                end: 6,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        }),



    this.anims.play('Abajo_stop', true)  
    //this.body.setVelocity(0,this.speed)

        const {LEFT,RIGHT,UP,DOWN,W,A,S,D} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        })



   
	} // final del constructor 


	update(){

        
        const {keys} = this //output: this.keys
       // let speed = this.speed
        const previousVelocity = this.body.velocity.clone() // es para saber de donde venia

       // this.body.setVelocity(0)
        //movement

        if (keys.left.isDown || keys.a.isDown) {
           this.scale = despegar(this.scale);
           if (0.5 < this.scale){   this.speed = acelera(this.speed);
                                    this.body.setVelocityX(-this.speed)}
           
           
        } else if (keys.right.isDown || keys.d.isDown) {
             this.scale = despegar(this.scale);
            if (0.5 < this.scale){  this.speed = acelera(this.speed);
                                    this.body.setVelocityX(this.speed);}
        }

        if (keys.up.isDown || keys.w.isDown) {
            this.scale = despegar(this.scale);
            if (0.5 < this.scale){  this.speed = acelera(this.speed);
                                    this.body.setVelocityY(-this.speed)}
            
        } else if (keys.down.isDown || keys.s.isDown) {
            this.scale = despegar(this.scale);
            if (0.5 < this.scale){  this.speed = acelera(this.speed);
                                    this.body.setVelocityY(this.speed)}
            
        }

        this.body.velocity.normalize().scale(this.speed)

        //animations
        if (keys.up.isDown || keys.w.isDown) {
            this.anims.play('Arriba', true)
            this.facing = 'up'
        } else if (keys.down.isDown || keys.s.isDown) {
            this.anims.play('Abajo', true)
            this.facing = 'down'
        } else
        if (keys.left.isDown || keys.a.isDown) {
            this.anims.play('Izquierda', true)
            this.facing = 'left'
        } else if (keys.right.isDown || keys.d.isDown) {
            this.anims.play('Derecha', true)
            this.facing = 'right'
        } else {
            //this.anims.stop()
             this.speed = 200; // resetea aceleracion
             this.body.setVelocity(0)
             this.scale = aterriza(this.scale);
            
        }   
  
        //set idle animations
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) { // si se detiene ¿Qué debe hacer?
            //show idle anims
            

            if (previousVelocity.x < 0) {
               
                this.anims.play('Izquierda', true);
              
            } else if (previousVelocity.x > 0) {
                this.anims.play('Derecha', true)
            } else if (previousVelocity.y < 0) {
                this.anims.play('Arriba', true)
            } else if (previousVelocity.y > 0) {
                this.anims.play('Abajo', true)
            }
        }

         efectos_de_sonido(this.scale, this.scene);
	}/// Fin de UPDATE



    }

    function acelera(vel){
        let factor = 1;
        let maxVel = 500;
        
        if (vel<maxVel){vel += 3;}
        return vel;               
}

    function aterriza(escala){
        if (0.15 < escala){escala *=0.99}
                    return escala}
        
    function despegar(escala){
        if (escala < 1.5){escala *=1.01}
                    return escala}

    function efectos_de_sonido(escala,escena){
       
    escena.sonido_helicoptero.volume = escala;
    if ( !this.playing){ escena.sonido_helicoptero.play();
                                      this.playing = true }

 


    }