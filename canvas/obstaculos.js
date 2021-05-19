const arregloObstaculos = []; // aqui van a estar todas los datos de cada particula
const torreobstaculo =  new Image(); torreobstaculo.src = './imgs/torre.svg';

class Obstaculo{
	constructor(){
		this.LargodeArriba = (Math.random() * canvas.height/3) + 20; // el largo del palo de arriba
		this.LargodeAbajo = (Math.random() * canvas.height/3) + 20; // el largo del palo de arriba
		this.x = canvas.width;
		this.width = 30;
		this.color = ('black');
		this.contado = false;
	}

	update(){
		
	this.x -= velocidaddeJuego;  // para mover las columnas hacia la izquierda
	if (!this.contado && this.x < pajaro.x){
		score++;
		this.contado = true;
	}

	this.dibujar();
	
	}
	dibujar(){

		ctx.drawImage(torreobstaculo, this.x, canvas.height - this.LargodeAbajo, this.LargodeAbajo, this.LargodeAbajo);
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,0,this.width,this.LargodeArriba);
		//ctx.fillRect(this.x, canvas.height - this.LargodeAbajo, this.width, this.LargodeAbajo);
		//ctx.arc(this.x,this.y,this.size,0,Math.PI * 2); // para dibujar un circulito
		//ctx.fill ();
		
	}
	
}

function manejaObstaculos(){
	if (frame%50 === 0) { // o sea que si el frame es divisible por 50
		
		arregloObstaculos.unshift(new Obstaculo);
	}
	
	for (let i = 0; i < arregloObstaculos.length; i++) {
		arregloObstaculos[i].update();

		//arregloParticulas[i].dibujar();
	}
	//para que no se hagan tantos obstaculos
	if (arregloObstaculos.length > 20) {
		arregloParticulas.pop(arregloParticulas[0]);
		}
}



