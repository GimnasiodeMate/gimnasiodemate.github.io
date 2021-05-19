
const back = new Image();
const botonvisible = false;
let llegoabajo = false; let hizoclick = false; 
const velocidadmapa = 5.8;
//let mouseEncima = false;
let scroll_dir = 0; let introYa = false;
const arregloBotones = [];
const imagenboton1 =  new Image(); imagenboton1.src = './imgs/btn2.png';
const imagenboton2 =  new Image(); imagenboton2.src = './imgs/btn1.png';

const if1 =  new Image(); if1.src = './imgs/fresa.png';
const if1_a =  new Image(); if1_a.src = './imgs/fresa_a.png';
const if1_b =  new Image(); if1_b.src = './imgs/fresa_b.png';
const if2 =  new Image(); if2.src = './imgs/sandia.png';
const if2_a =  new Image(); if2_a.src = './imgs/sandia_a.png';
const if2_b =  new Image(); if2_b.src = './imgs/sandia_b.png';

let indiceFrutas = 0;


const fueg1 = new Image(); fueg1.src = './imgs/f1.png';
const fueg2 = new Image(); fueg2.src = './imgs/f2.png';
const fueg3 = new Image(); fueg3.src = './imgs/f3.png';
const fueg4 = new Image(); fueg4.src = './imgs/f4.png';
const fueg5 = new Image(); fueg5.src = './imgs/f5.png';


const img_frutas = [if1,if1_a,if1_b,if2,if2_a,if2_b];
const fuegoarreglo = [fueg1,fueg2,fueg3,fueg4,fueg5];

let objetoagarrado = false;
let CX = screen.width * 0.50;
let CY = 250;
var state = {
	isDown: false,
	lastAngle: 0,
	angleStart:0,
	angle: 0
}; 

const imgPortal =  new Image(); imgPortal.src = './imgs/portal.png';

back.src = "amap.PNG";

//back.onload= function() {ctx.drawImage(back, 0, 0,748,1624)};
//==================================================================================================================
class Numero{
	constructor(simbolo,val,pos){
	this.x = "";
	this.y = "";
	this.simbolo = simbolo;
	this.val = val;
	this.estaagarrado = false;
	this.drag = false;
	this.MouseX = 0;
	this.MouseY = 0;
	this.recientransformado = false;
	this.fusionado = false;
	this.acomodado = false;
	this.pos = pos;
	}

	update() {

				if (this.estaagarrado == true) {  this.x = this.MouseX; this.y = this.MouseY;}
				this.transformese(); 
				this.agujeronegro();
				this.posicionar()
				if (estaCerca(this.x,this.y,ecuacionIZQ.x,ecuacionIZQ.y,50,0,100) && !this.fusionado)
					{this.fusionese('eq_IZ');}
				if (estaCerca(this.x,this.y,ecuacionDER.x,ecuacionDER.y,50,0,100) && !this.fusionado)
					{this.fusionese('eq_DR');}
	}

	dibujar() {	
	ctx.font = '20px serif';
	ctx.fillStyle = '#ccc';
	ctx.fillText(this.simbolo + this.val, this.x, this.y);
	}


	arranca(){
		let posicion_de_arrancado =0;
		arr_Numeros[19] = arr_Numeros[posicion_de_arrancado];// (este)
		for (var i=posicion_de_arrancado; i<4; i++){arr_Numeros[i] = arr_Numeros[i+1]

		//;arr_Numeros[1] = arr_Numeros[2];arr_Numeros[2] = arr_Numeros[3];arr_Numeros[3] = arr_Numeros[4];
		
		arr_Numeros[19].dibujar();
		ecuacionIZQ.reset();
		ecuacionIZQ.lleno=false;
		//muevo el arreglo hacia el frente
	}}

	agarrado(xi,yi,largo){

			if (largo == 1);
			//si el largo del la ecuacion es 2 las posiciones en x son  x =251; y = 290;

			


	
		if (estaCerca(xi,yi,this.x,this.y,0,0,20) && !objetoagarrado){ 
			this.estaagarrado = true; objetoagarrado=true;
			//desprende de ecuacion
			this.arranca();
		}	
		

	}



