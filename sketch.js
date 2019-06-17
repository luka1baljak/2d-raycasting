//Sketch

let walls = [];
let particle;
//Veličina lijevog "zaslona", scenewidth and sceneheight
const sceneW = 400;
const sceneH = 400;
let sliderFOV;
function setup() {
  createCanvas(800, 400);
  //Stvaranje 5 zidova na radnom lokaciji
  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  //Zidovi lijevog zaslona
  walls.push(new Boundary(0, 0, sceneW, 0)); //gornji zid
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH)); //desni zid
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH)); //donji zid
  walls.push(new Boundary(0, sceneH, 0, 0)); //lijevi zid
  //Inicijaliziranje čestice
  particle = new Particle();
  sliderFOV = createSlider(0, 360, 45);
  sliderFOV.input(changeFOV);
}
//slider za mijenjanje field of view-a
function changeFOV() {
  const fov = sliderFOV.value();
  particle.updateFOV(fov);
}

function draw() {
  //rotiranje field of viewa (LEFT, RIGHT)
  //pomicanje čestice (UP,DOWN)
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.1);
  } else if (keyIsDown(UP_ARROW)) {
    particle.move(1);
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.move(-1);
  }

  background(0);
  //Prikaži zidove
  for (let wall of walls) {
    wall.show();
  }
  //Micanje čestice sa mišem
  //particle.update(mouseX, mouseY);
  particle.show();
  //array koji sadrži pravokutnike koji se crtaju na desnom zaslonu
  const scene = particle.look(walls);
  //width = velicina zaslona podijeljena sa količinom pravokutnika
  const w = sceneW / scene.length;

  push();
  //prebacuje ne 400,0 , od polovice ekrana (da bi crtalo na desnom zaslonu)
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++) {
    noStroke();
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    //Što je dalje zid to je bliže boji od 0 (crna boja), scala sa kvadratom radi lijepšeg izgleda
    const b = map(sq, 0, wSq, 255, 0);
    //Što je dalje to je manja visina
    const h = map(scene[i], 0, sceneW, sceneH, 0);
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();
}
