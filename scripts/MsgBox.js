
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
	constructor(scene, msg1, msg2){
		
		super(scene,'MsgBox')


		const animFrameRate = 2.5
		const anims = scene.anims
        this.desplegado = true
		this.x  
		this.y 
		this.msg1 = msg1
		this.msg2 = msg2
        this.icono_chica
       
		



		
/////////////////migrando

		  ///////////// creo el icono
        this.icono_chica = new Icono(this.scene,'anim_msgbox')
        this.icono_cart = new BotonEje(this.scene,'icono_eje')
        this.filtro_cart = new FiltroCartesiano(this.scene,'cartesiano')
        this.icono_chica.setInteractive();
       


        this.msgbox = this.scene.physics.add.staticImage(this.scene.player.x+600, 400+this.scene.cameras.main._scrollY, 'msgbox');
        this.msgbox.setScale(1);
        this.msgbox.visible = true
        this.mensajeL1 = this.scene.add.bitmapText(this.scene.player.x+300, 300+this.scene.cameras.main._scrollY, 'desyrel', this.msg1, 50);
        this.mensajeL2 = this.scene.add.bitmapText(this.scene.player.x+300, 300+this.scene.cameras.main._scrollY, 'desyrel', this.msg2, 50);
        this.scene.time.addEvent({
            delay: 6000,
            callback:()=>{
                this.msgbox.visible = false;
                this.mensajeL1.visible = false;
                this.mensajeL2.visible = false;
          
   
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


		var  posX_Msgbox = 520+(this.scene.cameras.main._scrollX+(200/elzoom))-(280/(elzoom*0.7))
        var  posY_Msgbox = 170+(this.scene.cameras.main._scrollY+(150/elzoom))
        var posX_Msg = 555+(this.scene.cameras.main._scrollX+(200/elzoom))-(380/(elzoom*0.7))
        var posY_Msg = (posY_Msgbox*0.994)
       




		this.msgbox.setPosition(posX_Msgbox, posY_Msgbox);
        this.msgbox.setScale(1/(1.5*elzoom))
        this.mensajeL1.setPosition( posX_Msg , posY_Msg);
        this.mensajeL1.setFontSize(40/(1.5*elzoom));
        this.mensajeL2.setPosition( posX_Msg , posY_Msg + (40*(1/elzoom*0.8)));
        this.mensajeL2.setFontSize(40/(1.5*elzoom));


        var posX_icono_chica =385+(this.scene.cameras.main._scrollX+(200/elzoom))-(380/(elzoom*0.7))
        var posY_icono_chica = 200+(this.scene.cameras.main._scrollY+(150/elzoom))
            
        this.icono_chica.setPosition(posX_icono_chica, posY_icono_chica);
        this.icono_chica.setScale(0.5/(1.5*elzoom));

        var posX_icono_cart = (385+(this.scene.cameras.main._scrollX+(300/elzoom))-(380/(elzoom*0.7)))
        var posY_icono_cart = (posY_icono_chica)

       
        this.icono_cart.laImagen.setPosition(posX_icono_cart, posY_icono_cart);
        this.icono_cart.laImagen.setScale(0.8/(1.5*elzoom));

           console.log('pasado pasado');
           console.log(this.scene.filtro_clicked);
        if (this.scene.filtro_clicked){ this.scene.filtro_clicked = false
                                        this.filtro_cart.laImagen.visible = !this.filtro_cart.laImagen.visible}

        if (this.scene.msgbox_visible){ this.scene.msgbox_visible = false;
                                        this.msgbox.visible = !this.msgbox.visible
                                        this.mensajeL1.visible = !this.mensajeL1.visible
                                        this.mensajeL2.visible = !this.mensajeL2.visible
                                        this.scene.time.addEvent({
                                        delay: 17000,
                                        callback:()=>{
                                        this.msgbox.visible = false
                                        this.mensajeL1.visible = false;
                                        this.mensajeL2.visible = false;
                                        

                                        },  callbackScope: this,  loop:false })}

            
                                

                
}


}


  




        //this.msgbox_icon.setPosition(posX_Msgbox , posY_Msgbox);
		//this.msgbox_icon.setScale(40/(1.5*elzoom));
        


	

