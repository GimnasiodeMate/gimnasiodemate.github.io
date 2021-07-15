

class GameScene extends Phaser.Scene {
    constructor() {

        super('GameScene')
    }

    preload() {  // se carga antes de empezar el programa

       

        this.cursors
        this.cameras.main.setBackgroundColor(0x00000)
        this.scene.width = window.width;

        //////////////////////////////
        // PRELOAD  TILEMAPS
 
            this.load.image('mapatico_tiles', '../assets/imgs/tilemaps/CostaRicaMap2.png')
            this.load.image('mapita', '../assets/imgs/tilemaps/MapCostaRica.webp')
            this.load.tilemapTiledJSON('map', '../assets/sprites/Tilemap/CostaRicaMap2.json')


        //////////////////////////////
        // PRELOAD AUDIO FILES   
 
            this.load.audio('sonido_helicoptero','../assets/snds/helicoptero.mp3')
            
           
        /////////////////////////////////////
        // PRELOAD SPRITESHEETS ANIMACIONES  

           
            this.load.atlas('animHelicoptero', '../assets/sprites/chopper.webp', '../assets/sprites/chopper.json')
            this.load.atlas('anim_msgbox', '../assets/sprites/boss.png', '../assets/sprites/boss.json')


         //////////////////////////////
        // PRELOAD del juego anterior        
           
            this.load.image('bullet', '../assets/bullet.png')
            this.load.image('particle', '../assets/particle.png')
           
         //////////////////////////////
        // PRELOAD IMAGENES ESTATICAS

            this.load.image('cartesiano', '../assets/imgs/cartesiano.webp')
            this.load.image('basePad', '../assets/imgs/basepad.webp')
            this.load.image('mandoPad', '../assets/imgs/mando.webp')
            this.load.image('msgbox', '../assets/imgs/msgbox1.png')
            this.load.image('icono_eje', '../assets/imgs/cart_icon.png')
            this.load.image('icono_eje', '../assets/imgs/cart_icon.png')

        ///////////////////////////////
        // FUENTES DE TEXTO

             this.load.bitmapFont('desyrel', '../assets/fonts/gothic.png', '../assets/fonts/gothic.xml');
         
        /////////////////////////////////////////////
        //// DECLARACION DE VARIABLES DE GAMSESCENE

        /////////////// TECLAS 
        this.keys
         
        ////////////// PLAYER 
        this.player
        
        ///////////// ENEMIGOS        
        this.enemy
        this.enemies

        ///////////// HEALTBAR
        this.healtbar

        ///////////// PROYECTILES
        this.proyectiles
        this.lastFiredTime = 0
        this.emitter
        

        /////////// DEL JUEGO ANTERIOR
        this.estatua

        /////////// VARIABLES GLOBALES
        this.filtro_clicked = false
        this.msgbox_visible = false

        //////////// CUADRO DE MENSAJES
        this.msgbox
        this.msgbox_icon

        ///////////// SONIDOS
        this.sonido_helicoptero







        } // << END PRELOAD END PRELOAD   END PRELOAD END PRELOAD   END PRELOAD END PRELOAD   END PRELOAD END PRELOAD

  

