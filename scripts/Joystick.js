class Joystick extends Entity {
	constructor(scene, x,y, textureKey){
		
		super(scene,x,y, textureKey,'Joystick')


		this.x = x  
		this.y = y
		this.imagen =  textureKey
		this.isClicked = false
		this.setInteractive();
		this.potenciaX =0;
		this.potenciaY = 0;
       

       /// en el create

     this.mando = this.scene.physics.add.staticImage(this.x,this.y, 'mandoPad');
	
	this.revisaclick()

}//////////////////////////////////////////////////////////final de create




   joystickUpdate(elzoom, tx, ty){
   
   	var posX_basePad =  this.scene.cameras.main.midPoint.x  - (this.scene.cameras.main.displayWidth/2)  + 1450 * (1/elzoom)
    	var posY_basePad =  this.scene.cameras.main.midPoint.y  + (this.scene.cameras.main.displayHeight/2) - 100 * (1/elzoom)


    this.setPosition(posX_basePad, posY_basePad);
    this.setScale(1.4/(1.5*elzoom));
    this.mando.setScale(1.4/(1.5*elzoom));
    // aqui simplemente le estoy diciendo que lo ponga en el mismo lugar...
    this.mando.x = this.x;
    this.mando.y = this.y;
    

    this.muevemando(tx,ty);

   }

   revisaclick(){
 
   this.on('pointerdown', function (pointer) {
                                                                        this.isClicked = true;})
   this.on('pointerup', function (pointer) { 
                                                                        this.isClicked = false;})
   this.on('pointerupoutside', function (pointer) {
                                                                        this.isClicked = false;})
   }

   muevemando(tx,ty){

		let rtnX = tx;	
   	let rtnY = ty; //version con touch mobile

   	if (tx<1){
   				rtnX = this.scene.input.mousePointer.x;	
   				rtnY =  this.scene.input.mousePointer.y; //version con mouseclick
					}

   	let scrllX = this.scene.cameras.main.scrollX;
		let scrllY = this.scene.cameras.main.scrollY;
		var elzoom =  this.scene.cameras.main.zoom
		var centroPadx = 1450
		var centroPady = 700
		var potenciaX = 0
		var potenciaY = 0

		let cntr = 50 //* (1/elzoom)
		 
		
   	if (this.isClicked){

			// revisa direccion del mando

						if (rtnY > centroPady){} // si resto y multiplico puedo tener la potencia
						if (rtnY < centroPady){}	
						if (rtnX > centroPadx){}
						if (rtnX < centroPadx){}				   		
			   		

			   		potenciaY = (centroPady - rtnY);
			   		potenciaX = (rtnX - centroPadx);
			   		if (potenciaX > cntr){potenciaX = cntr}	if (potenciaX < -cntr){potenciaX = -cntr}
			   		if (potenciaY > cntr){potenciaY = cntr}	if (potenciaY < -cntr){potenciaY = -cntr}

			// ahora como hacemos para que no salga volando

			this.mando.x = this.x+potenciaX;
			this.mando.y = this.y-potenciaY;

					
   		
   		
   	}// lo anterior pasa is esta clicked
   	if (!this.isClicked){this.mando.x = this.x; this.mando.y = this.y}
   	
   	this.potenciaX = potenciaX
   	this.potenciaY = potenciaY

   } // fin de mueve mando



	

}

