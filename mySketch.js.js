let objects = [];
let gravity = 0.3; // Reduced gravity for gentle falling
let friction = 0.1; // Small friction for a softer effect
let restitution = 0.2; // Lower restitution for less bounce
let density = 0.005; // Lower density for lighter objects
const numObjects = 50; // Number of floating objects (increased for the new photos)
let imageSize = 270; // Size of the image (increased size)
const separation = 0.7; // Separation between stacked images

let images = [];
let gravity = 0.3; // Gravity for gentle falling
let friction = 0.1; // Small friction for a softer effect

function preload() {
  // Load images into an array
  for (let i = 1; i <= 5; i++) {
    let img = loadImage(`pizza.png`);
    let img = loadImage(`tropi.png`);
    
  function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create some objects with images
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height * 0.3); // Start near the top
    let img = random(images);

    let object = new FloatingObject(x, y, img);
    objects.push(object);
  }
}

function draw() {
  background(255);

  for (let object of objects) {
    object.display();

    // Apply gravity and update position
    object.applyGravity(gravity);
    object.update();
  }
}

class FloatingObject {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.speedY = 0;
    this.friction = friction;
  }

  applyGravity(force) {
    this.speedY += force;
    this.speedY *= this.friction;
    this.y += this.speedY;

    // Reset position if object goes off-screen
    if (this.y > height) {
      this.y = random(-200, -100); // Reset at a random position above the canvas
      this.speedY = 0;
    }
  }

  display() {
    image(this.img, this.x, this.y, 50, 50); // Display the image
  }

  update() {
    // Any additional updates you want to apply
  }
}
