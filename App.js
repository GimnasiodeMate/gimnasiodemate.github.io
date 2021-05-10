
// aqui van las clases, la primera es la clase item o pregunta


class Item {
	constructor(pregunta, opt1, opt2, opt3, opt4, correcta, llave){
		this.pregunta = pregunta;
		this.opt1 = opt1;
		this.opt2 = opt2;
		this.opt3 = opt3;
		this.opt4 = opt4;	
		this.correcta = correcta;
		this.llave = llave;
	}

}


// en esta clase van los metodos de interfaz con el usuario
//agregar pregunta

class barraMarcador{
  constructor(element, initialValue = 0) {
    this.valueElem = element.querySelector('.barraMarcador-value');
    this.fillElem = element.querySelector('.barraMarcador-fill');
    this.setValue(initialValue);

    console.log(this.valueElem);
    console.log(this.fillElem);
   } 
   setValue (newValue){
   	if (newValue < 0) { newValue = 0;}
   	if (newValue >100) {newValue = 100;}
   	this.value = newValue;
   	this.update();
   }

   update(){
   	const porcentaje = this.value + '%'//50%
   	this.fillElem.style.width = porcentaje;
   	this.valueElem.textContent = porcentaje;
   }

}






class UI {

	agregaPregunta(itemx){
		const listadePreguntas = document.getElementById('lista-preguntas');
		const element = document.createElement('div');
		let iconobuena ='<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 64 64"><path d="M63.792 56.915a6.876 6.876 0 0 1-6.875 6.876H6.875A6.876 6.876 0 0 1 0 56.915V6.875A6.878 6.878 0 0 1 6.875 0h50.042a6.877 6.877 0 0 1 6.875 6.875v50.04z" fill="#37b34a"/><path d="M53.867 14.14a4.656 4.656 0 0 0-6.562.514l-20.04 23.437l-10.781-9a4.248 4.248 0 1 0-5.447 6.519l14.444 12.06a4.223 4.223 0 0 0 3.235.946A4.654 4.654 0 0 0 31.895 47l22.483-26.3a4.659 4.659 0 0 0-.515-6.562" fill="#f4f4f4"/></svg>'
		let iconoa ="";let iconob ="";let iconoc ="";let iconod ="";
		switch(itemx.correcta){
			case 'a': iconoa = iconobuena; break;
			case 'b': iconob = iconobuena; break;
			case 'c': iconoc = iconobuena; break;
			case 'd': iconod = iconobuena; break;			
		}	

		element.innerHTML=`
		<div  class="card text-left mb-4">
			<div class="card-body" >
				<strong>Pregunta </strong>: ${itemx.pregunta}
				<div></div>
				<strong>A. </strong>: ${itemx.opt1} ${iconoa}<br>
				<strong>B. </strong>: ${itemx.opt2} ${iconob}<br>
				<strong>C. </strong>: ${itemx.opt3} ${iconoc}<br>
				<strong>D. </strong>: ${itemx.opt4} ${iconod}<br>
				<div class="text-right">
				<a href="#" class="btn btn-info"   id= ${itemx.llave} name="btnEditar">Editar</a>
				<a href="#" class="btn btn-danger" id= ${itemx.llave} name="btnEliminar">Borrar</a></div>
			</div> 
		</div>

		`;//<--tuve que ponerle a los dos la misma llave para que reconozca cual objeto es
		
		listadePreguntas.appendChild(element); 
		this.resetPizarra();
		
		
		// trabajemos con la base de datos
		

		//this.resetFormulario();
			
	}


	seleccionabuena(correcta, iconoa,iconob,iconoc,iconod){
		let iconobuena ='<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 64 64"><path d="M63.792 56.915a6.876 6.876 0 0 1-6.875 6.876H6.875A6.876 6.876 0 0 1 0 56.915V6.875A6.878 6.878 0 0 1 6.875 0h50.042a6.877 6.877 0 0 1 6.875 6.875v50.04z" fill="#37b34a"/><path d="M53.867 14.14a4.656 4.656 0 0 0-6.562.514l-20.04 23.437l-10.781-9a4.248 4.248 0 1 0-5.447 6.519l14.444 12.06a4.223 4.223 0 0 0 3.235.946A4.654 4.654 0 0 0 31.895 47l22.483-26.3a4.659 4.659 0 0 0-.515-6.562" fill="#f4f4f4"/></svg>'
		switch(correcta){
			case 'a': iconoa = iconobuena; break;
			case 'b': iconob = iconobuena; break;
			case 'c': iconoc = iconobuena; break;
			case 'd': iconod = iconobuena; break;			
		}	

	}
	
	
	agregaaBasedeDatos(itemx){
	basedeDatos.push(itemx)	;}

