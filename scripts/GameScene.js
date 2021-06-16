

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
            this.load.tilemapTiledJSON('map', '../assets/sprites/Tilemap/CostaRicaMap2.json')


        //////////////////////////////
        // PRELOAD AUDIO FILES   
 
             this.load.audio('sonido_helicoptero','../assets/snds/helicoptero.mp3')

        /////////////////////////////////////
        // PRELOAD SPRITESHEETS ANIMACIONES  

           
            this.load.atlas('animHelicoptero', '../assets/sprites/helic.png', '../assets/sprites/helic.json')
            this.load.atlas('anim_msgbox', '../assets/sprites/boss.png', '../assets/sprites/boss.json')


         //////////////////////////////
        // PRELOAD del juego anterior        
            this.load.atlas('tpOffline', '../assets/sprites/skeleton.png', '../assets/sprites/skeleton.json')
            this.load.image('bullet', '../assets/bullet.png')
            this.load.image('particle', '../assets/particle.png')
          
 
         //////////////////////////////
        // PRELOAD IMAGENES ESTATICAS

            this.load.image('cartesiano', '../assets/imgs/cartesiano.webp')
            this.load.image('msgbox', '../assets/imgs/msgbox1.png')
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
        

     
        /////////////////////////////////////
        // CREANDO EL TILEMAP 

            const map = this.make.tilemap({key: 'map'})

            const mapatico = map.addTilesetImage('sheetsmapa1','mapatico_tiles')
            /// despliego las capas
                const capaMar = map.createStaticLayer('Mar', mapatico, 0, 0)
                const capaMapa = map.createStaticLayer('MapaOk', mapatico, 0, 0)


        ////////////////////////////////
        // INICIALIZAR LA CAMARA


            this.physics.world.bounds.width = map.widthInPixels
            this.physics.world.bounds.height = map.heightInPixels
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
            this.cameras.main.setZoom(1)
         

        ///////////////////////////////
        // CREATE PLAYER
         
            this.player = new Player(this,200,2420, 'animHelicoptero',100)
            this.player.body.setCollideWorldBounds(true)       //COLISIONES 
            this.cameras.main.startFollow(this.player, true, 0.8, 0.8) // LO SIGUE LA CAMARA
     

        ///////////////////////////////
        // CREATE ENEMY

            this.enemy = new Enemy(this, 250,200, 'tpOffline',50, 'wandering50');
            //   this.physics.add.collider(this.enemy, worldLayer)
            this.enemy.body.setCollideWorldBounds(true)

            this.enemy2 = new EnemyFollow(this, 350,250, 'tpOffline',50, 'follow').setTint(0x00ff00)
             //   this.physics.add.collider(this.enemy2, worldLayer)
                this.enemy2.body.setCollideWorldBounds(true)

            this.enemies = this.add.group() // son como arregloss
            for (let i = 0; i< 40; i++){
                const e = new Enemy(this, Math.floor(Math.random()*400) , Math.floor(Math.random()*400), 'tpOffline',10, 'wandering10')
                e.body.setCollideWorldBounds(true)
                e.setTint(0x9999ff)//lo pinta de azul
                this.enemies.add(e) // este es como el push
            }
            //     this.physics.add.collider(this.enemies, worldLayer)
    
            ///////////////////////////////////////////
            // COLISIONES DE LOS ENEMIGOS CON EL PLAYER

             this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this) //this es la escena
             this.physics.add.overlap(this.player, this.enemy, this.handlePlayerEnemyCollision, null, this)
             this.physics.add.overlap(this.player, this.enemy2, this.handlePlayerEnemyCollision, null, this)


             //////////////////////////
             //healthbar

              this.healthbar = new Healthbar(this, 20,18,100)


             /////////////////
             // Proyectiles

             //INPUT
                this.keys = this.input.keyboard.addKeys({space:'SPACE' })
                this.proyectiles = new Proyectiles(this)
                this.physics.add.collider(this.proyectiles,  mapatico, this.handleProyectileWorldCollision, null, this)
                this.physics.add.overlap(this.proyectiles, this.enemies, this.handleProyectileEnemyCollision, null, this)
                this.physics.add.overlap(this.proyectiles, this.enemy2, this.handleProyectileEnemyCollision, null, this)
                 this.physics.add.overlap(this.proyectiles, this.enemy, this.handleProyectileEnemyCollision, null, this)

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
        let zoom =1
        // zoom = 1/this.speed

       
   
      
/////////////////////
/// efectos de sonido
    this.sonido_helicoptero = this.sound.add('sonido_helicoptero');
    this.sonido_helicoptero.loop = true;

   

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

       
             if (850 < this.player.x && this.player.x < 999 && 1850 < this.player.y &&  this.player.y < 2008 && this.player.scale < 0.3)
                { this.scene.start('RescateScene');}
           


        var elzoom =  this.cameras.main.zoom
        if (this.player.speed == 200 && elzoom < 1){
            elzoom *=1.01;}
        if (this.player.speed > 200 && elzoom > 0.5){
            elzoom *= 0.99;}    
        
         this.cameras.main.setZoom(elzoom)

        this.msg_girl.update_Msg_Pos(elzoom); // actualiza la posicion






        // this.msgbox.setPosition(posX_Msgbox, posY_Msgbox);
        // this.msgbox.setScale(1/(1.5*elzoom))
        // this.mensajeL1.setPosition( posX_Msg , posY_Msg);
        // this.mensajeL1.setFontSize(40/(1.5*elzoom));
        // this.mensajeL2.setPosition( posX_Msg , posY_Msg + (40*(1/elzoom*0.8)));
        // this.mensajeL2.setFontSize(40/(1.5*elzoom));

    
     

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
   
        if(!this.enemy.isDead){ this.enemy.update();} 

        if(!this.enemy2.isDead){ this.enemy2.update(this.player.body.position);} 
      
        this.enemies.children.iterate((child) =>{ // el grupo esta conformado por enemies que son children
        if (!child.isDead){ child.update();} 
         // va por cada child y le da update como si le dieramos enemy.update a c/u
        })

    } //end update


} //end gameScene