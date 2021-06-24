class RescateScene extends Phaser.Scene {
    constructor() {

        super('RescateScene')
    }

preload() {


        ///
       
        this.cursors
        this.cameras.main.setBackgroundColor(0x00000)

        ////////////////////////
        /// Preload Fondos
         this.load.image('fondoPlats', '../assets/imgs/bkgnd/fondoPlats.png')
         
        ////////////////////////
        /// Preload imagenes
         this.load.image('plat_grande', '../assets/imgs/plat_grande.webp')
         this.load.image('cuerda', '../assets/imgs/cuerda.webp')
         this.load.image('marco', '../assets/imgs/marco.webp')

         this.load.image('sky1', '../assets/imgs/bkgnd/sky1.png')
         this.load.image('nubes', '../assets/imgs/bkgnd/nubes.webp')
         this.load.image('zacate', '../assets/imgs/bkgnd/zacate1.png')
         this.load.image('montanas', '../assets/imgs/bkgnd/farMnt.webp')


        this.load.image('arbol1', '../assets/imgs/arbol1.webp')
        this.load.image('arbol2', '../assets/imgs/arbol2.webp')
        this.load.image('arbol3', '../assets/imgs/arbol3big.webp')
        this.load.image('arbol4', '../assets/imgs/arbol4.webp')
        this.load.image('arbol5', '../assets/imgs/arbol5.webp')
        this.load.image('arbol6', '../assets/imgs/arbol6.webp')
        this.load.image('puente', '../assets/imgs/puente.webp')
        this.load.image('mono',   '../assets/imgs/mono.webp')
        
         //////////////////////////
         ///Preload Animacion

            this.load.atlas('heli_chiquitito', '../assets/sprites/HelicopteroAmarillo.png', '../assets/sprites/HelicopteroAmarillo.json')
            this.load.atlas('explosion', '../assets/sprites/explosion.png', '../assets/sprites/explosion.json');
            this.load.atlas('turist', '../assets/sprites/turist.png', '../assets/sprites/turist.json');
            this.load.atlas('lapa', '../assets/sprites/lapa.png', '../assets/sprites/lapa.json');

        ////////////////////////
        /// Preload Imagenes

        //this.load.image('miimagen2', '../assets/sprites/escritorio3.jpg')

        
} //end preload

create() { 
            //this.fondo_pantalla = this.physics.add.staticImage(800, 401, 'fondoPlats');
          //  this.bola = this.physics.add.sprite(650,150, 'icono_eje');
            //this.fondo_pantalla.setScale(0.1)

           

        ////////////////////////////////
        // INICIALIZAR LA CAMARA


            this.physics.world.bounds.width = 9600
            this.physics.world.bounds.height = 800
            this.cameras.main.setBounds(450, 0, 9600, 800)
            this.cameras.main.setZoom(1)



        ///////////////////////////////
        // CREATE PLAYER


                      
            //////////////////////////
            /// evento del mouse

            this.input.mouse.capture = true;        
            this.enemy = new Enemy(this, 250,200, 'tpOffline',10 );

            //this.isaac = new Turista(this, 500,400, 'anim_msgbox' ); // el que cae
            this.isaac1 = new Turista(this, 4500,100, 'turist');
           


            this.isaac2 = new Turista(this, 4700,100, 'turist');
            this.isaac3 = new Turista(this, 250,100, 'turist');
            this.isaac4 = new Turista(this, 850,100, 'turist');
            this.lapa1 = new Pajaro(this, -30,200, 'lapa');
            this.mono1 = new Enemigo(this, 3300,50,'mono');
            



            /////////////////////////////
            /// Creando las Plataformas

            this.rescatePlat = this.physics.add.staticImage(1500, 801, 'plat_grande');
            this.rescatePlat.setImmovable();
            this.rescatePlat.setSize(130,5);
            this.rescatePlat.setOffset(15,18);




            this.plat2 = this.physics.add.staticImage(4200, 601, 'plat_grande');
            this.plat2.setImmovable();
            this.plat2.setSize(130,5);
            this.plat2.setOffset(15,18);



            this.plat3 = this.physics.add.staticImage(3800, 301, 'plat_grande');
            this.plat3.setImmovable();
            this.plat3.setSize(130,5);
            this.plat3.setOffset(15,18);


           


            /////////////////////////////
            /// Creando jugador

            this.mini_chopper = this.physics.add.sprite(3200,140, 'heli_chiquitito').setOrigin(0.5,0.6)
            this.mini_chopper.setScale(0.2);
            this.mini_chopper.play('heliAterriza');
            this.mini_chopper.body.setCollideWorldBounds(true)       //COLISIONES 

            this.mini_chopper.setCircle(160);
            //this.mini_chopper.setSize(250,250);
            this.mini_chopper.setOffset(0,10);

            //this.mini_chopper.setGravityY(100);
            this.physics.add.collider(this.mini_chopper, this.isaac1)
            this.physics.add.collider([this.mini_chopper,this.mono1], this.plat2)
            this.physics.add.collider(this.mini_chopper, this.plat3)
            this.physics.add.collider(this.mini_chopper, this.lapa1)
            this.velocityY = 0;
            this.velocityX = 0;

            ////////////////////////
            /// camara follow

             console.log(this.cameras.main)
             this.cameras.main.startFollow(this.mini_chopper, true, 0.8, 0.8) // LO SIGUE LA CAMARA




             /////////////////////////////
            /// preparaExplosion
            this.bum = new Explosion(this,100,500,'explosion');
            this.explotado = false;

            ////////////////////
            // comportamientos raton
            this.apretado = false


            /////////////////////////////
            //// creando el Joystick

              this.joystick = new Joystick(this,1420,680,'basePad');



   this.input.on('pointerdown', () => this.apretado = true);

    this.input.on('pointerup', () => this.apretado = false);


//////////////////////////////////////
////    cadena empezamos
       
       
        this.pegax = this.mini_chopper.x;
        this.pegay = this.mini_chopper.y;
    
        
       
     

        this.angulo = (Math.PI/2)  // posicion actual de mecate1
        this.angulom2 = (Math.PI/4) // posicion actual de mecate2
        this.angulom3 = (Math.PI/2) // posicion actual de mecate3
        this.longitud = 20; // cuando miden los palitos

        //////////////////////////////
        //// Creo los mecates>
        
        this.pegas = [this.mini_chopper.x,this.mini_chopper.y,2,3,4,5,6,7,8,9] // registra ubicacion de origen de las cuerdas
       
            this.elmecate = new Mecate(this,200,200,'cuerda',this.longitud, this.mini_chopper.x,this.mini_chopper.y,1,0,1);
            this.elmecate2 = new Mecate(this,200,200,'cuerda',this.longitud, this.mini_chopper.x,this.mini_chopper.y,1,2,3); 
            this.elmecate3 = new Mecate(this,200,200,'cuerda',this.longitud, this.mini_chopper.x,this.mini_chopper.y,1,4,5);                         

            this.mecate = this.add.rectangle(this.pegax, this.pegay, 5, this.longitud, 0x6666ff).setOrigin(0);
            this.mecate2 = this.add.rectangle(this.pegax, this.pegay, 5, this.longitud, 0x4446ff).setOrigin(0);
            this.mecate3 = this.add.rectangle(100, 100, 5, this.longitud, 0x2226ff).setOrigin(0);
            this.mecate4 = this.add.rectangle(100, 100, 5, this.longitud, 0x1116ff).setOrigin(0);
            this.mecate44 = this.add.rectangle(100, 100, 5, this.longitud, 0x1116ff).setOrigin(0);


        
        /////////////////////////////////////
        /// PARA EFECTO PENDULO
                
                //MECATE1
                this.gravedad = 1;
                this.velocidadAngular =0;
                this.aceleracionAngular=0.001;
                this.force // se multiplica por la gravedad y el seno del angulo... cuanto jala
       

                //MECATE3
                this.velocidadAngularm3 =0;
                this.aceleracionAngularm3=0.001;
                this.forcem3 
               


       
        ////////////////////////////////
        //// Rotacion Helicoptero

        this.vel_ant_X= 0;
        this.vel_ant_Y= 0;
        this.Heli_angulo = (2*Math.PI);


        /////////////////////////////////
        // que tal un fondo

        this.fondo1 = this.add.tileSprite(0, 0, 9600, 606, 'sky1'); this.fondo1.setOrigin(0);
        this.montana = this.add.tileSprite(0, 570, 9600, 119, 'montanas'); this.montana.scale = 1;
        this.zacate = this.add.tileSprite(0, 700, 9600, 197, 'zacate'); // zacate repetido
        this.zacate.setOrigin(0.5);
        this.nubes1 = this.physics.add.staticImage(600,100, 'nubes');
        this.puente = this.physics.add.staticImage(7000,500, 'puente');
        this.nubes1.body.setSize(20,20)
              
        //VAMOS CON LOS ARBOLES
        this.arbolZero = new Arbol(this,600,300,'arbol3'); // 
        this.arbolDiez = new Arbol(this,this.physics.world.bounds.width-800,300,'arbol3');
        this.arbolUno = new Arbol(this,4600,500,'arbol2');
        this.arbolDos = new Arbol(this,5600,750,'arbol2');
        this.arbolTres = new Arbol(this,3200,600,'arbol2');


      
        
            
        /// organiza los DEPTHS
        this.fondo1.depth =-4;
        this.nubes1.depth =-3;
        this.montana.depth =-3;
        this.zacate.depth =-1;

       
       
        // establece bodies

        // this.arbol0.setSize(50,800);

        
        //this.copaArbol0.setOrigin=(0,0);
        
    

   // colliders de los arboles

    // helicoptero con elementos mobiles
       this.physics.add.collider( [this.mini_chopper],[this.isaac1,this.isaac2,this.isaac3,this.isaac4,this.mono1,this.lapa1])
    // elementos fijos con mobiles
         this.physics.add.collider( [   this.rescatePlat,
                                        this.plat2,
                                        this.plat3,
                                        this.arbolUno, 
                                            this.arbolUno.copaArbol, 
                                            this.arbolUno.copaArbol2,
                                        this.arbolDos, 
                                        this.arbolTres, 
                                            this.arbolTres.copaArbol, 
                                            this.arbolTres.copaArbol2 
                                    ],//elementos mobiles
                                    [   this.mini_chopper,
                                        this.isaac1,
                                        this.isaac2,
                                        this.isaac3,
                                        this.isaac4,
                                        this.mono1
                                    ])




   


     

        
}/// fin de create

update() {







               /////////////////////acomodar para abajo
               //// paralax de las nubes
              // this.nubes1.x = this.cameras.main.midPoint.x-50 
             // this.nubes1.x = this.mini_chopper.x*0.95 

                this.nubes1.x = this.cameras.main._scrollX+300*0.95 
                this.montana.x = this.cameras.main._scrollX*0.90 
                this.zacate.x = this.cameras.main._scrollX*0.5


            ////////////////////////////////
            // por si estamos en un celular
                var touchx = -1; var touchy = -1; //-1 es el valor de false, de que no se usa
                if(this.game.input.pointers[1].isDown){
                    touchx = this.game.input.pointers[1].position.x; 
                    touchy = this.game.input.pointers[1].position.y;}



            //////////////////////////////////////
            // controlando el minichopper

                //////////////////
                //joystick
                var elzoom=1;
                this.joystick.joystickUpdate(elzoom,touchx,touchy)
               if (!this.input.activePointer.isDown){ this.joystick.isClicked = false}

                    var potenciaX = this.joystick.potenciaX;
                    var potenciaY = this.joystick.potenciaY;
                
                //////////////////
                //movimiento

                this.manejaHelic(potenciaX,potenciaY)



            this.elmecate.updateMecate();
                this.elmecate2.updateMecate();
                    this.elmecate3.updateMecate();

            this.isaac1.updateTurista();       
            this.isaac2.updateTurista();        
            
            let velX =  this.mini_chopper.body.velocity.x;
            let velY =  this.mini_chopper.body.velocity.y;

          
            this.pegas[0] = this.mini_chopper.x ; this.pegas[1] = this.mini_chopper.y

          


            // this.mini_chopper.angle = this.mini_chopper.angle +=0.01; 
           
            // this.pegamecate()

            // this.calculaPendulo()

  
            //     this.mecate.rotation = this.angulo; // GIRA EL MECATE APROPIADAMENTE
            //     this.mecate3.rotation = this.angulom3; // GIRA EL MECATE APROPIADAMENTE
            
            // this.ubicamecate()
            
           
        
           if (!this.explotado && this.mini_chopper.body.touching.none == false)
                {   this.bum.explota();
                    this.explotado = true;

                  }

            if (this.explotado){
                 this.bum.alpha -= 0.01;
                 this.bum.scale += 0.02;
                 if (this.bum.scale > 6){this.bum.destroy()} 
            }

            ////////////////////////
            /// la lapa se mueve
           this.lapa1.updateLapa();



}      //final del update     final del update    final del update     final del update    final del update     final del update    final del update     final del update




manejaHelic(potenciaX,potenciaY){

    // let velX =  this.mini_chopper.body.velocity.x;
    // let velY =  this.mini_chopper.body.velocity.y;
    

                if (potenciaX != 0 || potenciaY != 0){ //empezamos a movernos

                    if (potenciaY<0){this.mini_chopper.body.velocity.y -= potenciaY*0.05}
                    if (potenciaY>0){this.mini_chopper.body.velocity.y -= potenciaY*0.05} 
                    if (potenciaY<0){this.mini_chopper.body.velocity.x += potenciaX*0.05}
                    if (potenciaY>0){this.mini_chopper.body.velocity.x += potenciaX*0.05}
                       
                    }       
                        
//                         /////////////////////// arriba abajo
//                         if (this.input.mousePointer.y < this.mini_chopper.y)
//                                  { velY += -2; }
//                         else { velY += 2;}
//                         /////////////////////// izquierda derecha
//                         if (this.input.mousePointer.x < this.mini_chopper.x)
//                                  {  velX += -2;this.rotacionIzq();}
//                         else{ velX += 2;  this.rotacionDer();}

                      
// }else{ 
//          velY *= 0.9;
//          this.rotacionRegresa();
       
//        if (0< velY && velY < 0.25  || -0.25 < velY && velY < 0  ){velY=0} // frene en X!
//         velX *= 0.9;
//         if (0< velX && velX < 0.25  || -0.25 < velX && velX < 0  ){velX=0} // frene en Y!            
//       }

//      this.mini_chopper.body.velocity.x = velX;
//      this.mini_chopper.body.velocity.y = velY;
     
  

//       // empezamos preguntando si esta en movimiento

  }

  rotacionIzq()
  {  
    if (this.Heli_angulo > 5.8) {   this.mini_chopper.rotation =this.Heli_angulo-=0.01 
                                    this.mini_chopper.setOffset(40,20);}}      

  rotacionDer()
  { 
    if (this.Heli_angulo <6.7) {this.mini_chopper.rotation =this.Heli_angulo+=0.01 ;
                                   this.mini_chopper.setOffset(40,-10); }}     

  rotacionRegresa()
  { if (this.Heli_angulo > 5.9) {this.mini_chopper.rotation =this.Heli_angulo-=0.01  }
    if (this.Heli_angulo < 5.8) {this.mini_chopper.rotation =this.Heli_angulo+=0.01; }
}      


pegamecate(){
    this.pegax = this.mini_chopper.x-10;
    this.pegay = this.mini_chopper.y+18;
    this.mecate.x = this.pegax;
    this.mecate.y = this.pegay;

    
}

ubicabola(){
    let vel_bola_y = this.bola.body.velocity.y;
    let vel_bola_x = this.bola.body.velocity.x;
    let vel_max = 10;
    if (this.bola.y > this.pegay){ vel_bola_y -=2 ;}
    
    if (this.bola.x > this.pegay && vel_bola_x < vel_max){ vel_bola_x +=2 ;}
    if (this.bola.x < this.pegay && vel_bola_x > vel_max){ vel_bola_x -=2 ;}

    this.bola.body.velocity.x =  vel_bola_x;
    this.bola.body.velocity.y =  vel_bola_y;
}






}


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// clase mecate

