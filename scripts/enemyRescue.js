class Pajaro extends Entity{
	


	constructor(scene, x,y,textureKey,type){
		super(scene,x,y,textureKey,'lapa',type)

		const anims = scene.anims
		this.textureKey = textureKey
		this.type = type 
	       
                //this.body.gravity.y = 100;
                this.depth =1;

                let animFrameRate =  14;


/// vuelaDerecha
                anims.create({
                        key: 'lapa',
                        frames: anims.generateFrameNames(this.textureKey,{ frames: [ "0", "1", "2","3", "4", "5","6", "7", "8"] }),
                        frameRate: animFrameRate,
                    repeat: -1
                })
                            
        		this.anims.play('lapa')
        		this.setScale(0.7)

		
    }//final del Constructor

    updateLapa(){
        if (this.x < 2500) { this.x += 1;}
        else {this.x = -30}
        	
	} // final de UPDATE()
        

}