	// trabajemos en esta
	despliegadeDatos(basedeDatos){ // recupero de el local storage las preguntas guardadas

			var i;
			for (i = 0; i < basedeDatos.length; i++) {
 					
					const El_item = new Item (basedeDatos[i].pregunta,
											basedeDatos[i].opt1,
											basedeDatos[i].opt2,
											basedeDatos[i].opt3,
											basedeDatos[i].opt4,
											basedeDatos[i].correcta, 
											basedeDatos[i].llave); 
					this.agregaPregunta(El_item);
					jqMath.parseMath(document.body);


				}


			}
	


	recuperadeFirebase(basedeDatos){
	this.Inicializapaquetededatos();	
	let paquetededatos = 'oo'
	console.log( "la base de datos antes de");
	  console.log(basedeDatos);

	var dbRef = firebase.database().ref();
	dbRef.on('value', snap => paquetededatos = snap.val());
	let casiBD;
	console.log('el paquede de datos despues de traerselo de firebase quedo asi: ');
	console.log(paquetededatos);
	console.log ('conociendo mejor');
	console.log(paquetededatos);
	console.log(paquetededatos["item"]);
	console.log(paquetededatos["item"].text);
	casiBD = paquetededatos["item"].text;

	// que tal si hago un push de los elementos para que los vaya agregando.
//ui.agregaaBasedeDatos(El_item); 
		var i;
			for (i = 0; i < casiBD.length; i++) {
 					casiBD[i]
 					basedeDatos.push(casiBD[i]);
				}








	//basedeDatos.push(paquetededatos["item"].text);
	//basedeDatos = paquetededatos["item"].text; // aqui la base de datos deberia tener lo mismo que antes de ir
	this.agregaaLocalStorage(basedeDatos);
	this.despliegadeDatos(basedeDatos);
	console.log('acabo de ejecutar despliega datos');
	//console.log('ahoralodificil');
	//casiBD = paquetededatos["item"].text;
	//console.log(casiBD);
	//console.log('el primer valor');
	//console.log(casiBD[0].pregunta);
	//localStorage.setItem('preguntasquiz',  JSON.stringify(paquetededatos))	;
	//basedeDatos = JSON.parse(paquetededatos);
	//	console.log('Le hice un parse y asi quedo:');
	//console.log(basedeDatos);


	//this.agregaaLocalStorage(paquetededatos);
	//basedeDatos = paquetededatos;
	//console.log('yo asigne la paquete a la basede datos?')
	//	 	console.log(basedeDatos);
	//	 	console.log(' la DB con indice 1');
	//	 	console.log(basedeDatos[1]);

	//	console.log('esta deberia ser igual a la anterior')
	//	 	console.log(paquetededatos);
		 	
//
	}
	
	Inicializapaquetededatos(){ // no se por que hay que correr esto antes de jalar el firebase
	let paquetededatos = "estoy vivo";
	var dbRef = firebase.database().ref(); // inicializando firebase talvez. 
	dbRef.on('value', snap => paquetededatos = snap.val());

//
}


	agregaaLocalStorage(basedeDatos){
	let paquetededatos = JSON.stringify(basedeDatos);
	// let paquetededatos;
	console.log('la verdad no quiero que pase por aca')
	console.log(paquetededatos);
	localStorage.setItem('preguntasquiz',  JSON.stringify(basedeDatos))	;

	paquetededatos = ' limpio'
	console.log( "la base de datos antes de");
	  console.log(basedeDatos);


}


	resetFormulario(){
		document.getElementById('formularioPregunta').reset();
	}


	resetPizarra(){
    	//document.getElementById('lineaPregunta').reset();
    	let Borreme = document.querySelector('#lineaA');
    	Borreme.innerText="";
    	Borreme = document.querySelector('#lineaB');
    	Borreme.innerText="";
    	Borreme = document.querySelector('#lineaC');
    	Borreme.innerText="";
    	Borreme = document.querySelector('#lineaD');
    	Borreme.innerText="";
    	Borreme = document.querySelector('#lineaPregunta');
    	Borreme.innerText="Ingrese la siguiente pregunta:";

    	// en esta funcion lo intente con reset pero no quizo no se por que...
	}


