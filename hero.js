/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

const objects = [];
let eyeZ;

function setup() {
  let text = createP();
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  eyeZ = height / 2 / tan((30 * PI) / 180); // The default distance the camera is away from the origin.

  //objects.push(new IntersectPlane(1, 0, 0, -100, 0, 0)); // Left wall
  //objects.push(new IntersectPlane(1, 0, 0, 100, 0, 0)); // Right wall
  objects.push(new IntersectPlane(0, 1, 0, 0, -100, 0)); // Bottom wall
  //objects.push(new IntersectPlane(0, 1, 0, 0, 100, 0)); // Top wall
  //objects.push(new IntersectPlane(0, 0, 1, 0, 0, 0)); // Back wall

  noStroke();
  ambientMaterial(250);
}

function draw() {
  background(1000);

  // Lights
  pointLight(255, 255, 255, 0, 0, 400);
  ambientLight(227, 227, 227);
  
  // Left wall
  //push();
  //translate(-100, 0, 200);
  //rotateY((90 * PI) / 180);
  //plane(400, 200);
  //pop();

  // Right wall/Box button
  push();
  fill(222, 53, 53);
  translate(0, 90, 425);
  rotateY(180);
  box(20);
  pop();

   //box button
  //push();
  //translate(0, 300, 50);
  //fill(245, 39, 39);
  //rotateZ(10);
  //box(30);
  //pop();
  
  // Bottom wall
  push();
  translate(0, 100, 200);
  rotateX((90 * PI) / 180);
  plane(100000,100000);
  pop();

  // Top wall
  //push();
  //translate(0, -100, 200);
  //rotateX((90 * PI) / 180);
  //plane(200, 400);
  //pop();

  //plane(200, 200); // Back wall
  
 

  const x = mouseX - width / 2;
  const y = mouseY - height / 1.8;

  const Q = createVector(0, 0, eyeZ); // A point on the ray and the default position of the camera.
  const v = createVector(x, y, -eyeZ); // The direction vector of the ray.

  let intersect; // The point of intersection between the ray and a plane.
  let closestLambda = eyeZ * 10; // The draw distance.

  for (let x = 0; x < objects.length; x += 1) {
    let object = objects[x];
    let lambda = object.getLambda(Q, v); // The value of lambda where the ray intersects the object

    if (lambda < closestLambda && lambda > 0) {
      // Find the position of the intersection of the ray and the object.
      intersect = p5.Vector.add(Q, p5.Vector.mult(v, lambda));
      closestLambda = lambda;
    }
  }

  // Cursor
  push();
  
  translate(intersect);
  fill(54, 190, 224);
  
  // rotate main character/follow mouse
  rotateY(map(mouseX, 0, width, 0, PI));

  
  box(20, 80, 20);
  
  pop();
  
  
}

// Class for a plane that extends to infinity.
class IntersectPlane {
  constructor(n1, n2, n3, p1, p2, p3) {
    this.normal = createVector(n1, n2, n3); // The normal vector of the plane
    this.point = createVector(p1, p2, p3); // A point on the plane
    this.d = this.point.dot(this.normal);
  }

  getLambda(Q, v) {
    return (-this.d - this.normal.dot(Q)) / this.normal.dot(v);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
