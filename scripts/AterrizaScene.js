class AterrizaScene extends Phaser.Scene {
    constructor() {

        super('AterrizaScene')
    }

preload() {


        ///
       
        this.cursors
        this.cameras.main.setBackgroundColor(0x00000)

        ////////////////////////
        /// Preload Fondos
         this.load.image('SantaRosa', '../assets/imgs/bkgnd/SantaRosa2.webp')
         this.load.image('nubes', '../assets/imgs/bkgnd/clouds.png')
         this.load.image('sombra', '../assets/imgs/shadow.webp')

        ////////////////////////
        /// Preload Imagenes

        //this.load.image('miimagen2', '../assets/sprites/escritorio3.jpg')
        this.load.image('marco', '../assets/imgs/marco.webp')
       
       




        /////////////////////////////////////
        // PRELOAD SPRITESHEETS ANIMACIONES  

        this.load.atlas('heliAterriza', '../assets/sprites/HelicopteroAmarillo.png', '../assets/sprites/HelicopteroAmarillo.json')
        this.load.atlas('caras', '../assets/sprites/caras.png', '../assets/sprites/caras.json')




        //////////////////////////////
        /// Dialogos te texto

        this.dialogo = ['Hola! ____¿Pura vida?___.___.____.____________________________________________\n¡Bienvenidos al Parque Nacional Santa Rosa! \n____________________________________________________llegan justo a tiempo....', 
        'la llamada de auxilio llego...    __________________\n    hm_m_m________________   dejame ver... __________________\ndesde las coordenadas __-__-__>  _____ ( ___ 13__ ,_______________ 15 ) ',
        'Los turistas son ___.___.____. Franceses\n______________________________ y hablan un poquito de Ingles \n____ pero nada de Espanol']

        
} //end preload

create() {
        /////////////////////////////////
        ////
        this.cielo_Aterriza = this.physics.add.staticImage(800, 200, 'nubes');
        this.cielo_Aterriza.setScale(1.5);

        this.heli = new HeliAterriza(this, 850,100, 'heliAterriza');
        this.heli.setScale(0.05);
        this.heli.play('heliAterriza');

        this.fondo_Aterriza = this.physics.add.staticImage(780, 500, 'SantaRosa');
        this.fondo_Aterriza.setScale(1.4);
        this.sombra_dialogo = this.physics.add.staticImage(760, 1000, 'sombra');
        this.sombra_dialogo.setScale(2);
        this.aterrizo = false
   
         this.cara = new AnimaAvatar(this, 430,1000, 'caras');
         this.cara.setScale(0.6);
         this.cara.play('contento'); 
      


        this.marco = new MarcoMensaje(this, 880,1000, 'marco');
        this.marco.setScale(1)
       

        this.pasosMsgBox = [false,false,false,false,false]
        //[d.horizontal,d.vertical,sombra,marco,mensaje1]
        this.contador_Letras = 0;
        this.maquina_escribiendo = false
        this.escribiendo = this.dialogo[0]
        this.contemos = 0

 } //end create

 update(){ 
   
     //
    this.aterriza();
    
    if (this.pasosMsgBox[0]){  this.muestrasombra();}
    if (this.pasosMsgBox[1]){ this.muestramarco();}
    if (this.pasosMsgBox[2]) { this.despliegaLineas();}


 }//end update

///////////////////////////////////////////////////////////////////////////////////////

 
    aterriza() { // tiempo desde que empezo el programa // delta desde el ultimo last frame cicle?
    { 
       if (this.heli.x >100){ this.heli.x-=1.5;}
            else{if (this.heli.y < 445)
                {   this.heli.y+=0.8; 
                    this.heli.scale *=1.0005;
                    if(this.heli.rotation < 0) {this.heli.rotation += 0.001;}
                }else{this.pasosMsgBox[0]=true}
                }

       if (this.heli.scale < 0.3){this.heli.scale *=1.005; this.heli.rotation = -.15;}
    } } 

    muestrasombra()
    {      if (this.sombra_dialogo.y > 610) {this.sombra_dialogo.y -= 5}
            else{this.pasosMsgBox[1]=true}}

    muestramarco()
    {      if (this.cara.y > 690) {this.cara.y  -= 5
                                   this.marco.y -= 5}
                                   else{this.pasosMsgBox[2]=true}}

    
    despliegaLineas(){
        
        if (!this.pasosMsgBox[3]){this.letra_por_letra(this.dialogo[0]);   this.cara.play('contento'); 
        }else if (!this.pasosMsgBox[4]){this.letra_por_letra(this.dialogo[1]);this.cara.play('sorprendido');
        }else if (!this.pasosMsgBox[5]){this.letra_por_letra(this.dialogo[2]);this.cara.play('desanimado');
        }else{this.cara.play('feliz');}
    // aqui vamos a recorrer el arreglo para    
    }
       

    escondesombra()
    {      if (this.sombra_dialogo.y < 400) {this.sombra_dialogo.y += 5}}      

    


    letra_por_letra(escribiendo,terminado)

    { if (!this.maquina_escribiendo) { this.mensajeL1 = this.add.bitmapText(555, 635, 'desyrel', "", 25);
                                        this.escribiendo = escribiendo ;
                                        this.maquina_escribiendo = true }
     
     var taquigrafo;

                this.time.addEvent({ delay: 400, callback:()=>{
                    taquigrafo = this.escribiendo.substring(0, this.contador_Letras);
                    this.contador_Letras += 1;
                        if (this.escribiendo.substring(this.contador_Letras-1,this.contador_Letras)=='_')
                                {this.escribiendo = this.escribiendo.slice(0, this.contador_Letras-1) + this.escribiendo.slice(this.contador_Letras);
                                 this.contador_Letras -= 1}
                        else{   this.mensajeL1.setText(taquigrafo);
                                this.contemos +=1;
                               
                               


                        }
                        }, callbackScope: this, loop:false    }) 
                    
                                    

    
    if (this.contador_Letras == this.escribiendo.length) //cuando ya termino
    {   
        this.time.addEvent({ delay: 2500, callback:()=>{
                            if (!this.pasosMsgBox[3]){this.pasosMsgBox[3]=true;console.log('primera linea lista')} // ya termine esta linea
                    else    if (!this.pasosMsgBox[4]){this.pasosMsgBox[4]=true;console.log('segunda linea lista')}
                    else    if (!this.pasosMsgBox[5]){this.pasosMsgBox[5]=true;console.log('tercera linea lista')}
                                                       this.maquina_escribiendo = false;
                                                       this.contador_Letras=0; // arreglar esto   
                                                       this.mensajeL1.destroy(); 
                                                    

                                                    }, callbackScope: this, loop:false    })
    }                            
    
    }/// fin de letra x letra  

   


} //end gameScene