	unclick(xi,yi){	this.estaagarrado = false; objetoagarrado=false;}

	mousetracker(xi,yi){this.MouseX = xi;this.MouseY = yi; 
	}
	
	transformese(){
		if (this.recientransformado == false){
					if (this.x > portal.x + 5  && this.x < portal.x + 120 ){ 
						switch(this.simbolo) { 	case '-': this.simbolo = "+"; break;
											case '+': this.simbolo = "-"; break;
											case '*': this.simbolo = "÷"; break;
											case '÷': this.simbolo = "*"; break;
											default:} 
						this.recientransformado = true;}}
   		if(this.x < portal.x + 5 || this.x > portal.x + 120){this.recientransformado = true;} 
   			// ↑ si se sale es porque se transformo ↑		
		if (this.x < portal.x + 5  ||  portal.x + 120 < this.x ){ this.recientransformado = false;}
			// ↑ si esta listo para otra transformacion ↑	
	}

	fusionese(Eq){
	//vamos a agregar a recorrer el arreglo y encontrar la posicion de v donde se puede acomodar
		if (Eq == 'eq_IZ'){ 
						for(var i=0; i<5; i++){
							if(arr_Numeros[i].val == 'v'){
														arr_Numeros[i].val = this.val;
														arr_Numeros[i].simbolo = this.simbolo;
														arr_Numeros[i].pos='ni'+i;
														ecuacionIZQ.reset();
														ecuacionIZQ.lleno = false;
														this.fusionado = true;

														return;
							}
						}
		}else{ // significa que mas bien esta a ala derecha
						for(var i=10; i<15; i++){
							if(arr_Numeros[i].val == 'v'){ 
														arr_Numeros[i].val = this.val;
														arr_Numeros[i].simbolo = this.simbolo;
														arr_Numeros[i].pos='ni'+i;
														ecuacionDER.reset();
														ecuacionDER.lleno = false;
														this.fusionado = true;
														return;}
						}
		}
		

	}




	posicionar(){
		//acomoda los numeros en su ubicacion en la pantalla
		if (this.acomodado == false){
		
		if (this.pos == "ni0"){this.x =220; this.y = 100;}
		if (this.pos == "ni2"){this.x =160; this.y = 100;}
		if (this.pos == "ni4"){this.x =220; this.y = 100;}
		if (this.pos == "ni6"){this.x =280; this.y = 100;}
		//==================================================
		if (this.pos == "di0"){this.x =120; this.y = 150;}
		if (this.pos == "di2"){this.x =160; this.y = 150;}
		if (this.pos == "di4"){this.x =220; this.y = 150;}
		if (this.pos == "di6"){this.x =280; this.y = 150;}
		//==================================================
		if (this.pos == "nd0"){this.x =740; this.y = 100;}
		if (this.pos == "nd2"){this.x =800; this.y = 100;}
		if (this.pos == "nd4"){this.x =860; this.y = 100;}
		if (this.pos == "nd6"){this.x =920; this.y = 100;}
		//==================================================
		if (this.pos == "dd0"){this.x =740; this.y = 150;}
		if (this.pos == "dd2"){this.x =800; this.y = 150;}
		if (this.pos == "dd4"){this.x =860; this.y = 150;}
		if (this.pos == "dd6"){this.x =920; this.y = 150;} // se puede hacer con text width pero todavia no
		}this.acomodado = true;
	}


	agujeronegro(){
		//if (estaCerca(450,120,this.x,this.y,0,0,150)){this.x = 750; this.y = 120; this.estaagarrado = false;}
		//if (estaCerca(570,120,this.x,this.y,0,0,150)){this.x = 300; this.y = 120; this.estaagarrado = false;}
	}


 	//fin clase Numero


}

//crear el entre seis de denominador

