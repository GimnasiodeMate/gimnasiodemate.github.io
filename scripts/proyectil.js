// http://phaser.io/examples/v3/view/physics/arcade/bullets-group

class Proyectil extends Phaser.Physics.Arcade.Sprite{
	constructor(scene,x,y){
		super(scene,x,y,'bullet')
		this.x = 200
		this.y = 200

	}

	fire(x,y,dir){
		this.body.reset(x,y)
		this.setActive(true)
		this.setVisible(true)
		this.dir = dir
		switch(dir){
			case 'left': this.setVelocity(-200,0)
			this.body.rotation = 180
			return
			case 'right': this.setVelocity(200,0)
			this.body.rotation = 0
			return
			case 'up': this.setVelocity(0,-200)
			this.body.rotation = -90
			return
			case 'down': this.setVelocity(0,200)
			this.body.rotation = 90
			return
			}
	}
	recycle(){
		this.setActive(false)
		this.setVisible(false)
	}


}

class Proyectiles extends Phaser.Physics.Arcade.Group {
	constructor(scene){
		super(scene.physics.world, scene)
		this.createMultiple({
			frameQuantity: 5,
			key: 'bullet',
			active: false,
			visible: false,
			classType: Proyectil
		})
	}
	fireProyectil(x,y,facing){
		let proyectil = this.getFirstDead(false)
		if(proyectil){
			proyectil.fire(x,y,facing)
		}
	}


}