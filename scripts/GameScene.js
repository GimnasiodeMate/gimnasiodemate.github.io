

class GameScene extends Phaser.Scene {
    constructor() {

        super('GameScene')
    }

    preload() {
        console.log (this.game)
        this.cursors
        this.cameras.main.setBackgroundColor(0x00000)
        this.load.image('tiles3', '../assets/sprites/Tilemap/sheetsmapa1.png')
        this.load.image('bullet', '../assets/bullet.png')
        this.load.image('coloso', '../assets/sprites/1Up.png')
        this.load.image('coloso_abajo', '../assets/sprites/1abajo.png')
        this.load.image('escuela_top', '../assets/sprites/escuela_top.png')


        ///Programa Helicoptero
        this.load.image('cartesiano', '../assets/imgs/cartesiano.webp')
        this.load.image('msgbox', '../assets/imgs/msgbox1.png')
       // this.load.image('msgbox_icon', '../assets/imgs/msgbox1.png')
        this.load.atlas('anim_msgbox', '../assets/sprites/boss.png', '../assets/sprites/boss.json')
         this.load.image('icono_eje', '../assets/imgs/cart_icon.png')


        
        // Audio
        this.load.audio('sonido_helicoptero','../assets/snds/helicoptero.mp3')
        

        this.load.image('particle', '../assets/particle.png')
        //this.load.tilemapTiledJSON('map', '../scripts/purpleMapdemo.json')
       // this.load.tilemapTiledJSON('map', '../assets/sprites/Tilemap/mapamundo.json')
        this.load.tilemapTiledJSON('map', '../assets/sprites/Tilemap/CostaRicaMap2.json')
        // this.load.spritesheet('characters', '../assets/characters.png', {
        //     frameWidth: 16,
        //     frameHieght: 16
        // })

        this.load.atlas('tpOffline', '../assets/sprites/skeleton.png', '../assets/sprites/skeleton.json')
        this.load.atlas('animHelicoptero', '../assets/sprites/helic.png', '../assets/sprites/helic.json')

        this.player
        this.keys
        this.enemy
        this.enemies
        this.healtbar
        this.proyectiles
        this.keys
        this.lastFiredTime = 0
        this.emitter
        this.estatua
        this.filtro_clicked = false
        this.msgbox_visible = false
        this.msgbox
        this.msgbox_icon
        this.sonido_helicoptero






        //// preload fonts para texto
        this.load.bitmapFont('desyrel', '../assets/fonts/gothic.png', '../assets/fonts/gothic.xml');

        /// preload efectos de sonido
       // this.load.audio('sonido_helicoptero', 'assets/snds/helicoptero.mp3');



    } //end preload

  

    create() {
        /////////////////////////////////
        ////

        // const array=[[0,1,2],[0,1,2],[0,1,2]];
        // const map = this.make.tilemap({ data:array, tileWidth: 64, tileHeight: 64});
        // map.addTilesetImage('tiles2');
        // const layer = map.createLayer(1, "tiles2", 0, 0);





        /////////////////////////////////////
        //tilemap

       const map = this.make.tilemap({
            key: 'map'
        })

        //const tileset = map.addTilesetImage('cuadros', 'tiles2')
        const mapatico = map.addTilesetImage('sheetsmapa1','tiles3')
        const capaMar = map.createStaticLayer('Mar', mapatico, 0, 0)
        const capaMapa = map.createStaticLayer('MapaOk', mapatico, 0, 0)


       // const belowLayer = map.createStaticLayer('capa1', tileset, 0, 0)
       // const worldLayer = map.createStaticLayer('capa2', tileset, 0, 0)
       // const aboveLayer = map.createStaticLayer('capa3', tileset, 0, 0)
      

        ////// aqui le digo que esta capa tubos 2 es "colisionable"
      //====  map.setCollisionBetween(1, 999, true, aboveLayer);


        //====aboveLayer.setDepth(100) // esto ordena graficamente quien esta abajo o arriba

       //==== worldLayer.setCollisionByProperty({
       //====     collides: true
       //==== })

        this.physics.world.bounds.width = map.widthInPixels
        this.physics.world.bounds.height = map.heightInPixels
        //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setZoom(1)
       //this.cameras.main.Speed(100,100)

        const debugGraphics = this.add.graphics().setAlpha(0.2)
        // worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(0, 0, 255),
        //     faceColor: new Phaser.Display.Color(0, 255, 0, 255)
        // })

        ///////////////////////////////
        //player
         
       this.player = new Player(this,200,2420, 'animHelicoptero',100)
       //this.physics.add.collider(this.player,  aboveLayer)
      // this.physics.add.collider(this.player, worldLayer)
      //  this.cameras.main.setBounds(0,0,5,5)
        this.player.body.setCollideWorldBounds(true)        

        this.cameras.main.startFollow(this.player, true, 0.8, 0.8)
     

    ////////////////////
    //enemy

   // this.add.sprite(280,200,'tpOffline').anims.play('tpOffLeft').setTint(0x9999ff); 
    this.enemy = new Enemy(this, 250,200, 'tpOffline',50, 'wandering50');
 //   this.physics.add.collider(this.enemy, worldLayer)
    this.enemy.body.setCollideWorldBounds(true)

    this.enemy2 = new EnemyFollow(this, 350,250, 'tpOffline',50, 'follow').setTint(0x00ff00)
 //   this.physics.add.collider(this.enemy2, worldLayer)
    this.enemy2.body.setCollideWorldBounds(true)

    /////////////
    // enemigos
    this.enemies = this.add.group() // son como arregloss
    for (let i = 0; i< 40; i++){
        const e = new Enemy(this, Math.floor(Math.random()*400) , Math.floor(Math.random()*400), 'tpOffline',10, 'wandering10')
        e.body.setCollideWorldBounds(true)
        e.setTint(0x9999ff)//lo pinta de azul
        this.enemies.add(e) // este es como el push
    }
   //     this.physics.add.collider(this.enemies, worldLayer)
    
    //////////////
    // collisions

     this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this) //this es la escena
     this.physics.add.overlap(this.player, this.enemy, this.handlePlayerEnemyCollision, null, this)
     this.physics.add.overlap(this.player, this.enemy2, this.handlePlayerEnemyCollision, null, this)