//const numero = new Numero(5,200,'+','96');
//const numero2 = new Numero(750,200,'-','72');
const simboloigual = new Numero(500,280,'','=');


//==================================================================================================================
class Ecuacion{
	constructor(x,y,lado){
	this.x = x;
	this.y = y;
	this.ItemsN = 0;
	this.ItemsD = 0;
	this.formula_num = "";
	this.formula_den = "";
	this.lleno = false;
	this.lado = lado;

	}

	update() {
				
	}

	reset(){
		this.formula_num="";
		this.formula_den="";
	}

	dibujar() {	
	

		if (this.lleno == false){	
		 
			for(var i=0; i<arr_Numeros.length; i++){
			if (this.lado == 'i'){
				if (arr_Numeros[i].pos == "ni") { this.formula_num += arr_Numeros[i].simbolo + arr_Numeros[i].val}
				if (arr_Numeros[i].pos == "di") {this.formula_den += arr_Numeros[i].simbolo + arr_Numeros[i].val}
				
			}else{
				if (arr_Numeros[i].pos == "nd") {this.formula_num += arr_Numeros[i].simbolo + arr_Numeros[i].val}	
				if (arr_Numeros[i].pos == "dd") {this.formula_den += arr_Numeros[i].simbolo + arr_Numeros[i].val}	
					
			}
			}

		}this.lleno = true; // terminamos de llenar

// logica de este procedimiento
// recorro el arr_Numeros de inicio a fin y dependiendo del ecuaciones index
// lo asigno a las diferentes formulas	
		
// AHORA SI A PINTARLO EN LA PANTALLA>
	
	 
	ctx.font = '70px serif';
	ctx.fillStyle = '#ccc';
	ctx.strokeStyle = "red";
	ctx.textAlign = 'center';
	let anchoN = ctx.measureText(this.formula_num).width;
	ctx.fillText(this.formula_num, this.x, this.y);
	ctx.textAlign = 'center';
	ctx.fillText(this.formula_den, this.x, this.y + 80);
	
	ctx.beginPath(); ctx.moveTo(this.x- anchoN/2, this.y+18); ctx.lineTo(this.x+anchoN/2, this.y + 18); ctx.stroke();


	}// FIN DE DIBUJAR

