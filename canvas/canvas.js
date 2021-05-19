

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 400;


let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0; // es un contador de tiempo, un reloj, cada ciertos frames algo pasa 
let score = 0;
let velocidaddeJuego = 2;


// tuve que mover este codigo a antes de Animate




const background = new Image();
background.src = './imgs/bg2.png';
const BG = {
	x1:0,
	x2:canvas.width,
	y: 0,
	width: canvas.width,
	height: canvas.height
}

function manejaBackground(){
	if (BG.x1 <= -BG.width) BG.x1 = BG.width + velocidaddeJuego; // si se acabo pongalo a la derecha
	else BG.x1 -= velocidaddeJuego; //esto es lo que casi siempre pasa, se va moviendo hacia la izquierda 
	if (BG.x2 <= -BG.width) BG.x2 = BG.width + velocidaddeJuego; // agrego la velocidad de juego para evitar la linea blanca
	else BG.x2 -= velocidaddeJuego;


	ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
	ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height); // el segundo va para que parezca que nunca acaba!
}
// tuve que mover este codigo a antes de Animate





function animate(){
	ctx.clearRect(0,0,canvas.width,canvas.height); // borro la pantalla en cada frame 
	//ctx.fillRect(10,50,50,50);// por mientras dibujo un cuadrado
	manejaBackground();
	pajaro.update();
	pajaro.dibujar();
	manejaParticulas();
	manejaObstaculos();
	ctx.fillStyle = 'red';
	ctx.font = '90px Georgia';
	ctx.strokeText(score, 1100, 70);
	ctx.fillText(score, 1100, 70);

	manejaColisiones();


	if (manejaColisiones())return; // se acaba el juego si pegas con el chunche
	requestAnimationFrame(animate); // esto es un ejemplo de recursividad
	angle +=0.12;
	hue ++;
	frame ++;



}
animate();

window.addEventListener('keydown',function(e){ // esto me da un string con el NOMBRE de la tecla presionada!
	if (e.code === 'Space'){ spacePressed = true; event.preventDefault();}
	
})


window.addEventListener('keyup',function(e){
	if (e.code === 'Space') { spacePressed = false; event.preventDefault();}

});

const bang = new Image();
bang.src = "./imgs/cangrejo.svg";

function manejaColisiones(){
	for (let i =0 ; i < arregloObstaculos.length; i++ ){ let inicioCol = arregloObstaculos[i].x;
														 let anchoCol = arregloObstaculos[i].x.width; 
		if ((pajaro.x > inicioCol) && (pajaro.x < (inicioCol + pajaro.width)) &&
		 (( pajaro.y + (pajaro.height * 1.5) > canvas.height - arregloObstaculos[i].LargodeAbajo)|| 
		 	pajaro.y < arregloObstaculos[i].LargodeArriba)){
				//colision detectada, me encantaria entenderlo pero por ahora estoy aprendiendo	 
				// ahora el texto de game over
				ctx.font = "25px Georgia";
				ctx.fillStyle = 'black';
				ctx.fillText('Juego Terminado tu puntuación fue: ' + score, 360, canvas.height/2 - 20);



				return true;
				}
	}
}