	borraPregunta(element){// o talvez la edita


		if (element.name === 'btnEliminar' || element.name === 'btnEditar' ){
			element.parentElement.parentElement.parentElement.remove();	

			//console.log(basedeDatos[1].pregunta);
			//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv para encontrar y borrar de la basedeDatos
			function dondEstas(llave) { return llave.llave === element.id;}		
			 // me devuelve un numero ahora debo borrarlo
			let pos = (basedeDatos.findIndex(dondEstas));
			//console.log(basedeDatos[pos].pregunta);
				if (element.name === 'btnEditar' ){
					console.log("aqui es que vamos a rescatar los valores");
				//	document.getElementById("lineaA").placeholder = "Johnny Bravo";
					
				//	alert('nocreoquesirva');

				
				let elTexto = basedeDatos[pos].pregunta;	document.getElementById("Item").value = elTexto; 
					elTexto = basedeDatos[pos].opt1;	document.getElementById("opt_A").value = elTexto;
					elTexto = basedeDatos[pos].opt2;	document.getElementById("opt_B").value = elTexto;  
					elTexto = basedeDatos[pos].opt3;	document.getElementById("opt_C").value = elTexto;
					elTexto = basedeDatos[pos].opt4;	document.getElementById("opt_D").value = elTexto; 
					elTexto = basedeDatos[pos].correcta;this.cambiaCheckbox(elTexto);	 // esta recupera cual es la correcta		
 
	 			this.actualizaPizarra();
	 			this.muestraMensaje('Ahora podés editar la pregunta', 'info');
						}else{this.muestraMensaje('Pregunta Eliminada', 'danger');}




			basedeDatos.splice(pos, 1);
			//basedeDatos.splice(basedeDatos.findIndex(dondEstas), 1);
			//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
		

			//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Ahora lo borramos del LOCALSTORAGE
			//parece que es mejor borrar el local storage y volverlo a cargar que pereza
			localStorage.clear();
			this.agregaaLocalStorage(basedeDatos);
			//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

			//this.muestraMensaje('Pregunta Eliminada', 'danger');
			//window.localStorage.clear(); // borramos el localstorage 
										 // ahora lo refrescamos
		}}


	actualizaPizarra(){

		let iconobuena ='    ✔'
		let iconoa ="";let iconob ="";let iconoc ="";let iconod ="";

		let linea = document.querySelector('#a_Correcta'); 	if (linea.checked){iconoa = iconobuena;}
			linea = document.querySelector('#b_Correcta'); 	if (linea.checked){iconob = iconobuena;}
			linea = document.querySelector('#c_Correcta'); 	if (linea.checked){iconoc = iconobuena;}
			linea = document.querySelector('#d_Correcta'); 	if (linea.checked){iconod = iconobuena;}
		//estoy revisando si los checkboxes estan marcados para pasarle el icono a la pizzarra


		linea = document.querySelector('#Item');   //lo que haya en #item guardelo en linea
		let textoIngresado = linea.value;			//ahora el valor de linea pongalo en texto ingresado
		let textoaMostrar = document.querySelector('#lineaPregunta'); // texto a mostrar va a ser el destino linea pregunta
		textoIngresado = "■ " + textoIngresado; // a texto ingresado le agrego formato
		textoaMostrar.innerText = textoIngresado; // por ultimo el inner text de texto a mostrar va a ser linea pregunta

		linea = document.querySelector('#opt_A');
		 textoIngresado = linea.value;
		textoaMostrar = document.querySelector('#lineaA');
		textoIngresado = "A.  " + textoIngresado ;
		textoaMostrar.innerText = textoIngresado + iconoa;
		linea = document.querySelector('#opt_B');
		textoIngresado = linea.value;
		textoaMostrar = document.querySelector('#lineaB');
		textoIngresado = "B.   " + textoIngresado ;
		textoaMostrar.innerText = textoIngresado + iconob;
		linea = document.querySelector('#opt_C');
		textoIngresado = linea.value;
		textoaMostrar = document.querySelector('#lineaC');
		textoIngresado = "C.   " + textoIngresado ;
		textoaMostrar.innerText = textoIngresado+ iconoc;
		linea = document.querySelector('#opt_D');
		textoIngresado = linea.value;
		textoaMostrar = document.querySelector('#lineaD');
		textoIngresado = "D.   " + textoIngresado  ;
		textoaMostrar.innerText = textoIngresado + iconod;
		jqMath.parseMath(document.body);

	}


