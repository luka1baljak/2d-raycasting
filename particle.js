//Klasa čestice koja sadrži array zraka
class Particle {
  constructor() {
    //Field of view
    this.fov = 45;
    this.pos = createVector(width / 2, height / 2);
    //Stvaranje array-a zraka
    this.rays = [];
    this.offset = 0;
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }
  //funkcija za promjenu velicine field of view-a
  updateFOV(fov) {
    this.fov = fov;
    this.rays = [];
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a) + this.offset));
    }
  }
  //rotiranje za određeni kut
  rotate(angle) {
    this.offset += angle;
    let index = 0;
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays[index].setAngle(radians(a) + this.offset);
      index++;
    }
  }
  //pomicanje čestice
  move(len) {
    const vel = p5.Vector.fromAngle(this.offset);
    vel.setMag(len);
    this.pos.add(vel);
  }
  //Omogućava micanje sa mišom ili samostalno ( ako se providaju promjenjive vrijednosti )
  update(x, y) {
    this.pos.set(x, y);
  }
  //Funkcija koja zaustavlja zrake kad "udare" o zid
  look(walls) {
    const scene = [];
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      //Naći najbliži zid na kojem se treba zaustaviti
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          const a = ray.dir.heading() - this.offset;
          d *= cos(a);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      //Ako postoji najbliži zid crta "zraku" od čestice do zida
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
