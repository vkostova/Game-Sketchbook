var i = 0;
var txt = ''; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("code").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}


//bottom canvas 
function setup() {

  
  var canvas = createCanvas(windowWidth, 890);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

}

function draw() {
  // Call the variableEllipse() method and send it the
  // parameters for the current mouse position
  // and the previous mouse position
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

// The simple method variableEllipse() was created specifically
// for this program. It calculates the speed of the mouse
// and draws a small ellipse if the mouse is moving slowly
// and draws a large ellipse if the mouse is moving quickly

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  ellipse(x, y, speed, speed);
}
