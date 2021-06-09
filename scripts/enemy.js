class Enemy extends Entity{
	constructor(scene, x,y,textureKey,damage,type){
		super(scene,x,y,textureKey,'Enemy',type)

		const anims = scene.anims
		const animFrameRate = 4
		this.textureKey = textureKey
		this.damage = damage
		this.type = type

/// derecha
		anims.create({
			  	key: 'tpOffRight',
        		frames: anims.generateFrameNames(this.textureKey,{
            	prefix: 'skeleton-walk-right/',
            	suffix:'',
            	start: 1,
            	end: 3,
            	zeroPad: 2 //cuantos espacios de numero tiene 01, 02, 03 etc
        	}),
        	frameRate: animFrameRate,
        	repeat: -1
    	})

/// izquierda
		anims.create({
			  	key: 'tpOffLeft',
        		frames: anims.generateFrameNames(this.textureKey,{
            	prefix: 'skeleton-walk-left/',
            	suffix:'',
            	start: 1,
            	end: 3,
            	zeroPad: 2 //cuantos espacios de numero tiene 01, 02, 03 etc
        	}),
        	frameRate: animFrameRate,
        	repeat: -1
    	})		

/// arriba
		anims.create({
			  	key: 'tpOffUp',
        		frames: anims.generateFrameNames(this.textureKey,{
            	prefix: 'skeleton-walk-up/',
            	suffix:'',
            	start: 1,
            	end: 3,
            	zeroPad: 2 //cuantos espacios de numero tiene 01, 02, 03 etc
        	}),
        	frameRate: animFrameRate,
        	repeat: -1
    	})

/// abajo
		anims.create({
			  	key: 'tpOffDown',
        		frames: anims.generateFrameNames(this.textureKey,{
            	prefix: 'skeleton-walk-down/',
            	suffix:'',
            	start: 1,
            	end: 3,
            	zeroPad: 2 //cuantos espacios de numero tiene 01, 02, 03 etc
        	}),
        	frameRate: animFrameRate,
        	repeat: -1
    	}),

	this.speed = 32;
	//this.body.setVelocity(0,this.speed)
	this.cambiaDireccion()
	}// end constructor

	update(){
		const {speed} = this // para no tener que estar poniendo this.speed
		const enemyBlocked = this.body.blocked

		if (enemyBlocked.down || enemyBlocked.left || enemyBlocked.right ||enemyBlocked.up)// si choca con alguien 
					{this.cambiaDireccion()}																		// cambie direccion
			
	} // final de UPDATE()

	cambiaDireccion(){
		let dir = Math.floor(Math.random()*4) // configurando la direccion inicial
		switch (dir){
		case 0:
		this.body.setVelocity(0,-this.speed) //up
		this.anims.play('tpOffUp')
		break
		case 1:
		this.body.setVelocity(0,this.speed)//down
		this.anims.play('tpOffDown')
		break
		case 2:
		this.body.setVelocity(-this.speed,0)//left
		this.anims.play('tpOffLeft')
		break
		case 3:
		this.body.setVelocity(this.speed,0)//right
		this.anims.play('tpOffRight')
		break
	}}
}