	muestraMensaje(mensaje, claseCss){
	const div = document.createElement('div');
	div.className = `alert alert-${claseCss} mt-2`;
	div.appendChild(document.createTextNode(mensaje));
	
	// mostrando en el DOM
	const contenedor = document.querySelector('.container');
	const aplicacion = document.querySelector('#AppEditor');
	contenedor.insertBefore(div, AppEditor);
	setTimeout(function (){
				document.querySelector('.alert').remove(); // esto busca cual elemento empieza con alert y lo elimina
				},3000); 

	}

 
	importadeLocalStorage(){
		
		var itemsguardados = localStorage.getItem('preguntasquiz');
				if(itemsguardados == null){
					basedeDatos = [];
				}else{ 	basedeDatos = JSON.parse(itemsguardados);
					 }	
				const ui = new UI(); ui.despliegadeDatos(basedeDatos);

	};


	cambiaCheckbox(seleccionada){


	let Borreme = document.querySelector('#a_Correcta'); 	Borreme.checked =false;
		Borreme = document.querySelector('#labelcheckbox_a'); 	Borreme.innerText ="...";
			Borreme = document.querySelector('#b_Correcta'); 	Borreme.checked =false;
			Borreme = document.querySelector('#labelcheckbox_b'); 	Borreme.innerText ="...";
			Borreme = document.querySelector('#c_Correcta'); 	Borreme.checked =false;
			Borreme = document.querySelector('#labelcheckbox_c'); 	Borreme.innerText ="...";
			Borreme = document.querySelector('#d_Correcta'); 	Borreme.checked =false;
			Borreme = document.querySelector('#labelcheckbox_d'); 	Borreme.innerText ="...";
			console.log('esto si lo esta haciendo');
					if (seleccionada == "a"){Borreme = document.querySelector('#a_Correcta');Borreme.checked =true; 
											 Borreme = document.querySelector('#labelcheckbox_a');Borreme.innerText ="Respuesta Correcta";}
					if (seleccionada == "b"){Borreme = document.querySelector('#b_Correcta');Borreme.checked =true;
											Borreme = document.querySelector('#labelcheckbox_b');Borreme.innerText ="Respuesta Correcta";}
					if (seleccionada == "c"){Borreme = document.querySelector('#c_Correcta');Borreme.checked =true;
											Borreme = document.querySelector('#labelcheckbox_c');Borreme.innerText ="Respuesta Correcta";} 
					if (seleccionada == "d"){Borreme = document.querySelector('#d_Correcta');Borreme.checked =true; 
											Borreme = document.querySelector('#labelcheckbox_d');Borreme.innerText ="Respuesta Correcta";}}  

// FUNCIONES DE LOS BOTONES DEL NAV
	muestraEditor(){
					var x = document.getElementById("tarjeta");
  					if (x.style.display === "none") {
   						 x.style.display = "block";
  					} else {
    					x.style.display = "none";
  					}
  					var y = document.getElementById("divItem");
  					if (y.style.display === "none") {
   						 y.style.display = "block";
  					} else {
    					y.style.display = "none";
  					}
	}

	swictchformulario(){
					var x = document.getElementById("respuestaEscrita");
  					if (x.style.display === "none") {
   						 x.style.display = "block";
  					} else {
    					x.style.display = "none";
  					}
  					var y = document.getElementById("botones_respuestas");
  					if (y.style.display === "none") {
   						 y.style.display = "block";
  					} else {
    					y.style.display = "none";
  					}
	}

	revisaLargoPregunta(itemactual){
 	if (itemactual.pregunta.length > 100){ console.log('esta es una pregunta larga');
										  console.log(itemactual.pregunta.length);
	document.getElementById("DondePregunta").classList.remove("dondePregunto");
	document.getElementById("DondePregunta").classList.add("dondePreguntomedium");
}else{ document.getElementById("DondePregunta").classList.remove("dondePreguntomedium");
	document.getElementById("DondePregunta").classList.add("dondePregunto"); }
									}