	atrapar_elemento(xi,yi){ //agarrado en ecuacion vamos a ver si sirve
		let cualagarre='1001';
// voy a revisar primero el caso del lado izquierdo
// voy a revisar primero el caso del lado izquierdo
// voy a revisar primero el caso del lado izquierdo
		//determina si es 1ero segundo o 3er valor del denominador
		if (240 < yi && yi<300 && !objetoagarrado && xi < 500 && this.lado == 'i')// esta en la franja de numeradores y a la izquierda
		{switch(ecuacionesIndex[0]) { 	case 1:
									if(estaCerca(xi,yi,this.x,this.y,0,0,50)){cualagarre = 0 ; objetoagarrado=true; console.log('agarre el ultimo numerador')}; break;
									case 2: console.log('sera que esta aqui arriba?');
									if(estaCerca(xi,yi,this.x-50,this.y,0,0,50)){cualagarre = 0;objetoagarrado=true; console.log('agarre el numerador 1 de 2 ')};
									if(estaCerca(xi,yi,this.x+50,this.y,0,0,50)){cualagarre = 1;objetoagarrado=true; console.log('agarre el numerador 2 de 2 ');}  break;
									case 3: 
									//hay 3 opciones
									if(estaCerca(xi,yi,this.x-80,this.y,0,0,50)){cualagarre = 0;objetoagarrado=true; console.log('agarre el numerador 1 de 3');}
									if(estaCerca(xi,yi,this.x,this.y,0,0,50)){cualagarre = 1;	objetoagarrado=true; console.log('agarre el numerador 2 de 3');}
									if(estaCerca(xi,yi,this.x+80,this.y,0,0,50)){cualagarre = 2;objetoagarrado=true; console.log('agarre el numerador 3 de 3');}
									break;
									
									default:} 
									console.log('aqui deberiamos tener el cualagarre'+cualagarre);
		}
		if (340 < yi && yi<400 && !objetoagarrado && xi < 500 && this.lado == 'i')// esta en la franja de denominadores
		{switch(ecuacionesIndex[1]) { 	case 1: 
									if(estaCerca(xi,yi,this.x,this.y,0,0,80)){cualagarre = 3;objetoagarrado=true; console.log('agarre el unico denominador')}; break;
									case 2: console.log('significa que hay 2 valores->'); console.log(ecuacionesIndex[1]);
									if(estaCerca(xi,yi,this.x-50,this.y,0,0,80)){cualagarre = 3;objetoagarrado=true; console.log('agarre el denominador 1 de 2 ');}
									if(estaCerca(xi,yi,this.x+50,this.y,0,0,80)){cualagarre = 4;objetoagarrado=true; console.log('agarre el denominador 2 de 2 ');}  break;
									case 3: 
									//hay 3 opciones
									if(estaCerca(xi,yi,this.x-80,this.y,0,0,50)){cualagarre = 3;objetoagarrado=true; console.log('agarre el denominador 1 de 3');}
									if(estaCerca(xi,yi,this.x,this.y,0,0,50)){cualagarre = 4;objetoagarrado=true; console.log('agarre el denominador 2 de 3');}
									if(estaCerca(xi,yi,this.x+80,this.y,0,0,50)){cualagarre = 5;objetoagarrado=true; console.log('agarre el denominador 3 de 3');}
									break;
								
									default:}
									
			}


// ahora  toca revisar el lado derecho
// ahora  toca revisar el lado derecho
// ahora  toca revisar el lado derecho

	if (240 < yi && yi<300 && !objetoagarrado && 600 < xi && this.lado == 'd')// esta en la franja de numeradores
			{ 
		switch(ecuacionesIndex[2]) { 	case 1:
									if(estaCerca(xi,yi,this.x,this.y,0,0,50)){cualagarre = 6 ;objetoagarrado=true;  console.log('agarre el ultimo numerador')}; break;
									case 2: 
									if(estaCerca(xi,yi,this.x-50,this.y,0,0,50)){cualagarre = 6;objetoagarrado=true; console.log('agarre el numerador 1 de 2 ')};
									if(estaCerca(xi,yi,this.x+50,this.y,0,0,50)){cualagarre = 7;objetoagarrado=true; console.log('agarre el numerador 2 de 2 ');}  break;
									case 3: 
									//hay 3 opciones
									if(estaCerca(xi,yi,this.x-80,this.y,0,0,50)){cualagarre = 6;objetoagarrado=true; console.log('agarre el numerador 1 de 3');}
									if(estaCerca(xi,yi,this.x,this.y,0,0,50)){cualagarre = 7;	objetoagarrado=true; console.log('agarre el numerador 2 de 3');}
									if(estaCerca(xi,yi,this.x+80,this.y,0,0,50)){cualagarre = 8;objetoagarrado=true; console.log('agarre el numerador 3 de 3');}
									break;
								
									default:} 
		}
		if (340 < yi && yi<400 && !objetoagarrado && 600 < xi && this.lado == 'd')// esta en la franja de denominadores
		{switch(ecuacionesIndex[3]) { 	case 1:
									if(estaCerca(xi,yi,this.x,this.y,0,0,80)){cualagarre = 9;objetoagarrado=true; console.log('agarre el unico denominador'); console.log(
										cualagarre)}; break;
									case 2: console.log('significa que hay 2 valores');
									if(estaCerca(xi,yi,this.x-50,this.y,0,0,80)){cualagarre = 9;objetoagarrado=true; console.log('agarre el denominador 1 de 2 ');}
									if(estaCerca(xi,yi,this.x+50,this.y,0,0,80)){cualagarre = 10;objetoagarrado=true; console.log('agarre el denominador 2 de 2 ');}  break;
									case 3: 
									//hay 3 opciones
									if(estaCerca(xi,yi,this.x-80,this.y,0,0,50)){cualagarre = 9;objetoagarrado=true; console.log('agarre el denominador 1 de 3');}
									if(estaCerca(xi,yi,this.x,this.y,0,0,50)){cualagarre = 10;objetoagarrado=true; console.log('agarre el denominador 2 de 3');}
									if(estaCerca(xi,yi,this.x+80,this.y,0,0,50)){cualagarre = 11;objetoagarrado=true; console.log('agarre el denominador 3 de 3');}
									break;
								
									default:}
									
		} 		
		// convirtamos eso al arregloNumeros
	ecuacionesIndex[0]; //dice cuantos hay en el numerador



		//para saber si es izquierda o derecha> si esta muy a la derecha es la ecuacion 2
		//arr.splice(2, 0, "Lene"); para insertar en cierto punto
		if (cualagarre != '1001'){this.remueve_de_arreglo(cualagarre);}else{}

	}

remueve_de_arreglo(cualagarre){
		
	// cual agarre va de 0 a 5 y de 6 a 11
	// 0 1 2        6 7 8
	// 3 4 5        9 10 11
	// necesito un recorredor. index
	let bl1 = ecuacionesIndex[0];
	let bl1y2 = ecuacionesIndex[0]+ecuacionesIndex[1];
	let bl12y3 = ecuacionesIndex[0]+ecuacionesIndex[1]+ecuacionesIndex[2];	
	


	if (cualagarre < 3){
						Numero_mensajero = arr_Numeros[cualagarre];
						arr_Numeros.splice(cualagarre,1);
						ecuacionesIndex[0] --;
						}
		else if(cualagarre < 6 ){	cualagarre = cualagarre - (3-bl1);
									Numero_mensajero = arr_Numeros[cualagarre];
									arr_Numeros.splice(cualagarre,1);
									ecuacionesIndex[1] --;
			}
			else if (cualagarre < 9){	cualagarre = cualagarre - (6-bl1y2);
										Numero_mensajero = arr_Numeros[cualagarre];
										arr_Numeros.splice(cualagarre,1);
										ecuacionesIndex[2] --;
				}
				else {	console.log('bloque3 es'); console.log(bl12y3);
					cualagarre = cualagarre - (9-bl12y3);
					console.log('que pasa');console.log(cualagarre);
						Numero_mensajero = arr_Numeros[cualagarre];
						arr_Numeros.splice(cualagarre,1);
						ecuacionesIndex[3] --;}


		

	
	this.reset();
	this.lleno=false;
	this.dibujar();
}
 	//fin clase Ecuacion


}

