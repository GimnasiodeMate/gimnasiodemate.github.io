
const animacionpajaro1 =  new Image(); animacionpajaro1.src = './imgs/paj1.png';
const animacionpajaro2 =  new Image(); animacionpajaro2.src = './imgs/paj2.png';
const animacionpajaro3 =  new Image(); animacionpajaro3.src = './imgs/paj3.png';
const animacionpajaro4 =  new Image(); animacionpajaro4.src = './imgs/paj4.png';
const animacion = [animacionpajaro1,animacionpajaro2,animacionpajaro3,animacionpajaro4];



class Pajaro{
	constructor(){
		this.x = 150;
		this.y = 200;
		this.vy = 0;
		this.width = 20;
		this.height = 20;
		this.weight = 1;
		this.i = 0;
	}

	update(){
		z
		let curve = Math.sin(angle) * 5;
		if (this.y > (canvas.height - (this.height * 3) + curve )){ // esta resta es para que respete el tamaño del cuadro
			this.y = canvas.height - (this.height * 3) + curve;
			this.vy = 0;

		}else{

			 this.vy += this.weight; 
			 this.vy *= 0.9; //gravedad menos fuerte
			 this.y += this.vy;
		}
		if (this.y < 0 + this.height){ // si la posicion del pajaro es menor que 0 mas su altura detengase ahi
			this.y = 0 + this.height;
			this.vy = 0; // para que "pegue" y se caiga
		}


	if (spacePressed && this.y > this.height * 3 ) {this.flap()
		
	};
	}
	dibujar(){

		
		ctx.drawImage(animacion[this.i], pajaro.x, pajaro.y, 50, 50);
		
		
	}
	flap(){
		if (this.i==3){this.i = 0;} else {this.i++;}
		this.vy -= 2;
		
	}
}

const pajaro = new Pajaro(); //nace el pajarito con el diseño de arriba
							//este pajarito ahora t