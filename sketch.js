//Sketch

let walls = [];
let particle;

function setup() {
  createCanvas(400, 400);
  //Stvaranje 5 zidova na radnom lokaciji
  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  //Inicijaliziranje čestice
  particle = new Particle();
}

function draw() {
  background(0);
  //Prikaži zidove
  for (let wall of walls) {
    wall.show();
  }
  //Micanje čestice sa mišem
  particle.update(mouseX, mouseY);
  particle.show();
  particle.look(walls);
  /*let point = ray.cast(wall);

  if (point) {
    fill(255);
    ellipse(point.x, point.y, 8, 8);
  }*/
}