class Arbol extends Entity{
    constructor(scene, x,y,textureKey){
          super(scene,x,y,textureKey,'Arbol')

          this.x = x;
          this.y = y;
          this.textureKey = textureKey;
          this.body.immovable = true;
          this.depth = -2;
          this.setImmovable;
         let U = this.height/100;
           
    //Generamos los bodies para que colisione

     this.body.setSize(this.width/6 ,this.height);
     this.copaArbol = new CopaArbol(this.scene, this.x,this.y-(this.height/4),'this.textureKey')
     this.copaArbol2 = new CopaArbol(this.scene, this.x,this.y-(this.height/4),'this.textureKey')
     this.copaArbol.body.setSize(this.width/1.5,this.height/6);

     //ahora establezco los colliders   collideWorldBounds
     this.scene.physics.add.collider(this.scene.mini_chopper , [this,this.copaArbol,this.copaArbol2] );
    
     /// tengo arboles diferentes
     if (this.textureKey == 'arbol2')
        {  this.body.setSize(this.width/6,this.height*0.5);
            this.copaArbol2.body.setSize(this.width/3,this.height/6);
            this.copaArbol.body.setSize(this.width/3,this.height/10);
            this.copaArbol.x = this.x-(U*15), this.copaArbol.y = this.y-(18*U);
            this.copaArbol2.x = this.x+(17*U); this.copaArbol2.y = this.y-(36*U);
            console.log('tuneando')}





        }// fin del constructor

}//////////////////////////////////////////////////// fin de Arbol

    class CopaArbol extends Entity{
        constructor(scene, x,y,textureKey){
              super(scene,x,y,textureKey,'CopaArbol')

              this.x = x;
              this.y = y;
              this.textureKey = textureKey;
              this.visible = false;
              this.body.immovable = true;

        }// fin del constructor

}//////////////////////////////////////////////////// fin de CopaArbol






