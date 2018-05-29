var ancho = 1280,
	alto = 720;

var x = 300,
	y = 300,
	r = 200,
	dirX = 1,
	dirY = 1,
	vel = 8;

function setup() {
	var canvas = createCanvas(ancho, alto);
	canvas.parent("juego");
}

function draw() {
	background(255);
	fill(255, 0, 0);
	noStroke();
	ellipse(x, y, r, r);

	x+=vel*dirX;
	y+=vel*dirY;

	if(x >= 1280-r/2 || x <= r/2){
		dirX*=-1;
		console.log("borde");
	} 

	if(y >= 720-r/2 || y <= r/2){
		dirY*=-1;
		console.log("borde");
	} 
}
