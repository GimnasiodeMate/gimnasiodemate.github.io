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

         //////////////////////////
         ///Preload Animacion

            this.load.atlas('heli_chiquitito', '../assets/sprites/HelicopteroAmarillo.png', '../assets/sprites/HelicopteroAmarillo.json')
            this.load.atlas('explosion', '../assets/sprites/explosion.png', '../assets/sprites/explosion.json')
            this.load.atlas('turist', '../assets/sprites/turist.png', '../assets/sprites/turist.json')

        ////////////////////////
        /// Preload Imagenes

        //this.load.image('miimagen2', '../assets/sprites/escritorio3.jpg')
        this.load.image('marco', '../assets/imgs/marco.webp')
       
       
        
} //end preload

create() { this.fondo_pantalla = this.physics.add.staticImage(800, 401, 'fondoPlats');
          //  this.bola = this.physics.add.sprite(650,150, 'icono_eje');
            this.fondo_pantalla.setScale(0.9)

                      
            //////////////////////////
            /// evento del mouse

              this.input.mouse.capture = true;


          
            this.enemy = new Enemy(this, 250,200, 'tpOffline',10 );

            //this.isaac = new Turista(this, 500,400, 'anim_msgbox' ); // el que cae
            this.bola = new Turista(this, 500,340, 'turist');
           


            this.isaac2 = new Turista(this, 700,500, 'turist');
            this.isaac3 = new Turista(this, 250,500, 'turist');
            this.isaac4 = new Turista(this, 850,500, 'turist');
            



            /////////////////////////////
            /// Creando las Plataformas

            this.plat1 = this.physics.add.staticImage(500, 501, 'plat_grande');
            this.plat1.setImmovable();
            this.plat1.setSize(130,5);
            this.plat1.setOffset(15,18);




            this.plat2 = this.physics.add.staticImage(1200, 501, 'plat_grande');
            this.plat2.setImmovable();
            this.plat2.setSize(130,5);
            this.plat2.setOffset(15,18);



            this.plat3 = this.physics.add.staticImage(800, 301, 'plat_grande');
            this.plat3.setImmovable();
            this.plat3.setSize(130,5);
            this.plat3.setOffset(15,18);

            this.physics.add.collider(this.plat1, this.bola)


            /////////////////////////////
            /// Creando jugador

            this.mini_chopper = this.physics.add.sprite(1200,140, 'heli_chiquitito').setOrigin(0.5,0.6)
            this.mini_chopper.setScale(0.2);
            this.mini_chopper.play('heliAterriza');

            this.mini_chopper.setCircle(160);
            //this.mini_chopper.setSize(250,250);
            this.mini_chopper.setOffset(0,10);

            //this.mini_chopper.setGravityY(100);
            this.physics.add.collider(this.mini_chopper, this.bola)
            this.physics.add.collider(this.mini_chopper, this.plat1)
            this.physics.add.collider(this.mini_chopper, this.plat2)
            this.physics.add.collider(this.mini_chopper, this.plat3)
            this.velocityY = 0;
            this.velocityX = 0;


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
    
        
       
      //  this.angulo = Phaser.Math.Angle.Between(this.pegax, this.pegay,this.bola.x,this.bola.y)

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

        
}/// fin de create

update() {




            //////////////////////////////////////
            // controlando el minichopper

                //////////////////
                //joystick
                var elzoom=1;
                this.joystick.joystickUpdate(elzoom)
               if (!this.input.activePointer.isDown){ this.joystick.isClicked = false}

                    var potenciaX = this.joystick.potenciaX;
                    var potenciaY = this.joystick.potenciaY;
                
                //////////////////
                //movimiento

                this.manejaHelic(potenciaX,potenciaY)



            this.elmecate.updateMecate();
                this.elmecate2.updateMecate();
                    this.elmecate3.updateMecate();

            this.bola.updateTurista();       
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

                     console.log('KABUM!')}

            if (this.explotado){
                 this.bum.alpha -= 0.01;
                 this.bum.scale += 0.02;
                 if (this.bum.scale > 6){this.bum.destroy()} 
            }

}      //final del update     final del update    final del update     final del update    final del update     final del update    final del update     final del update









manejaHelic(potenciaX,potenciaY){

    // let velX =  this.mini_chopper.body.velocity.x;
    // let velY =  this.mini_chopper.body.velocity.y;
    console.log('aqui empezamos');

                if (potenciaX != 0 || potenciaY != 0){ //empezamos a movernos

                    if (potenciaY<0){this.mini_chopper.body.velocity.y -= potenciaY*0.05}
                    if (potenciaY>0){this.mini_chopper.body.velocity.y -= potenciaY*0.05} 
                    if (potenciaY<0){this.mini_chopper.body.velocity.x += potenciaX*0.05}
                    if (potenciaY>0){this.mini_chopper.body.velocity.x += potenciaX*0.05}
                        console.log(this.mini_chopper.y)
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
            console.log('cuantas veces?')
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

                                                
          
  } // final de UPDATE()
  }//final class mecate

    // let newY = Math.cos(this.angulo)*this.longitud
    // let newX = Math.sin(this.angulo)*this.longitud
    // this.mecate2.x = this.pegax-newX
    // this.mecate2.y = this.pegay+newY




    // ////////////////////////////////////// mecate 3 esta en la misma X y justo debajo en Y
    // //este es el valor de referencia de movimiento
    // this.mecate3.x = this.mecate2.x
    // this.mecate3.y =  this.mecate2.y + this.longitud


    // newY = Math.cos(this.angulom3)*this.longitud
    // newX = Math.sin(this.angulom3)*this.longitud
    // this.mecate4.x = this.mecate3.x-newX
    // this.mecate4.y = this.mecate3.y+newY
