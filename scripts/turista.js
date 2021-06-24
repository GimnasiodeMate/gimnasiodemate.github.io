class Turista extends Entity{
	


	constructor(scene, x,y,textureKey,type){
		super(scene,x,y,textureKey,'Turista',type)

		const anims = scene.anims
		this.textureKey = textureKey
		this.type = type 
                this.colgado = false;
                this.entregado =false;
	  
                this.body.gravity.y = 100;
                this.depth =1;

                this.animAnterior = 'miraDerecha'
		let animFrameRate =  4;


/// mira derecha
        anims.create({
                key: 'miraDerecha',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "0", "1"] }),
                frameRate: animFrameRate, repeat: -1 })

/// mira derechaUP
        anims.create({
                key: 'miraDerechaUP',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "6", "7"] }),
                frameRate: animFrameRate, repeat: -1 })

/// mira izquierda
        anims.create({
                key: 'miraIzquierda',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "2", "3"] }),
                frameRate: animFrameRate, repeat: -1 })

/// mira izquierdaUP
        anims.create({
                key: 'miraIzquierdaUP',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "4", "5"] }),
                frameRate: animFrameRate, repeat: -1 })

      
		this.anims.play('miraIzquierda')
		this.setScale(0.4)

		
    }//final del Constructor

    updateTurista(){
        if (this.y > this.scene.mini_chopper.y){
                if (this.x < this.scene.mini_chopper.x && this.animAnterior != 'miraDerechaUP') {this.anims.play('miraDerechaUP');this.animAnterior='miraDerechaUP';}
         else if (this.x > this.scene.mini_chopper.x && this.animAnterior != 'miraIzquierdaUP') {this.anims.play('miraIzquierdaUP');this.animAnterior='miraIzquierdaUP';}
        }
        else if (this.x < this.scene.mini_chopper.x && this.animAnterior != 'miraDerecha') {this.anims.play('miraDerecha');this.animAnterior='miraDerecha';}
                else if (this.x > this.scene.mini_chopper.x && this.animAnterior != 'miraIzquierda') {this.anims.play('miraIzquierda');this.animAnterior='miraIzquierda';}
        
         //   console.log('distancia:'+Phaser.Math.Distance.BetweenPoints(this.scene.elmecate3.ganchox,this.scene.elmecate3.ganchoy,this.x,this.y));

                // dist(this.scene.elmecate3.ganchox,this.scene.elmecate3.ganchoy,this.x,this.y));
/////////////////////////////////
       
        if ((this.x-this.scene.elmecate3.ganchox>-20 && 
             this.x-this.scene.elmecate3.ganchox<20) || (this.colgado&&!this.entregado)){
         if (this.y-this.scene.elmecate3.ganchoy>-20 && this.y-this.scene.elmecate3.ganchoy<20|| this.colgado) {
                this.colgado = true;
                this.x =this.scene.elmecate3.ganchox
                this.y =this.scene.elmecate3.ganchoy}}


               // console.log('turista:'+this.x)
               // console.log('plataforma:'+this.scene.plat2.x);
               // console.log((this.x)-(this.scene.plat2.x))

        if ((this.x)-(this.scene.plat2.x)>-20 && (this.x)-(this.scene.plat2.x)<20)
             {
                console.log('aqui me bajo');         
                this.colgado = false;
                this.entregado = true;
               

                       }



										// cambie direccion
	this.scene.mono1.updateEnemigo()		
	} // final de UPDATE()

}


class Enemigo extends Entity{
        

        constructor(scene, x,y,textureKey,type){
                super(scene,x,y,textureKey,'Enemigo',type)

                const anims = scene.anims
                this.textureKey = textureKey
                this.type = type 
                this.yaBrinco = false;
                this.body.gravity.y = 100;
                this.depth =1;
                let animFrameRate =  4;

                this.setScale(0.1)
                    }//final  Constructor

    updateEnemigo(){

        var dist = Phaser.Math.Distance.BetweenPoints(this.scene.mini_chopper, this);
        if (dist<100 &&  !this.yaBrinco){
                console.log(this);
                this.body.setVelocityY(-100);
                if (this.x < this.scene.mini_chopper.x) { this.body.setVelocityX(+200)}else{this.body.setVelocityX(-200)}
                this.yaBrinco = true;

                console.log('brinque!!')}



                                                                         
                        
        } // final de updateEnemigo()



}