const ecuacionIZQ = new Ecuacion(300,300,"i"); const ecuacionDER = new Ecuacion(800,300,"d");


//VALORES DEL PROBLEMA DE ECUACION:

const numeradorIZ = ['-','6','+','x']; const numeradorDR = ['+','8','-','33'];
const denominadorIZ=['÷','2','-','33']; const denominadorDR = ['÷','1'];
const ecuacionesIndex = [numeradorIZ.length/2,denominadorIZ.length/2,numeradorDR.length/2,denominadorDR.length/2];
const arr_Numeros=[]; //20 en total
// lleno eso con 10 espacios de numerador izq, 10 de denominador iz igual 10 y 10 derechos

	for(var j=0; j<(numeradorIZ.length); j += 2)
		{ arr_Numeros.push(new Numero(numeradorIZ[j],numeradorIZ[j+1],"ni")); ecuacionIZQ.ItemsN++;}
	for(j=0; j<(denominadorIZ.length); j += 2)
		{ arr_Numeros.push(new Numero(denominadorIZ[j],denominadorIZ[j+1],"di"));ecuacionIZQ.ItemsD++;}
	for( j=0; j<(numeradorDR.length); j += 2)
		{ arr_Numeros.push(new Numero(numeradorDR[j],numeradorDR[j+1],"nd"));ecuacionDER.ItemsN++;}
	for( j=0; j<(denominadorDR.length); j += 2)
		{ arr_Numeros.push(new Numero(denominadorDR[j],denominadorDR[j+1],"dd"));ecuacionDER.ItemsD++;}


