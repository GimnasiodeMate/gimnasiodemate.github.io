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
        this.load.image('campo', '../assets/imgs/bkgnd/campo.png')
        this.load.image('nubes', '../assets/imgs/bkgnd/nubes.webp')
        this.load.image('zacate', '../assets/imgs/bkgnd/zacate1.png')
        this.load.image('rio', '../assets/imgs/bkgnd/rio.webp')
        this.load.image('montanas', '../assets/imgs/bkgnd/farMnt.webp')
        this.load.image('nubesmalas', '../assets/imgs/bkgnd/nubesmalas.webp')
        this.load.image('nubesTop1', '../assets/imgs/nubeTop.webp')
        this.load.image('nubesTop2', '../assets/imgs/cloud1.webp')
        this.load.image('nubesTop3', '../assets/imgs/cloud2.webp')


        this.load.image('arbol1', '../assets/imgs/arbol1.webp')
        this.load.image('arbol2', '../assets/imgs/arbol2.webp')
        this.load.image('arbol3', '../assets/imgs/arbol3big.webp')
        this.load.image('arbol4', '../assets/imgs/arbol4.webp')
        this.load.image('arbol5', '../assets/imgs/arbol5.webp')
        this.load.image('arbol6', '../assets/imgs/arbol6.webp')
        this.load.image('cerro1', '../assets/imgs/cerro1.webp')
        this.load.image('cerro2', '../assets/imgs/cerro2.webp')
        this.load.image('puente', '../assets/imgs/puente.webp')
        this.load.image('mono',   '../assets/imgs/mono.webp')
        this.load.image('huebomba',   '../assets/imgs/huebomba.webp')
        this.load.image('flecha',   '../assets/imgs/flecha.webp')
        this.load.image('flecha_ambulancia',   '../assets/imgs/flecha_ambulancia.webp')
        this.load.image('ambulancia',   '../assets/imgs/ambulancia.webp')

        
         //////////////////////////
         ///Preload Animacion

            this.load.atlas('heli_chiquitito', '../assets/sprites/HelicopteroAmarillo.png', '../assets/sprites/HelicopteroAmarillo.json')
            this.load.atlas('explosion', '../assets/sprites/explosion.png', '../assets/sprites/explosion.json');
            this.load.atlas('turist', '../assets/sprites/turist.png', '../assets/sprites/turist.json');
            this.load.atlas('lapa', '../assets/sprites/lapa.png', '../assets/sprites/lapa.json');
            this.load.atlas('paloma', '../assets/sprites/paloma.webp', '../assets/sprites/paloma.json');
            this.load.atlas('tucan', '../assets/sprites/tucan.webp', '../assets/sprites/tucan.json');
            this.load.atlas('burbuja', '../assets/sprites/burbuja.png', '../assets/sprites/burbuja.json');
            this.load.atlas('firework', '../assets/sprites/firework.png', '../assets/sprites/firework.json');

        ////////////////////////
        /// Preload Imagenes

        //this.load.image('miimagen2', '../assets/sprites/escritorio3.jpg')

        //////////////////////////////
        // PRELOAD AUDIO FILES   
 
         this.load.audio('gritomono','../assets/snds/mono.mp3')
         this.load.audio('gritocongo','../assets/snds/congo.mp3')
         this.load.audio('explosion_helicoptero','../assets/snds/bum.mp3')
         this.load.audio('alarma_helicoptero','../assets/snds/alarma.mp3')

        
} //end preload