class HeliAterriza extends Entity{
    constructor(scene, x,y,textureKey,){
        super(scene,x,y,textureKey,'HeliAterriza')

        const anims = scene.anims
        const animFrameRate = 10
        this.textureKey = textureKey
      

/// aterrizando
        anims.create({
                key: 'heliAterriza',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "000", "001", "002"] }),
                frameRate: animFrameRate,
            repeat: -1
        })
    }
}





class MarcoMensaje extends Entity{
    constructor(scene, x,y,imagen,){
        super(scene,x,y, imagen,'MarcoMensaje')
        this.x = x;
        this.y = y;
        this.up = false;
       this.imagen = imagen;
      }
  }




class AnimaAvatar extends Entity{
    constructor(scene, x,y,textureKey,){
        super(scene,x,y,textureKey,'AnimaAvatar')

        const anims = scene.anims
        const animFrameRate = 10
        this.textureKey = textureKey
      

/// contento
        anims.create({
                key: 'contento',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "3", "3", "3", "3", "3", "3", "3", "3", "3",
                                                                             "3", "3", "3", "3", "3", "3", "3", "3", "3",
                                                                             "4","5","6","3","4","5","6","3","3", "3", "3",
                                                                             "3", "3", "3", "3", "3", "3","3", "3", "3",
                                                                             "3", "3", "3", "3", "3", "3", "3", "3", "3",
                                                                             "3", "3", "3", "3", "3", "3", "3", "3", "3",
                                                                             "4","5","6","3","4","5","6","3"] }),
                frameRate: animFrameRate,
            repeat: -1
        })

/// feliz
        anims.create({
                key: 'feliz',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "0","0","0","0","0","0","0","0","0","0","0",
                                                                            "0","1","2","0","1","2","0","1","2","0","0",
                                                                            "0","0","0","0","0","0","0","0","0",
                                                                            "0","0","0","0","0","0","0","0","0",
                                                                            "0","1","2","0","1","2","0","1","2",] }),
                frameRate: animFrameRate,
            repeat: -1
        })

/// desanimado
        anims.create({
                key: 'desanimado',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "10","10","10","10","10","10","10","10",
                                                                              "10","10","10","10", "11", "12", "13",
                                                                              "12","11","10"] }),
                frameRate: animFrameRate,
            repeat: -1
        })


/// sorprendido
        anims.create({
                key: 'sorprendido',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "7"] }),
                frameRate: animFrameRate,
            repeat: -1
        })
    }
}