//aqui voy a hacer un transportador un numero para cuando es agarrado no descomponga los arreglos
let Numero_mensajero = new Numero('v','v','mensajero');

//==================================================================================================================


function estaCerca(x1,y1,x2,y2,offset_x,offset_y,umbral){

	const distancia = Math.sqrt(
						(x1 - (x2 + offset_x)) * (x1 - (x2 + offset_x))
					+	(y1 - (y2 + offset_y)) * (y1 - (y2 + offset_y)) ) ;
	
	if (distancia < umbral){return true;} 
	
}

//================================================================
//================================================================
//       funciones utilizarias para todos los objetos
//================================================================

function estaCerca(x1,y1,x2,y2,offset_x,offset_y,umbral){
	
	const distancia = Math.sqrt(
						(x1 - (x2 + offset_x)) * (x1 - (x2 + offset_x))
					+	(y1 - (y2 + offset_y)) * (y1 - (y2 + offset_y)) ) ;
	
	if (distancia < umbral){return true;} 
	
}






//==================================================================================================================
class Portal{
	constructor(x,y){
	this.x = x;
	this.y = y;
	this.ancho = 221;
	this.alto = 149;
	}
	dibujar(){ ctx.drawImage(	imgPortal, 
						this.x, 
						this.y, 
						this.ancho, this.alto);
	};
}

const portal = new Portal(440,50);


//==================================================================================================================



class Fruta{
	constructor(x,y,imagen,ancho,velocidad_en_x,potencia,vel_angular){
		this.x = x;
		this.y = 500;
		this.anchuraimagen = ancho;
		this.alturaimagen = ancho;
		this.imagen = imagen;
		this.gravedad = 0.35;
		this.deltaY = potencia;
		this.angulo = 1;
		this.velocidad_en_x = velocidad_en_x;
		this.vel_angular = vel_angular;
		this.activa = false;

		
	}

	update(){
	
	if (this.activa){
		this.angulo += this.vel_angular;
		this.x += this.velocidad_en_x;

		this.drawImageRot(this.imagen,this.x,this.y,this.anchuraimagen,this.alturaimagen,this.angulo);
		
		//this.gravedad = this.gravedad * 1.1;
		if (this.y + this.alturaimagen > canvas.height + 300){ //destruye objeto cambio dirección
																												
		}else{ 	this.deltaY += this.gravedad;}
				
		
		this.y += this.deltaY;

			}
		}	

	dibujar(){
		
					}// si si es fraccion

					 
	


	Clicked(xMouse, yMouse){
		
		// estaCerca(x1,y1,x2,y2,offset_x,offset_y,umbral)
		// if (estaCerca(xMouse,this.x,yMouse,this.y,0,0,100)){
		//  	if (this.imagen == img_frutas[0]){this.imagen = img_frutas[1];
		// 							this.vel_angular = 6;}
 	// 							if (this.imagen == img_frutas[3]){this.imagen = img_frutas[4];
 	// 							this.vel_angular = 8; }
									
		// 						}// }
	}

	scroll(deltaY){
			
			if (deltaY < 0){ if (!MapaFondo.topeAbajo()){scroll_dir = 25}else{}; // si no esta abajo, baje
			}else if (!MapaFondo.topeArriba()){scroll_dir = -25 } // si no esta arriba, suba con el scroll
		}

