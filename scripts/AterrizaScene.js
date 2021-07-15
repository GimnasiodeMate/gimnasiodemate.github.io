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
        this.load.image('Arenal', '../assets/imgs/bkgnd/arenal.webp')
        this.load.image('SanJose', '../assets/imgs/bkgnd/ElCoco.webp')
        this.load.image('Corcovado', '../assets/imgs/bkgnd/corcovado.webp')
        this.load.image('PaloVerde', '../assets/imgs/bkgnd/paloverde.webp')
        this.load.image('Chirripo', '../assets/imgs/bkgnd/chirripo.webp')
        this.load.image('nubes', '../assets/imgs/bkgnd/clouds.png')
        this.load.image('sombra', '../assets/imgs/shadow.webp')

        ////////////////////////
        /// Preload Imagenes

        //this.load.image('miimagen2', '../assets/sprites/escritorio3.jpg')
        this.load.image('marco', '../assets/imgs/marco.webp')
       
       




        /////////////////////////////////////
        // PRELOAD SPRITESHEETS ANIMACIONES  

        //this.load.atlas('heliAterriza', '../assets/sprites/HelicopteroAmarillo.png', '../assets/sprites/HelicopteroAmarillo.json')
        this.load.atlas('caras', '../assets/sprites/caras.webp', '../assets/sprites/caras.json')




        //////////////////////////////
        /// Dialogos te texto y expresiones

        this.dialogo=[]; // aqui va el dialogo

        this.dialogoSantaRosa = 
        [   'Hola! ____¿Pura vida?'+
            '___.___.____.____________________________________________\n'+
            '¡Bienvenidos al Parque Nacional Santa Rosa! \n'+
            '____________________________________________________'+
            'llegan justo a tiempo....',
            'la llamada de auxilio llego...    __________________\n'+
            'hm_m_m________________   dejame ver... '+
            '__________________\n'+
            'desde las coordenadas __-__-__>'+
            '  _____ ( ___ 13__ ,_______________ 15 ) ',
        'Los turistas son ___.___.____. Franceses\n______________________________ y hablan un poquito de Ingles \n____ pero nada de Espanol'];

        this.dialogoArenal = 
        ['Hola,_________________ Bienvenido al Parque Nacional Volcan Arenal... \n____________________________________________________', 
        'Jue pucha, ___.___.___.____\n¡Que dicha que llegaron!______________ \n tenemos horas buscando a esa gente ________________________',
        'son unos turistas rusos ______________________\n Locos por los tucanes! ______________________ \n ya salieron todos menos uno... ______________________________',
        'sospecho que se salió del sendero\n ____ siguiendo el canto del tucan.... ______________________ \n(juepucha mas tonto!) ',
         'encontramos unas huellas ______________\nen el sector de las coladas de lava,\n entonces apuesto que esta por esa zona',
         '!vaya con cuidado __________________, mucha suerte!'];

         this.emocionesArenal = ['contento','sorprendido','desanimado','feliz','contento','feliz'];


         this.dialogoPaloVerde = 
        ['Dios mio,_________________ ya era hora!.. \n____________________________________________________por cierto ___.___.___.____, Bienvenidos a Palo Verde', 
        ' y al majestuoso Rio Tempisque!______________  \n Hoy temprano vinieron unos Suizos ______________________\n Segun ellos expertos en Kayak ______________________ ',
        ' la verdad no se veian muy muy...______________________________\n salieron del sector Norte_____ e iban Rio arriba',
        ' ____ la lancha de rescate encontro el Kayak.... ______________________ \nPero no a los Suizos ',
        'solo esperemos que los Cocodrilos..... \n no hayan almorzado Turistas Suizos hoy_______________\n JAJAJAJAJA!__________  es broma... recibimos una llamada',
         'estan a unos 5 km al norte de Puerto Humo __________________,\n pero no logran salir_______________\n, Ja!.... ____________ Expertos'];

         this.emocionesPaloVerde = ['contento','sorprendido','sorprendido','desanimado','feliz','contento','feliz'];


        
} //end preload