	cargaPregunta(itemactual){
		
		this.revisaLargoPregunta(itemactual);
		let textoIngresado = itemactual.pregunta;			//ahora el valor de linea pongalo en texto ingresado
		let textoaMostrar = document.querySelector('#DondePregunta'); // texto a mostrar va a ser el destino linea pregunta
		textoaMostrar.innerText = textoIngresado; // por ultimo el inner text de texto a mostrar va a ser linea pregunta

		textoIngresado = "a) " +  itemactual.opt1;			//ahora el valor de linea pongalo en texto ingresado
		textoaMostrar = document.querySelector('#btn_Opt_A'); // texto a mostrar va a ser el destino linea pregunta
		textoaMostrar.innerText = textoIngresado; // por ultimo el inner text de texto a mostrar va a ser linea pregunta

		textoIngresado = "b) " +  itemactual.opt1;			//ahora el valor de linea pongalo en texto ingresado
		textoaMostrar = document.querySelector('#btn_Opt_B'); // texto a mostrar va a ser el destino linea pregunta
		textoaMostrar.innerText = textoIngresado; // por ultimo el inner text de texto a mostrar va a ser linea pregunta

		textoIngresado = "c) " +  itemactual.opt1;			//ahora el valor de linea pongalo en texto ingresado
		textoaMostrar = document.querySelector('#btn_Opt_C'); // texto a mostrar va a ser el destino linea pregunta
		textoaMostrar.innerText = textoIngresado; // por ultimo el inner text de texto a mostrar va a ser linea pregunta

		textoIngresado = "d) " +  itemactual.opt1;			//ahora el valor de linea pongalo en texto ingresado
		textoaMostrar = document.querySelector('#btn_Opt_D'); // texto a mostrar va a ser el destino linea pregunta
		textoaMostrar.innerText = textoIngresado; // por ultimo el inner text de texto a mostrar va a ser linea pregunta

		resp_ok = itemactual.correcta;


		jqMath.parseMath(document.body);

	}
	
	esigual(boton,opt){ // revisa cual boton es el que fue elegido y lo compara con el valor devuelve boolean 
		let escogida;
		switch(boton) {
  	case "btn_Opt_A": escogida = "a"; break; 
    case "btn_Opt_B": escogida = "b"; break; 
    case "btn_Opt_C": escogida = "c"; break; 
    case "btn_Opt_D": escogida = "d"; break; 
  	default:
    // code block}
    }
    if (escogida==opt){return true;}else{return false;}
}

	cualeslaBuena(resp_ok){ // revisa cual boton es el que fue elegido y lo compara con el valor devuelve boolean 
		let labuena;
		switch(resp_ok) {
  		case "a": labuena = "btn_Opt_A"; break; 
    	case "b": labuena = "btn_Opt_B"; break; 
    	case "c": labuena = "btn_Opt_C"; break; 
    	case "d": labuena = "btn_Opt_D"; break; 
  		default:  // code block}
    	}
    	return labuena;}

    habilitaBotones(){ // habitila o dehabilita los botones de respuesta 
		let labuena;
		console.log('aqui deberia bloquear los botones');

		if (document.getElementById("btn_Opt_A").disabled == false){
		console.log(document.getElementById("btn_Opt_A").disabled);
			document.getElementById("btn_Opt_A").disabled = true;
			document.getElementById("btn_Opt_B").disabled = true;
			document.getElementById("btn_Opt_C").disabled = true;
			document.getElementById("btn_Opt_D").disabled = true;
		}else{
				document.getElementById("btn_Opt_A").disabled = false;
				document.getElementById("btn_Opt_B").disabled = false;
				document.getElementById("btn_Opt_C").disabled = false;
				document.getElementById("btn_Opt_D").disabled = false;	
		}
    	}

	

    arreglaFormatoBotones(){
		let i=0;
    	for (i = 0; i < 4; i++) {
 					
		document.getElementById(LosBotones[i]).classList.remove("boton_correcto");
		document.getElementById(LosBotones[i]).classList.remove("boton_equivocado");
		document.getElementById(LosBotones[i]).classList.add("btn-outline-secondary");

    }}



	
	revisarespuesta(opt_escogida,resp_ok){ //comportamiento de botones

		if (this.esigual(opt_escogida,resp_ok)){console.log('se la saco buena', opt_escogida);
		document.getElementById(opt_escogida).classList.remove("btn-outline-secondary");
		document.getElementById(opt_escogida).classList.add("boton_correcto");
		this.MuestraMensajeEnEncabezado("¡ Muy Bien !");
		marcadoractual = marcadoractual + 15;
		bM.setValue(marcadoractual);

		this.sonidowin();
		
									
		}else{console.log(opt_escogida); // aqui quiero que marque como mala esta y señala que era buena
			console.log("esta mala");
			this.MuestraMensajeEnEncabezado("Pucha, está mala... ¿querés ver la solución?");
			document.getElementById(opt_escogida).classList.remove("btn-outline-secondary");
			document.getElementById(opt_escogida).classList.add("boton_equivocado");  
			document.getElementById(this.cualeslaBuena(resp_ok)).classList.remove("btn-outline-secondary");
			document.getElementById(this.cualeslaBuena(resp_ok)).classList.add("boton_correcto");
			this.sonidofail();  
			marcadoractual = marcadoractual - 5;
			bM.setValue(marcadoractual);
			document.getElementById("llenadoMarcador").style.backgroundColor= "red";
			}
		
		this.habilitaBotones();
		setTimeout(() => 	{ 	console.log('esperé 2 segundos');
								   	this.siguientePregunta();
								   	document.getElementById("llenadoMarcador").style.backgroundColor= '#1DD56E';
			 					 }, 2500);
			
			console.log('y luego hice esto');

	}