	mouseEncima(xMouse, yMouse){
		// if (estaCerca(xMouse,this.x,yMouse,this,y,0,0,100)){
		// 		if (this.imagen == img_frutas[0]){this.imagen = img_frutas[1];
		// 							this.vel_angular = 6;
		// 							arreglodeFrutas[35].activa = true; 
		// 							arreglodeFrutas[35].posX=this.x + 50;
		// 							arreglodeFrutas[35].y=this.y;
		// 							arreglodeFrutas[35].imagen= img_frutas[2];


		// 						}
 	// 							if (this.imagen == img_frutas[3]){this.imagen = img_frutas[4];
 	// 							this.vel_angular = 8; }
 	// 						}
		
	}



drawImageRot(img,x,y,width,height,deg){
    // Store the current context state (i.e. rotation, translation etc..)
    ctx.save()

    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    // Restore canvas state as saved from above
    ctx.restore();
}





}

class BotonNivel{
	constructor(x,y,color){
		this.x = x;//293.7;
		this.y = y;//391;
		this.radio = 28;
		this.color = color;	
		this.skin = false;
		this.size = 85;
		this.vel_animacion = 1;
		this.clicked = false;
		this.imagen = imagenboton2;

	}

	update(){
		
		if (this.clicked){ this.imagen = imagenboton1;}else{this.imagen = imagenboton2;}
		// 					this.y-(((this.size-1)/2)-1), this.size, this.size);}	
		

								// //canvas.style.visibility='hidden';
								// document.getElementById("canvas-container").style.display = 'none';
		}

	dibujar(){

		if (this.clicked){ ctx.drawImage(	imagenboton2, 
						this.x-(((this.size-1)/2)-1), 
						this.y-(((this.size-1)/2)-1), 
						this.size, this.size);
					}else{
						ctx.drawImage(	imagenboton1, 
						this.x-(((this.size-1)/2)-1), 
						this.y-(((this.size-1)/2)-1), 
						this.size, this.size);	
					}
		//if (this.imagen == imagenboton2) {console.log('que raro imagenboton2');}else{console.log('imagenboton');}

			//	this.size = this.size + this.vel_animacion;
		
			//	if (this.size > 149 || this.size < 100) {this.vel_animacion *= -1}
				
		
		// if (this.skin){ctx.drawImage(imagenboton, this.x-(((this.size-1)/2)-1), this.y-(((this.size-1)/2)-1), this.size, this.size);}
		//ctx.fillStyle = this.color;
		//ctx.beginPath();
		//ctx.arc(this.x,this.y,this.radio,0,Math.PI * 2); // para dibujar un circulito
		//ctx.fill ();
		}

	Clicked(xMouse, yMouse){
		
		//Pitagoras!
		if (estaCerca(xMouse,yMouse,this.x,this.y,0,0,this.radio))
								   {this.clicked = !this.clicked ;
									arreglodeFrutas[indiceFrutas].activa = true;
									arreglodeFrutas[indiceFrutas+1].activa = true;}
									indiceFrutas ++;
}

	scroll(deltaY){
			
			if (deltaY < 0){ if (!MapaFondo.topeAbajo()){scroll_dir = 25}else{}; // si no esta abajo, baje
			}else if (!MapaFondo.topeArriba()){scroll_dir = -25 } // si no esta arriba, suba con el scroll
		}

	mouseEncima(xMouse, yMouse){
			
			const distancia = Math.sqrt(
			((xMouse - this.x) * (xMouse - this.x))
		+	((yMouse - this.y) * (yMouse - this.y)) ) ;
		if (distancia < this.radio) {this.skin = true}
		}



  	// isMouseOver(x, y) {
   //  				var position = this.getPosition(),
			// 		size   = this.getSize(),
			// 		radius = this.options.radius,
			// 		centerX = position.x + (size.width / 2),
			// 		centerY = position.y + (size.height / 2),
			// 		distanceX = x - centerX,
			// 		distanceY = y - centerY;
    
   // 
			
		// return Math.round(Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))) <= radius;
  // }



}


class MapaFondo{
	constructor(){
		this.x = 0;
		this.vy = 0;
		this.width = 748;
		this.height = 1624;
		this.y = 0
		this.weight = 1;
		this.i = 0;

		
	}

