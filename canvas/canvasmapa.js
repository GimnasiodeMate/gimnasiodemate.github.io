
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = screen.width ;
canvas.height = 500;


var background = new Image();
background.src = "./imgs/fondoDojo.jpg";
// events listeners del Mouse
//click   // wheel // position//


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
canvas.addEventListener('click', (event) => {
	const rect = canvas.getBoundingClientRect(); //queremos que nos indique donde esta el canvas con respecto a la pagina
	const xi = event.clientX - rect.left;
	const yi = event.clientY - rect.top;
	//numero.click(xi,yi);	
	boton.Clicked(xi,yi);
	
	
	for(var j=0; j<arreglodeFrutas.length; j++) {arreglodeFrutas[j].Clicked(xi,yi);}	
});
            // a ver si entiendo esto, pero seria muy bueno
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
canvas.addEventListener('mousedown', (event) => { // MOUSEDOWN 
	//console.log(event);
	const rect = canvas.getBoundingClientRect(); //queremos que nos indique donde esta el canvas con respecto a la pagina
	const xi = event.clientX - rect.left;
	const yi = event.clientY - rect.top;
	
	ecuacionIZQ.atrapar_elemento(xi,yi);
	ecuacionDER.atrapar_elemento(xi,yi);
	Numero_mensajero.agarrado(xi,yi); 
	//numero2.agarrado(xi,yi);
		// for(var j=0; j<arr_Numeros.length; j++){
		// 									arr_Numeros[j].agarrado(xi,yi);}
												
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
canvas.addEventListener('mousemove', (event) => { //MOUSEMOVE
	const rect = canvas.getBoundingClientRect(); //queremos que nos indique donde esta el canvas con respecto a la pagina
	const xi = event.clientX - rect.left;
	const yi = event.clientY - rect.top;
	Numero_mensajero.mousetracker(xi,yi); 
	//numero.mousetracker(xi,yi); numero2.mousetracker(xi,yi);
	for(var j=0; j<arr_Numeros.length; j++){
											arr_Numeros[j].mousetracker(xi,yi);}
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
canvas.addEventListener('mouseup', (event) => { // MOUSEUP
	const rect = canvas.getBoundingClientRect(); //queremos que nos indique donde esta el canvas con respecto a la pagina
	const xi = event.clientX - rect.left;
	const yi = event.clientY - rect.top;
	//numero.unclick(); numero2.unclick();

	for(var j=0; j<arr_Numeros.length; j++){
											arr_Numeros[j].unclick(xi,yi);}
											
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





canvas.addEventListener('wheel', (event) => {

	mapaFondo.scroll(event.deltaY);
	event.preventDefault();

});

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0; // es un contador de tiempo, un reloj, cada ciertos frames algo pasa 
let score = 0;
let velocidaddeJuego = 2;



// tuve que mover este codigo a antes de Animate


function animate(){
	ctx.clearRect(0,0,canvas.width,canvas.height); // borro la pantalla en cada frame 
	ctx.drawImage(background,0,0);

	//numero.dibujar();numero2.dibujar();
	//numero.update();numero2.update();
	simboloigual.dibujar();
	// for(var j=0; j<numeradorIZ.length; j++){numeradorIZ[j].dibujar();numeradorIZ[j].update();}
	// for(var j=0; j<denominadorIZ.length; j++){denominadorIZ[j].dibujar();denominadorIZ[j].update();}
	// for(var j=0; j<numeradorDR.length; j++){numeradorDR[j].dibujar();numeradorDR[j].update();}
	// for(var j=0; j<denominadorDR.length; j++){denominadorDR[j].dibujar();denominadorDR[j].update();}

	for(var j=0; j<arr_Numeros.length; j++){
											arr_Numeros[j].dibujar();
											arr_Numeros[j].update();}
	

 	 Numero_mensajero.update();Numero_mensajero.dibujar();
	 ecuacionIZQ.update();ecuacionIZQ.dibujar();
	 ecuacionDER.update();ecuacionDER.dibujar();
	portal.dibujar();

	for(var j=0; j<arreglodeFrutas.length; j++) {
	 		arreglodeFrutas[j].update();
	 		arreglodeFrutas[j].dibujar();} //Dibuja los botones
	 


	boton.dibujar(); boton.update();
	
	 scroll_dir = 0;
	 background.onload = function(){
    ctx.drawImage(background,0,0);}

	requestAnimationFrame(animate);
}
animate();