class Explosion extends Entity{
    constructor(scene, x,y,textureKey){
        super(scene,x,y,textureKey,'Explosion')

        const anims = scene.anims
        const animFrameRate = 40
        this.textureKey = textureKey
        //probablemente sonido
      this.visible = false;

/// explota
        anims.create({
                key: 'explota',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 0,
                end: 27,
                zeroPad: 3 //cuantos espacios de numero tiene 001, 002, 003 etc
            }),
            frameRate: animFrameRate,
            repeat: 0
        })

        }// fin del constructor

        explota(){
            this.scale=2;
            this.scene.cameras.main.shake(500);
            this.x = this.scene.mini_chopper.x;
            this.y = this.scene.mini_chopper.y;
            this.visible = true;
            this.anims.play('explota');
          
            this.scene.mini_chopper.visible=false;
           
        }

    }

class Mecate extends Entity{
    constructor(scene, x,y,textureKey,longitud,agarrex,agarrey,type,px,py){
        super(scene,x,y,textureKey,'Mecate')

        this.x = x
        this.y = y
        this.textureKey = textureKey
        this.longitud = longitud
        this.type = type
        this.posPunta_x 
        this.posPunta_y
        this.setScale(0.5)
        this.px = px;
        this.py = py; 
        this.ganchox = 0;
        this.ganchoy = 0;
       

       // this.pic = this.scene.physics.add.staticImage(this.x, this.y, this.skin);

        this.angulo = (Math.PI/4)
        this.rotation = this.angulo;
        this.setOrigin(0)
        this.velocidadAngular =0;
        this.aceleracionAngular=0.001;
        this.fuerza
        this.gravedad = 1; // aqui podria hacer referencia a la escena
         
         //this.gravedad = 1;
                               
                this.force // se multiplica por la gravedad y el seno del angulo... cuanto jala
       


    }// end constructor

