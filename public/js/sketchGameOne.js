let ancho = 1280,
	alto = 720;

let vasito;
let crispetas = [];

let pantalla = 0;

function setup() {
	var canvas = createCanvas(ancho, alto);
	canvas.parent("juego");
	rectMode(CENTER);

	vasito = new Vasito(250);

	for (let i = 0; i < 10; i++) {
		let a = new Crispeta(random(25, ancho - 25), random(0, -2000), random(5, 15), random(2, 3.5), 1);
		let b = new Crispeta(random(25, ancho - 25), random(0, -2000), random(5, 15), random(2, 3.5), 2);
		let c = new Crispeta(random(25, ancho - 25), random(0, -2000), random(5, 15), random(2, 3.5), 3);
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
function draw() {
	background(255);
	
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
				if (c.contains(mouseX, 650)) {
					crispetas.splice(i, 1);
					background(150, 0, 0);
					try {
						print(c.type);
					} catch (error) {
						print(error);
						print("Uuunhhhh error raro")
						crispetas.splice(i, 1);
					}
					
				}
			}		
			vasito.show();
			vasito.move();	
			
			if(crispetas.length <= 29){
				pantalla = 3;

				let btnComprar = createElement('div', '<a href="">COMPRAR</a>');

				//let btnVolver = createElement('div', '<a href="#">VOLVER A JUGAR</a>');
			}
		break;

		case 3:
			fill(0);
			textSize(26);
			text("¡HAS LLENADO TU VASITO!", ancho/2, (alto/2)-50);
			textSize(22);
			text("CRISPOPS 9oz - 90% CHOCOLATE 10% BLANCO", ancho/2, (alto/2)-20);
			textSize(16);
			text("Si deseas llevarlo, presiona click en comprar,", ancho/2, 20+alto/2);
			text("si quieres armarlo diferente vuelve a jugar =D", ancho/2, 40+alto/2);
		break;
	}
}

function Vasito(x) {
	this.x = x;


	this.show = function () {
		noStroke();
		fill(0);
		rect(x, 650, 80, 20, 10);
	}

	this.move = function () {
		x = mouseX;
	}
}

function Crispeta(x, y, r, vel, type) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.vel = vel;
	this.type = type;
	let rotacion = 2;
	
	this.showChocolate = function () {
		noStroke();
		fill(255, 0, 0);
		rect(x, y, r, r);		
	}
	this.showWhite = function () {
		noStroke();
		fill(255, 255, 0);
		ellipse(x, y, r, r);			
	}
	this.showDark = function () {
		noStroke();
		fill(0);
		ellipse(x, y, r, r);			
	}

	this.move = function () {
		y += vel;
	}

	this.validarPos = function () {
		if (y >= alto) {
			y = random(0, -1000);
			x = random(25, ancho - 25);
			r = random(5, 15);
			vel = random(1, 3.5);
		}
	}

	this.contains = function (px, py) {
		let atrapada = (x >= px - 40 && x <= px + 40 && y >= py - 10 && y <= py);
		if (atrapada) {
			return true;
		} else {
			return false;
		}
	}
}