		update(){
			
			this.y = (this.y + scroll_dir); // para hacer scroll
			//this.scroll();

			if (introYa == false){
				if (this.topeAbajo()){ llegoabajo = true; introYa= true;
				}else{this.y = this.y - velocidadmapa;}}
			
		}

		dibujar(){
			ctx.drawImage(back, this.x, this.y,this.width,this.height);
		}

		scroll(deltaY){
			
			if (deltaY < 0){ if (!this.topeAbajo()){scroll_dir = -25}else{}; // si no esta abajo, baje
			}else if (!this.topeArriba()){scroll_dir = 25 } // si no esta arriba, suba con el scroll
		}

		topeAbajo(){
			if (this.y < 650 -this.height){return true;}else{return false;}
		}
		topeArriba(){
			if (this.y < 0){return false;}else{return true;}
		}

	// flap(){
	// 	if (this.i==3){this.i = 0;} else {this.i++;}
	// 	this.vy -= 2;
		
	//}
}


class Fuego{ 
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.height = 177;
		this.width =92;
		this.frame = 0;
		this.animacion = 0;
		this.clicked = false;
		}
	update(){
		this.y = (this.y + scroll_dir); // para hacer scroll
		if (!llegoabajo){this.y -= velocidadmapa}// baja a la velocidad del mapa
		this.animacion ++;
		if ( this.animacion%10 == 0){ 
			if (this.frame < 4){this.frame ++}else{this.frame = 0}}


		}



	dibujar(){ 
			if (this.clicked){ctx.drawImage(fuegoarreglo[this.frame], this.x, this.y,this.width*0.7,this.height*0.7);}
			}

	scroll(deltaY){
			
			if (deltaY < 0){ if (!this.topeAbajo()){scroll_dir = -25}else{}; // si no esta abajo, baje
			}else if (!this.topeArriba()){scroll_dir = 25 } // si no esta arriba, suba con el scroll
		}


	fuegoClicked(xMouse, yMouse){
		
		//Pitagoras!
		
		const distancia = Math.sqrt(
			((xMouse - this.x) * (xMouse - this.x))
		+	((yMouse - this.y) * (yMouse - this.y)) ) ;
	
		if (distancia < 200) {this.clicked = !this.clicked;  }
}


	}				


var arreglodeFrutas = [];

for (var i=0; i<40; i++){
	let velhorizontal = (((1 - Math.random())* (5 - 3 + 1)) + 3);
	let potencia = Math.random() * (18 - 13 + 1) + 13;
	let vel_angular= Math.random() * (3 - 1 + 1) + 1;
	let ind = 0; let posX = 0;
	if (Math.random() < 0.5){ind = 3} // por ahora porque son solo 2 frutas despues habra que resolverlo
	if (i%2 == 0){posX = 400; velhorizontal = -velhorizontal; }	
	
	arreglodeFrutas.push(new Fruta(posX,50,img_frutas[ind],100,velhorizontal, -potencia , vel_angular));
}




// const mapaFondo = new MapaFondo(); //nace el pajarito con el diseño de arriba
// arregloBotones[0] = new BotonNivel(293.9,259,"#07F118");
// arregloBotones[1] = new BotonNivel(620,392,"#07F118");
// arregloBotones[2] = new BotonNivel(291,709,"#07F118");
// arregloBotones[3] = new BotonNivel(560,707,"#07F118");
// arregloBotones[4] = new BotonNivel(83,894,"#07F118");
// arregloBotones[5] = new BotonNivel(174,1151,"#07F118");
// arregloBotones[6] = new BotonNivel(481,1479,"#07F118");

const fuego = new Fuego (490,175);



let velhorizontal1 = (((1 - Math.random())* (5 - 3 + 1)) + 3);

let potencia1 = Math.random() * (18 - 13 + 1) + 13;
let vel_angular = Math.random() * (3 - 1 + 1) + 1;
let vel_angular1= Math.random() * (3 - 1 + 1) + 1;			
const boton = new BotonNivel(980,50,'red');
		
