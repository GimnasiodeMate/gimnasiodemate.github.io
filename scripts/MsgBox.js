
class FiltroCartesiano extends Entity{
    constructor(scene,imagen){
        super(scene,'imagen','FiltroCartesiano')

        this.x  ='noo'
        this.y 
        this.imagen = imagen;
        this.laImagen = this.scene.physics.add.staticImage(1800, 1900, imagen);
        this.laImagen.visible = false;
        this.laImagen.setScale(1.25);
      
            

}

} 
       






class BotonEje extends Entity{
    constructor(scene,imagen){
        
        super(scene,'imagen')
        this.x  
        this.y 
        this.imagen = imagen;
        this.laImagen = this.scene.physics.add.staticImage(0, 0, imagen);
        this.laImagen.setInteractive();
        

        
          


}}



class Icono extends Entity{
    constructor(scene, textureKey){
        
        super(scene,textureKey,'MsgBox')

        const animFrameRate = 2.5
        const anims = scene.anims
        this.x  
        this.y 
        this.textureKey = textureKey;
       


////////////creando animacion

        /// Izquierda
        anims.create({
                key: 'esperando',
                frames: anims.generateFrameNames(this.textureKey,{
                prefix: '',
                suffix:'',
                start: 0,
                end: 2,
                zeroPad: 3 //cuantos espacios de numero tiene 01, 02, 03 etc
            }),
            frameRate: animFrameRate,
            repeat: -1
        })

//// animando
     this.anims.play('esperando');

}}

//////////////////////////////////////////////////////////////////////////////////////

class MsgBox extends Entity {
	constructor(scene, animacion ,msg1, msg2){
		
		super(scene,'MsgBox')


		const animFrameRate = 2.5
		const anims = scene.anims
        this.desplegado = true
		this.x  
		this.y 
		this.msg1 = msg1
	    this.icono_chica
        this.animacion = animacion
       
		



		
/////////////////migrando

		  ///////////// creo el icono
        this.filtro_cart = new FiltroCartesiano(this.scene,'cartesiano')  
        this.icono_chica = new Icono(this.scene,this.animacion)
        this.icono_cart = new BotonEje(this.scene,'icono_eje')
        this.icono_chica.setInteractive();
    
 
        this.msgbox = this.scene.physics.add.staticImage(this.scene.player.x+600, 400+this.scene.cameras.main._scrollY, 'msgbox');
        this.msgbox.setScale(1);
        this.msgbox.visible = true
        this.mensajeL1 = this.scene.add.bitmapText(this.scene.player.x+300, 300+this.scene.cameras.main._scrollY, 'desyrel', this.msg1, 50);
        this.scene.time.addEvent({
            delay: 15000,
            callback:()=>{
                this.msgbox.visible = false;
                this.mensajeL1.visible = false;
         
          
   
            },
            callbackScope: this,
            loop:false
            })

        this.icono_cart.laImagen.on('pointerdown', function (pointer) { console.log('click');
                                                                        this.scene.filtro_clicked = true})
        
        this.icono_chica.on('pointerdown', function (pointer) { this.scene.msgbox_visible = true})




		}//final de constructor

	update_botones(){

                                                                        
        // console.log( gridVisible)
        //     if (gridVisible){ console.log('le di click')
        //                         this.filtro_cart.laImagen.visible=false
        //                       this.scene.time.addEvent({ delay: 6000,
        //                                                 callback:()=>{this.filtro_cart.laImagen.visible=false;
        //                                                                 console.log('y se fue')}});
        //     }
    }
	

	update_Msg_Pos(elzoom){
            //acomoda los elementos del menu en la parte del mapa para que no se muevan

		var  posX_Msgbox = this.scene.cameras.main.midPoint.x  - (this.scene.cameras.main.displayWidth/2)  + 800 * (1/elzoom)
        var  posY_Msgbox = this.scene.cameras.main.midPoint.y  + (this.scene.cameras.main.displayHeight/2) - 125 * (1/elzoom)
        var posX_Msg = posX_Msgbox 
        var posY_Msg = posY_Msgbox
       


     


    // aqui abajo ya estoy asignandoles el punto  y la escala donde van a ir
    // el msgbox
		this.msgbox.setPosition(posX_Msgbox, posY_Msgbox);
        this.msgbox.setScale(2/(1.5*elzoom))
    //el texto del mensaje
        this.mensajeL1.setPosition( posX_Msg-250*(1/elzoom) , posY_Msg-20)*(1/elzoom);
        this.mensajeL1.setFontSize(40/(1.5*elzoom));
       

    //creo una variable para la ubicacion de la muchacha
        var posX_icono_chica =  this.scene.cameras.main.midPoint.x  - (this.scene.cameras.main.displayWidth/2)  + 60 * (1/elzoom)
        var posY_icono_chica =  this.scene.cameras.main.midPoint.y  + (this.scene.cameras.main.displayHeight/2) - 100 * (1/elzoom)
    
    //asigno pos y escala a icono chica
        this.icono_chica.setPosition(posX_icono_chica, posY_icono_chica);
        this.icono_chica.setScale(1/(1.5*elzoom));

    // variable para boton cartesian
        var posX_icono_cart = posX_icono_chica + (100/(elzoom*0.7))
        var posY_icono_cart = (posY_icono_chica)

    // asigno pos y escala a icono cartesiano
        this.icono_cart.laImagen.setPosition(posX_icono_cart, posY_icono_cart);
        this.icono_cart.laImagen.setScale(1.5/(1.5*elzoom));

          
   

        if (this.scene.filtro_clicked){ this.scene.filtro_clicked = false
                                        this.filtro_cart.laImagen.visible = !this.filtro_cart.laImagen.visible}

        if (this.scene.msgbox_visible){ this.scene.msgbox_visible = false;
                                        this.msgbox.visible = !this.msgbox.visible
                                        this.mensajeL1.visible = !this.mensajeL1.visible
                                        this.mensajeL2.visible = !this.mensajeL2.visible
                                        this.scene.time.addEvent({
                                        delay: 15000,
                                        callback:()=>{
                                        this.msgbox.visible = false
                                        this.mensajeL1.visible = false;
                                        this.mensajeL2.visible = false;
                                        

                                        },  callbackScope: this,  loop:false })}

            
                                

                
}


}


  




        //this.msgbox_icon.setPosition(posX_Msgbox , posY_Msgbox);
		//this.msgbox_icon.setScale(40/(1.5*elzoom));
        


	