	siguientePregunta(){
		VoyporelItem ++; // me paso a la siguiente pregunta;
		this.MuestraMensajeEnEncabezado("Resolvé este ejercicio:");
		this.arreglaFormatoBotones();
		this.cargaPregunta(basedeDatos[VoyporelItem]);
		this.habilitaBotones();
	}

	MuestraMensajeEnEncabezado(elMensaje){
console.log('si entro aqui');
		let mensajeaMostrar = elMensaje;			//ahora el valor de linea pongalo en texto ingresado
		let nuevoMensaje = document.querySelector('#cuadro_dialogo'); // texto a mostrar va a ser el destino linea pregunta
		nuevoMensaje.innerText = mensajeaMostrar; // por ultimo el inner text de texto a mostrar va a ser linea pregunta
		console.log(mensajeaMostrar);
}

	verModo4Opciones(){
			var x = document.getElementById("Guardar");
				x.style.display = "none"
				x = document.getElementById("lista-preguntas");
				x.style.display = "none"
				x = document.getElementById("divparalosVideos");
				x.style.display = "none"
				x = document.getElementById("cambiaVista");
				x.style.display = "none"}


sonidowin(){
		var snd = new Audio("win.mp3"); // buffers automatically when created
		snd.play();
		}

sonidofail(){
		var snd = new Audio("fail.mp3"); // buffers automatically when created
		snd.play();
		}

//aprendiendo a suar Json para capturar la informacion:




}// FIN DE FUNCIONES  FIN DE FUNCIONES  FIN DE FUNCIONES  FIN DE FUNCIONES  FIN DE FUNCIONES  FIN DE FUNCIONES  FIN DE FUNCIONES  FIN DE FUNCIONES 

//



// antes del click aqui estoy, las variables que necesite fuera de los eventos del DOM por ejemplo la BD.


// inicializo algunos valores
	let basedeDatos = [];
	const ui = new UI(); ui.Inicializapaquetededatos(); // esto lo que hace es inicializar la base de datos
	let rcorrecta = 'a'; // inicializo la respuesta correcta por defecto
	let iconoa ="";let iconob ="";let iconoc ="";let iconod =""; let resp_ok ="a";
	const LosBotones =["btn_Opt_A","btn_Opt_B","btn_Opt_C","btn_Opt_D"];
	let VoyporelItem = 0; let marcadoractual = 5;
	const bM = new barraMarcador(document.querySelector('.barraMarcador'), marcadoractual);


// Quiero importar los datos desde un documento csv



//temporal solo para poder trabajar en los quices!
	var xx = document.getElementById("tarjeta");
  					if (xx.style.display === "none") {
   						 xx.style.display = "block";
  					} else {
    					xx.style.display = "none";
  					}
  	var c = document.getElementById("botones_respuestas");
  	c.style.display = "none";

// Eventos de DOM? del html cuando alguien hace click
// vamso a atajar el submit del boton en formularioPregunta


// aqui empiezo a tratar de reaccionar al boton recuperar la info a base de datos y por 
//ultimo a desplegarlo en pantalla.

		
		

let lineapregunta = document.querySelector('#Item');
lineapregunta.addEventListener('keyup', function(){
const ui = new UI(); ui.actualizaPizarra();});

let linearespuestaA = document.querySelector('#opt_A');
linearespuestaA.addEventListener('keyup', function(){
const ui = new UI(); ui.actualizaPizarra();
});

let linearespuestaB = document.querySelector('#opt_B');
linearespuestaB.addEventListener('keyup', function(){
	const ui = new UI(); ui.actualizaPizarra(); });

let linearespuestaC = document.querySelector('#opt_C');
linearespuestaC.addEventListener('keyup', function(){
const ui = new UI(); ui.actualizaPizarra(); });

let linearespuestaD = document.querySelector('#opt_D');
linearespuestaD.addEventListener('keyup', function(){
const ui = new UI(); ui.actualizaPizarra(); });