     //////////////
     //healthbar

     this.healthbar = new Healthbar(this, 20,18,100)


     /////////////////
     // Proyectiles

     this.keys = this.input.keyboard.addKeys({
        space:'SPACE'
     })
     this.proyectiles = new Proyectiles(this)
  //   this.physics.add.collider(this.proyectiles, worldLayer, this.handleProyectileWorldCollision, null, this)
     this.physics.add.overlap(this.proyectiles, this.enemies, this.handleProyectileEnemyCollision, null, this)


/////////////////////
//// particulas

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
       // console.log(this.cameras.main._scrollY)

       var mensaje1 = "rescate en coordenadas:"
       var mensaje2 = "x= 14, y=-18"

        this.msg_girl = new MsgBox(this,'anim_msgbox',mensaje1,mensaje2)

        // this.msgbox = this.physics.add.staticImage(this.player.x+600, 400+this.cameras.main._scrollY, 'msgbox');
        // this.msgbox.setScale(1);
        // this.msgbox.visible = true
        // this.mensajeL1 = this.add.bitmapText(this.player.x+300, 300+this.cameras.main._scrollY, 'desyrel', 'Rescate en coordenadas:', 50);
        // this.mensajeL2 = this.add.bitmapText(this.player.x+300, 300+this.cameras.main._scrollY, 'desyrel', 'X = -22, Y = 15', 50);
        // this.time.addEvent({
        //     delay: 60000,
        //     callback:()=>{
        //         this.msgbox.visible = false;
        //         this.mensajeL1.visible = false;
        //         this.mensajeL2.visible = false;
        //     },
        //     callbackScope: this,
        //     loop:false
        //     })

/////////////////////
/// ZOOM
        let zoom =1
        // zoom = 1/this.speed

       
        console.log(zoom);
      
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
        console.log('muerto')
       
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
        console.log('muerto')
       
    }
}


handlePlayerEnemyCollision(p,e){
    p.health -= e.damage
    console.log(p.health)
    if (p.health <= 0){
                        this.cameras.main.shake(100,0.05)
                        this.cameras.main.fade(250,0,0,0)
                        this.cameras.main.once('camerafadeoutcomplete',()=>{           console.log('reinicio!')
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

   
        var elzoom =  this.cameras.main.zoom
        if (this.player.speed == 200 && elzoom < 1){
            elzoom *=1.01;
            console.log('decreciendo');}
        if (this.player.speed > 200 && elzoom > 0.5){
            elzoom *= 0.99;
            console.log('creciendo');}    
        
         this.cameras.main.setZoom(elzoom)

        this.msg_girl.update_Msg_Pos(elzoom); // actualiza la posicion






        // this.msgbox.setPosition(posX_Msgbox, posY_Msgbox);
        // this.msgbox.setScale(1/(1.5*elzoom))
        // this.mensajeL1.setPosition( posX_Msg , posY_Msg);
        // this.mensajeL1.setFontSize(40/(1.5*elzoom));
        // this.mensajeL2.setPosition( posX_Msg , posY_Msg + (40*(1/elzoom*0.8)));
        // this.mensajeL2.setFontSize(40/(1.5*elzoom));

       // console.log(this.zoom);
     

         if ( 750< this.player.x && this.player.x < 850 && 2150 < this.player.y && this.player.y < 2190)
            { this.scene.start('EscuelaScene');}

        
        if (this.keys.space.isDown){
            console.log('apretado')
             this.sonido_helicoptero.play();
            this.filtro.visible = !this.filtro.visible;
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