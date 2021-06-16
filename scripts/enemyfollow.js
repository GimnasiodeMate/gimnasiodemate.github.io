class EnemyFollow extends Enemy{
	constructor(scene, x,y,textureKey,damage,type){
		super(scene,x,y,textureKey,'Enemy',type)

		this.speed =32
		this.chasing = true 
		this.damage = damage
	}//end create

	update(destination){

		const enemyBlocked = this.body.blocked
		if (enemyBlocked.down || enemyBlocked.left || enemyBlocked.right ||enemyBlocked.up)// si choca con alguien 
			{	this.chasing = false;
				this.cambiaDireccion()

				this.scene.time.addEvent({
					delay: 1000,
					callback: ()=>{
						this.chasing = true
					},
					callbackScope: this.scene, // no usamos this porque estamos adentro del objeto
					loop: false

				})

			}		



		const {speed} = this
		if (this.chasing){
			this.body.setVelocity(0,0)
			const dx = Math.abs(this.body.x - destination.x)
			const dy = Math.abs(this.body.y - destination.y)
			if (dx > dy){
				//close x gap
				if (this.body.x < destination.x){
					//move right
					this.body.setVelocity(speed,0)
					this.anims.play('tpOffRight',true)
				}else{	//move left
						this.body.setVelocity(-speed,0)
						this.anims.play('tpOffLeft')}

			}else{

				if (this.body.y < destination.y){
					//move down
					this.body.setVelocity(0,speed)
					this.anims.play('tpOffDown')
				}else{	//move up
						this.body.setVelocity(0,-speed)
						this.anims.play('tpOffUp')}

				//close y gap
		//		this.body.velocity.normalize.scale(speed)//
			}//end of chase

		}
	}// end of update

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


}//end of clase