// esto es para que actualice los checkboxes y solo haya uno selecctionado
let checkboxseleccionado = document.querySelector('#a_Correcta'); checkboxseleccionado.addEventListener('click', function(){
	const ui = new UI(); ui.cambiaCheckbox('a');ui.actualizaPizarra();
	rcorrecta = 'a'; console.log('cuando es que pasa por aqui'); console.log(iconoa)});
													// Revisando CheckBox a
	checkboxseleccionado = document.querySelector('#b_Correcta'); checkboxseleccionado.addEventListener('click', function(){
	const ui = new UI(); ui.cambiaCheckbox('b');ui.actualizaPizarra();
	rcorrecta = 'b'; });
													// Revisando CheckBox b
	checkboxseleccionado = document.querySelector('#c_Correcta'); checkboxseleccionado.addEventListener('click', function(){
	const ui = new UI(); ui.cambiaCheckbox('c');ui.actualizaPizarra();
	rcorrecta = 'c'; });
													// Revisando CheckBox c
	checkboxseleccionado = document.querySelector('#d_Correcta'); checkboxseleccionado.addEventListener('click', function(){
	const ui = new UI(); ui.cambiaCheckbox('d');ui.actualizaPizarra();
	rcorrecta = 'd'; });
													// Revisando CheckBox c

//LISTENERS DE BOTONES //

	

		document.getElementById('firebasebtnsave').addEventListener('click' , function(e){
			 // aqui vamos a ejecutar el exportar a firebase
			 console.log('esta es la base de datos en este punto 666');
			 console.log(basedeDatos);
			 	 let paquetededatos = basedeDatos;
	  			 firebase.database().ref('item').set({text: paquetededatos})

			});

		document.getElementById('firebasebtnload').addEventListener('click' , function(e){
		 // aqui vamos a ejecutar el importe 
			const ui = new UI();
			console.log('presione el boton y corri la funcion recupera firebase');
		 	ui.recuperadeFirebase(basedeDatos)

		 });
			
			//jala desde localStorage y lo guarda en BasedeDatos
			//esto deberia estar en un metodo pero lo hecemos despues 

		document.getElementById('btnCreaQuices').addEventListener('click' , function(e){
			const ui = new UI(); ui.muestraEditor();
			 // es para esconder la vista principal del editor
			 
			});


	document.getElementById('cambiaVista').addEventListener('click' , function(e){
	const ui = new UI(); ui.swictchformulario(); ui.verModo4Opciones();
			 // vamomos viendo los diferentes sistemas de respuesta
			 
			});

	document.getElementById('iniciaquiz').addEventListener('click' , function(e){
		console.log('vamos a iniciar el quiz');
		console.log(basedeDatos);
		let itemactual = basedeDatos[VoyporelItem];
	const ui = new UI(); ui.cargaPregunta(itemactual);
			 // vamomos viendo los diferentes sistemas de respuesta
			 
			});

// LISTENER DE LOS BOTONES DE RESPUESTA DEL QUIZ
//preguntar si hay forma de hacer estos cuatro en uno.....

document.getElementById('btn_Opt_A').addEventListener('click' , function(e){
			const ui = new UI(); ui.revisarespuesta("btn_Opt_A",resp_ok);
			
			});
document.getElementById('btn_Opt_B').addEventListener('click' , function(e){
			const ui = new UI(); ui.revisarespuesta("btn_Opt_B",resp_ok);
			});
document.getElementById('btn_Opt_C').addEventListener('click' , function(e){
			const ui = new UI(); ui.revisarespuesta("btn_Opt_C",resp_ok);
			});
document.getElementById('btn_Opt_D').addEventListener('click' , function(e){
			const ui = new UI(); ui.revisarespuesta("btn_Opt_D",resp_ok);
			});



// LISTENER DE LOS BOTONES DE RESPUESTA DEL QUIZ

// yo quiero hacer lo mismo pero desde el otro click el de importar
		document.getElementById('importar').addEventListener('click' , function(e){
			var itemsguardados = localStorage.getItem('preguntasquiz');
				if(itemsguardados == null){
					basedeDatos = [];
				}else{ 	basedeDatos = JSON.parse(itemsguardados);
					 }	
				const ui = new UI(); ui.despliegadeDatos(basedeDatos); })
			 // aqui vamos a ejecutar el importe 

			
			//jala desde localStorage y lo guarda en BasedeDatos
			//esto deberia estar en un metodo pero lo hecemos despues 


		// ahora quiero que ese basedeDatos se despliegue en pantalla debo usar una funcion ui

"use strict";

