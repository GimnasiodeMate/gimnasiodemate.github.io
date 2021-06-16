class Healthbar{
	constructor(scene, x, y, health){
		this.scene = scene
		this.currentHealth = health 
		this.x = x 
		this.y = y

		this.graphics2 = this.scene.add.graphics() // este es el orden en que se dibujan!
		this.graphics = this.scene.add.graphics()
		this.newGraphics = this.scene.add.graphics()
		
		const healthbarBackground2 = new Phaser.Geom.Rectangle(this.x+34, this.y, 104, 12)//blanco
		const healthbarBackground = new Phaser.Geom.Rectangle(this.x+36, this.y+2, 100, 8) // rojo
		const healthbarFill = new Phaser.Geom.Rectangle(this.x+36, this.y+2, this.currentHealth, 8) // 100 pixeles de ancho es currentHealth

		
		this.graphics.fillStyle(0xff0099, 1) // rojo
		this.graphics.fillRectShape(healthbarBackground) // rojo
		this.newGraphics.fillStyle(0x3587e2,0.5)
		this.newGraphics.fillRectShape(healthbarFill) 
		this.graphics2.fillStyle(0xffffff, 0.7)
		this.graphics2.fillRectShape(healthbarBackground2) // blanco

		this.scene.add.text(x,y+2, 'SALUD', {fontSize: '8px', fill: '#fff'})
	}

	updateHealth(health){
		this.newGraphics.clear() // borramos ambas barras
		this.currentHealth = health // asignamos el valor nuevo de salud
		this.newGraphics.fillStyle(0x3587e2,1)
		const healthbarFill = new Phaser.Geom.Rectangle(this.x+34,this.y+2,this.currentHealth,8) // dibujamos otra vez
		this.newGraphics.fillRectShape(healthbarFill)


	}

}