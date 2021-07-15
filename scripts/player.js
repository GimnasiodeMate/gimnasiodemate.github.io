
class Player extends Entity {
	constructor(scene, x, y, textureKey, health){
		
		super(scene,x,y,textureKey,'Player')


		const animFrameRate = 20
		const anims = scene.anims
        this.health = health
        this.setScale =(0.5);
        this.facing= 'down'
        this.speed = 200;
        this.velocidades = [0.03,0.03,0.25]
        this.status = false;
        


/// Izquierda
        anims.create({
                key: 'Izquierda',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 4,
                end: 6,
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
                start: 8,
                end: 10,
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
                start: 11,
                end: 13,
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
                start: 4,
                end: 6,
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
                start: 4,
                end: 6,
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
                start: 8,
                end: 10,
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
                start: 4,
                end: 6,
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
                start: 11,
                end: 13,
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



        ///////////////////////////
        //// controles con Joystick
        var potenciaX = this.scene.joystick.potenciaX;
        var potenciaY = this.scene.joystick.potenciaY;
        var velocidadActual;



        if (potenciaX != 0 || potenciaY !=0) { // alguien esta movieno el joystick
                this.subiendo = true;
                if (this.scale < 0.8){this.scale =(despegar(this.scale));} // si esta chiquitito solo crezca
                if (0.4 < this.scale){   velocidadActual = acelera(this.velocidades[1],this.velocidades[2]);
                    //si esta mas grande que 0.4 empieza a moverse

                    this.velocidades[1] = velocidadActual;
                    this.x += potenciaX * velocidadActual;//vel actual
                    this.y -= potenciaY * velocidadActual;}
        }else{this.velocidades[1]=this.velocidades[0];
             this.subiendo = false; }
            // si sueltan el mouse entonces se resetea la velocidad

        
        const {keys} = this //output: this.keys
       // let speed = this.speed
        const previousVelocity = this.body.velocity.clone() // es para saber de donde venia

       // this.body.setVelocity(0)
        //movement

        this.body.velocity.normalize().scale(this.speed)

        //animations


        if (valAbsoluto(potenciaY) > 0) {
      
          
            if (valAbsoluto(potenciaX) > valAbsoluto(potenciaY)){  
                    if (potenciaX>0){   // nos movemos hacia la derecha
                                        this.anims.play('Derecha', true)
                                        this.setRotation(3.14/2);

                                             }else{  //nos movemos hacia la izquierda
                                                    this.anims.play('Izquierda', true);
                                                    this.setRotation(-3.14/2);
                                                    
                                                     }
            }else   if (potenciaY>0){ this.anims.play('Arriba',  true);
                                      this.setRotation(0);
                                    }else{ this.anims.play('Abajo', true);
                                              this.setRotation(0);
                                            }
            
           }else { // si no hay potencia... aterrice
          
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
       
         //if (valAbsoluto(potenciaX) > 1){this.scene.cameras.zoo}

	}/// Fin de UPDATE



    }

    function acelera(current,max){
      
        if (current < max){current+= 0.001}
        
    return current
    }

    function aterriza(escala){
        if (0.15 < escala){escala *=0.99
        }
                    return escala}
        
    function despegar(escala){
        if (escala < 1.5){escala *=1.01}
                    return escala}

    function efectos_de_sonido(escala,escena){
       
    escena.sonido_helicoptero.volume = escala;
    if ( !this.playing){ escena.sonido_helicoptero.play();
                                     this.playing = true }
  }

     function valAbsoluto(a){
        if (a<0){a=-a}
        return a;
      }