create() { 

         this.game.scale.refresh();


         /////////////////////////////////
         /// donde estamos

         var dondeEstoy = this.game.scene.scenes[0].escenariodejuego;

        //////////////////////////////////
        /// VARIABLES DE CADA PANTALLA

            // escena
                let ancho_escena = 9600;
                let alto_escena = 2400;
                let limite_camara_x = 450;
                let limite_camara_y =0;
            // protagonista
                let heliInicial = [1250,580];

            // elementos del fondo 

            this.posCielo    =[0, 1600,  ancho_escena,   900];
            let posCampo    =[0, 5624,ancho_escena,   700];
            let posMontana  =[0, 52170,ancho_escena,   119];
            let posZacate   =[0, 5750,ancho_escena,   197];
            let posNubes    =[1400,1900];

            // arboles

            let posArboles =[600,               350,    'arbol3',   //arbolZero
                             ancho_escena-2000, 350,    'arbol3',   //arbolDiez
                             4600,              500,    'arbol2',   //arbol_1
                             5600,              750,    'arbol2',   //arbol_2
                             2200,              600,    'arbol3',   //arbol_3
                             2800,              600,    'arbol2',   //arbol_3
                             3200,              600,    'arbol3',   //arbol_4
                             4200,              600,    'arbol2',   //arbol_5
                             7200,              600,    'arbol3',   //arbol_6
                             7400,              600,    'arbol2',   //arbol_7
                             7900,              600,    'arbol3',   //arbol_8
                             8000,              550,    'arbol5']   //arbol_9


            let posPlataformas=[1500, 601,3500, 700,3900, 651];




            // enemigos
            //nuebesmalas

            let posNubesMalas = [2000,20]; 
            let distancia_entre_nubes = 1500;

            let posInicioTuristaPerdido=[4050,1470];
            let posInicioMonos=[3300,50,2900,50,2690,50,2660,50];
            let posInicioLapas=[-30,2100];

            
        ////////////////////////////////
        // INICIALIZAR LA CAMARA


            this.physics.world.bounds.width = ancho_escena;
            this.physics.world.bounds.height = alto_escena;
            this.cameras.main.setBounds(limite_camara_x, limite_camara_y, ancho_escena, alto_escena)
            this.cameras.main.setZoom(1)


           
        ///////////////////////////
        // PROTAGONISTA:

            this.mini_chopper = new Chopper(this,heliInicial[0],heliInicial[1]+1600,'animHelicoptero');
             
              /// Y LA ESCALERA
                this.longitud = 30; // cuando miden los palitos
                this.pegas = [this.mini_chopper.x,this.mini_chopper.y,2,3,4,5,6,7,8,9] // registra ubicacion de origen de las cuerdas
                this.escalera1 = new Escalera(this,0,0,'cuerda',this.longitud, this.mini_chopper.x,this.mini_chopper.y,1,0,1);
                this.escalera2 = new Escalera(this,0,0,'cuerda',this.longitud, this.mini_chopper.x,this.mini_chopper.y,1,2,3); 
                this.escalera3 = new Escalera(this,0,0,'cuerda',this.longitud, this.mini_chopper.x,this.mini_chopper.y,1,4,5); 
         

        //////////////////////////
        //  PERSONAJES MOVILES

            this.turistaPerdido = new Turista(this, posInicioTuristaPerdido[0],posInicioTuristaPerdido[1], 'turist');
            this.mono1 = new Mono(this, posInicioMonos[0],posInicioMonos[1],'mono');
            this.mono2 = new Mono(this, posInicioMonos[2],posInicioMonos[3],'mono');
            this.mono3 = new Mono(this, posInicioMonos[4],posInicioMonos[5],'mono');
            this.mono4 = new Mono(this, posInicioMonos[6],posInicioMonos[7],'mono');
            this.lapa1 = new Pajaro(this, posInicioLapas[0],posInicioLapas[1], 'lapa');
            this.paloma1 = new Paloma(this, 6000,300, 'paloma');
            this.tucan = new Tucan(this, 2000,1800, 'tucan');
            
            this.pajarointro = new Pajaro(this,  posInicioTuristaPerdido[0],200, 'lapa'); this.pajarointro.scaleX =-1;


        //////////////////////////
        // EL ESCENARIO

            this.cielo =    this.add.tileSprite(this.posCielo[0],this.posCielo[1],this.posCielo[2],this.posCielo[3], 'sky1');               this.cielo.setOrigin(0);
            this.cielo.setScale(1.4);
        //    this.campo =    this.add.tileSprite(posCampo[0],posCampo[1],posCampo[2],posCampo[3], 'campo');              this.campo.setOrigin(0);
            this.montana =  this.add.tileSprite(posMontana[0],posMontana[1],posMontana[2],posMontana[3], 'montanas');   this.montana.scale = 1;
            if (dondeEstoy == 'PaloVerde')
                {
               // this.zacate =   this.add.tileSprite(0,650,8400,165, 'rio');  
                
               // this.zacate.setOrigin(0);
                } else{
              //   this.zacate =   this.add.tileSprite(posZacate[0],posZacate[1],posZacate[2],posZacate[3], 'zacate');         this.zacate.setOrigin(0.5);
                }
            this.nubes1 = this.physics.add.staticImage(posNubes[0],posNubes[1], 'nubes'); 

      //      this.rio = this.add.rectangle(2200, 750, 6000, 200, 0x6666ff);
       //     this.rio.setDepth(0)

      //      this.reflejochopper = new Chopper(this,heliInicial[0],heliInicial[1]+400,'animHelicoptero');
      //      this.reflejochopper.scaleY = this.mini_chopper.scaleY*-0.6 ;


           
        //////////////////////////
        // ARBOLES (deben ser 10 arboles en total)

        this.arbolZero =    new Arbol(this, posArboles[0], posArboles[1]+1700, posArboles[2]); // limite izquierda
       this.arbolDiez =    new Arbol(this, posArboles[3], posArboles[4]+1700, posArboles[5]); //limite derecha
        
        // this.arbolUno =     new Arbol(this, posArboles[6], posArboles[7], posArboles[8]);
        // this.arbol_2 =      new Arbol(this, posArboles[9],posArboles[10],posArboles[11]);
        // this.arbol_3 =      new Arbol(this,posArboles[12],posArboles[13],posArboles[14]);
        // this.arbol_4 =      new Arbol(this,posArboles[15],posArboles[16],posArboles[17]);
        // this.arbol_5 =      new Arbol(this,posArboles[18],posArboles[19],posArboles[20]);
        // this.arbol_6 =      new Arbol(this,posArboles[21],posArboles[22],posArboles[23]);
        // this.arbol_7 =      new Arbol(this,posArboles[24],posArboles[25],posArboles[26]);
        // this.arbol_8 =      new Arbol(this,posArboles[27],posArboles[28],posArboles[29]);
        // this.arbol_9 =      new Arbol(this,posArboles[30],posArboles[31],posArboles[32]);

         this.cerro7 =      new Cerro(this,6500,2500,'cerro1'); 
         this.cerro6 =      new Cerro(this,5900,2400,'cerro2'); 
         this.cerro5 =      new Cerro(this,5200,2100,'cerro1'); 
         this.cerro4 =      new Cerro(this,4200,2100,'cerro2'); 
         this.cerro3 =      new Cerro(this,3500,1800,'cerro1'); 
         this.cerro2 =      new Cerro(this,2600,2100,'cerro2'); 
        this.cerro1 =      new Cerro(this,2100,2130,'cerro1'); 



        /// empecemos con los reflejos

           // this.reflejoArbol_3 = new ReflejoFijo(this,posArboles[12],posArboles[13],posArboles[14],this.arbol_3.scale);


        //////////////////////////
        // PLATAFORMAS (La 1era de un total de 3)


        this.rescatePlat = this.physics.add.staticImage(heliInicial[0],heliInicial[1]+1800, 'plat_grande');
            this.ambulancia = this.physics.add.staticImage(this.rescatePlat.x-110, this.rescatePlat.y-30, 'ambulancia');
            this.rescatePlat.setImmovable();  this.rescatePlat.setSize(310,5); this.rescatePlat.setOffset(15,78);
            
        this.plat2 = this.physics.add.staticImage(posPlataformas[2], posPlataformas[3]+1800, 'plat_grande');
            this.plat2.setImmovable(); this.plat2.setSize(310,5);  this.plat2.setOffset(15,78);

        this.plat3 = this.physics.add.staticImage(posPlataformas[4], posPlataformas[5]+1800, 'plat_grande');
            this.plat3.setImmovable(); this.plat3.setSize(310,5); this.plat3.setOffset(15,78);


        //////////////////////////
        // FLECHAS DE AYUDA ()

            //flecha ayuda
            this.flecha1 = new Flecha(this, 0,201, 'flecha');
            this.flecha2 = new Flecha(this, 0,201, 'flecha_ambulancia');

        //////////////////////////
        //  NUBES MALAS



             this.nubemala1 = new NubesMalas(this, posNubesMalas[0]+0*distancia_entre_nubes,   'nubesmalas');
        

        // NUBES TOP
            this.nubeTop7 = new NubeTop(this,  3313,  906,     'nubesTop2');this.nubeTop7.setScale(2);
            this.nubeTop6 = new NubeTop(this,  2813,  1086,     'nubesTop2');this.nubeTop6.setScale(1.2);
            this.nubeTop5 = new NubeTop(this,  2543,  1280,     'nubesTop1');this.nubeTop5.setScale(1.5);
            this.nubeTop4 = new NubeTop(this,  2143,  1300,     'nubesTop3');this.nubeTop4.setScale(1.5);
            this.nubeTop3 = new NubeTop(this,  1813,  1386,     'nubesTop2');this.nubeTop3.setScale(1);
            this.nubeTop2 = new NubeTop(this,  1613,  1486,     'nubesTop1');this.nubeTop2.setScale(1);
            this.nubeTop1 = new NubeTop(this,  1413,  1586,     'nubesTop2'); this.nubeTop1.setScale(1);
            this.nubeTop0 = new NubeTop(this,  920, 1400,     'nubesTop2'); this.nubeTop0.setScale(2);
            this.nubeTop00 = new NubeTop(this,  620, 1400,     'nubesTop2'); this.nubeTop00.setScale(2);





         ////////////////////////
         // SONIDOS

          this.alarma_helicoptero = this.sound.add('alarma_helicoptero');
           this.alarma_helicoptero.setVolume(0.1);
         
      

            ////////////////////////////////////
            /// EXPLOSIONES Y CELEBRACIÓN
            this.heliExplota = new Explosion(this,100,500,'explosion');
            this.firework = new Firework(this,heliInicial[0],heliInicial[1]-100+1700,'firework');




        ////////////////////////////////////////
        //// CONTROLES Y VARIABLES DE LA ESCENA

            /// Evento del mouse
                this.input.mouse.capture = true;  
            /// Creando Joystick
                this.joystick = new Joystick(this,1420,680,'basePad');
            /// Estado del click
                this.input.on('pointerdown', () => this.apretado = true);
                this.input.on('pointerup', () => this.apretado = false);
                this.apretado = false // el raton;
            // Camara Follow
                this.cameras.main.startFollow(this.mini_chopper, true, 5, 0.8) 
            // Rotacion Helicoptero
                this.vel_ant_X= 0; this.vel_ant_Y= 0;
                this.Heli_angulo = (2*Math.PI);
            //  Para determinar rotacion del chopper
                this.lastVelx = 0; 
            //  Siguiente Objetivo para ver a que lado mira Chopper
                this.siguienteMetaX = this.turistaPerdido.x;   
            //  Ya pasó la Intro del Nivel?
                this.introlista = true;///cambio      
            // El Helicoptero ya explotó?
                this.chopper_explotado = false;                  
        


        ////////////////////////////////////////
        //// DEFINIMOS EL DEEP SORT            
                this.cielo.depth =-4;
               // this.campo.depth =-4;
                this.nubes1.depth =-3;
                this.montana.depth =-3;
            //    this.zacate.depth =-1;               
       
       
        ////////////////////////////////////////
        //// COLLIDERS  
   
            // this.physics.add.collider(this.turistaPerdido,this.cerro1);
            // COLLIDERS DE ELEMENTOS FIJOS CON ELEMENTOS MOVILES
                 this.physics.add.collider( [   this.rescatePlat,this.plat2,this.plat3,
                                                // this.arbolUno, this.arbolUno.cup1,this.arbolUno.cup2,
                                                // this.arbol_2,this.arbol_2.cup1,this.arbol_2.cup2,
                                                // this.arbol_3,this.arbol_3.cup1,this.arbol_3.cup2,
                                                // this.arbol_4,this.arbol_4.cup1,this.arbol_4.cup2,
                                                // this.arbol_5,this.arbol_5.cup1,this.arbol_5.cup2,
                                                // this.arbol_6,this.arbol_6.cup1,this.arbol_6.cup2,
                                                // this.arbol_7,this.arbol_7.cup1,this.arbol_7.cup2,
                                                // this.arbol_8,this.arbol_8.cup1,this.arbol_8.cup2,
                                                // this.arbol_9,this.arbol_9.cup1,this.arbol_9.cup2
                                            ],//elementos mobiles
                                            [   this.mini_chopper,this.turistaPerdido,
                                                this.mono1, this.mono2, this.mono3, this.mono4]);


           // COLLIDERS DE EL CHOPPER CON CON ELEMENTOS MOVILES
                this.physics.add.collider( [    this.mono1,this.mono2,this.mono3,this.mono4,this.lapa1], 
                                                this.mini_chopper);



        ///////////////////////////////
        // VARIABLE EXTERNA       
            if (!this.game.scene.scenes[0].primeraVez){this.introlista = true};

}/// fin de create

