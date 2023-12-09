let objects = [];
let gravity = 0.5;
const numObjects = 50;
let imageSize = 200;
const separation = 0.6;
const imageOrder = [
  'pizza.png', 'tropi.png', 'arti2.png', 'peni.png', 'gosti.png', 
  'tropit.png', 'cdra2.png', 'tilt.png', 'loli2.png', 'cloudi.png', 
  'pilp.png', 'cakee.png', 'arti3.png', 'orange2.png', 'artii.png', 
  'ncake.png'
];

function preload() {
  for (let i = 0; i < imageOrder.length; i++) {
    imageOrder[i] = loadImage(imageOrder[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let y = height - imageSize / 2;

  for (let i = 0; i < numObjects; i++) {
    const x = random(width);
    const rotationSpeed = random(-0.05, 0.05);
    const img = random(imageOrder);

    objects.push(new FloatingObject(x, y, rotationSpeed, img));
    y -= imageSize + separation;
  }
}

function draw() {
  clear();

  for (let object of objects) {
    object.applyGravity(gravity);
    object.floatWithHover();
    object.display();

    if (object.x - imageSize / 2 < 0) {
      object.x = imageSize / 2;
    } else if (object.x + imageSize / 2 > width) {
      object.x = width - imageSize / 2;
    }

    for (let other of objects) {
      if (other !== object) {
        const overlap = 10;
        const minDistance = object.size / 2 + other.size / 2 + overlap;
        const distance = dist(object.x, object.y, other.x, other.y);
        if (distance < minDistance) {
          const angle = atan2(object.y - other.y, object.x - other.x);
          const targetX = other.x + cos(angle) * minDistance;
          const targetY = other.y + sin(angle) * minDistance;

          object.x = lerp(object.x, targetX, 0.1);
          object.y = lerp(object.y, targetY, 0.1);
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  let y = height - imageSize / 2;

  for (let object of objects) {
    const x = random(width);
    const rotationSpeed = random(-0.05, 0.05);
    const img = random(imageOrder);

    object.updateProperties(x, y, rotationSpeed, img);
    y -= imageSize + separation;
  }
}

class FloatingObject {
  constructor(x, y, rotationSpeed, img) {
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.rotationSpeed = rotationSpeed;
    this.img = img;
    this.size = imageSize;
  }

  updateProperties(x, y, rotationSpeed, img) {
    this.x = x;
    this.y = y;
    this.rotationSpeed = rotationSpeed;
    this.img = img;
  }

  applyGravity(gravity) {
    this.speedY += gravity;
    this.y += this.speedY;

    if (this.y > height - this.size / 2) {
      this.y = height - this.size / 2;
      this.speedY *= -0.6;
    }
  }

  floatWithHover() {
    const hoverDist = 100;
    if (dist(mouseX, mouseY, this.x, this.y) < hoverDist) {
      const moveX = mouseX - pmouseX;
      const moveY = mouseY - pmouseY;
      this.x += moveX;
      this.y += moveY;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotationSpeed);
    image(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
    pop();
  }
}
