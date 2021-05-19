
const arregloParticulas = []; // aqui van a estar todas los datos de cada particula

class Particula{
	constructor(){
		this.x = pajaro.x ;
		this.y = pajaro.y + pajaro.width / 2;
		this.size = Math.random() * 7 + 3;
		this.speedY = (Math.random() * 1) - 0.5;
		this.color = 'hsla('+hue+',100%,50%,0.8)'
		//this.color = 'hsla(120,100%,50%,0.3)'; // esto se puede hacer de muchas maneras
	}

	update(){
		
	this.x -= velocidaddeJuego;  // oara que lo tire hacia atras
	this.y += this.speedY;   // para que quede desde donde venia
	
	}
	dibujar(){
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.size,0,Math.PI * 2); // para dibujar un circulito
		ctx.fill ();
		
	}
	
}

function manejaParticulas(){
	let test = new Particula;

	arregloParticulas.unshift(test);

	
	for (let i = 0; i < arregloParticulas.length; i++) {
	

		arregloParticulas[i].update();
		arregloParticulas[i].dibujar();
		
	}
	//para que no se hagan tantas bolitas
	if (arregloParticulas.length > 30) {
		for (let i=0; i<5; i++){
			arregloParticulas.pop(arregloParticulas[i]);
		}
	}

}

