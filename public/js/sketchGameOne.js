let ancho = 1280,
	alto = 720;

let vasito;
let crispetas = [];

let pantalla = 0;

let white = 0,
	leche = 0,
	dark = 0;

let whites = [],
	leches = [],
	darks = [];

let imgBackground, imgOverlay, imgVasito;

function preload(){
	imgBackground = loadImage("/images/juegoUnoBackground.jpg");
	imgOverlay = loadImage("/images/juegoUnoMaquina.png");
	imgVasito = loadImage("/images/vasoSolo.png");

	for (let i = 0; i < 5; i++) {
		whites[i] = loadImage("/images/blanca"+i+".png");
	}

	for (let i = 0; i < 5; i++) {
		leches[i] = loadImage("/images/leche"+i+".png");
	}

	for (let i = 0; i < 5; i++) {
		darks[i] = loadImage("/images/dark"+i+".png");
	}
}

function setup() {
	var canvas = createCanvas(ancho, alto);
	canvas.parent("juego");
	rectMode(CENTER);
	imageMode(CENTER);

	vasito = new Vasito(250);

	for (let i = 0; i < 15; i++) {
		let a = new Crispeta(random(0, 5), random(25, ancho - 25), random(0, -2500), random(35, 50), random(2.5, 4), 1);
		let b = new Crispeta(random(0, 5), random(25, ancho - 25), random(0, -2500), random(35, 50), random(2.5, 4), 2);
		let c = new Crispeta(random(0, 5), random(25, ancho - 25), random(0, -2500), random(35, 50), random(2.5, 4), 3);
		crispetas.push(a);
		crispetas.push(b);
		crispetas.push(c);
	}
}

function keyPressed(){
	if(pantalla < 2){
		pantalla ++;
	}
}

function mousePressed(){
	image(whites[3], mouseX, mouseY);
}
function draw() {
	background(255);
	image(imgBackground, ancho/2, alto/2);
	image(imgOverlay, ancho/2, alto/2);
	
	textSize(16);
	textAlign(CENTER, CENTER);
	switch (pantalla) {
		case 0:
			fill(0);
			textSize(26);
			text("INICIO", ancho/2, alto/2);
			textSize(16);
			text("Presiona una tecla para avanzar", ancho/2, 50+alto/2);
		break;

		case 1:
			fill(0);
			textSize(26);
			text("CONTROLES", ancho/2, alto/2);
			textSize(16);
			text("Presiona una tecla para avanzar", ancho/2, 50+alto/2);
		break;

		case 2:
			vasito.show();
			vasito.move();	
			for (let i = crispetas.length - 1; i >= 0; i--) {
				c =  crispetas[i];
				if(c.type == 1){
					c.showChocolate();
				} else if(c.type == 2){
					c.showWhite();
				} else {
					c.showDark();
				}
				c.move();
				c.validarPos();
				if (c.contains(mouseX, 490)) {
					crispetas.splice(i, 1);
					background(150, 0, 0);
					if(c.type == 1){
						leche++;
					} else if(c.type == 2){
						white++;
					} else {
						dark++;
					}
					try {
						print(c.type);
					} catch (error) {
						print(error);
						print("Uuunhhhh error raro")
						crispetas.splice(i, 1);
					}
					
				}
			}		
						
			if(crispetas.length <= 30){
				pantalla = 3;

				let btnComprar = createElement('div', 
					`<h1>¡HAS LLENADO TU VASITO!</h1>
					<article class="resultado">
						<h2>CRISPOPS 9oz</h2>
						<p><b>` + parseInt((leche/15)*100) + `%</b> Chocolate con Leche</p>
						<p><b>` + parseInt((white/15)*100) + `%</b> Chocolate Blanco</p>
						<p><b>` + parseInt((dark/15)*100) + `%</b> Chocolate Oscuro</p>
					</article>
					<span>Si deseas llevarlo, presiona click en comprar</span>
					<a href"">COMPRAR</a>
					<span>O puedes volver a jugar para uno que más te guste</span>
					<a href"">VOLVER A JUGAR</a>`
				);
			}
		break;

		case 3:
		background(255);
			
		break;
	}
}

function Vasito(x) {
	this.x = x;


	this.show = function () {
		/* noStroke();
		fill(0);
		rect(x, 650, 80, 20, 10); */
		image(imgVasito, x, 550);
	}

	this.move = function () {
		x = mouseX;
	}
}

function Crispeta(imagen, x, y, r, vel, type) {
	this.imagen = imagen;
	this.x = x;
	this.y = y;
	this.r = r;
	this.vel = vel;
	this.type = type;
	let rotacion = 2;
	
	this.showChocolate = function () {
		//noStroke();
		//fill(255, 0, 0);
		//rect(x, y, r, r);
		image(leches[2], x, y, r, r);	
	}
	this.showWhite = function () {
		/* noStroke();
		fill(255, 255, 0);
		ellipse(x, y, r, r); */
		image(whites[2], x, y, r, r);			
	}
	this.showDark = function () {
		/* noStroke();
		fill(0);
		ellipse(x, y, r, r); */
		image(darks[2], x, y, r, r);			
	}

	this.move = function () {
		y += vel;
	}

	this.validarPos = function () {
		if (y >= alto) {
			y = random(0, -1000);
			x = random(75, ancho - 55);
			r = random(35, 50);
			vel = random(2.5, 4);
		}
	}

	this.contains = function (px, py) {
		let atrapada = (x >= px - 100 && x <= px + 100 && y >= py - 10 && y <= py);
		if (atrapada) {
			return true;
		} else {
			return false;
		}
	}
}