update() {

        this.nubeTop0.updateNubeTop();        this.nubeTop00.updateNubeTop();
        this.nubeTop1.updateNubeTop();
        this.nubeTop2.updateNubeTop();
        this.nubeTop3.updateNubeTop();
        this.nubeTop4.updateNubeTop();
        this.nubeTop5.updateNubeTop();        this.nubeTop6.updateNubeTop();        this.nubeTop7.updateNubeTop();
        this.tucan.updateTucan();

        this.paloma1.x -= 1;
        // REVISAMOS SI ES LA PRIMERA VEZ EN LA PANTALLA
            if (!this.game.scene.scenes[0].primeraVez){ 
                // si no es la primera vez que siga al chopper y el pajaro desaparezca
                this.pajarointro.visible = false;
                this.introlista = true}

        // REVISAMOS SI LA INTRO YA TERMINO
           
           if (!this.introlista)
                    {this.cameras.main.startFollow(this.pajarointro, true, 0.8, 0.8);
                     this.pajarointro.x -= 5;
                     if (this.pajarointro.x < this.mini_chopper.x){ 
                                this.cameras.main.stopFollow(this.pajarointro);
                                this.cameras.main.startFollow(this.mini_chopper, true, 0.8, 0.8);
                                this.introlista = true; this.game.scene.scenes[0].primeraVez = true; // variable externa
                    }
            }else{ this.pajarointro.x -= 10; }
           
  
        // ACTUALIZAMOS EL FONDO PARA EFECTO PARALAX



            this.nubes1.x = this.cameras.main._scrollX+300*0.95 
            this.montana.x = this.cameras.main._scrollX*0.90 
          //  this.zacate.x = this.cameras.main._scrollX*0.5
            //this.campo.x = this.cameras.main._scrollX*0.5

        // SIEMPRE VISIBLE EN Y

             
              this.cielo.y =  this.cameras.main._scrollY ;
              this.montana.y =  (this.cameras.main._scrollY*0.97)+800 ;


        // SE RECIBEN LOS INPUTS DE DISPOSITIVO MOVIL CELULAR

            var touchx = -1; var touchy = -1; //-1 es el valor de false, de que no se usa
            if (this.game.input.pointers[1].isDown){
                        touchx = this.game.input.pointers[1].position.x; 
                        touchy = this.game.input.pointers[1].position.y;}

        // SE REVISAN LOS INPUTS DEL JOYSTICK Y SE MANEJA EL CHOPPER

            if (this.introlista){
                var elzoom=1; this.joystick.visible = true;   this.joystick.mando.visible = true;
                this.joystick.joystickUpdate(elzoom,touchx,touchy)
                if (!this.input.activePointer.isDown){ this.joystick.isClicked = false}
                var potenciaX = this.joystick.potenciaX;
                var potenciaY = this.joystick.potenciaY;
                //FUNCION DE CONTROL DE HELICOPTERO
                this.manejaHelic(potenciaX,potenciaY);
                }else {this.joystick.visible = false; this.joystick.mando.visible = false;} 
                        //^^ esconde joystick durante la Introducción ^^

        // ACTUALIZA EL MOVIMIENTO DE LA ESCALERA

                this.escalera1.updateEscalera();this.escalera2.updateEscalera(); this.escalera3.updateEscalera();

        // ACTUALIZA EL MOVIMIENTO Y EVENTOS DEL TURISTA
            
                this.turistaPerdido.updateTurista();  

        // ACTUALIZA EL MOVIMIENTO Y EVENTOS DEL TURISTA     
                
            let velX =  this.mini_chopper.body.velocity.x;
            let velY =  this.mini_chopper.body.velocity.y;

          
            this.pegas[0] = this.mini_chopper.x ; this.pegas[1] = this.mini_chopper.y


        // MOVIMIENTO DE PERSONAJES SECUNDARIOS

                /// MOVIMIENTO DE LA LAPA
                this.lapa1.updateLapa();
                this.paloma1.updatePaloma();

                /// MOVIMIENTO DE LAS NUBES
                this.nubemala1.updateNubesMalas(); 
                // this.nubemala2.updateNubesMalas(); 
                // this.nubemala3.updateNubesMalas(); this.nubemala4.updateNubesMalas();
                // this.nubemala5.updateNubesMalas(); this.nubemala6.updateNubesMalas();

                /// COMPORTAMIENTO DE LOS MONOS
                this.mono1.updateMono(); this.mono2.updateMono();
                this.mono3.updateMono(); this.mono4.updateMono();
               
                // COMPORTAMIENTO DE LA FLECHA
                this.flecha1.updateFlecha();
        
        // SI TOCA A ALGO EXPLOTA HELICOPTERO
          
           if (!this.chopper_explotado && (this.mini_chopper.body.touching.right || this.mini_chopper.body.touching.left || this.mini_chopper.body.touching.up))
                {   this.heliExplota.explota();
                    this.chopper_explotado = true;
                    this.sonidoexplosion = this.sound.add('explosion_helicoptero');
                    this.sonidoexplosion.play();
                    this.mini_chopper.isDead = true;
                  }
                // LA EXPLOSION SE DIFUMINA Y AUMENTA DE TAMAÑO
                        if (this.chopper_explotado){
                            this.heliExplota.alpha -= 0.01; this.heliExplota.scale += 0.02;
                            if (this.heliExplota.scale > 6){this.heliExplota.destroy()} 
                        }

           


          
           if (this.chopper_explotado){    this.time.addEvent({delay: 6000,callback:()=>{ 
                                                this.game.scene.scenes[0].primeraVez = false;
                                                this.scene.restart();
                                               
                                           
                                                },callbackScope: this, loop:false })}
       


       ////////////REFLEJO

      //  if (this.mini_chopper.y>680){this.mini_chopper.y-=15  }

          // this.reflejochopper.x = this.mini_chopper.x;
     //  let posreflejo = 700+(700-this.mini_chopper.y);
     
     //      this.reflejochopper.y = (posreflejo);

   //     this.reflejochopper.setRotation(-this.mini_chopper.rotation);
      


}      //final del update     final del update    final del update     final del update    final del update     final del update    final del update     final del update