    updateMecate(){
    
        /// calcula pendulo

        let f_giro; if (this.px == 0){f_giro = 0.05}
                    if (this.px == 2){f_giro = 0.08}
                    if (this.px == 4){f_giro = 0.04}    




            if (this.scene.apretado){
                    //reacciona con respecto al (helicoptero) punto  de agarre
                   
                    if (this.scene.mini_chopper.body.velocity.x < -6 ){//viaja hacia la izquierda}
                        this.angulo -= f_giro;}
                     if (this.scene.mini_chopper.body.velocity.x > 6 ){//viaja hacia la izquierda}
                        this.angulo += f_giro;}

                }

                this.force = this.gravedad * Math.sin(this.angulo);
                this.aceleracionAngular = (-1 * this.force )/ this.longitud
                this.velocidadAngular +=  this.aceleracionAngular;
                this.velocidadAngular*=0.99; // damping o desaceleracion
                this.angulo += this.velocidadAngular;

            /// utiliza los calculos anteriores para girar el mecate
            this.rotation = this.angulo;

/////////////////////////////
    let ajustex = 0
    let ajustey = 0 
      
    
    if (this.px == 0){ ajustex = -10; ajustey = 18} //solo cuando es el primer mecate

    this.x = this.scene.pegas[this.px] +  ajustex;
    this.y = this.scene.pegas[this.py] +  ajustey;
    
        // aqui estoy calculando la posicion del cabo final del mecate
    let finaly = Math.cos(this.angulo)*this.longitud
    let finalx = Math.sin(this.angulo)*this.longitud
        // y asignandolo al array de puntos iniciales
    this.scene.pegas[this.px+2]= this.x-finalx
    this.scene.pegas[this.py+2]= this.y+finaly

    this.ganchoy=this.y+finaly;
    this.ganchox=this.x+finalx;
                                                
          
  } // final de UPDATE()
  }//final class mecate

   