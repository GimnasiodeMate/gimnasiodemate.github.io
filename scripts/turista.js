class Turista extends Entity{
	


	constructor(scene, x,y,textureKey,type){
		super(scene,x,y,textureKey,'Turista',type)

		const anims = scene.anims
		this.textureKey = textureKey
		this.type = type 
	     console.log(this)
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
        
										// cambie direccion
			
	} // final de UPDATE()

}