    create() {
    //if (!game.device.desktop){ game.input.onDown.add(gofull, this); } //go fullscreen on mobile devicesd
    this.game.scale.refresh();
    this.primeraVez = true;
    this.lugarAterrizaje;
    this.escenariodejuego;


        /////////////////////////////////////
        // CREANDO EL TILEMAP 


            this.mapatico = this.physics.add.staticImage (0,0,'mapita');
            this.mapatico.setOrigin(0);
            this.mapatico.setScale(2.5);

             // const map = this.make.tilemap({key: 'map'})

            // const mapatico = map.addTilesetImage('sheetsmapa1','mapatico_tiles')
            // /// despliego las capas
                //  const capaMar = map.createStaticLayer('Mar', this.mapatico, 0, 0)
                // const capaMapa = map.createStaticLayer('MapaOk', this.mapatico, 0, 0)


        ////////////////////////////////
        // INICIALIZAR LA CAMARA


            this.physics.world.bounds.width = 2313*2.5;
            this.physics.world.bounds.height = 1584*2.5; //multiplico por la escala;
            this.cameras.main.setBounds(0, 0,2313*2.5, 1584*2.5)
            this.cameras.main.setZoom(0.5)
         

        ///////////////////////////////
        // CREATE PLAYER
         
            this.player = new Player(this,490,1900, 'animHelicoptero',100)
            this.player.body.setCollideWorldBounds(true)       //COLISIONES 
            this.cameras.main.startFollow(this.player, true, 0.8, 0.8) // LO SIGUE LA CAMARA
     

        ///////////////////////////////
        // CREATE ENEMY

           


            //     this.physics.add.collider(this.enemies, worldLayer)
    
            ///////////////////////////////////////////
            // COLISIONES DE LOS ENEMIGOS CON EL PLAYER

          

             //////////////////////////
             //healthbar

              this.healthbar = new Healthbar(this, 20,18,100)


             /////////////////
             // Proyectiles

             //INPUT
                this.keys = this.input.keyboard.addKeys({space:'SPACE' })
                this.proyectiles = new Proyectiles(this)
                this.physics.add.collider(this.proyectiles,  this.mapatico, this.handleProyectileWorldCollision, null, this)
                           


            /////////////////////
            //// ANIMACION DE DESTRUCCION

            this.emitter = this.add.particles('particle').createEmitter({
            x:200,
            y:200,
            quantity:15,    
            speed: {min:-100, max:100},
            angle: {min:0, max:360},
            scale: {start:1,end:0},
            lifespan:300,
            active:false
             })

   

/////////////////////
/// filtro Eje Cartesiano
    
        // this.filtro = this.physics.add.staticImage(1800, 1600, 'cartesiano');
        // this.filtro.setScale(5);

        // this.filtro.visible = false

///////////////////
/// Cuadro Mensaje
     

       var mensaje1 = "Tenemos un llamado de Auxilio de la Isla de Chira \n Ubicada en Coordenadas Cartesianas->\n x = -8, y = 5"
    
        this.msg_girl = new MsgBox(this,'anim_msgbox',mensaje1 )



/////////////////////
/// ZOOM
        let zoom =0.5
        // zoom = 1/this.speed

       
   
      
/////////////////////
/// efectos de sonido
    this.sonido_helicoptero = this.sound.add('sonido_helicoptero');
    this.sonido_helicoptero.loop = true;
 // this.sonido_helicoptero = this.sound.add('gritomono');
   

////////////////////
/// CREA JOYSTICK
    this.joystick = new Joystick(this,700,2300,'basePad');


    // this.cameras.main.startFollow(this.player)

// create texto
   // this.dynamic1 = this.add.bitmapText(500, 1660, 'desyrel', 'Costa Rica', 300);




 } ////end create

///////////////////////////////////////////////////////////////////////////////////////


handleProyectileWorldCollision(p){



//p.recycle()                       //si quisiera hacerlo dentro de la clase
this.proyectiles.killAndHide(p)       // si quiero que el parent class lo maneje
}

handleProyectileEnemyCollision(enemy,proyectil){
    if (proyectil.active){ // solo para evitar que se caiga el programa
        enemy.setTint(0xff0000)
        this.time.addEvent({
            delay: 30,
            callback:()=>{
                enemy.explode()
                proyectil.recycle()
            },
            callbackScope: this,
            loop:false
            })
        this.emitter.setPosition(enemy.x, enemy.y) // funcion para cambiar x & y
        this.emitter.active = true
        this.emitter.explode()
     
       
    }
}

handleObjectsCollision(player,){
    if (proyectil.active){ // solo para evitar que se caiga el programa
        enemy.setTint(0xff0000)
        this.time.addEvent({
            delay: 30,
            callback:()=>{
                enemy.explode()
                proyectil.recycle()
            },
            callbackScope: this,
            loop:false
            })
        this.emitter.setPosition(enemy.x, enemy.y) // funcion para cambiar x & y
        this.emitter.active = true
        this.emitter.explode()
   
       
    }
}


handlePlayerEnemyCollision(p,e){
    p.health -= e.damage
 
    if (p.health <= 0){
                        this.cameras.main.shake(100,0.05)
                        this.cameras.main.fade(250,0,0,0)
                        this.cameras.main.once('camerafadeoutcomplete',()=>{      
                        this.scene.restart()
                            
                        })
    }

    this.healthbar.updateHealth(p.health)
    this.cameras.main.shake(40,0.02) // para vibrar la camara!
    p.setTint(0xff0000)
    this.time.addEvent({ // timer de phaser
                        delay:500, // 500 miliseconds
                        callback: ()=>{
                        p.clearTint()
                        },
                            callbackScope: this,
                            loop:false
        })
    
    e.explode()
    }

 
    update(time, delta) { // tiempo desde que empezo el programa // delta desde el ultimo last frame cicle?
        
        //REVISA QUE ESTE EN LA UBICACION CORRECTA Y SUFICIENTEMENTE ABAJO


    console.log('x'+this.player.x);
    console.log('y'+this.player.y);


            if (3074 < this.player.x && this.player.x < 3674 && 1390 < this.player.y &&  this.player.y < 1790 && this.player.scale < 0.3)
                {   this.lugarAterrizaje = 'SanJose';
                    console.log('estoy en San Jose')
                     this.scene.start('AterrizaScene');}





            else if (1650 < this.player.x && this.player.x < 2050 && 935 < this.player.y &&  this.player.y < 1352 && this.player.scale < 0.3)
                {   this.lugarAterrizaje = 'PaloVerde';
                    console.log('estoy en Palo Verde')
                     this.scene.start('AterrizaScene');}

           

           else if (3700 < this.player.x && this.player.x < 4100 && 1935 < this.player.y &&  this.player.y < 2335 && this.player.scale < 0.3)
                {   this.lugarAterrizaje = 'Chirripo';
                    console.log('estoy en chirripo')
                     this.scene.start('AterrizaScene');}

            else if (1100 < this.player.x && this.player.x < 1500 && 220 < this.player.y &&  this.player.y < 620 && this.player.scale < 0.3)
                {   this.lugarAterrizaje = 'SantaRosa';
                    this.scene.start('AterrizaScene');}



            else if (2400 < this.player.x && this.player.x < 2700 && 800 < this.player.y &&  this.player.y < 1200 && this.player.scale < 0.3)
                {   this.lugarAterrizaje = 'Arenal';
                    console.log('estoy en arenal')
                     this.scene.start('AterrizaScene');}


          
            else if (1201 < this.player.x && this.player.x < 1401 && 371 < this.player.y &&  this.player.y < 571 && this.player.scale < 0.3)
                {   this.lugarAterrizaje = 'CanoNegro';
                    console.log('estoy en cano negro') 
                    this.scene.start('AterrizaScene');}

            else if (3800 < this.player.x && this.player.x < 4200 && 3050 < this.player.y &&  this.player.y < 3450 && this.player.scale < 0.3)
                {   this.lugarAterrizaje = 'Corcovado';
                    console.log('estoy en corcovado');
                    this.scene.start('AterrizaScene');}



             if (220 < this.player.x && this.player.x < 620 && 2150 < this.player.y &&  this.player.y < 2450 && this.player.scale < 0.3)
                {   console.log('estoy en la isla del coco');
                    this.escenariodejuego = 1;
                    this.scene.start('RescateScene');}

             if (1795 < this.player.x && this.player.x < 2195 && 1750 < this.player.y &&  this.player.y < 2150 && this.player.scale < 0.3)
                {   console.log('estoy en la isla del caboblanco');
                    this.escenariodejuego = 'PaloVerde';
                    this.scene.start('RescateScene');}








            // console.log('x :'+ this.player.x);
            // console.log('y :'+ this.player.y); 

        // MANEJA LOS ZOOM

        // SI VELOCIDAD ES CERO ENTONCES ZOOM DISMINUYE

        // SI ESCALA ES PEQUEÑA ENTONCES NO SE MUEVA


        
      
        var elzoom =  this.cameras.main.zoom

        // if (this.player.speed < 200 && elzoom < 0.6){
        //     elzoom *=1.01;}
        // if (this.player.speed > 200 && elzoom > 0.1){
        //     elzoom *= 0.99;}    
         
        
        if (!this.player.subiendo && elzoom<0.6 ) {elzoom*=1.005;}
        if (this.player.subiendo && elzoom>0.4) {elzoom*=0.995;}
          

          

         this.cameras.main.setZoom(elzoom)
     // console.log('elzoom:'+ elzoom)
     // console.log('zoom player:'+ this.player.scale);
     // console.log(this.player.body.acceleration);

        this.msg_girl.update_Msg_Pos(elzoom); // actualiza la posicion



        ////// update del joystick

              //if (this.game.input.pointer1.isDown){console.log('tocado');}

                //detectar toques mobiles
                var touchx = -1; var touchy = -1; //-1 es el valor de false, de que no se usa
                if(this.game.input.pointers[1].isDown){
                touchx = this.game.input.pointers[1].position.x; 
                touchy = this.game.input.pointers[1].position.y;}

          



                this.joystick.joystickUpdate(elzoom,touchx,touchy)
               if (!this.input.activePointer.isDown){ this.joystick.isClicked = false}


     

         if ( 900< this.player.x && this.player.x < 1040 && 1300 < this.player.y && this.player.y < 1425 && this.player.scale < 0.3)
            { this.scene.start('AterrizaScene');} // PARA LLAMAR NUEVA ESCENA



//924 1375
        
        if (this.keys.space.isDown){
            
             this.sonido_helicoptero.play();

           
            if (time > this.lastFiredTime){
                this.lastFiredTime = time+500 // para espaciar los disparos
                this.proyectiles.fireProyectil(this.player.x, this.player.y, this.player.facing)
            }
            
        }

        this.player.update();
   



      


    } //end update


} //end gameScene