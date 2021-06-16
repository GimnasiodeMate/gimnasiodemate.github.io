class Turista extends Entity{
	


	constructor(scene, x,y,textureKey,type){
		super(scene,x,y,textureKey,'Turista',type)

		const anims = scene.anims
		this.textureKey = textureKey
		this.type = type 
	     console.log(this)
                this.body.gravity.y = 100;
                this.depth =1;

		let animFrameRate =  8;
/// aterrizando
        anims.create({
                key: 'ayuda',
                frames: anims.generateFrameNames(this.textureKey,{ frames: [ "0", "1", "2", "0","0","0","0","0","0", "1", "2"] }),
                frameRate: 10, repeat: -1 })
      
		this.anims.play('ayuda')
		this.setScale(1.3,0.5)

		
    }//final del Constructor

    update(){
    	console.log('si pasa por aqui');
    	
										// cambie direccion
			
	} // final de UPDATE()

}