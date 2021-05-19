
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
 					
					const El_item = new Item (basedeDatos[i].Item,
											basedeDatos[i].OPCION_A,
											basedeDatos[i].OPCION_B,
											basedeDatos[i].OPCION_C,
											basedeDatos[i].OPCION_D,
											basedeDatos[i].CORRECTA);
										
				//	this.agregaPregunta(El_item);
					jqMath.parseMath(document.body);


				}


			}
	


	recuperadeFirebase(basedeDatos){
	this.Inicializapaquetededatos();	
	let paquetededatos = 'oo'
	console.log( "la base de datos antes de");
	  console.log(basedeDatos);

	  //Version2 mejor directamente al importar le caigo encima a basedeDatos

	var dbRef = firebase.database().ref();
	dbRef.on('value', snap => basedeDatos = snap.val()); // recupera desde firebase
	let casiBD;
	console.log('el paquede de datos despues de traerselo de firebase quedo asi: ');
	console.log(basedeDatos);
	console.log ('conociendo mejor');

	this.agregaaLocalStorage(basedeDatos);
	console.log('agrega a Local Storage la bd 1 quedo asi: ');
	console.log(basedeDatos[0]);
	//this.despliegadeDatos(basedeDatos);
	console.log('me brinque despliegadatos');
	return basedeDatos;

	}
	
	Inicializapaquetededatos(){ // no se por que hay que correr esto antes de jalar el firebase
	let paquetededatos = "estoy vivo";
	var dbRef = firebase.database().ref(); // inicializando firebase talvez. 
	dbRef.on('value', snap => paquetededatos = snap.val());

//
}


	agregaaLocalStorage(basedeDatos){
	//let paquetededatos = JSON.stringify(basedeDatos);
	console.log('estoy cargando el local storage');
	//console.log(paquetededatos);
	localStorage.setItem('preguntasquiz',  JSON.stringify(basedeDatos))	;
	console.log( "comparemos el local storage con la base de Datos");
	  console.log(basedeDatos);


}


	resetFormulario(){
		document.getElementById('formularioPregunta').reset();
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
				//const ui = new UI(); ui.despliegadeDatos(basedeDatos);
				console.log('quiero saber como vuelven desde local storage:');
					console.log(basedeDatos[0]);

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


	CambiaVistade(cual_Div_id){ //hace visible o invisible cualquier id

		var x = document.getElementById(cual_Div_id);
		if (x.style.display == 'block'){x.style.display = 'none';
		}else{x.style.display = 'block';}
			
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

	revisaLargoPregunta(itemactual){ //areglar arreglar arreglar arreglar
 	if (itemactual.item > 100){ 
										 
	document.getElementById("DondePregunta").classList.remove("dondePregunto");
	document.getElementById("DondePregunta").classList.add("dondePreguntomedium");
}else{ document.getElementById("DondePregunta").classList.remove("dondePreguntomedium");
	document.getElementById("DondePregunta").classList.add("dondePregunto"); }
	}

	muestra_este_formulario(cual_formulario){
	var x = document.getElementById(cual_formulario); x.style.display = "block"
	}

	Esconde_formularios_pregunta(){
		var x = document.getElementById("formulario_dos_columnas_fracciones"); x.style.display = "none"
			x = document.getElementById("formulario_dos_columnas_texto"); x.style.display = "none"
			x = document.getElementById("formulario_dos_columnas_imagen"); x.style.display = "none"
			x = document.getElementById("formulario_solo_pregunta"); x.style.display = "none"
			x = document.getElementById("botones_respuestas"); x.style.display = "none"
			x = document.getElementById("btn_Enviar"); x.style.display = "none"
	}
								

	cargaPregunta(itemactual){

		this.Esconde_formularios_pregunta()

		switch(itemactual.Tipo_Pregunta) {
  			case 's_u':{ 
  						this.cambia_texto(itemactual.Item, '#div_pregunta_simple');
						this.cambia_texto(itemactual.Item, '#btn_Opt_A');
						this.cambia_texto(itemactual.Item, '#btn_Opt_B');
						this.cambia_texto(itemactual.Item, '#btn_Opt_C');
						this.cambia_texto(itemactual.Item, '#btn_Opt_D');
						this.muestra_este_formulario('formulario_solo_pregunta');
						this.muestra_este_formulario('botones_respuestas');
						this.inicializabotones();
  			}; break; 
    		case "frx": {
    					this.cambia_texto(itemactual.Item, '#div_pregunta_fracciones');
    					this.muestra_este_formulario('formulario_dos_columnas_fracciones');
    					this.muestra_este_formulario('btn_Enviar');
    		}; break;		
    		case "txt":{ 
  						this.cambia_texto(itemactual.Item, '#div_pregunta_texto');
  						this.muestra_este_formulario('formulario_dos_columnas_texto');
  						this.muestra_este_formulario('btn_Enviar');
  			}; break; 
    		case "s_u_img":{ 
  						this.cambia_texto(itemactual.Item, '#div_pregunta_imagenes');
  						this.muestra_este_formulario('formulario_dos_columnas_imagen');
  						this.cambia_texto(itemactual.Item, '#btn_Opt_A');
						this.cambia_texto(itemactual.Item, '#btn_Opt_B');
						this.cambia_texto(itemactual.Item, '#btn_Opt_C');
						this.cambia_texto(itemactual.Item, '#btn_Opt_D');
						this.muestra_este_formulario('botones_respuestas');

						this.inicializabotones();

  			};break; 
  			default:
    		}

		

		//PRE-PREGUTNA
		
		//this.revisaLargoPregunta(itemactual); //arreglar!

		this.cambia_texto(itemactual.Pre_Pregunta, '#cuadro_dialogo');
		resp_ok = itemactual.CORRECTA;
		link_Solucion = itemactual.LINKVIDEO;
		imagen_ITEM = itemactual.IMAGEN;
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

    inicializabotones(){
    	document.getElementById("btn_Opt_A").disabled = false;
		document.getElementById("btn_Opt_B").disabled = false;
		document.getElementById("btn_Opt_C").disabled = false;
		document.getElementById("btn_Opt_D").disabled = false;	
		console.log('deberia habilitarlos que pasa');
	};

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
		this.inicializabotones();	
		}
    }

	

    arreglaFormatoBotones(){
		let i=0;
    	for (i = 0; i < 4; i++) {
 					
		document.getElementById(LosBotones[i]).classList.remove("boton_correcto");
		document.getElementById(LosBotones[i]).classList.remove("boton_equivocado");
		document.getElementById(LosBotones[i]).classList.add("btn-outline-secondary");

    }}


	
	revisarespuesta_txt(opt_escogida,resp_ok){//revisar respuestas de texto
		if (opt_escogida == resp_ok){
			this.respuesta_Buena();
			console.log('esta buena');
	}else{	console.log('que pena está mala');
			this.respuesta_Mala();}

	}

	respuesta_Buena(){
				this.MuestraMensajeEnEncabezado("¡ Muy Bien !");
		marcadoractual = marcadoractual + 15;
		bM.setValue(marcadoractual);
		this.sonidowin();
		setTimeout(() => 	{ 	console.log('esperé 2 segundos');
								   	this.siguientePregunta();
								   	}, 3000); 

	}

	respuesta_Mala(){
		this.MuestraMensajeEnEncabezado("Pucha, está mala... ¿querés ver la solución?");
		marcadoractual = marcadoractual - 5;
		bM.setValue(marcadoractual);
		document.getElementById("llenadoMarcador").style.backgroundColor= "red";
		this.sonidofail();
		setTimeout(() => 	{ 	console.log('esperé 2 segundos');
								   	this.siguientePregunta();
								   	document.getElementById("llenadoMarcador").style.backgroundColor= '#1DD56E';
			 					 }, 3000); 
	}

	revisarespuesta_btn(opt_escogida,resp_ok){ //comportamiento de botones

		if (this.esigual(opt_escogida,resp_ok)){console.log('se la saco buena', opt_escogida);
		document.getElementById(opt_escogida).classList.remove("btn-outline-secondary");
		document.getElementById(opt_escogida).classList.add("boton_correcto");
		this.respuesta_Buena();
							
		}else{console.log(opt_escogida); // aqui quiero que marque como mala esta y señala que era buena
			console.log("esta mala");
			
			document.getElementById(opt_escogida).classList.remove("btn-outline-secondary");
			document.getElementById(opt_escogida).classList.add("boton_equivocado");  
			document.getElementById(this.cualeslaBuena(resp_ok)).classList.remove("btn-outline-secondary");
			document.getElementById(this.cualeslaBuena(resp_ok)).classList.add("boton_correcto");
			
			this.respuesta_Mala();  
			this.habilitaBotones();
		}
	}

	siguientePregunta(){
		Voy_por_el_Item ++; // me paso a la siguiente pregunta;
		this.MuestraMensajeEnEncabezado("Resolvé este ejercicio:");
		this.arreglaFormatoBotones();
		this.cargaPregunta(basedeDatos[Voy_por_el_Item]);
		
	}

		cambia_texto(nuevoValor, destinoValor){
		let textoIngresado = nuevoValor;			//ahora el valor de linea pongalo en texto ingresado
		let textoaMostrar = document.querySelector(destinoValor); // texto a mostrar va a ser el destino linea pregunta
		textoaMostrar.innerText = textoIngresado; // por ultimo el inner text de texto a mostrar va a ser linea pregunta

	}

	MuestraMensajeEnEncabezado(elMensaje){
		let mensajeaMostrar = elMensaje;			//ahora el valor de linea pongalo en texto ingresado
		this.cambia_texto(elMensaje, '#cuadro_dialogo');
}

	verModo4Opciones(){ // este no me acuerdo que hacia
			var x = document.getElementById("Guardar");
				x.style.display = "none"
				x = document.getElementById("lista-preguntas");
				x.style.display = "none"
				x = document.getElementById("divparalosVideos");
				x.style.display = "none"
				x = document.getElementById("cambiaVista");
				x.style.display = "none"}


sonidowin(){
		var snd = new Audio("./snd/win.mp3"); // buffers automatically when created
		snd.play();
		}

sonidofail(){
		var snd = new Audio("./snd/fail.mp3"); // buffers automatically when created
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
	let Voy_por_el_Item = 0; let marcadoractual = 5;
	const bM = new barraMarcador(document.querySelector('.barraMarcador'), marcadoractual);
	let link_Solucion ; let LINKVIDEO ; let imagen_ITEM ; 


// Quiero importar los datos desde un documento csv



//temporal solo para poder trabajar en los quices!


// Eventos de DOM? del html cuando alguien hace click
// vamso a atajar el submit del boton en formularioPregunta


// aqui empiezo a tratar de reaccionar al boton recuperar la info a base de datos y por 
//ultimo a desplegarlo en pantalla.





//LISTENERS DE BOTONES //

	

		document.getElementById('firebasebtnsave').addEventListener('click' , function(e){
			// PARA EXPORTAR BASE DE DATOS A FIREBASE
			let paquetededatos = basedeDatos;
	  		firebase.database().ref('item').set({text: paquetededatos})			});

//>>
		document.getElementById('firebasebtnload').addEventListener('click' , function(e){
		 	// PARA IMPORTAR DESDE FIREBASE A BASEDEDATOS 
			basedeDatos = ui.recuperadeFirebase(basedeDatos)	 	});

//>>
		document.getElementById('importar').addEventListener('click' , function(e){
			// PARA IMPORTAR DE LOCAL STORAGE A BASAEDEDATOS
			var itemsguardados = localStorage.getItem('preguntasquiz');
			if(itemsguardados == null){
					basedeDatos = [];
			}else{ 	basedeDatos = JSON.parse(itemsguardados);}

			ui.despliegadeDatos(basedeDatos); })
//>>
			
			//jala desde localStorage y lo guarda en BasedeDatos
			//esto deberia estar en un metodo pero lo hecemos despues 

		document.getElementById('btnCreaQuices').addEventListener('click' , function(e){
			ui.muestraEditor();
			 // es para esconder la vista principal del editor
			 
			});

	document.getElementById('iniciaquiz').addEventListener('click' , function(e){
		
		ui.CambiaVistade("Tarjeta-Items");
		ui.CambiaVistade("portada");
		ui.CambiaVistade("barraMarcador");
		ui.cargaPregunta(basedeDatos[Voy_por_el_Item]);
			 // vamomos viendo los diferentes sistemas de respuesta
			 
			});

// LISTENER DE LOS BOTONES DE RESPUESTA DEL QUIZ
//preguntar si hay forma de hacer estos cuatro en uno.....

document.getElementById('btn_Opt_A').addEventListener('click' , function(e){
			ui.revisarespuesta_btn("btn_Opt_A",resp_ok);
			
			});
document.getElementById('btn_Opt_B').addEventListener('click' , function(e){
			ui.revisarespuesta_btn("btn_Opt_B",resp_ok);
			});
document.getElementById('btn_Opt_C').addEventListener('click' , function(e){
			ui.revisarespuesta_btn("btn_Opt_C",resp_ok);
			});
document.getElementById('btn_Opt_D').addEventListener('click' , function(e){
			ui.revisarespuesta_btn("btn_Opt_D",resp_ok);
			});

document.getElementById('btn_Enviar').addEventListener('click' , function(e){
	var fraccion_respondida = document.getElementById("numerador_escrito").value + "/" +  document.getElementById("denominador_escrito").value; 
console.log('esta es la Fraccion Respondida');
console.log(fraccion_respondida);
ui.revisarespuesta_txt(fraccion_respondida,resp_ok);

	//obtiene la respuesta de numerador y denominador y la mete en una variable
			
						});

// LISTENER DE TECLADO

let presionaFlechas = document.querySelector('#numerador_escrito');
presionaFlechas.addEventListener('keydown', function(e){
	console.log('apreto algo pero no se que');
	if (e.keyCode == '40') {
		document.getElementById('denominador_escrito').focus();
		document.getElementById('denominador_escrito').select();
		};
});

presionaFlechas = document.querySelector('#denominador_escrito');
presionaFlechas.addEventListener('keydown', function(e){
	console.log('apreto algo pero no se que');
	if (e.keyCode == '38') {
		console.log('si esta  entraaando');
		document.getElementById('numerador_escrito').focus();
		document.getElementById('numerador_escrito').select();
		};
});




// yo quiero hacer lo mismo pero desde el otro click el de importar


			 // aqui vamos a ejecutar el importe 

			
			//jala desde localStorage y lo guarda en BasedeDatos
			//esto deberia estar en un metodo pero lo hecemos despues 


		// ahora quiero que ese basedeDatos se despliegue en pantalla debo usar una funcion ui



// ok esto es un evento de click en submit y este puede llamar a el item por primera vez



document.getElementById('lista-preguntas')
.addEventListener('click', function(e){
	const ui = new UI();
	ui.borraPregunta(e.target);
})





	


//ScrubGSAPTimeline(tl);
