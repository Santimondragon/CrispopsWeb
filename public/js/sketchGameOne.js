let ancho = 1280 * .67,
	alto = 720 * .67;

let vasito;
let crispetas = [];

let pantalla = 0;
let loading = 0;

let white = 0,
	leche = 0,
	dark = 0;

let whites = [],
	leches = [],
	darks = [];

let imgBackground, imgOverlay, imgVasito, imgTitulo, imgControles;

function preload() {
	imgBackground = loadImage("/images/juegoUnoBackground.jpg");
	imgOverlay = loadImage("/images/juegoUnoMaquina.png");
	imgVasito = loadImage("/images/vasoSolo.png");
	imgTitulo = loadImage("/images/titulo.jpg");
	imgControles = loadImage("/images/controles.jpg");

	for (let i = 0; i < 5; i++) {
		whites[i] = loadImage("/images/blanca" + i + ".png");
	}

	for (let i = 0; i < 5; i++) {
		leches[i] = loadImage("/images/leche" + i + ".png");
	}

	for (let i = 0; i < 5; i++) {
		darks[i] = loadImage("/images/dark" + i + ".png");
	}
}

function setup() {
	var canvas = createCanvas(ancho, alto);
	canvas.parent("juego");
	rectMode(CENTER);
	imageMode(CENTER);

	vasito = new Vasito(250);

	for (let i = 0; i < 15; i++) {
		let a = new Crispeta(parseInt(random(0, 4)), random(125, ancho - 125), random(0, -2500), random(25, 35), random(1.2, 2.2), 1);
		let b = new Crispeta(parseInt(random(0, 4)), random(125, ancho - 125), random(0, -2500), random(25, 35), random(1.2, 2.2), 2);
		let c = new Crispeta(parseInt(random(0, 4)), random(125, ancho - 125), random(0, -2500), random(25, 35), random(1.2, 2.2), 3);
		crispetas.push(a);
		crispetas.push(b);
		crispetas.push(c);
	}
}

function mousePressed() {
	/* if (pantalla < 2) {
		pantalla++;
	} */
}

function draw() {
	background(255);
	textSize(16);
	textAlign(CENTER, CENTER);
	switch (pantalla) {
		case 0:
			image(imgTitulo, ancho / 2, alto / 2, ancho, alto);
			if (mouseIsPressed) {
				print(parseInt(mouseX), parseInt(mouseY));
			}
			rectMode(CORNER);
			
			noStroke();
			fill(234, 225, 211);
			rect(305, 364, loading, 8, 10);
			if(loading <= 245){
				loading += 2;
			} else {
				fill(255, 144, 0);
				rect(305, 364, 247, 8, 10);
				if(frameCount %60 == 0){
					fill(0, 100);
				} else {
					fill(0, 255);
				}
				text("Has Click para empezar...", ancho/2, 400);
				if(mouseIsPressed){
					pantalla = 1;
				}
			}
			console.log(loading);
			break;

		case 1:
			image(imgControles, ancho / 2, alto / 2, ancho, alto);
			if(keyIsPressed){
				pantalla = 2;
			}
			break;
		case 2:
			image(imgBackground, ancho / 2, alto / 2, ancho, alto);
			vasito.show();
			vasito.move();
			for (let i = crispetas.length - 1; i >= 0; i--) {
				c = crispetas[i];
				if (c.type == 1) {
					c.showChocolate();
				} else if (c.type == 2) {
					c.showWhite();
				} else {
					c.showDark();
				}
				c.move();
				c.validarPos();
				if (c.contains(mouseX, 490 * .67)) {
					crispetas.splice(i, 1);
					if (c.type == 1) {
						leche++;
					} else if (c.type == 2) {
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

			if (crispetas.length <= 30) {
				pantalla = 3;

				let btnComprar = createElement('div',
					`<h1>¡HAS LLENADO TU VASITO!</h1>
					<article class="resultado">
						<h2>CRISPOPS MIXTO 4oz</h2>
						<p><b>` + parseInt((leche / 15) * 100) + `%</b> Chocolate con Leche</p>
						<p><b>` + parseInt((white / 15) * 100) + `%</b> Chocolate Blanco</p>
						<p><b>` + parseInt((dark / 15) * 100) + `%</b> Chocolate Oscuro</p>
					</article>
					<article data-id="5b111972a9a962d55766167f">
					<span>Si deseas llevarlo, <b>¡Añadelo al carrito!</b></span>
					<a href="/productos/5b111972a9a962d55766167f">VER PRODUCTO</a>
					<button class="anadir">AÑADIR AL CARRITO</button>
					<span>O puedes volver a jugar por uno que más te guste</span>
					<a href="/gameOne">VOLVER A JUGAR</a>
					</article>`
				);
				try {
					btnComprar.parent("results");
				} catch (error) {
					print(error);
				}

			}
			image(imgOverlay, ancho / 2, alto / 2, ancho, alto);
			break;

		case 3:
			background(234, 225, 211);
			let contador = 0;

			document.querySelectorAll('.anadir').forEach(function (button) {
				button.addEventListener('click', function () {
					var id = button.parentElement.getAttribute('data-id');
					arreglo.push(id);
					actualizarCarrito();

					localStorage.setItem('arreglo', JSON.stringify(arreglo));
				});
			});
			break;
	}
}

function Vasito(x) {
	this.x = x;


	this.show = function () {
		/* noStroke();
		fill(0);
		rect(x, 650, 80, 20, 10); */
		image(imgVasito, x, 550 * .67, imgVasito.width * .67, imgVasito.height * .67);
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
		image(leches[imagen], x, y, r, r);
	}
	this.showWhite = function () {
		/* noStroke();
		fill(255, 255, 0);
		ellipse(x, y, r, r); */
		image(whites[imagen], x, y, r, r);
	}
	this.showDark = function () {
		/* noStroke();
		fill(0);
		ellipse(x, y, r, r); */
		image(darks[imagen], x, y, r, r);
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