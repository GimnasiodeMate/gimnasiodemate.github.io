//////// ELEMENTOS RESCATE
///
/// Indice:
// class Chopper



        class Chopper extends Entity{      
                                        constructor(scene, x,y,textureKey,type){super(scene,x,y,textureKey,'Chopper')

                                                
                                                this.textureKey = textureKey; this.x = x; this.y = y;
                                                this.depth =1;
                                                this.colorTint = '0xFFFFFF';
                                                const anims = scene.anims
                                                let animFrameRate =  10;
                                     


                                                ///ANIMACIONES PARA EL CHOPPER
                                                anims.create({  key: 'volarIzq',
                                                                 frames: anims.generateFrameNames(this.textureKey,
                                                                {frames: [ "000", "001","002","003"]}),
                                                                 frameRate: animFrameRate, repeat: -1 })
                                                
                                                anims.create({  key: 'volarDer',
                                                                frames: anims.generateFrameNames(this.textureKey,
                                                                {frames: [ "000", "001","002","003"]}),
                                                                frameRate: animFrameRate, repeat: -1 })
                                              
                                                        this.anims.play('volarDer')
                                                        this.setScale(0.3)
                                                        this.body.setCollideWorldBounds(true) ;
                                                        this.body.setSize(280,200);
                                                        this.body.setOffset(230,210);

                
                                        }//final del Constructor
        }//FINAL CLASE CHOPPER

        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        class Turista extends Entity{
	                                constructor(scene, x,y,textureKey,type){super(scene,x,y,textureKey,'Turista',type)

		const anims = scene.anims
		this.textureKey = textureKey
		this.type = type 
                this.setScale(0.5);
                this.colgado = false;
                this.entregado =false;
	  
                this.body.gravity.y = 100;
                this.depth =1;

                this.animAnterior = 'miraDerecha'
		let animFrameRate =  12;

                                                ///ANIMACIONES PARA EL TURISTA
                                                /// mira hacia la derecha
                                                anims.create({  key: 'miraDerecha',
                                                                frames: anims.generateFrameNames(this.textureKey,
                                                                {frames: [ "3", "4","5", "6","7"] }),
                                                                frameRate: animFrameRate, repeat: -1 })

                                                /// mira hacia la Izquierda
                                                anims.create({  key: 'miraIzquierda',
                                                                frames: anims.generateFrameNames(this.textureKey,
                                                                {frames: [ "8", "9","10", "11","12"] }),
                                                                frameRate: animFrameRate, repeat: -1 })

                                                /// Agradece 
                                                anims.create({  key: 'gracias',
                                                                frames: anims.generateFrameNames(this.textureKey,
                                                                {frames: [ "13", "14","15"]}),
                                                                frameRate: animFrameRate, repeat: -1 })

                                                /// Colgado del Helicoptero
                                                anims.create({
                                                                key: 'colgado',
                                                                frames: anims.generateFrameNames(this.textureKey,
                                                                {frames: [ "0", "0", "0","1","1","1"] }),
                                                                frameRate: animFrameRate, repeat: -1 })


                //animacion inicial
        	this.anims.play('miraDerecha');this.animAnterior='miraDerecha';
		//crea burbuja que lo acompaña
                this.burbuja = new Burbuja(this.scene, this.x,this.y-100,'burbuja');

		}//Final del Constructor Turista

                // UPDATE TURISTA UPDATE TURISTA UPDATE TURISTA UPDATE TURISTA UPDATE TURISTA UPDATE TURISTA
                updateTurista(){
                        this.burbuja.y = this.y-80; this.burbuja.x = this.x;

                        if (this.colgado && this.animAnterior != 'colgado'){this.turistaColgado();} 
        
                        if (!this.colgado && !this.entregado){
                                if (this.x < this.scene.mini_chopper.x && this.animAnterior != 'miraDerecha'){this.anims.play('miraDerecha');this.animAnterior='miraDerecha';}
                                if (this.x > this.scene.mini_chopper.x && this.animAnterior != 'miraIzquierda'){this.anims.play('miraIzquierda');this.animAnterior='miraIzquierda';}}

                        if (this.entregado && this.animAnterior != 'gracias')
                                {this.anims.play('gracias');this.animAnterior='gracias';
                                 this.scene.firework.visible=true;this.scene.firework.anims.play('firework1');}
     
     
                        //PARA AGARRARSE DEL GANCHO
       
                        if (!this.entregado && !this.scene.mini_chopper.isDead){
                        if ((this.x-this.scene.escalera3.ganchox>-20 && 
                             this.x-this.scene.escalera3.ganchox<20) ||
                             (this.colgado&&!this.entregado)){
                                                                if (this.y-this.scene.escalera3.ganchoy>-20 &&
                                                                 this.y-this.scene.escalera3.ganchoy<20|| 
                                                                 this.colgado) 
                                                                        {this.colgado = true;
                                                                         this.x =this.scene.escalera3.ganchox
                                                                         this.y =this.scene.escalera3.ganchoy}}
                        } //si ha sido entregado y el chopper esta vivo, no se suete ^^^^^^^^^^^^^^^^

                        var dist = Phaser.Math.Distance.BetweenPoints(this, this.scene.rescatePlat);
                        if (dist<100 && !this.entregado)
                             {  this.colgado = false;
                                this.entregado = true;
                                this.x = this.scene.rescatePlat.x; 
                                this.y = this.scene.rescatePlat.y-80;
                             } // si la distancia es menor que 100, guindese ^^^^^^^^^^^^^^^^

										
	

        
                        if (this.colgado == true){this.scene.siguienteMetaX = this.scene.rescatePlat.x}        
                                // si el turista se colgo el helicoptero se dirige a la plataforma de rescate^^^

                        //////// EJECUTA MANEJA BURBUJA
                        this.burbuja.manejaBurbuja();
                        if( this.scene.mini_chopper.isDead &&  this.animAnterior != 'miraDerecha')
                                { this.anims.play('miraDerecha');this.animAnterior='miraDerecha';}
                                // Si se destruye el chopper cambia a miraderecha ^^^
       

	       } // FINAL DE UPDATETURISTA  

                // si quisieramos especificar mas acciones de turista colgado esta este metodo vvvv
                turistaColgado(){this.anims.play('colgado');this.animAnterior='colgado';}


        } // FINAL CLASE TURISTA FINAL CLASE TURISTA FINAL CLASE TURISTA FINAL CLASE TURISTA FINAL CLASE TURISTA FINAL CLASE TURISTA
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


        class Burbuja extends Entity{
        

                constructor(scene, x,y,textureKey,type,pare){ super(scene,x,y,textureKey,'Burbuja',type)

                        const anims = scene.anims
                        this.textureKey = textureKey
                        this.type = type 
                        this.depth =1;
                        this.setScale(0.4)
                        this.pare = pare;
                        let animFrameRate =  4;
                        this.animAnterior = 'auxilio';


                        /// ANIM BURBUJA DE AUXILIO
                        anims.create({  key: 'auxilio',
                                        frames: anims.generateFrameNames(this.textureKey,{ 
                                        frames: [ "0", "1","16","16","8","9","5","6","7"] }),
                                        frameRate: animFrameRate, repeat: -1 })

                        /// ANIM BURBUJA DE ME CAIGO
                        anims.create({  key: 'meCaigo',
                                        frames: anims.generateFrameNames(this.textureKey,{ 
                                        frames: [ "0", "1","2","3","4","3","2","4","3","2"] }),
                                        frameRate: animFrameRate, repeat: -1 })

                        /// ANIM BURBUJA DA GRACIAS
                        anims.create({  key: 'daGracias',
                                        frames: anims.generateFrameNames(this.textureKey,{ 
                                        frames: [ "0", "1","13","14","15","14","13","16"] }),
                                        frameRate: animFrameRate, repeat: -1 })

                        //animacion inicial
                        this.anims.play('auxilio')
      
                }////Final del Constructor Burbuja
    
                        manejaBurbuja(){
                                if (this.scene.turistaPerdido.colgado && this.animAnterior != 'meCaigo'){this.anims.play('meCaigo');this.animAnterior='meCaigo';} 
                                // si esta colgado, animacion me caigo
                                if (this.scene.turistaPerdido.entregado && this.animAnterior != 'daGracias'){this.anims.play('daGracias');this.animAnterior='daGracias';} 
                                // si esta en la plataforma, animacion da gracias
                                if (!this.scene.turistaPerdido.entregado && !this.scene.turistaPerdido.colgado && this.animAnterior != 'auxilio'){this.anims.play('auxilio');this.animAnterior='auxilio';} 
                                // si no aun no esta rescatado ni colgado entonces animacion auxilio
                        } //FINAL MANEJA BURBUJA
        
        }// FINAL CLASE BURBUJA  FINAL CLASE BURBUJA  FINAL CLASE BURBUJA  FINAL CLASE BURBUJA  FINAL CLASE BURBUJA  FINAL CLASE BURBUJA  FINAL CLASE BURBUJA 
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


        class Mono extends Entity{
                                         constructor(scene, x,y,textureKey,type){super(scene,x,y,textureKey,'Mono',type)

                        this.textureKey = textureKey
                        this.type = type 
                        this.yaBrinco = false;
                        this.body.gravity.y = 200;
                        this.depth =1;
                        this.setScale(0.1)


                        //colliders>> con mini_chopper
                        this.scene.physics.add.collider(this,this.scene.mini_chopper);
                        }//Final del Constructor Enemigo

                updateMono(){ // monos

                        if(this.body.velocity.y==0){this.body.setVelocityY(-Phaser.Math.Between(30, 80)); }
                        //si se detuvo entonces brinque

                        var dist = Phaser.Math.Distance.BetweenPoints(this.scene.mini_chopper, this);
                        //dist ayuda a reaccionar si el chopper esta cerca        
        
       
                        if (dist<300 &&  !this.yaBrinco){

                                this.body.setVelocityY(-150);
                                if (this.x < this.scene.mini_chopper.x) { this.body.setVelocityX(+200)}else{this.body.setVelocityX(-200)}
                                this.yaBrinco = true;
                                this.gritocongo = this.scene.sound.add('gritocongo');
                                this.gritocongo.play();   
                                this.scene.time.addEvent({delay: 5000,callback:()=>{ this.yaBrinco=false;},callbackScope: this, loop:false })         
                        }//si la distancia es de menos de 300 salte hacia el chopper y play al sonido

              
                        if (this.yaBrinco){this.body.velocity.x *= 0.995 ; }
                        //si esta en el aire frenese para parecer mas realista
                }  // FINAL DE UPDATEENEMIGO

        }// FINAL CLASE ENEMIGO FINAL CLASE ENEMIGO FINAL CLASE ENEMIGO FINAL CLASE ENEMIGO FINAL CLASE ENEMIGO FINAL CLASE ENEMIGO
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


     class ReflejoFijo extends Entity{
                        constructor(scene, x,y,textureKey,myscale){super(scene,x,y,textureKey,'Reflejo')

                        
                        this.textureKey = textureKey
                        this.depth =0;
                       // this.setOrigin=0;
                        this.y = (this.height/2)+700;
                        this.scaleX = myscale;
                        this.scaleY = -myscale;
                       // this.setTint(0xeb9e34)
                      


                }////Final del Constructor ReflejoFijo           


                updateReflejoFijo(){
                                if (this.x > 0) { this.x -= 2;}
                                else {this.x = 6000}
                                //GESTIONA EL MOVIMIENTO DE LA LAPA ENEMIGA
                
                } // FINAL DE UPDATE LAPA 
        
        }// FINAL CLASE RELEJO  FINAL CLASE RELEJO  FINAL CLASE RELEJO  FINAL CLASE RELEJO  FINAL CLASE RELEJO  FINAL CLASE RELEJO    
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



     class Paloma extends Entity{
                                        constructor(scene, x,y,textureKey,type){super(scene,x,y,textureKey,'Paloma',type)

                        const anims = scene.anims
                        this.textureKey = textureKey
                        this.type = type 
                        this.depth =1;
                        this.setScale(0.4)
                        this.setTint(0xeb9e34)
                        let animFrameRate =  7;

                        /// ANIMACION VUELO LAPA
                        anims.create({  key: 'paloma',
                                        frames: anims.generateFrameNames(this.textureKey,{ 
                                         frames: [ "0", "1", "2","3", "4", "5","6", "7", "8","9","10","11","12"] }),
                                        frameRate: animFrameRate, repeat: -1 })

                        //animacion inicial
                        this.anims.play('paloma')
                        
                        //colliders>> con mini_chopper
                        this.scene.physics.add.collider(this,this.scene.mini_chopper);

                }////Final del Constructor Pajaro                


                updatePaloma(){
                                if (this.x > 0) { this.x -= 2;}
                                else {this.x = 6000}
                                //GESTIONA EL MOVIMIENTO DE LA LAPA ENEMIGA
                
                } // FINAL DE UPDATE LAPA 
        
        }// FINAL CLASE PALOMA FINAL CLASE PALOMA FINAL CLASE PALOMA FINAL CLASE PALOMA FINAL CLASE PALOMA FINAL CLASE PALOMA FINAL  
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>





     class Tucan  extends Entity{
            constructor(scene, x,y,textureKey,type){super(scene,x,y,textureKey,'Paloma',type)

                        const anims = scene.anims
                        this.textureKey = textureKey
                        this.type = type 
                        this.depth =1;
                        this.setScale(0.4)
                        this.setTint(0xeb9e34)
                        this.lanzando = false;
                        let animFrameRate =  17;

                        /// ANIMACION VUELO LAPA
                        anims.create({  key: 'tucan',
                                        frames: anims.generateFrameNames(this.textureKey,{ 
                                         frames: [ "0", "1", "2","3", "4", "5","6", "7"] }),
                                        frameRate: animFrameRate, repeat: -1 })

                        //animacion inicial
                        this.anims.play('tucan')
                        
                        //colliders>> con mini_chopper
                        this.scene.physics.add.collider(this,this.scene.mini_chopper);
                        this.bomba1 = new HueBomba(this.scene, this.x,this.y+30,'huebomba');
                        this.bomba2 = new HueBomba(this.scene, this.x+30,this.y+60,'huebomba');
                        this.bomba3 = new HueBomba(this.scene, this.x+60,this.y+90,'huebomba');

                }////Final del Constructor Pajaro                


                updateTucan(){
                                if (this.x > 0) { this.x -= 2;
                                                this.y=this.y*1.0001}
                                else {this.x = 6000}
                             
                                if (this.x - this.scene.mini_chopper.x<10 && this.x - this.scene.mini_chopper.x>-10 )
                                {this.lanzando = true;
                                        }

                                if (this.lanzando){
                                      
                                    this.scene.time.addEvent({delay: 5000,callback:()=>{ this.lanzando = false;},callbackScope: this, loop:false })
                                      
                                        this.bomba1.updateHueBomba(this.x,this.lanzado);
                                        this.bomba2.updateHueBomba(this.x,this.lanzado);
                                        this.bomba3.updateHueBomba(this.x,this.lanzado);}
                                //GESTIONA EL MOVIMIENTO DE LA LAPA ENEMIGA
                
                } // FINAL DE UPDATE LAPA 
        
        }// FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO 
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

     class HueBomba  extends Entity{
            constructor(scene, x,y,textureKey,type){super(scene,x,y,textureKey,'HueBomba',type)

                        this.textureKey = textureKey
                        this.type = type 
                        this.depth =1;
                        this.setScale(0.2)
                        this.ritmo = 0.1
                        this.rotation =(Phaser.Math.Between(0.1,8));
                        this.visible = false;
                        this.disparado = false;

                       
                        
                        //colliders>> con mini_chopper
                        this.scene.physics.add.collider(this,this.scene.mini_chopper);

                }////Final del Constructor Pajaro                


                updateHueBomba(x){
                                
                                if (!this.visible){     this.visible=true;
                                                        this.x = x}

                                        this.x-=1.5;
                                        this.y +=5
                                        this.rotation += this.ritmo;
                                
                                //GESTIONA EL MOVIMIENTO DE LOS HUEVOS
                
                } // FINAL DE UPDATE LAPA 
        
        }// FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO 





        class Pajaro extends Entity{
                                        constructor(scene, x,y,textureKey,type){super(scene,x,y,textureKey,'Pajaro',type)

                        const anims = scene.anims
                        this.textureKey = textureKey
                        this.type = type 
                        this.depth =1;
                        this.setScale(0.7)
                        let animFrameRate =  14;

                        /// ANIMACION VUELO LAPA
                        anims.create({  key: 'lapa',
                                        frames: anims.generateFrameNames(this.textureKey,{ 
                                         frames: [ "0", "1", "2","3", "4", "5","6", "7", "8"] }),
                                        frameRate: animFrameRate, repeat: -1 })

                        //animacion inicial
                        this.anims.play('lapa')
                        
                        //colliders>> con mini_chopper
                        this.scene.physics.add.collider(this,this.scene.mini_chopper);

                }////Final del Constructor Pajaro                


                updateLapa(){
                                if (this.x < 9000) { this.x += 2; this.y *= 0.9999}
                                else {this.x = -30}
                                //GESTIONA EL MOVIMIENTO DE LA LAPA ENEMIGA
                
                } // FINAL DE UPDATE LAPA 
        
        }// FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO  FINAL CLASE PAJARO 
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


        class Arbol extends Entity{
                                        constructor(scene, x,y,textureKey){ super(scene,x,y,textureKey,'Arbol')

                        this.x = x;
                        this.y = y;
                        this.textureKey = textureKey;
                        this.body.immovable = true;
                        this.depth = 1;
                        this.setImmovable;
                        let U = this.height/100; // U son las unidades para hacerlo proporcional
           
                        //Generamos los bodies para que colisione

                        this.body.setSize(this.width/6 ,this.height);
                        this.cup1 = new BodysinCuerpo(this.scene, this.x,this.y-(this.height/4),100,100)
                        this.cup2 = new BodysinCuerpo(this.scene, this.x,this.y-(this.height/4),100,100)
                        this.cup1.body.setSize(this.width/1.5,this.height/6);
                        
                        //ahora establezco los colliders   collideWorldBounds
                        this.scene.physics.add.collider(this.scene.mini_chopper , [this,this.cup1,this.cup2] );
    
                        /// PARA CADA TIPO DE ARBOL HAY BODIES DISTINTOS

                             // EN EL CASO DE ARBOL1
                                if (this.textureKey == 'arbol1')
                                        {  this.body.setSize(this.width/10,this.height*0.8);
                                           this.body.setOffset(30*U,15*U);    
                                           //copas
                                            this.cup1.body.setCircle(U*23);
                                            this.cup1.x = this.x-(U*0), this.cup1.y = this.y-(35*U);

                                            this.cup2.body.setSize(this.width/1.3,this.height/12);
                                            this.cup2.x = this.x-(U*5), this.cup2.y = this.y-(35*U);
                                         }

                             //EN EL CASO DE ARBOL 2
                                if (this.textureKey == 'arbol2')
                                        {       this.body.setSize(this.width/6,this.height*0.4);
                                                this.body.setOffset(30*U,40*U);
                                                this.cup1.body.setSize(U*20,U*10); 
                                                this.cup2.body.setSize(U*25,U*20);
                                                
                                                this.cup1.x = this.x+(U*-15);  this.cup1.y = this.y-(18*U);
                                                this.cup2.x = this.x+(U*15);this.cup2.y = this.y-(30*U);
                                               
                                        }

                             //EN EL CASO DE ARBOL 3
                                if (this.textureKey == 'arbol3')
                                        {       this.body.setSize(this.width/8,this.height*0.5);
                                                this.body.setOffset(25*U,40*U);
                                                this.cup1.body.setSize(U*40,U*10); 
                                                this.cup2.body.setSize(U*25,U*20);
                                                
                                                this.cup1.x = this.x+(U);  this.cup1.y = this.y-(24*U);
                                                this.cup2.x = this.x+(U*1.5);this.cup2.y = this.y-(30*U);
                                        }

                             //EN EL CASO DE ARBOL 5
                                if (this.textureKey == 'arbol5')
                                        {       this.body.setSize(this.width/8,this.height*0.005);
                                                this.body.setOffset(25*U,300*U);
                                                this.cup1.body.setSize(U*40,U*0); 
                                                this.cup2.body.setSize(U*25,U*0);
                                                
                                                this.cup1.x = this.x+(U);  this.cup1.y = this.y-(300*U);
                                                this.cup2.x = this.x+(U*1.5);this.cup2.y = this.y-(300*U);
                                        }



                        }////Final del Constructor ARBOL    

        }// FINAL CLASE ARBOL  FINAL CLASE ARBOL FINAL CLASE ARBOL FINAL CLASE ARBOL FINAL CLASE ARBOL FINAL CLASE ARBOL FINAL CLASE  
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        class BodysinCuerpo extends Entity{
                                        constructor(scene, x,y,sizex,sizey){super(scene,x,y,'BodysinCuerpo')

                        this.x = x;
                        this.y = y;
                        this.body.setSize(sizex,sizey);
                        this.visible = false;
                        this.body.immovable = true;
                        this.scene.physics.add.collider(this, [this.scene.mini_chopper,this.scene.turistaPerdido,this.scene.mono1,this.scene.mono2,this.scene.mono3,this.scene.mono4]);


                        }// fin del constructor CopaArbol
 
        }// FINAL CLASE  BodysinCuerpo  FINAL CLASE  BodysinCuerpo  FINAL CLASE  BodysinCuerpo  FINAL CLASE  BodysinCuerpo  FINAL 
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  class Cerro extends Entity{
                        constructor(scene, x,y,textureKey){ super(scene,x,y,textureKey,'Arbol')

                        this.x = x;
                        this.y = y;
                        this.textureKey = textureKey;
                        this.body.immovable = true;
                        this.U = this.width/100;
                        this.depth = -1;
                        this.body.origin =(0,0);

                        this.setImmovable;
                        //this.scene.physics.add.collider(this , [this.scene.mini_chopper,this.scene.turistaPerdido);
                        this.scene.physics.add.collider(this , [this.scene.mini_chopper,this.scene.turistaPerdido,this.scene.mono1,this.scene.mono2,this.scene.mono3,this.scene.mono4]);

                        let U = this.height/100; // U son las unidades para hacerlo proporcional
           
                        //Generamos los bodies para que colisione

                        if (this.textureKey == 'cerro1'){
                                this.body.setSize(this.width/1.2,this.height/2.5);
                                this.body.setOffset(12*this.U,24*this.U);
                                this.sinbody1 = new BodysinCuerpo(this.scene, this.x+7*this.U,this.y+6*this.U,70*this.U, 10*this.U);
                                this.sinbody2 = new BodysinCuerpo(this.scene, this.x+11*this.U,this.y-2*this.U,45*this.U, 10*this.U);
                                this.sinbody3 = new BodysinCuerpo(this.scene, this.x+6*this.U,this.y-9*this.U,15*this.U, 7*this.U);
                                this.sinbody4 = new BodysinCuerpo(this.scene, this.x+27*this.U,this.y-7*this.U,5*this.U, 7*this.U);}


                        if (this.textureKey == 'cerro2'){

                                this.body.setSize(this.U*85,this.U*10);
                               this.body.setOffset(5*this.U,25*this.U);
                                this.sinbody1 = new BodysinCuerpo(this.scene, this.x+2*this.U,this.y+7*this.U,72*this.U, 10*this.U);
                                this.sinbody2 = new BodysinCuerpo(this.scene, this.x+2*this.U,this.y+2*this.U,60*this.U, 10*this.U);
                                this.sinbody3 = new BodysinCuerpo(this.scene, this.x-10*this.U,this.y-8*this.U,11*this.U, 10*this.U);
                               // this.sinbody4 = new BodysinCuerpo(this.scene, this.x+27*this.U,this.y-7*this.U,5*this.U, 7*this.U);
                       }


                       // this.body.setSize(this.width/6 ,this.height);
                       
                        
            

                        }////Final del Constructor ARBOL    

        }// FINAL CLASE ARBOL  FINAL CLASE ARBOL FINAL CLASE ARBOL FINAL CLASE ARBOL FINAL CLASE ARBOL FINAL CLASE ARBOL FINAL CLASE  
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>









        class Escalera extends Entity{
                                        constructor(scene, x,y,textureKey,longitud,agarrex,agarrey,type,px,py){super(scene,x,y,textureKey,'Escalera')

                        this.x = x
                        this.y = y
                        this.textureKey = textureKey
                        this.longitud = longitud
                        this.type = type
                        this.posPunta_x 
                        this.posPunta_y
                        this.setScale(1)
                        this.px = px;
                        this.py = py; 
                        this.ganchox = 0;
                        this.ganchoy = 0;
       
                        this.angulo = (Math.PI/4)
                        this.rotation = this.angulo;
                        this.setOrigin(0)
                        this.velocidadAngular =0;
                        this.aceleracionAngular=0.001;
                        this.fuerza
                        this.gravedad = 1; // aqui podria hacer referencia a la escena
                        // ESTAS VARIABLES SE UTILIZAN EN LOS CALCULOS PARA EL PENDULO
                        this.force // se multiplica por la gravedad y el seno del angulo... cuanto jala
       


                        }// // fin del constructor ESCALERA

                        updateEscalera(){  
                                /// SE CALCULA EL PENDULO DE CADA TROZO DE ESCALERA

                                let f_giro; 
                                if (this.px == 0){f_giro = 0.05}
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


                                let ajustex = 0  ; let ajustey = 0 ;
    
                                    if (this.x == this.scene.escalera1.x){ //quiero estar seguro que solo sirva con el primer mecate
                                    if (this.scene.mini_chopper.anims.currentAnim.key != 'volarDer'){
                                        if (this.px == 0)   { ajustex = -10; ajustey = 25}}else //solo cuando es el primer mecate
                                                            { ajustex =  20; ajustey = 25}}

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
                                                                                
                                          
                                    if (this.scene.chopper_explotado){this.visible=false} // si explota desaparezca



                        } // final de updateEscalera()
                                 
        }// FINAL CLASE  ESCALERA - FINAL CLASE  ESCALERA - FINAL CLASE  ESCALERA - FINAL CLASE  ESCALERA - FINAL CLASE  ESCALERA - 
         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        class NubesMalas extends Entity{
        
                                        constructor(scene, x,y,textureKey,type){ super(scene,x,y,textureKey,'nubesmalas')

                        this.textureKey = textureKey
                        this.depth =4;
                        this.setScale(0.7)
                        this.tronador = 0;
                        this.yasono = false;

                        }// fin del constructor NubesMalas

                
                        updateNubesMalas(){
       
                                if (this.tronador>10){this.scene.mini_chopper.body.velocity.x *= 0.95;}
                                //si lleva 10 ciclos en la nube disminuya su velocidad

                                if (this.x >0 ) { this.x -= 0.2;} // si esta en la pantalla muevase lentamente a la izquierda
                                else {this.x = 9000}              // si no esta vaya al final
               
                                var dist = Phaser.Math.Distance.BetweenPoints(this, this.scene.mini_chopper);
                                //para saber si esta metido en la nube       
                                if (this.scene.mini_chopper.y < 50)
                                {if (dist<this.width/3){this.tronador +=1;}else{this.tronador*=0.99}}else{this.tronador*=0.99}
                                //si esta en la nube aumenta el tronador si salio de la nube disminuyalo
                                if (this.tronador>20){ if (!this.yasono){this.yasono = true; this.scene.alarma_helicoptero.play(); };
                                        this.trueno(); // secuencia de colores
                                        }//si el tronador es mayor a 20 suene la alarma

                                if (this.tronador>100){   this.scene.mini_chopper.body.velocity.y +=10;
                                        this.scene.mini_chopper.body.velocity.x -=20;}
                                        // si el tronador llega a 100 lance el chopper hacia abajo;



                        } // final de updateNubesMalas()

        // vvv metodo trueno cambia de color al helicoptero
                trueno()
                        {this.scene.mini_chopper.setTint('0xf02800');
                        this.scene.time.addEvent({delay: 200,callback:()=>{ this.scene.mini_chopper.setTint('0xf0e400');},callbackScope: this, loop:false })
                        this.scene.time.addEvent({delay: 300,callback:()=>{ this.scene.mini_chopper.setTint('0xf02800')},callbackScope: this, loop:false })
                        this.scene.time.addEvent({delay: 400,callback:()=>{ this.scene.mini_chopper.setTint('0xf0e400')},callbackScope: this, loop:false })
                        this.scene.time.addEvent({delay: 500,callback:()=>{ this.scene.mini_chopper.setTint('0xf02800')},callbackScope: this, loop:false })
                        this.scene.time.addEvent({delay: 600,callback:()=>{ this.scene.mini_chopper.setTint('0xf0e400');},callbackScope: this, loop:false })
                        this.scene.time.addEvent({delay: 700,callback:()=>{ this.scene.mini_chopper.setTint('0xf02800')},callbackScope: this, loop:false })
                        this.scene.time.addEvent({delay: 800,callback:()=>{ this.scene.mini_chopper.setTint('0xf0e400')},callbackScope: this, loop:false })
                        this.scene.time.addEvent({delay: 900,callback:()=>{ this.scene.mini_chopper.setTint('0xf02800')},callbackScope: this, loop:false })
                        this.scene.time.addEvent({delay: 1300,callback:()=>{ this.scene.mini_chopper.setTint('0xFFFFFF');this.yasono = false;},callbackScope: this, loop:false })
        
                }

        
        }// FINAL NUBES MALAS - FINAL NUBES MALAS - FINAL NUBES MALAS - FINAL NUBES MALAS - FINAL NUBES MALAS - FINAL NUBES MALAS -
        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


 class NubeTop extends Entity{
        
                        constructor(scene, x,y,textureKey,type){ super(scene,x,y,textureKey,'nubeTop')

                        this.textureKey = textureKey
                        this.depth =4;
                        this.setScale(1)
                        this.pintado = false;
                      
                     

                        }// fin del constructor NubesMalas

                
                        updateNubeTop(){
                        
                        var dist = Phaser.Math.Distance.BetweenPoints(this, this.scene.mini_chopper);
                       
                        if (dist<this.height/2)
                                {this.scene.mini_chopper.body.velocity.y += 15;
                                        if (!this.pintado){
                                        this.setTint('0x808080');
                                        this.pintado = true;
                                        this.scene.time.addEvent({delay: 100,callback:()=>{ this.setTint('0x74498c');},callbackScope: this, loop:false })
                                        this.scene.time.addEvent({delay: 200,callback:()=>{ this.setTint('0xcdde9bs')},callbackScope: this, loop:false })
                                        this.scene.time.addEvent({delay: 250,callback:()=>{ this.setTint('0xffffff');this.pintado = false;},callbackScope: this, loop:false })
                                        }
                                        console.log('estoy muy cerca')}
                       
                             

                        } // final de updateNubesMalas()

        // vvv metodo trueno cambia de color al helicoptero
                truenoNubeTop(){}
                    
                

        
        }// FINAL NUBETOP- FINAL NUBETOP- FINAL NUBETOP- FINAL NUBETOP- FINAL NUBETOP- FINAL NUBETOP- FINAL NUBETOP- FINAL NUBETOP- 
       //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>







        class Flecha extends Entity{
        

                                        constructor(scene, x,y,textureKey){super(scene,x,y,textureKey,'Flecha')

                        this.textureKey = textureKey
                        this.depth =10;
                        this.setScale(0.5);
                        this.lado = 'izquierda';
                

                }//final del Flecha

                        updateFlecha(){
       
                                        let dist =  (this.scene.siguienteMetaX-this.scene.mini_chopper.x);
                                        if (dist<0){dist*=-1}
                                        if (this.scene.mini_chopper.x < this.scene.siguienteMetaX){this.lado = 'izquierda';}
                                        if (this.scene.mini_chopper.x > this.scene.siguienteMetaX){this.lado = 'derecha';}
        

                                        if (dist>1500){
                                        if (this.lado == 'izquierda'){   
                                                this.x = this.scene.cameras.main._scrollX+1600*0.95;
                                                this.y =this.scene.cameras.main._scrollY+150;
                                                this.visible = true;                              
                                                }
                                        if (this.lado == 'derecha'){   
                                                this.scene.flecha2.x = this.scene.cameras.main._scrollX+100*0.95;
                                                this.scene.flecha2.y =this.scene.cameras.main._scrollY+150;
                                                this.scene.flecha2.visible = true;                              
                                                }

                                        }else{ // esta cerca 
                                           
                                                this.visible = false;
                                                this.scene.flecha2.visible = false;
                                        }
                
                                        if (!this.scene.introlista){this.visible=false} // desaparezca en la introduccion

       
                        }// final de updateFlechas()

          }// FINAL FLECHA - FINAL FLECHA - FINAL FLECHA - FINAL FLECHA - FINAL FLECHA - FINAL FLECHA - FINAL FLECHA - FINAL FLECHA -
        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        class Firework extends Entity{
        

                                        constructor(scene, x,y,textureKey,color){super(scene,x,y,textureKey,'Firework')

                        const anims = scene.anims
                        this.textureKey = textureKey
                        this.depth =5;
                        let animFrameRate =  20;
                        this.animAnterior = 'firework1';
                        this.visible = false;


                        /// ANIM FIREWORKS
                        anims.create({  key: 'firework1',
                                        frames: anims.generateFrameNames(this.textureKey,{ 
                                        frames: [ "0", "2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"] }),
                                        frameRate: animFrameRate, repeat: -1 })
                         
                      
                        }// // fin del constructor fireworks
   
          }// FINAL FIREWORKS -  FINAL FIREWORKS -  FINAL FIREWORKS -  FINAL FIREWORKS -  FINAL FIREWORKS -  FINAL FIREWORKS -  FINAL FIREWORKS - 
          /////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