create() {
        /////////////////////////////////
        ////
        this.cielo_Aterriza = this.physics.add.staticImage(0, 0, 'nubes');
        this.cielo_Aterriza.setOrigin(0,0);
        this.cielo_Aterriza.setScale(1.5);
        //this.cielo_Aterriza.setScale(1.5);

        this.heli = new HeliAterriza(this, 850,100, 'animHelicoptero');

        this.heli.setScale(0.2);
        this.heli.scaleX=-0.2;
        this.heli.play('heliAterriza');
        this.heli.setDepth(3);

        var lugarAterrizaje = this.game.scene.scenes[0].lugarAterrizaje 
        this.fondo_Aterriza = this.physics.add.staticImage(780, 500, lugarAterrizaje);

        
        
        this.sombra_dialogo = this.physics.add.staticImage(780, 1000, 'sombra');
        this.sombra_dialogo.setScale(2.1);
        this.aterrizo = false
   
         this.cara = new AnimaAvatar(this, 430,1000, 'caras');
         this.cara.setScale(0.6);
         this.cara.play('contento'); 
      


        this.marco = new MarcoMensaje(this, 880,1000, 'marco');
        this.marco.setScale(1)
       

        this.pasosMsgBox = [false,false,false,false,false] // controla los eventos
        //[aterriza,sombra,marco,mensaje1]
        this.listoAterriza = false;
        this.listoSombra = false;
        this.listoMarco = false;
        this.listoDialogo = false;
        this.listoEstaLinea = false;

        this.contador_Letras = 0;
        this.maquina_escribiendo = false
        this.escribiendo = this.dialogo[0]
        this.contemos = 0
        
    ////////////////////////////////////////////////////////////////////////
    /// Dependiendo de la escena

    if (lugarAterrizaje == 'Arenal'){this.dialogo = this.dialogoArenal ; this.emociones = this.emocionesArenal;}
    else if (lugarAterrizaje == 'SantaRosa'){this.dialogo = this.dialogoSantaRosa}
    else if (lugarAterrizaje == 'PaloVerde'){this.dialogo = this.dialogoPaloVerde; this.emociones = this.emocionesPaloVerde;}
    else if (lugarAterrizaje == 'SanJose'){this.dialogo = this.dialogoSanJose}
    else if (lugarAterrizaje == 'Chirripo'){this.dialogo = this.dialogoChirripo}
    else if (lugarAterrizaje == 'Corcovao'){this.dialogo = this.dialogoCorcovado}
    else (this.dialogo=this.dialogo1);

    this.cuantasLineas = this.dialogo.length;
    this.lineaActual = 0;


 } //end create

 update(){ 
   
     //
    this.aterriza();
    
    if (this.listoAterriza){  this.muestrasombra();}
    if (this.listoSombra){ this.muestramarco();}
    if (this.listoMarco && !this.listoDialogo) { this.despliegaLineas();}






 }//end update

///////////////////////////////////////////////////////////////////////////////////////

 
    aterriza() { // tiempo desde que empezo el programa // delta desde el ultimo last frame cicle?
    { 
       if (this.heli.x >200){ this.heli.x-=1.5; this.heli.setRotation(-0.3)} //muevase en el horizonte
            else{if (this.heli.y < 625) // ahora baje y crezca

                {   this.heli.y+=0.8;
                
                    if (this.heli.scaleX < 0){this.heli.setRotation(0.3);this.heli.scaleX *=-1, this.heli.scaleY *=1; }
                    if(this.heli.rotation>0.001){this.heli.rotation *= 0.99;}else{}
                    this.heli.scaleX *=1.0015;
                    this.heli.scaleY *=1.0015;
                    //if(this.heli.rotation < 0) {this.heli.rotation += 0.001;}
                }else{this.listoAterriza=true}
                }

       //if (-0.3 > this.heli.scale && this.heli.scale < 0.3){this.heli.scale *=1.005; this.heli.rotation = -.15;}
    } } 



    muestrasombra()
    {      if (this.sombra_dialogo.y > 610) {this.sombra_dialogo.y -= 5}
            else{this.listoSombra=true}}

    muestramarco()
    {      if (this.cara.y > 690) {this.cara.y  -= 5
                                   this.marco.y -= 5}
                                   else{this.listoMarco=true}}

    
    despliegaLineas(){
        
        if (!this.listoEstaLinea){this.letra_por_letra(this.dialogo[this.lineaActual]);   this.cara.play(this.emociones[this.lineaActual]); }
       

       else{this.cara.play('feliz');}
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
                    
                                    

    console.log(this.listoDialogo);
    if (this.contador_Letras == this.escribiendo.length) //cuando ya termino
    {   console.log(this.dialogo.length);
         {if (this.dialogo.length>this.lineaActual+1){
                this.lineaActual+=1;console.log('primera linea lista')}else{this.listoDialogo=true;} // ya termine este  dialogo
                console.log('lineaActual:'+ this.lineaActual);
               }
        
        this.time.addEvent({ delay: 2500, callback:()=>{ // aqui estoy gestionando las   
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
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "00","00","00", "01","01","01","07","07","17"] }),
                frameRate: animFrameRate,
            repeat: -1
        })

/// feliz
        anims.create({
                key: 'feliz',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [  "00","00","00", "01","01","01","07","07","17"] }),
                frameRate: animFrameRate,
            repeat: -1
        })

/// desanimado
        anims.create({
                key: 'desanimado',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [  "00","00","00", "01","01","01","07","07","17"] }),
                frameRate: animFrameRate,
            repeat: -1
        })


/// sorprendido
        anims.create({
                key: 'sorprendido',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "07"] }),
                frameRate: animFrameRate,
            repeat: -1
        })

/// Helicoptero
        anims.create({
                key: 'heliAterriza',
                frames: anims.generateFrameNames('heliAterriza',{ frames: [ "000","001","002"] }),
                frameRate: animFrameRate,
            repeat: -1
        })



    }
}