////

manejaHelic(potenciaX,potenciaY){

    // let velX =  this.mini_chopper.body.velocity.x;
    // let velY =  this.mini_chopper.body.velocity.y;
    

                if (potenciaX != 0 || potenciaY != 0){ //empezamos a movernos
                 
                    if (this.mini_chopper.body.velocity.y > -300){ //frenemos
                        if (potenciaY<0){this.mini_chopper.body.velocity.y -= potenciaY*0.05}}
                    if (this.mini_chopper.body.velocity.y < 300){
                        if (potenciaY>0){this.mini_chopper.body.velocity.y -= potenciaY*0.05}} 
                    
                    if (this.mini_chopper.body.velocity.x > -300){        
                        if (potenciaX<0){this.mini_chopper.body.velocity.x += potenciaX*0.09}}

                    if (this.mini_chopper.body.velocity.x < 300){  
                    if (potenciaX>0){this.mini_chopper.body.velocity.x += potenciaX*0.09}}
                       
                    }       
                        
                        
                        if (this.lastVelx < this.mini_chopper.body.velocity.x){this.rotacionDer();}
                        if (this.lastVelx > this.mini_chopper.body.velocity.x){this.rotacionIzq();}
                        if (this.lastVelx == this.mini_chopper.body.velocity.x){this.rotacionRegresa();}
                        this.lastVelx = this.mini_chopper.body.velocity.x;
                     

                        if (this.mini_chopper.anims.currentAnim.key != 'volarDer'){
                            if (this.mini_chopper.x < this.siguienteMetaX )
                                {this.mini_chopper.anims.play('volarDer');}
                            }else if (this.mini_chopper.anims.currentAnim.key != 'volarIzq')
                                    {
                                     if (this.mini_chopper.x > this.siguienteMetaX)
                                        {   this.mini_chopper.scaleX = -0.3;
                                            this.mini_chopper.anims.play('volarIzq');
                                            this.mini_chopper.body.setOffset(500,200) 
                                        }
                                    }

  }

  rotacionIzq()
  {  
    if (this.Heli_angulo > 5.8) {   this.mini_chopper.rotation =this.Heli_angulo-=0.01 

                                   
                                    
                                }}      

  rotacionDer()
  { 
    if (this.Heli_angulo <6.7) {this.mini_chopper.rotation =this.Heli_angulo+=0.01 ;
                                    }}


  rotacionRegresa()
  { if (this.Heli_angulo > 6.5) {this.mini_chopper.rotation =this.Heli_angulo-=0.01  }
    if (this.Heli_angulo < 6.4) {this.mini_chopper.rotation =this.Heli_angulo+=0.01; }

       
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
          
            this.scene.mini_chopper.visible=false;
           
        }

    }



   