fetch("https://github.com/GimnasiodeMate/gimnasiodemate.github.io/blob/main/csvjson.json")
.then(function(resp){
	return resp.json();
})
.then(function(data){
console.log("estoy haciendo esto");
console.log(data);
});
		


// ok esto es un evento de click en submit y este puede llamar a el item por primera vez


document.getElementById('formularioPregunta')
.addEventListener('submit', function(e){
	
	const pregunta = document.getElementById('Item').value ;
	const opt_A = document.getElementById('opt_A').value ;
	const opt_B = document.getElementById('opt_B').value ;
	const opt_C = document.getElementById('opt_C').value ;
	const opt_D = document.getElementById('opt_D').value ;
	const key_ = Math.random().toString().slice(2,11); // un valor al azar para poder buscarlo

	
	//if (key_ == 'nuevallave'){ key_ = Math.random().toString().slice(2,11);} // un valor al azar para poder buscarlo
	

	const El_item = new Item (pregunta , opt_A , opt_B, opt_C , opt_D, rcorrecta, key_); 
console.log("la respuesta correcta es " + rcorrecta);



	// aqui estamos creando el Item o sea la pregunta y las respuestas 
	// en el constructor seria lindo que tambien lo almacenara en otro objeto que se llame examen
	// esta clase examen debe contener, una lista de Items

	const ui = new UI(); 
	                        // creo un objeto que contiene los metodos de ui
	ui.agregaPregunta(El_item);				//ui.agregaaBasedeDatos();
	ui.resetFormulario(); 					// limpia el formulario
	ui.agregaaBasedeDatos(El_item); 
	console.log('la base de datos crece');
	console.log(basedeDatos);
			// ahora vamos a poner esto en una base de datos local
	
	ui.agregaaLocalStorage(basedeDatos); 	// y por ultimo lo voy a guardar en un local storage
	ui.muestraMensaje('Se Agregó corectamente', 'success'); 
	jqMath.parseMath(document.body); // refresca notacion matematica

	
	e.preventDefault();
})

document.getElementById('lista-preguntas')
.addEventListener('click', function(e){
	const ui = new UI();
	ui.borraPregunta(e.target);
})





var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
    liquid = selectAll('.liquid'),
    tubeShine = select('.tubeShine'),
    label = select('.label'),
    follower = select('.follower'),
    dragger = select('.dragger'),
    dragTip = select('.dragTip'),
    minDragY = -380,
    liquidId = 0,
    step = Math.abs(minDragY/100),
    snap = Math.abs(minDragY/10),
    followerVY = 0
  

TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set(dragTip, {
 transformOrigin:'20% 50%'
})

var tl = new TimelineMax()
tl.staggerTo(liquid, 0.7, {
 x:'-=200',
 ease:Linear.easeNone,
 repeat:-1
},0.9)

tl.time(100);

document.addEventListener("touchmove", function(event){
    event.preventDefault();
});
Draggable.create(dragger, {
 type:'y',
 bounds:{minY:minDragY, maxY:0},
 onDrag:onUpdate,
 throwProps:true,
 throwResistance:2300,
 onThrowUpdate:onUpdate,
 overshootTolerance:0,
 snap:function(value){
  //Use this to snap the values to steps of 10
  //return Math.round(value/snap) * snap
 }
})

function onUpdate(){
 liquidId = Math.abs(Math.round(dragger._gsTransform.y/step));

 label.textContent = liquidId + '°';
 TweenMax.to(liquid, 1.3, {
  y:dragger._gsTransform.y*1.12,
  ease:Elastic.easeOut.config(1,0.4)
 })
 
}

TweenMax.to(follower, 1, {
 yo:'+=0',
 repeat:-1,
 modifiers:{
  yo:function(y, count){
  followerVY += (dragger._gsTransform.yo - follower._gsTransform.yo) * 0.23;
   followerVY *= 0.69;
   return follower._gsTransform.yo + followerVY; 
  }
 }
})

TweenMax.to(dragTip, 1, {
 rotation:'+=0',
 repeat:-1,
 modifiers:{
  rotation:function(rotation, count){
   return rotation-followerVY
  }
 }
})

TweenMax.to(label, 1, {
 y:'+=0',
 repeat:-1,
 modifiers:{
  y:function(y, count){
   return y-followerVY * 0.5
  }
 }
})


TweenMax.to(dragger, 1.4, {
 y:minDragY/2,
 onUpdate:onUpdate,
 ease:Expo.easeInOut
})


//ScrubGSAPTimeline(tl);
